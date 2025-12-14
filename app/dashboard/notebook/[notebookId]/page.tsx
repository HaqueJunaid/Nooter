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
                    { label: notebook.name, href: `/dashboard/notebook/${notebook.id}` }
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
                { label: notebook.name, href: `/dashboard/notebook/${notebook.id}` }]}
        >

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">All Notes</h1>
                Create Notes
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-3">
                {notebook?.notes?.map((note) => (
                    <NoteCard note={note} notebookId={notebookId} />
                ))}
            </div>
        </PageWrapper>
    )
}

export default Notebook