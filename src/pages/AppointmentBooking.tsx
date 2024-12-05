import { UserServiceEnv } from "@/actions/backendtype.config";
import RegisterAppointmentCard from "@/components/AppointmentBookingPage/RegisterAppointmentCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AppointmentBooking = () => {
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

  //   console.log(user);
  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4 h-screen flex flex-col items-center justify-between px-10 py-8">
        {/* Logo */}
        <div className="flex items-center justify-start w-full">
          <img
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            className="h-10 w-fit"
          />
        </div>

        <RegisterAppointmentCard />

        {/* footer */}
        <div>
          <p className="text-xs font-extralight text-white/50">
            © {new Date().getFullYear()} All rights reserved -{" "}
            <span className="text-neutral-500">CuriousFellow</span>{" "}
          </p>
        </div>
      </div>

      <div className="w-1/3 h-screen">
        <img
          src="/assets/images/register-img.png"
          alt="Registration"
          className="w-full object-cover h-full"
        />
      </div>
    </div>
  );
};

export default AppointmentBooking;
