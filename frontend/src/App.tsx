import './App.css'
import Navbar from './components/ui/Navbar'
import { useEffect, useState } from "react";
import DemoPage from './jobs/jobPage';

function App() {
  type Job = {
    appliedDate: string;
    companyName: string;
    createdAt: string;
    position: string;
    status: "applied" | "rejected" | "callback" | "oa" | "offer";
    updatedAt: string;
    __v: number;
    _id: string;
  };
  

  const [jobs, setJobs] = useState<Job[]>([])
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/jobs");
        const json = await response.json();

        if (response.ok) {
          console.log(json)
          setJobs(json.jobs);
        }
      } catch (error) {
        console.error("There was error fetching job");
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
     <Navbar />
     {jobs && <DemoPage data={jobs}/>}
    </>
  )
}

export default App
