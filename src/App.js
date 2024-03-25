import React from "react";
import "./App.css";
import data from "./data.json";
import { useState } from "react";

let nextId = 0;

function App() {
  const [jobDetails, setjobDetails] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(data);

  function deleteFilter(key) {
    const updatedJobDetails = jobDetails.filter((detail) => detail.id !== key);
    setjobDetails(updatedJobDetails);

    if (updatedJobDetails.length === 0) {
      setFilteredJobs(data);
    } else {
      let filteredJobs = data;
      updatedJobDetails.forEach((detail) => {
        const filterKey = Object.keys(detail)[1];
        const filterValue = Object.values(detail)[1];
        filteredJobs = filteredJobs.filter((job) =>
          job[filterKey].includes(filterValue)
        );
      });
      setFilteredJobs(filteredJobs);
    }
  }

  function handleFilter(value, filterKey) {
    const filtered = filteredJobs.filter((job) =>
      job[filterKey].includes(value)
    );
    setFilteredJobs(filtered);
  }

  function handlejobDetails(jobDetail, jobDetailKey) {
    if (
      !jobDetails.some(
        (selectedjobDetail) => selectedjobDetail[jobDetailKey] === jobDetail
      )
    ) {
      setjobDetails([
        ...jobDetails,
        { id: nextId++, [`${jobDetailKey}`]: jobDetail },
      ]);
    }
  }

  return (
    <div>
      <JobDetailsList onDeleteFilter={deleteFilter} jobDetails={jobDetails} />
      <JobList
        filteredJobs={filteredJobs}
        onhandleFilter={handleFilter}
        onHandlejobDetails={handlejobDetails}
      />
    </div>
  );
}

function JobDetailsList({ jobDetails, onDeleteFilter }) {
  return (
    <div>
      <header></header>
      <div className={jobDetails.length === 0 ? "hidden" : "job-details-buttons-container" }>
        {jobDetails.map((jobDetail) => {
          return (
            <div className="job-details-button-container" key={jobDetail.id}>
              <p className="job-details-button-text">{Object.values(jobDetail)[1]}</p>
              <button
                className="job-details-button"
                onClick={() => {
                  onDeleteFilter(jobDetail.id);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                  <path
                    fill="#FFF"
                    fillRule="evenodd"
                    d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JobList({ onHandlejobDetails, onhandleFilter, filteredJobs }) {
  return (
    <div>
      <ul className="jobs-list">
        {filteredJobs.map((job) => (
          <li className="job-container" key={job.id}>
            <img className="company-logo" src={job.logo} alt={job.company} />
            <div className="job-name-info-container">
            <div className="job-name-container">{job.company}</div>
            <h2>{job.position}</h2>
            <p className="job-info-container">
              {job.postedAt} <span style={{ color: "#B7C4C4" }}>&bull;</span>{" "}
              {job.contract} <span style={{ color: "#B7C4C4" }}>&bull;</span>{" "}
              {job.location}
            </p>
            </div>
            <span className="divider"></span>
            <div className="button-container">
              <button
                onClick={() => {
                  onHandlejobDetails(job.role, "role");
                  onhandleFilter(job.role, "role");
                }}
                className="info-button"
              >
                {job.role}
              </button>
              <button
                onClick={() => {
                  onHandlejobDetails(job.level, "level");
                  onhandleFilter(job.level, "level");
                }}
                className="info-button"
              >
                {job.level}
              </button>
              {job.languages.map((language, index) => {
                return (
                  <button
                    onClick={() => {
                      onHandlejobDetails(language, "languages");
                      onhandleFilter(language, "languages");
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
                      onHandlejobDetails(tool, "tools");
                      onhandleFilter(tool, "tools");
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
