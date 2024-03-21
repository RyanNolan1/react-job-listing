import React from "react";
import "./App.css";
import data from "./data.json";

function App() {
  return (
    <div>
      <JobList />
    </div>
  );
}

function JobList() {
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
