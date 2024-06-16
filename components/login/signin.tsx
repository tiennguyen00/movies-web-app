import {
  getLoggedInUser,
  onValidateUser,
  signIn,
  signUp,
} from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { formSchema } from "@/lib/actions/schema";
import { useFormState, useFormStatus } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

const initialState = {
  errors: {
    email: undefined,
    password: undefined,
  },
  message: undefined,
};

const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button className="h-10 w-full" type="submit">
      {pending || isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Sign In"
      )}
    </Button>
  );
};

export const SignIn = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }),
    onSuccess: (res) => {
      if (res.status !== 200) {
        toast({
          title: "Error",
          description: res.statusText,
          variant: "destructive",
        });
        return;
      }
    },
    onError: (err) => {
      console.log("error: ", err);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [state, formAction] = useFormState(onValidateUser, initialState);

  useEffect(() => {
    if (state?.errors.email) {
      form.setError("email", { message: state?.errors.email[0] });
    } else {
      form.clearErrors("email");
    }
    if (state?.errors.password) {
      form.setError("password", { message: state?.errors.password[0] });
    } else {
      form.clearErrors("password");
    }

    if (state === null) {
      mutate({
        email: form.getValues("email"),
        password: form.getValues("password"),
      });
    }
  }, [form, state, state?.errors]);

  return (
    <Card className="z-10 pt-16 sm:py-12 px-1 sm:px-12 w-[460px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form action={formAction}>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Email or mobile number" {...field} />
                )}
              />
              {form.formState.errors.email?.message && (
                <p className="text-xs w-full text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Password" type="password" {...field} />
                )}
              />
              {form.formState.errors.password?.message && (
                <p className="w-full text-xs text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}

              <SubmitButton isPending={isPending} />
              <p>OR</p>
              <Button variant="secondary" className="h-10 w-full">
                Use a Sign-In Code
              </Button>
              <Button variant="link" className="text-white">
                <p className="text-sm">Forgot password?</p>
              </Button>
              <div className="w-full flex items-center space-x-2">
                <Checkbox />
                <p className="text-sm">Remember me</p>
              </div>
              <div className="text-sm flex w-full">
                <p className="mr-1">New to Netflix?{"  "}</p>
                <Link href="/" className="font-bold">
                  Sign up now.
                </Link>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
      <CardFooter>
        <p className="leading-full text-xs text-foreground-smoke">
          This page is protected by Google reCAPTCHA to ensure youre not a bot.
          Learn more.
        </p>
      </CardFooter>
    </Card>
  );
};
