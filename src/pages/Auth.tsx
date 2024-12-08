import AuthCard from "@/components/AuthPage/AuthCard";

const Auth = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Auth Form Goes Here */}
      <div className="w-1/2 h-full flex items-center justify-between flex-col py-8 px-16">
        {/* Logo */}
        <div className="flex items-center justify-start w-full">
          <img src="/assets/icons/logo-full.svg" alt="h-10 w-fit" />
        </div>

        {/* Auth Form */}
        <AuthCard />

        {/* footer */}
        <div>
          <p className="text-xs font-extralight text-white/50">
            © {new Date().getFullYear()} All rights reserved -{" "}
            <span className="text-neutral-500">CuriousFellow</span>{" "}
          </p>
        </div>
      </div>

      {/* Image Goes Here */}
      <div className="w-1/2 h-full">
        <img
          src="/assets/images/onboarding-img.png"
          alt="Onboarding"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default Auth;
