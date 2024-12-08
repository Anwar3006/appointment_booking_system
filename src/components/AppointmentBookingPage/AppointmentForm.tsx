import React, { useState } from "react";
import { Form } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldTypes } from "../AuthPage/AuthCard";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAppointmentSchema } from "@/lib/formValidator";
import { Appointment } from "@/lib/AppwriteConfig/appwrite.types";
import SubmitButton from "../SubmitButton";
import { Doctors } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import { AppwriteAppointmentService } from "@/actions/appointment/AppwriteAppointmentService";

const AppointmentForm = ({
  type,
  userId,
  patient,
  appointment,
  setOpen,
}: {
  userId: string;
  patient: any;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const AppointmentFormValidation = getAppointmentSchema(type);
  // console.log(AppointmentFormValidation);
  // Zod Validation
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);
    console.log(values);

    let status: Status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create" && patient) {
        const appointmentData = {
          userId,
          patientId: patient.$id,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status,
          patients: [],
        };

        const appointment = await AppwriteAppointmentService.createAppointment(
          appointmentData
        );

        if (appointment) {
          form.reset();
          navigate(`/patients/${userId}/new-appointment/${appointment.$id}`);
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician || "",
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
            patients: appointment?.patients || [appointment?.patient],
          },
          type,
        };
        console.log("here");
        const updatedAppointment =
          await AppwriteAppointmentService.updateAppointment(
            appointmentToUpdate
          );
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`flex items-center w-full ${
        type === "create" && "mt-10"
      } mb-12`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          {type !== "cancel" && (
            <>
              {type === "create" && (
                <section className="mb-12 space-y-4">
                  <h1 className="header">New Appointment</h1>
                  <p className="text-dark-700">
                    Book an new appointment in just under 10 seconds.
                  </p>
                </section>
              )}
              {/* DOCTOR */}
              <CustomFormField
                fieldType={FormFieldTypes.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a doctor"
              >
                {Doctors.map((doctor, i) => (
                  <SelectItem key={doctor.name + i} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <img
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              {/* PICK APPOINTMENT DATE */}
              <CustomFormField
                fieldType={FormFieldTypes.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected Appointment Date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa"
              />

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldTypes.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason For Appointment"
                  placeholder="Enter reason for appointment"
                />

                <CustomFormField
                  fieldType={FormFieldTypes.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Notes"
                  placeholder="Enter any additional notes"
                />
              </div>
            </>
          )}

          {type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason For Cancellation"
              placeholder="Enter reason for cancellation"
            />
          )}

          <SubmitButton
            isLoading={isLoading}
            className={`${
              type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
            } w-full`}
          >
            {type === "cancel"
              ? "Cancel Appointment"
              : type === "create"
              ? "Book Appointment"
              : "Update Appointment"}
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};
export default AppointmentForm;
