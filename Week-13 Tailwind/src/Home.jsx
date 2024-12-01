import { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { MonitorDot } from "lucide-react";

export const Home = () => {
  const [val, setVal] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = (value) => {
    setVal(val);
    setDisabled(value.trim() === "");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 px-16 font-inter">
      <h1 className="text-white text-4xl py-8">
        <div className="flex justify-center items-center">
          <MonitorDot />
          <span className="ml-2 text-green-400">Webinar</span>.gg
        </div>
      </h1>
      <h3 className="text-xl text-white my-4">Verify Your Age</h3>
      <p className="text-blue-200">
        Please confirm your birth year. This data will not be stored
      </p>
      <Input
        type="text"
        placeholder={"Your birth year"}
        onChange={handleChange}
      />
      <Button disabled={disabled} setDisabled={setDisabled}>
        Continue
      </Button>
    </div>
  );
};
