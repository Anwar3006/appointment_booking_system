import { UserServiceEnv } from "@/actions/backendtype.config";
import RegisterPatientCard from "@/components/RegisterPatientPage/RegisterPatientCard";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PatientRegistration = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      const response = await UserServiceEnv?.getUserById(userId as string);

      if (response?.data) {
        setUser(response?.data);
      }
    };

    getUser();
  }, [userId]);

  return (
    <div className="flex items-center justify-center">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-8 px-10">
          {/* Logo */}
          <div className="flex items-center justify-start w-full">
            <img
              src="/assets/icons/logo-full.svg"
              alt="Logo"
              className="h-10 w-fit"
            />
          </div>

          {user ? (
            <RegisterPatientCard user={user} />
          ) : (
            <div className="flex items-center gap-4 h-screen">
              <img
                src="/assets/icons/loader.svg"
                alt="loader"
                height={54}
                width={54}
                className="animate-spin"
              />
              <p className="text-2xl">Please wait</p>
            </div> // Optional: Add a loading state or spinner
          )}

          {/* footer */}
          <div>
            <p className="text-xs font-extralight text-white/50">
              © {new Date().getFullYear()} All rights reserved -{" "}
              <span className="text-neutral-500">CuriousFellow</span>{" "}
            </p>
          </div>
        </div>
      </section>

      {/* <div className="w-1/3 h-screen"> */}
      <img
        src="/assets/images/register-img.png"
        alt="Registration"
        className="max-w-[400px] object-cover h-full"
      />
      {/* </div> */}
    </div>
  );
};

export default PatientRegistration;
