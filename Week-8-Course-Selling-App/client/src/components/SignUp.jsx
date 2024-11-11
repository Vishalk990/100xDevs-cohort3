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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHandleSignUp } from "@/hooks/useHandleSignUp";
import axios from "axios";
import { CheckCircle, Eye, XCircle } from "lucide-react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
  });

  const [type, setType] = useState("password");
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);

  const { loading, handleSignup } = useHandleSignUp(formData, setFormData);

  useEffect(() => {
    async function checkUsername() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/user/check-username?userName=${formData.userName}`
        );

        setIsUsernameUnique(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    const id = setTimeout(checkUsername, 300);

    return () => clearTimeout(id);
  }, [formData.userName]);

  function handleInput(e) {
    setFormData(() => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Sign up
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create an account to start learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    className="border-blue-200 focus:ring-blue-400"
                    value={formData.firstName}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    className="border-blue-200 focus:ring-blue-400"
                    value={formData.lastName}
                    onChange={(e) => handleInput(e)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">
                  Username
                </Label>
                <Input
                  id="userName"
                  name="userName"
                  placeholder="john77"
                  required
                  className="border-blue-200 focus:ring-blue-400"
                  value={formData.userName}
                  onChange={(e) => handleInput(e)}
                />
                {formData.userName.length > 0 && (
                  <div
                    className={`flex items-center mt-1 text-sm ${
                      isUsernameUnique ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isUsernameUnique ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>Username is available</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-1" />
                        <span>Username is already taken</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  required
                  type="email"
                  className="border-blue-200 focus:ring-blue-400"
                  value={formData.email}
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
                    className="border-blue-200 focus:ring-blue-400 pr-10"
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
                type="submit"
                className={`w-full bg-blue-600 text-white hover:bg-blue-700 transition-opacity ${
                  loading ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }`}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Loading..." : "Create account"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
          <div className="text-xs text-gray-600">
            By signing up, you agree to our{" "}
            <div href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </div>{" "}
            and{" "}
            <div href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
