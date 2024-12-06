import { PatientFormDefaultValues } from "@/lib/constants";

export default interface PatientServiceInterface {
  createPatientCard: (data: RegisterUserParams) => Promise<any>;

  getPateintCardById: (id: string) => Promise<any>;
  getPatientCardByQuery: (query: string) => Promise<any>;
}
