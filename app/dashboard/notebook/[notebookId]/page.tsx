import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooksById } from "@/server/notebooks";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Trash } from "lucide-react";
import NoteCard from "@/components/note-card";
import CreateNoteButton from "@/components/create-note";
import { twMerge } from "tailwind-merge";

type Params = Promise<{
    notebookId: string;
}>

const Notebook = async ({ params }: { params: Params }) => {
    const { notebookId } = await params;

    const { success, notebook } = await getNotebooksById(notebookId);

    if (!success || !notebook) {
        return (
            <PageWrapper
                breadcrums={[
                    { label: "dashboard", href: "/dashboard" },
                    { label: "Notebook", href: `/dashboard/notebook/#` }
                ]}
            >
                Note not found
            </PageWrapper>
        )
    }
    return (
        <PageWrapper
            breadcrums={[
                { label: "dashboard", href: "/dashboard" },
                { label: notebook.name || "Notebook", href: `/dashboard/notebook/${notebook.id}` }]}
        >

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">All Notes</h1>
                <CreateNoteButton notebookId={notebookId} />
            </div>

            <div className={twMerge("relative mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3", `${notebook.notes.length === 0 && "min-h-[70vh]"}`)}>
                {notebook.notes.length === 0 && <h1 className="absolute left-1/2 top-1/2 -translate-1/2 border-2 text-nowrap rounded-md px-6 py-3 text-lg uppercase font-bold">No notes found</h1>}
                {notebook?.notes?.map((note) => (
                    <NoteCard note={note} notebookId={notebookId} key={note.id} />
                ))}
            </div>
        </PageWrapper>
    )
}

export default Notebook