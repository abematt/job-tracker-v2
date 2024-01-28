import "./App.css";
import Navbar from "./components/ui/Navbar";
import { useEffect, useState } from "react";
import DemoPage from "./components/jobs/jobPage";
import { useJobsContext } from "./hooks/useJobsContext";
import { Card } from "@/components/ui/card";

import BasicStatCards from "./components/stats/components/basicStats";
import BarGraph from "./components/stats/components/BarGraph";

import {
  countApplicationsToday,
  calculatePercentageChange,
  calculateAverageEntriesPerDay,
  countOaAndApplied,
  countRejections,
  countOffers,
  calculateOfferPercentage,
} from "./components/stats/components/utils/statCalculation";
import { set } from "date-fns";

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

  const { jobs, dispatch } = useJobsContext();
  const [jobStats, setJobStats] = useState({});

  // const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/jobs");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_JOBS", payload: json.jobs });
        }
      } catch (error) {
        console.error("There was error fetching job");
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs) {
      const jobsByToday = countApplicationsToday(jobs);
      const percentageChange = calculatePercentageChange(jobs);
      const numberOfApplications = jobs.length;
      const averageApplicationsPerDay = calculateAverageEntriesPerDay(jobs);
      const numberOfRejections = countRejections(jobs);
      const numberOfOaAndApplied = countOaAndApplied(jobs);
      const numberOfOffers = countOffers(jobs);
      const offerPercentage = calculateOfferPercentage(jobs);
      setJobStats((prevStats) => ({
        ...prevStats,
        jobsByToday,
        percentageChange,
        numberOfApplications,
        averageApplicationsPerDay,
        numberOfRejections,
        numberOfOaAndApplied,
        numberOfOffers,
        offerPercentage,
      }));
    }
  }, [jobs]);

  return (
    <>
      <Navbar />
      <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-6">
        <div className="row-span-2 col-span-4 lg:col-span-1 lg:row-span-1">
          <BasicStatCards stats={jobStats} />
        </div>
        <div className="row-span-2 col-span-4 lg:col-span-3 lg:row-span-2">
          <Card>{jobs && <DemoPage data={jobs} />}</Card>
        </div>
        <div className="row-span-2 col-span-4 lg:col-span-1 lg:row-span-1">
          {/* <BarGraph /> */}
        </div>
      </div>
    </>
  );
}

export default App;
