import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useHandleSignUp(formData, setFormData) {

    const { toast } = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const validateForm = (data) => {
        if (!data.firstName.trim()) return "First name is required";
        if (!data.lastName.trim()) return "Last name is required";
        if (!data.email.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Invalid email format";
        if (!data.password.trim()) return "Password is required";
        if (data.password.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    async function handleSignup() {

        const tempObj = { ...formData };
        try {
            setLoading(true);

            const validationError = validateForm(formData);
            if (validationError) {
                throw new Error(validationError);
            }
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                userName: "",
            });

            await new Promise((resolve) => setTimeout(resolve, 1500));
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                tempObj
            );

            // console.log(response.data.message);
            // console.log(response.data.userId);

            toast({
                title: "Success",
                description: response.data.message || "Account created successfully",
                duration: 2000,
            });
            navigate("/signin");

        } catch (error) {

            setFormData(tempObj);
            let errorMessage = "";
            if (error instanceof AxiosError)
                errorMessage = error.response.data?.error || "Something went wrong";
            else
                errorMessage = error.message;

            toast({
                title: "Please try again!",
                description: errorMessage,
                variant: "destructive",
                duration: 4000,
            });
        }
        finally {
            setLoading(false);
        }
    }

    return { handleSignup, loading };
}