export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  medicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/publicMedia/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/publicMedia/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/publicMedia/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/publicMedia/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/publicMedia/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/publicMedia/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/publicMedia/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/publicMedia/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/publicMedia/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/publicMedia/assets/icons/check.svg",
  pending: "/publicMedia/assets/icons/pending.svg",
  cancelled: "/publicMedia/assets/icons/cancelled.svg",
};
