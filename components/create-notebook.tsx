'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createNotebook } from "@/server/notebooks"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { LoaderIcon } from "lucide-react"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    name: z.string().min(2).max(50),
})

const CreateNotebookButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const userId = (await authClient.getSession()).data?.user?.id;

        if (!userId) {
            toast.error("User not found");
            return;
        }

        try {
            const response = await createNotebook({
                ...values,
                userId: userId as string,
            });
            if (response.success) {
                form.reset();
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Notebook</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Notebook</DialogTitle>
                    <DialogDescription>
                        Create a new notebook to organize your notes.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Notebook" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>{isLoading ? <LoaderIcon className="animate-spin" /> : "Create"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNotebookButton