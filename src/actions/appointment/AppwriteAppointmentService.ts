import { database, messaging } from "@/lib/AppwriteConfig/CustomClient";
import AppointmentServiceInterface from "./AppointmentServiceInterface";
import { ID, Query } from "node-appwrite";
import { formatDateTime, parseStringify } from "@/lib/utils";
import { Navigate } from "react-router-dom";

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const APPOINTMENT_COLLECTION_ID = import.meta.env
  .VITE_APPOINTMENT_COLLECTION_ID;

export const AppwriteAppointmentService: AppointmentServiceInterface = {
  async createAppointment(data) {
    try {
      data["patients"] = [data.patientId];

      const newAppointment = await database.createDocument(
        DATABASE_ID,
        APPOINTMENT_COLLECTION_ID,
        ID.unique(),
        data
      );

      return parseStringify(newAppointment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getAppointmentById(id) {
    try {
      const appointment = await database.getDocument(
        DATABASE_ID,
        APPOINTMENT_COLLECTION_ID,
        id
      );
      return parseStringify(appointment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getAppointmentList() {
    try {
      const appointmentDocs = await database.listDocuments(
        DATABASE_ID,
        APPOINTMENT_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      const initialCount = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };
      const counts = appointmentDocs.documents.reduce((acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }

        return acc;
      }, initialCount);

      const data = {
        totalCount: appointmentDocs.total,
        ...counts,
        documents: appointmentDocs.documents,
      };

      return parseStringify(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async updateAppointment({ appointment, appointmentId, type }) {
    try {
      const updatedAppointment = await database.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
      );

      if (!updatedAppointment) {
        throw new Error("Appointment not found");
      }

      // Send a notification to the user
      const smsMessage = `
        Hi, it's CarePulse,
        ${
          type === "scheduled"
            ? `Your appointment has been scheduled successfully for ${
                formatDateTime(updatedAppointment.date).dateTime
              } with Dr. ${updatedAppointment.primaryPhysician}.`
            : `We regret to inform you that your appointment has been cancelled. Reason: ${updatedAppointment.cancellationReason}.`
        }`;
      await this.sendSMSNotification(updatedAppointment.userId, smsMessage);

      // window.location.reload();
      Navigate({ to: "/admin/dashboard" });
      return parseStringify(updatedAppointment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async sendSMSNotification(userId: string, content: string) {
    try {
      const message = await messaging.createSms(
        ID.unique(),
        content,
        [],
        [userId]
      );
    } catch (error) {
      console.log(error);
    }
  },
};
