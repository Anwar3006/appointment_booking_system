export default interface PatientServiceInterface {
  createPatientCard: (data: RegisterUserParams) => Promise<any>;

  getPatientCardById: (id: string) => Promise<any>;

  getPatientCardByEmail: (email: string) => Promise<any>;
}
