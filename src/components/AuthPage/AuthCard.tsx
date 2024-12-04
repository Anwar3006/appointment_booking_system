import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserFormValidation } from "@/lib/formValidator";
import CustomFormField from "../CustomFormField";
import { Form } from "../ui/form";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

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
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    console.log(values);
  }

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

          <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default AuthCard;
