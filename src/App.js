import React from "react";
import "./App.css";
import data from "./data.json";
import { useState } from "react";

let nextId = 0;

function App() {
  const [jobDetails, setjobDetails] = useState([]);

  function handlejobDetails(jobDetail) {
    if (
      !jobDetails.some((selectedjobDetail) => selectedjobDetail.jobDetail === jobDetail)
    ) {
      setjobDetails([...jobDetails, { id: nextId++, jobDetail: jobDetail }]);
    }
  }

  return (
    <div>
      <JobDetailsList jobDetails={jobDetails} />
      <JobList onHandlejobDetails={handlejobDetails} />
    </div>
  );
}

function JobDetailsList({ jobDetails }) {
  return (
    <div className="job-details-buttons-container">
      {jobDetails.map((jobDetail) => {
        return <button key={jobDetail.id}>{jobDetail.jobDetail}</button>;
      })}
    </div>
  );
}

function JobList({ onHandlejobDetails }) {
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
              <button
                onClick={() => {
                  onHandlejobDetails(job.role);
                }}
                className="info-button"
              >
                {job.role}
              </button>
              <button
                onClick={() => {
                  onHandlejobDetails(job.level);
                }}
                className="info-button"
              >
                {job.level}
              </button>
              {job.languages.map((language, index) => {
                return (
                  <button
                    onClick={() => {
                      onHandlejobDetails(language);
                    }}
                    key={index}
                    className="info-button"
                  >
                    {language}
                  </button>
                );
              })}
              {job.tools.map((tool, index) => {
                return (
                  <button
                    onClick={() => {
                      onHandlejobDetails(tool);
                    }}
                    key={index}
                    className="info-button"
                  >
                    {tool}
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
