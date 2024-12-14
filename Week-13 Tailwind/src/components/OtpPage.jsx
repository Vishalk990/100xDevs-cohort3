import { useState } from "react";
import { Button } from "./Button";
import { MonitorDot } from "lucide-react";
import { useRef } from "react";

export const OtpPage = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="border border-white flex flex-col items-center justify-center py-20 gap-4 px-16 font-inter">
      <h1 className="text-white text-4xl py-8">
        <div className="flex justify-center items-center">
          <MonitorDot />
          <span className="ml-2 font-semibold text-green-400">Webinar</span>.gg
        </div>
      </h1>
      <h3 className="text-4xl font-medium tracking-tight text-white my-4">
        Check Your Email For a Code
      </h3>
      <p className="text-blue-200">
        Please enter the verification code sent to your email id
        prabgleen@gmail.com
      </p>
      <Otp number={6} setDisabled={setDisabled} />
      <div className="mx-20">
        <Button disabled={disabled} setDisabled={setDisabled}>
          Verify
        </Button>
      </div>
    </div>
  );
};

export const Otp = ({ number, setDisabled }) => {
  const refs = useRef([]);

  const isFilled = () => {
    const isComplete = refs.current.every((input) => input?.value.length === 1);
    setDisabled(!isComplete);
  };

  const handleChange = (index, e) => {
    const {value} = e.target;

    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value && index < number - 1) {
      refs.current[index + 1]?.focus();
    }

    isFilled();
  };

  const handleKeydown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center">
      {Array(number)
        .fill(1)
        .map((_, index) => (
          <SubOtpBox
            key={index}
            reference={(el) => (refs.current[index] = el)}
            type="text"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeydown(index, e)}
          />
        ))}
    </div>
  );
};

function SubOtpBox({ type, reference, onChange, onKeyDown }) {
  return (
    <div>
      <input
        ref={reference}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type}
        className="m-1 w-[45px] h-[50px] rounded-xl bg-blue-600 focus:outline-none px-4 text-white"
      />
    </div>
  );
}
