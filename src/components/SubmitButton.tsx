import React from "react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className || "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <img
            src="/assets/icons/loader.svg"
            alt="loader"
            height={24}
            width={24}
            className="animate-spin"
          />
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
