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
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { LoaderIcon, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { createNotes } from "@/server/notes"


const formSchema = z.object({
    title: z.string().min(2).max(50),
})

const CreateNoteButton = ({notebookId}: {notebookId: string}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
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
            const response = await createNotes({
                ...values,
                notebookId,
                content: "",
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
            const err = error as Error
            toast.error(err?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default"><PlusIcon /> Create Note</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogDescription>
                        Add a new note to caputre your idea.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Note" {...field} />
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

export default CreateNoteButton