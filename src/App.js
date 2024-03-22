import React from "react";
import "./App.css";
import data from "./data.json";
import { useState } from "react";

let nextId = 0;

function App() {
  const [languages, setLanguages] = useState([]);

  function handleLanguages(language) {
    if (!languages.some(chosenLanguage => chosenLanguage.language === language)) {
      setLanguages([...languages, { id: nextId++, language: language }]);
  }
}

  return (
    <div>
      <LanguageList languages={languages} />
      <JobList onHandleLanguages={handleLanguages} />
    </div>
  );
}

function LanguageList({ languages }) {
  return (
    <div className="language-buttons-container">
      {languages.map((language) => {
        return <button key={language.id}>{language.language}</button>;
      })}
    </div>
  );
}

function JobList({ onHandleLanguages }) {
  return (
    <div>
      <ul className="jobs-list">
        {data.map((job) => (
          <li className="job-container" key={job.id}>
            <img src={job.logo} alt={job.company} />
            <div className="job-name-container">{job.company}</div>
            <h2>{job.position}</h2>
            <p className="job-info-container">
              {job.postedAt} &bull; {job.contract} &bull; {job.location}
            </p>
            <hr></hr>
            <div className="button-container">
              <button className="info-button">{job.position}</button>
              <button className="info-button">{job.level}</button>
              {job.languages.map((language, index) => {
                return (
                  <button
                    onClick={() => {
                      onHandleLanguages(language);
                    }}
                    key={index}
                    className="info-button"
                  >
                    {language}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
