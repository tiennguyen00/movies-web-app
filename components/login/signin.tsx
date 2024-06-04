import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Link } from "lucide-react";
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

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const check = async () => {
    const loggedInUser = await getLoggedInUser();
    console.log(loggedInUser);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    const res = await signIn(email, password);
    console.log("Res:L: ", res);
    setIsLoading(false);
  };

  return (
    <Card className="z-10 py-12 px-12 w-[460px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Input
            placeholder="Email or mobile number"
            onChange={(v) => setEmail(v.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(v) => setPassword(v.target.value)}
          />
          <Button className="h-10 w-full" onClick={handleSignIn}>
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
      <CardFooter>
        <p className="leading-full text-xs text-foreground-smoke">
          This page is protected by Google reCAPTCHA to ensure youre not a bot.
          Learn more.
        </p>
      </CardFooter>
    </Card>
  );
};
