import { AppwriteAppointmentService } from "@/actions/appointment/AppwriteAppointmentService";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookingSuccess = () => {
  const { userId, appointmentId } = useParams();

  const [appointment, setAppointment] = useState<CreateAppointmentParams>();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const getAppointment =
          await AppwriteAppointmentService?.getAppointmentById(appointmentId!);

        if (getAppointment) {
          setAppointment(getAppointment);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  // Get the Doctor
  const doctor = Doctors.find(
    (doc) => doc.name == appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <div className="flex items-center justify-center w-full mb-12">
          <img
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            className="h-10 w-fit"
          />
        </div>

        <section className="flex flex-col items-center">
          <img
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={280}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We'll be in touch shortly to confirm your appointment</p>
        </section>

        <section className="request-details">
          <p>Requested appointment booked:</p>
          <div className="flex items-center gap-3">
            <img
              src={doctor?.image}
              alt="doctor"
              width={24}
              height={24}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <img
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment?.schedule!).dateTime}</p>
          </div>
        </section>

        <div className="flex items-center justify-between space-x-10">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link to={`/patients/${userId}/new-appointment`}>
              Create New Appointment
            </Link>
          </Button>

          <Button asChild>
            <Link to={`/auth`}>Exit</Link>
          </Button>
        </div>

        {/* footer */}
        <div>
          <p className="text-xs font-extralight text-white/50">
            © {new Date().getFullYear()} All rights reserved -{" "}
            <span className="text-neutral-500">CuriousFellow</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
