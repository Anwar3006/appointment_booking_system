import { ID, Query } from "node-appwrite";

import PatientServiceInterface from "./PatientServiceInterface";
import { InputFile } from "node-appwrite/file";
import { database, storage } from "@/lib/AppwriteConfig/CustomClient";
import { parseStringify } from "@/lib/utils";

const BUCKET_ID = import.meta.env.VITE_PUBLIC_BUCKET_ID;
const PUBLIC_ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const PATIENT_COLLECTION_ID = import.meta.env.VITE_PATIENT_COLLECTION_ID;

export const AppwritePatientService: PatientServiceInterface = {
  async createPatientCard({ identificationDocument, ...patient }) {
    try {
      //check if patient already exists, if yes then return it
      const patientExists = await this.getPatientCardByEmail(patient.email);
      if (patientExists) {
        return parseStringify(patientExists);
      }

      let file;

      if (identificationDocument) {
        const inputFile = InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("filename") as string
        );

        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      }

      const newPatientCard = await database.createDocument(
        DATABASE_ID,
        PATIENT_COLLECTION_ID,
        ID.unique(),
        {
          identificationDocumentId: file?.$id || null,
          identificationDocumentUrl: `${PUBLIC_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...patient,
        }
      );

      return parseStringify(newPatientCard);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPatientCardById(id) {
    try {
      const patient = await database.listDocuments(
        DATABASE_ID,
        PATIENT_COLLECTION_ID,
        [Query.equal("userId", id)]
      );

      return parseStringify(patient.documents[0]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getPatientCardByEmail(email: string) {
    try {
      const patient = await database.listDocuments(
        DATABASE_ID,
        PATIENT_COLLECTION_ID,
        [Query.equal("email", email)]
      );

      console.log(patient.documents);
      if (patient.documents && patient.documents.length > 0) {
        return parseStringify(patient.documents[0]);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
