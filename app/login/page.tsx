"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { SignIn } from "@/components/login/signin";

const Login = () => {
  return (
    <div className="flex h-[40rem] relative w-screen md:h-[60rem] justify-center items-center bg-banner-login bg-cover bg-center">
      <SignIn />
      <div className="gradient-banner" />
    </div>
  );
};

export default Login;
