import {
  getLoggedInUser,
  onSubmitUser,
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { formSchema } from "@/lib/actions/schema";
import { useFormState } from "react-dom";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const initialState = {
    errors: {
      email: undefined,
      password: undefined,
    },
    message: undefined,
  };

  const check = async () => {
    const loggedInUser = await getLoggedInUser();
    console.log(loggedInUser);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const [state, formAction] = useFormState(onSubmitUser, initialState);

  useEffect(() => {
    if (state?.errors.email) {
      form.setError("email", { message: state?.errors.email[0] });
    }
    if (state?.errors.password) {
      form.setError("password", { message: state?.errors.password[0] });
    }
  }, [form, state?.errors]);

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

              <Button className="h-10 w-full" type="submit">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
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
