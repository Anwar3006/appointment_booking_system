import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import { decryptKey, encryptKey } from "@/lib/utils";

const Modal = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    window !== undefined ? localStorage.getItem("adminKey") : null;

  useEffect(() => {
    console.log(path);
    const decryptedKey = encryptedKey && decryptKey(encryptedKey);

    // const queryParams = new URLSearchParams(search);
    if (path) {
      if (decryptedKey === ADMIN_KEY) {
        setOpen(false);
        navigate("/admin/dashboard");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey, path]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === ADMIN_KEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("adminKey", encryptedKey);
      setOpen(false);
      navigate("/admin/dashboard");
    } else {
      setError("Invalid Passkey");
    }
  };

  const closeModal = () => {
    setOpen(false);
    navigate("/auth");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <img
              src="/assets/icons/close.svg"
              alt="close"
              height={24}
              width={24}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* OTP input */}
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {" "}
              {error}{" "}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
