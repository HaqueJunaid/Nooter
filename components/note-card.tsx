'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Edit, LoaderIcon, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { deleteNotebookById } from "@/server/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import Link from 'next/link';

interface NotebookCardProps {
    note: {
        id: string;
        title: string;
    };
    notebookId: string
}

const NoteCard = ({ note }: NotebookCardProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await deleteNotebookById(note.id);
            toast.success("Notebook deleted successfully");
            router.refresh();
        } catch {
            toast.error("Failed to delete notebook");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-[25rem] dark:hover:border-neutral-600 hover:border-neutral-600 duration-300 ease-in-out cursor-pointer">
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                {/* <CardDescription>
                    No of notes: {JSON.stringify(note.length)}
                </CardDescription> */}
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex-row gap-2 justify-end">
                <Link href={`/dashboard/notebook/${note.id}`}>
                    <Button variant={"outline"} className="flex gap-2 items-center justify-center" disabled={isLoading}>
                    Edit
                    <Edit className="size-4" />
                </Button>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex gap-2 items-center justify-center" disabled={isLoading}>
                            {!isLoading && <Trash className="size-4" /> && "Delete"}
                            {isLoading && <LoaderIcon className="size-4 animate-spin" />}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will delete the "{note.title}".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>
                                <Button onClick={handleClick}>Continue</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}

export default NoteCard