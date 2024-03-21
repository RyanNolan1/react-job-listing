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
      <ul>
        {data.map((job) => (
          <l1 key={job.id}>{job.company}</l1>
        ))}
      </ul>
    </div>
  );
}

export default App;
