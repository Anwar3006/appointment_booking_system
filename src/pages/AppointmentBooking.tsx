import { PatientService } from "@/actions/backendtype.config";
import AppointmentForm from "@/components/AppointmentBookingPage/AppointmentForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AppointmentBooking = () => {
  const { userId } = useParams();
  const [patient, setPatient] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const getPatient = await PatientService?.getPatientCardById(userId!);

        if (getPatient) {
          setPatient(getPatient);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPatient();
  }, [userId]);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-8 px-10">
          {/* Logo */}
          <div className="flex items-center justify-start w-full mb-12">
            <img
              src="/assets/icons/logo-full.svg"
              alt="Logo"
              className="h-10 w-fit"
            />
          </div>

          {/* Appointment Form */}
          {patient ? (
            <AppointmentForm
              type="create"
              userId={userId!}
              patient={patient}
              setOpen={setOpen}
            />
          ) : (
            <div className="flex items-center gap-4 h-screen">
              <img
                src="/assets/icons/loader.svg"
                alt="loader"
                height={54}
                width={54}
                className="animate-spin"
              />
              <p className="text-2xl">Please wait</p>
            </div> // Optional: Add a loading state or spinner
          )}

          {/* footer */}
          <div>
            <p className="text-xs font-extralight text-white/50">
              © {new Date().getFullYear()} All rights reserved -{" "}
              <span className="text-neutral-500">CuriousFellow</span>{" "}
            </p>
          </div>
        </div>
      </section>

      <img
        src="/assets/images/appointment-img.png"
        alt="Registration"
        className="max-w-[400px] object-cover hidden h-full md:block"
      />
    </div>
  );
};

export default AppointmentBooking;
