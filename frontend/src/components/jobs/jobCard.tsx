//@ts-nocheck

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "./datePicker";
import * as React from "react";
import { useJobsContext } from "../../hooks/useJobsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function JobCard({ job }) {
  const { dispatch } = useJobsContext();
  const { user } = useAuthContext();
  const [date, setDate] = React.useState<Date>(job.appliedDate);
  const [companyName, setCompanyName] = React.useState<string>("");
  const [position, setPosition] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [loading,setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      return;
    }

    const jobApplication = {
      ...(companyName && { companyName }),
      ...(position && { position }),
      ...(date && { appliedDate: date }),
      ...(status && { status }),
    };

    const apiURL = import.meta.env.VITE_API_URL + `/api/jobs/${job._id}`;
    const response = await fetch(apiURL, {
      method: "PATCH",
      body: JSON.stringify(jobApplication),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("Error", json.message);
    }
    if (response.ok) {
      setLoading(false);
      setCompanyName("");
      setPosition("");
      setDate(new Date());
      setStatus("");
      dispatch({ type: "UPDATE_JOB", payload: json.job });
      toast("Job Details Updated");
    }
  };
  return (
    <>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Job Application</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Job Application</DialogTitle>
            <DialogDescription>
              Make updates to your Job application
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Company
              </Label>
              <Input
                id="companyName"
                placeholder={job.companyName}
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
                placeholder={job.position}
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Job Status
              </Label>
              <Select onValueChange={(e) => setStatus(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={job.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="OA">OA</SelectItem>
                  <SelectItem value="Callback">Callback</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>

      </Dialog>
      
    </>
  );
}
