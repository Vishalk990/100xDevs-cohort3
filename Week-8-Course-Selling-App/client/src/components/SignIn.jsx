import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHandleSignIn } from "@/hooks/useHandleSignIn";
import { Eye } from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [type, setType] = useState("password");

  function handleInput(e) {
    setFormData(() => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  }

  const { loading, handleSignIn } = useHandleSignIn(formData, setFormData);

  return (
    <div className="grid grid-cols-12 gap-4 px-4">
      <div className="col-span-6 bg-perano-600 my-4 rounded-xl"></div>
      <div className="grid col-span-6 place-items-center border border-black min-h-[95vh] bg-perano-50 px-4 rounded-xl my-4">
        <Card className="w-full max-w-md border border-black">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold font-inter text-center text-perano-600">
              Sign in
            </CardTitle>
            <CardDescription className="text-center font-nunito text-gray-600">
              Enter your details to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid gap-4 font-nunito">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email or Username
                  </Label>
                  <Input
                    id="email"
                    name="identifier"
                    placeholder="email or firstName"
                    required
                    value={formData.identifier}
                    type="text"
                    className="border-perano-200 focus:ring-perano-400"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      required
                      type={type}
                      className="border-perano-200 focus:ring-perano-400 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInput(e)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      aria-label="Toggle password visibility"
                      onClick={() =>
                        setType((prev) =>
                          prev === "password" ? "text" : "password"
                        )
                      }
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <Button
                  type="button"
                  className={`w-full bg-perano-600 text-white hover:bg-perano-700 transition-opacity ${
                    loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }`}
                  disabled={loading}
                  onClick={handleSignIn}
                  aria-busy={loading}
                >
                  {loading ? "Loading..." : "Sign In"}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2 font-nunito">
            <div className="text-sm font-bold text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-perano-600 hover:underline">
                Sign up
              </Link>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-perano-600 hover:underline"
            >
              Forgot password?
            </Link>
          </CardFooter>
        </Card>
        <div className="">Or login with</div>
        <div className="flex items-center border border-black min-w-80 gap-12">
          <Button
            type="button"
            className={`w-full bg-perano-600 text-white hover:bg-perano-700 transition-opacity ${
              loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={loading}
            // onClick={handleSignIn}
            aria-busy={loading}
          >
            {loading ? "Loading..." : "Google"}
          </Button>
          <Button
            type="button"
            className={`w-full bg-perano-600 text-white hover:bg-perano-700 transition-opacity ${
              loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={loading}
            // onClick={handleSignIn}
            aria-busy={loading}
          >
            {loading ? "Loading..." : "Apple"}
          </Button>
        </div>
      </div>
    </div>
  );
}
