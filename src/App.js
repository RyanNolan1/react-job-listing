import React from "react";
import "./App.css";
import data from "./data.json";
import { useState } from "react";

let nextId = 0;

function App() {
  const [jobDetails, setjobDetails] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(data);

  function deleteFilter(key) {
    const filterIndex = jobDetails.filter((detail) => detail.id !== key);
    setjobDetails(filterIndex)
  }

  function handleFilter(value, filterKey) {
    const filtered = filteredJobs.filter((job) =>
      job[filterKey].includes(value)
    );
    setFilteredJobs(filtered);
  }

  function handlejobDetails(jobDetail) {
    if (
      !jobDetails.some(
        (selectedjobDetail) => selectedjobDetail.jobDetail === jobDetail
      )
    ) {
      setjobDetails([...jobDetails, { id: nextId++, jobDetail: jobDetail }]);
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
    <div className="job-details-buttons-container">
      {jobDetails.map((jobDetail) => {
        return (
          <button
            onClick={() => {
              onDeleteFilter(jobDetail.id);
            }}
            key={jobDetail.id}
          >
            {jobDetail.jobDetail}
          </button>
        );
      })}
    </div>
  );
}

function JobList({ onHandlejobDetails, onhandleFilter, filteredJobs }) {
  return (
    <div>
      <ul className="jobs-list">
        {filteredJobs.map((job) => (
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
                  onhandleFilter(job.role, "role");
                }}
                className="info-button"
              >
                {job.role}
              </button>
              <button
                onClick={() => {
                  onHandlejobDetails(job.level);
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
                      onHandlejobDetails(language);
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
                      onHandlejobDetails(tool);
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
