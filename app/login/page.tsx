import { Header } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Login = () => {
  return (
    <div className="flex h-[40rem] relative w-screen md:h-[60rem] justify-center items-center bg-banner-login bg-cover bg-center">
      {/* <img src="/images/banner-login.png" /> */}
      <div className="flex flex-col items-center space-y-12">
        <p className="text-6xl font-bold">
          Unlimited movies, TV shows and more
        </p>
        <p className="text-2xl font-bold">Watch anywhere. Cancel anytime</p>
        <p className="text-2xl font-bold">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="flex w-[75%] min-w-[460px] h-16 space-x-8 items-center">
          <Input placeholder="Email" className="h-full text-2xl" />
          <Button size="lg" className="h-16 text-2xl">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
