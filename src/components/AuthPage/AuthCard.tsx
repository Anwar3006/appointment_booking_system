import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserFormValidation } from "@/lib/formValidator";
import CustomFormField from "../CustomFormField";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserServiceEnv } from "@/actions/backendtype.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AppwritePatientService } from "@/actions/patient/AppwritePatientService";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const AuthCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = (query: string) => {
    const url = new URLSearchParams(query);
    return {
      admin: url.get("admin"),
    };
  };

  const { admin } = getQueryParams(location.search);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    const { name, email, phone } = values;
    try {
      //check if patient with email already exists
      const patient = await AppwritePatientService.getPatientCardByEmail(email);
      if (patient) {
        navigate(`/patients/${patient.userId}/new-appointment`);
        return;
      }
      const user = await UserServiceEnv?.createUser({ name, email, phone });

      //set the user id in the url and navigate to /patient
      if (user) {
        navigate(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Sign Up to Schedule an Appointment</p>
          </section>

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Snow"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="winterSoldier@snowcity.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldTypes.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(233) 123-4567"
          />

          <div className="flex items-center justify-between gap-6">
            <div className="w-2/3">
              <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
            </div>

            <div>
              <Link
                to="/auth/?admin=true"
                className="text-sm text-emerald-600 rounded-lg bg-white/90 px-4 py-2"
              >
                Admin
              </Link>
              {admin && <Modal />}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthCard;
