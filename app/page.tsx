import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24 pt-0">
      <div className="relative flex justify-center items-center bg-banner-login bg-center bg-cover w-screen min-h-[512px] sm:h-[512px] md:h-[700px] 0">
        <div className="flex z-10 flex-col items-center space-y-2 md:space-y-6 translate-y-12">
          <p className="text-center text-3xl md:text-4xl lg:text-5xl font-bold">
            Unlimited movies, TV shows and more
          </p>
          <p className="text-lg text-center md:text-2xl">
            Watch anywhere. Cancel anytime
          </p>
          <p className="text-lg text-center md:text-2xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="flex flex-col md:flex-row w-[75%] md:min-w-[460px] h-12 space-y-2 md:space-y-0 md:space-x-2 items-center">
            <Input placeholder="Email address" className="h-full " />
            <Button
              size="lg"
              className="h-12 w-full md:w-fit py-2 text-xl md:text-2xl"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/80 from-20% via-transparent via-50% to-black/80 to-80%" />
      </div>
    </main>
  );
}
