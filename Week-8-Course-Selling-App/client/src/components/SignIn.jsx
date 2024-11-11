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
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Sign in
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your details to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-4">
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
                  className="border-blue-200 focus:ring-blue-400"
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
                type="button"
                className={`w-full bg-blue-600 text-white hover:bg-blue-700 transition-opacity ${
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
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
