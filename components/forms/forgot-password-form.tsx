"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { useState } from "react"
import { LoaderIcon } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
  email: z.email(),
})

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function handlePasswordReset(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const {error} = await authClient.requestPasswordReset({email: values.email, redirectTo: "/reset-password"});
      
      if (!error) {
        toast.success("Varification email send successfully.")
      } else {
        toast.error("Failed to send email. Try again.")
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePasswordReset)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Forgot your password</h1>
            <p className="text-muted-foreground w-3/4 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jon@doe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoaderIcon className="animate-spin" /> : "Request rest link"}
            </Button>
            <Link className="text-center font-normal hover:underline" href={"/login"}>Back to login</Link>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  )
}
