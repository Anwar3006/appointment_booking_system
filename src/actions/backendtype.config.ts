import { AppwritePatientService } from "./patient/AppwritePatientService";
import PatientServiceInterface from "./patient/PatientServiceInterface";
import { AppwriteUserService } from "./user/AppwriteUserService";
import { UserService } from "./user/UserInterface";

/* If we have other implementations of the user service, we can add them here
 * Using the ternary operator to switch to the other implementation by replacing the null with that implementation
 */
const BACKEND_TYPE = "appwrite"; // or "springboot"

export const UserServiceEnv: UserService | null =
  BACKEND_TYPE === "appwrite" ? AppwriteUserService : null;

export const PatientService: PatientServiceInterface | null =
  BACKEND_TYPE === "appwrite" ? AppwritePatientService : null;
