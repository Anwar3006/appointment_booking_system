import { AppwriteAppointmentService } from "@/actions/appointment/AppwriteAppointmentService";
import columns from "@/components/AdminDashboardPage/Column";
import DataTable from "@/components/AdminDashboardPage/DataTable";
import StatCard from "@/components/AdminDashboardPage/StatCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<RecentAppointmentData>();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const allAppointments =
          await AppwriteAppointmentService?.getAppointmentList();

        if (allAppointments) {
          setAppointments(allAppointments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [appointments]);
  // console.log(appointments?.documents);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link to="/" className="cursor-pointer">
          <img
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Hey there Admin 😊</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount!}
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount!}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount!}
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {appointments && (
          <DataTable columns={columns} data={appointments?.documents!} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
