import React, { useState } from "react";
import { Form, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PatientFormValidation } from "@/lib/formValidator";
import CustomFormField from "../CustomFormField";
import { FormFieldTypes } from "../AuthPage/AuthCard";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/lib/constants";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientService } from "@/actions/backendtype.config";
import { useNavigate } from "react-router-dom";

const RegisterPatientCard = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormValidation,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    try {
      let formData;
      if (
        values.identificationDocument &&
        values.identificationDocument?.length > 0
      ) {
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });

        formData = new FormData();
        formData.append("blobFile", blobFile);
        formData.append("fileName", values.identificationDocument[0].name);
      }
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        medicalHistory: values.medicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      console.log(patient);
      const newPatientCard = await PatientService?.createPatientCard(patient);
      if (newPatientCard) {
        navigate(`/patients/${user.$id}/new-appointment/${newPatientCard.$id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center w-full mt-10 mb-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Welcome 😊</h1>
            <p className="text-dark-700">Tell us more about yourself</p>
          </section>

          <section className="space-y-6">
            <h1 className="text-2xl font-semibold my-3 text-neutral-300">
              Personal Details
            </h1>
            {/* Name */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="name"
              label="Full Name"
              placeholder="Enter your name"
            />

            {/* Email & Phone */}
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
                fieldType={FormFieldTypes.PHONE_INPUT}
                name="phone"
                label="Phone Number"
              />
            </div>

            {/* Date of Birth & Gender */}
            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.DATE_PICKER}
                name="birthDate"
                label="Date of Birth"
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

            {/* Address & Occupation */}
            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="address"
                label="Home Address"
                placeholder="Enter your address"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="occupation"
                label="Occupation"
                placeholder="Enter your occupation"
              />
            </div>

            {/* Emergency Contact Name & Number */}
            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="Enter the name"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.PHONE_INPUT}
                name="emergencyContactNumber"
                label="Emergency Contact Number"
              />
            </div>
          </section>

          <section className="space-y-8">
            <h1 className="text-2xl font-semibold my-3 text-neutral-300">
              Medical Information
            </h1>
            {/* Primary Care Physician */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.SELECT}
              name="primaryPhysician"
              label="Primary Care Physician"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <img
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="id"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* Insurance Provider & Policy Number */}
            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="insuranceProvider"
                label="Insurance Provider"
                placeholder="Enter your insurance provider"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="insurancePolicyNumber"
                label="Insurance Policy Number"
                placeholder="Enter your insurance policy number"
              />
            </div>

            {/* Allergies & Current Medication */}
            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.TEXTAREA}
                name="allergies"
                label="Allergies(if any)"
                placeholder="Enter any allergies you have"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.TEXTAREA}
                name="currentMedication"
                label="Current Medication"
                placeholder="Enter any medication you are currently on(comma separated)"
              />
            </div>

            {/* Medical History & Past Medical History */}
            <div className="flex items-center justify-center w-full mt-8 gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.TEXTAREA}
                name="medicalHistory"
                label="Medical History"
                placeholder="Enter your personal history(comma separated)"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.TEXTAREA}
                name="familyMedicalHistory"
                label="Family Medical History"
                placeholder="Enter any family medical history(comma separated)"
              />
            </div>
          </section>

          <section className="space-y-8">
            <h1 className="text-2xl font-semibold my-3 text-neutral-300">
              Identification & Verification
            </h1>

            {/* Identification Type */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.SELECT}
              name="identificationType"
              label="Identification Type"
              placeholder="Select your Identification type"
            >
              {IdentificationTypes.map((id, i) => (
                <SelectItem key={i} value={id}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{id}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* Identification Number */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="identificationNumber"
              label="Identification Number"
              placeholder="Enter the identification number"
            />

            <CustomFormField
              fieldType={FormFieldTypes.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned Copy of Identification Document"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
              )}
            />
          </section>

          <section className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold mt-3 mb-1 text-neutral-300">
                Consent And Privacy
              </h1>
              <p className="text-neutral-400 text-sm">
                We use your information to provide personalized care and improve
                our services. Your data is always handled with the utmost
                confidentiality.
              </p>
            </div>

            <CustomFormField
              fieldType={FormFieldTypes.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="By checking this box, I consent to receive medical care and treatment from this institution/physician. I understand that my healthcare team will provide necessary diagnostic tests, procedures, and treatments as per my condition. I agree to the Treatment Consent."
            />
            <CustomFormField
              fieldType={FormFieldTypes.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I authorize this institution to share my health information with other healthcare providers, insurers, and relevant parties as necessary for my treatment, billing, or operational purposes, in accordance with applicable laws."
            />
            <CustomFormField
              fieldType={FormFieldTypes.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I have read and understood the Privacy Policy of this institution. I agree to the collection, storage, and use of my personal data as described."
            />
          </section>

          <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPatientCard;
