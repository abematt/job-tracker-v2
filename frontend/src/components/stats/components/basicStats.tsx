//@ts-nocheck

import { Card } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function BasicStatCards({ stats }) {
  const today = format(new Date(), "MMM dd");
  console.log(stats);

  return (
    <Card className="h-full p-4">
      <div className="flex flex-row justify-between">
        <p className="text-xl font-medium">{today}</p>
      </div>
      <Card className="p-6 my-4">
        <div className="flex flex-row justify-between">
          <p className="text-base">Total Number Of Offers</p>
        </div>
        <div className="flex flex-row">
          <div className="text-2xl font-bold">
            <Badge className="mb-1 bg-green-500">{stats.numberOfOffers}</Badge>
          </div>
        </div>
        <div className="flex flex-row">
          <p className="text-xs font-light">
            {stats.offerPercentage} % conversion rate
          </p>
        </div>
      </Card>
      <Card className="p-6 my-4">
        <div className="flex flex-row justify-between">
          <p className="text-base">Applications Today</p>
        </div>
        <div className="flex flex-row">
          <p className="text-2xl font-bold">{stats.jobsByToday}</p>
        </div>
        <div className="flex flex-row">
          <div className="text-xs font-light">
            {stats.percentageChange === -100
              ? ""
              : stats.percentageChange < 0
              ? `${Math.abs(stats.percentageChange)}% less than last day`
              : stats.percentageChange > 0
              ? `${stats.percentageChange}% more than last day`
              : "Same as yesterday"}
          </div>
        </div>
      </Card>
      <Card className="p-6 mt-4">
        <div className="flex flex-row justify-between">
          <p className="text-base">Total Applications</p>
        </div>
        <div className="flex flex-row">
          <p className="text-2xl font-bold">{stats.numberOfApplications}</p>
        </div>
        <div className="flex flex-row">
          <p className="text-xs font-light">
            Averaging {stats.averageApplicationsPerDay} applications per day
          </p>
        </div>
      </Card>
      <Card className="p-6 mt-4">
        <div className="flex flex-row justify-between">
          <p className="text-base">Active Applications</p>
        </div>
        <div className="flex flex-row">
          <p className="text-2xl font-bold">{stats.numberOfOaAndApplied}</p>
        </div>
        <div className="flex flex-row">
          <p className="text-xs font-light">
            {stats.numberOfRejections} Rejections
          </p>
        </div>
      </Card>
    </Card>
  );
}
