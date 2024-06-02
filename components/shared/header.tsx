import React from "react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="header">
      <Logo ratio={0.5} />
      <div className="header-auth">
        <Button variant="default" asChild>
          <Link href={"/login"} className="text-md !font-bold">
            Sign In
          </Link>
        </Button>
      </div>
    </header>
  );
};