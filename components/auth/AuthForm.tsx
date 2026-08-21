"use client";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Phone, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const authSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number with country code.",
  }),
});

type AuthSchemaType = z.infer<typeof authSchema>;

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: AuthSchemaType) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        phone: data.phone.trim(),
        name: data.name.trim(),
      });

      if (result?.error) {
        setErrorMessage(result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        router.push("/chat");
        router.refresh();
      } else {
        setErrorMessage("Unable to sign in. Please try again.");
        setIsLoading(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || "An unexpected error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={<User className="w-4 h-4" />}
        error={errors.name?.message}
        {...register("name")}
      />

      <InputField
        label="Phone Number"
        placeholder="+15551234567"
        type="number"
        leftIcon={<Phone className="w-4 h-4" />}
        error={errors.phone?.message}
        {...register("phone")}
      />

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full gap-2 py-3 shadow-lg shadow-primary/25 mt-2"
        isLoading={isLoading}
      >
        Continue to Chat <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}
