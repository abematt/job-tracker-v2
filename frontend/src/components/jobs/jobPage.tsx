import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Toaster } from "@/components/ui/sonner"


type Job = {
  _id: string
  companyName: string
  position: string
  status: "applied" | "rejected" | "callback" | "oa" | "offer"
  appliedDate: string
}

type DemoPageProps = {
    data: Job[];
};
  

export default function DemoPage({data}:DemoPageProps) {


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Toaster/>
    </div>
  );
}