import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserFormValidation } from "@/lib/formValidator";
import CustomFormField from "../CustomFormField";
import { FormFieldTypes } from "../AuthPage/AuthCard";

const RegisterAppointmentCard = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({});

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {};

  return (
    <div className="flex items-center justify-start w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Welcome 😊</h1>
            <p className="text-dark-700">Tell us more about yourself</p>
          </section>

          <div className="max-w-[600px]">
            <h1 className="text-2xl font-semibold my-3 text-neutral-300">
              Personal Details
            </h1>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="name"
              label="Full Name"
              placeholder="Enter your name"
            />

            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="email"
                label="Email Address"
                placeholder="Enter your email"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.DATE_PICKER}
                name="birthDate"
                label="Date of Birth"
                placeholder="Select your date of birth"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.SKELETON}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GenderOptions.map((option, i) => (
                        <div key={option + i} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterAppointmentCard;
