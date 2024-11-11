import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export function useHandleSignIn(formData, setFormData) {

    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    let tempObj;

    async function handleSignIn() {
        setLoading(true);
        tempObj = { ...formData };

        try {
            setFormData({
                identfier: "",
                password: "",
            });

            await new Promise((resolve) => setTimeout(resolve, 1500));
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                tempObj,
                { withCredentials: true }
            );

            if(response.status !== 200) {
                throw new Error("Failed to Sign in");
            }

            toast({
                title: "Success",
                description: response.data.message || "Sign in successfull",
                duration: 2000,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/home");

        } catch (error) {
            console.log(error);

            let errorMessage = "";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Something went wrong";
                console.log(error.response?.data?.message);

            }
            else
                errorMessage = error.message;

            setFormData(tempObj);
            toast({
                title: "Please try again!",
                description: errorMessage,
                variant: "destructive",
                duration: 4000,
            });
        } finally {
            setLoading(false);
        }
    }

    return { handleSignIn, loading };
}