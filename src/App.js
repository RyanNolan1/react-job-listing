import React from "react";
import "./App.css";
import data from "./data.json";
import { useState } from "react";

function App() {
  return (
    <div>
      <LanguageList />,
      <JobList />
    </div>
  );
}

function LanguageList() {}

function JobList() {
  let nextId = 0;

  const [languages, setLanguages] = useState([]);

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
              {job.languages.map((language, index) => {
                return (
                  <button
                    onClick={(e) => {
                      setLanguages([
                        ...languages,
                        { id: nextId++, language: language },
                      ]);
                    }}
                    key={index}
                    className="language-buttons"
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
