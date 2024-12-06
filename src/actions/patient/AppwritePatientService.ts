import { ID } from "node-appwrite";
import axiosClient from "../axios.config";
import PatientServiceInterface from "./PatientServiceInterface";
import { InputFile } from "node-appwrite/file";
import { database, storage } from "@/lib/AppwriteConfig/CustomClient";
import { parseStringify } from "@/lib/utils";

export const AppwritePatientService: PatientServiceInterface = {
  async createPatientCard({ identificationDocument, ...patient }) {
    try {
      let file;

      // console.log(patient);
      const BUCKET_ID = import.meta.env.VITE_PUBLIC_BUCKET_ID;
      const PUBLIC_ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
      const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

      if (identificationDocument) {
        const inputFile = InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("filename") as string
        );

        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      }

      const newPatientCard = await database.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_PATIENT_COLLECTION_ID,
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

  async getPateintCardById(id) {},

  async getPatientCardByQuery(query) {},
};
