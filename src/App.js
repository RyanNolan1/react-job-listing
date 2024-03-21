import "./App.css";
import data from "./data.json";

function App() {
  return ( <div>
  <JobList />
  {/* <Job /> */}
  </div>
  )
}


function JobList() {
console.log(data)
}

// function Job({ data }) {
//   return <div>Test</div>;
// }

export default App;
