import { ForgotForm } from "@/components/forms/forgot-password-form"
import { Notebook } from "lucide-react"

export default function ForgotPassword() {
  return (
     <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="border-2 px-10 py-8 rounded-xl flex w-full max-w-md flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Notebook className="size-4" />
          </div>
          Nooter
        </a>
        <ForgotForm />
      </div>
    </div>
  )
}
