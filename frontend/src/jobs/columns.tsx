"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Job = {
  _id: string;
  companyName: string;
  position: string;
  status: "applied" | "rejected" | "callback" | "oa" | "offer";
  appliedDate: string;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => { 
      const badgeColor = row.getValue("status") === "Applied" ? "bg-cyan-500" : row.getValue("status") === "Rejected" ? "bg-red-500" : row.getValue("status") === "Callback" ? "bg-green-500" : row.getValue("status") === "OA" ? "bg-yellow-500" : "purple"
      console.log(badgeColor)
      return <Badge variant="outline" className={`px-4 text-left mr-8 align-middle ${badgeColor}`}>{row.getValue("status")}</Badge>;
    }
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => {
      return <div className="px-4 text-left align-middle">{row.getValue("companyName")}</div>
    }
  },
  {
    accessorKey: "position",
    header: "Position",
    cell : ({row}) => { 
      return <div className="text-left align-middle">{row.getValue("position")}</div>
    }
  },
  {
    accessorKey: "appliedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applied Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("appliedDate"));
      const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return <div className="px-6 text-left align-middle">{formatted}</div>

    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original
      // {console.log(job)}
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job._id)}
            >
              Copy Job ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];