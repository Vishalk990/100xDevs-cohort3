import { useRef } from "react";
import { Button } from "./Button";
import { useState } from "react";

export const Otp = ({ number }) => {
  const [disabled, setDisabled] = useState(true);


  return (
    <div className="flex justify-center">
    

      <Button disabled={disabled}>Sign Up</Button>
    </div>
  );
};

function SubOtpBox({ reference, onDone }) {
  return (
    <div>
      <input
        ref={reference}
        onChange={(e) => onDone()}
        type="text"
        className="m-1 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none px-4 text-white"
      />
    </div>
  );
}
