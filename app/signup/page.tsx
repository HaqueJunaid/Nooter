import { SignUpForm } from "@/components/forms/sign-up-form"
import { Notebook } from "lucide-react"
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata  = {
  title: "Nooter | Signup",
  description: "Create your account",
};

export default function SignUp() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 overflow-hidden">
      <div className="bg-muted h-screen relative hidden lg:block">
        <img
          src="/auth.png"
          alt="Image"
          className="object-cover object-center aspect-square"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Notebook className="size-4" />
            </div>
            Nooter
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}
