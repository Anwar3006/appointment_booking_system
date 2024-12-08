export default interface AppointmentServiceInterface {
  createAppointment: (data: CreateAppointmentParams) => Promise<any>;

  getAppointmentById: (id: string) => Promise<any>;

  getAppointmentList: () => Promise<any>;

  updateAppointment: (data: UpdateAppointmentParams) => Promise<any>;
}
