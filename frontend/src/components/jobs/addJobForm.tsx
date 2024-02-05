import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

import DatePicker from "./datePicker";

import * as React from "react";
import { useJobsContext } from "../../hooks/useJobsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function AddJobForm() {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [date, setDate] = React.useState<Date>();
  const [companyName, setCompanyName] = React.useState<string>("");
  const [position, setPosition] = React.useState<string>("");
  //   TO DO: Add error message displays
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a job");
      return;
    }

    const jobApplication = {
      companyName,
      position,
      appliedDate: date,
      status: "Applied",
    };

    const apiURL = import.meta.env.VITE_API_URL + "/api/jobs";
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(jobApplication),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("Error", json.message);
      setError(json.message);
    }
    if (response.ok) {
      setError("");
      setCompanyName("");
      setPosition("");
      setDate(new Date());
      console.log("New Job Added", json);
      dispatch({ type: "CREATE_JOB", payload: json.job });
      toast("New Job Added", {
        description: `${position} at ${companyName}`,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Application</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Enter the details of your job application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <Input
              id="companyName"
              className="col-span-3"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Position
            </Label>
            <Input
              id="position"
              className="col-span-3"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position" className="text-right">
              Applied Date
            </Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Job
          </Button>
        </DialogFooter>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Complete all fields before submitting.
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
