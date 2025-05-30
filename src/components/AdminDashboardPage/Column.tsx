"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "./StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/lib/constants";
import AppointmentModal from "./AppointmentModal";

const columns: ColumnDef<any>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patients",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patients?.[0];
      return (
        <p className="text-14-medium">{patient?.name || "No Patient Found"}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <img
            src={doctor?.image}
            alt={doctor?.name}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={row.original.patients.$id}
            userId={row.original.userId}
            appointment={row.original}
            title="Schedule Appointment"
            description="Please confirm the following details to schedule"
          />
          <AppointmentModal
            type="cancel"
            patientId={row.original.patients.$id}
            userId={row.original.userId}
            appointment={row.original}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];

export default columns;
