import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNotebooksById } from "@/server/notebooks";
import { getNotesById } from "@/server/notes";

type Params = Promise<{
    noteId: string;
}>

const Note = async ({ params }: { params: Params }) => {
    const { noteId } = await params;
    const response = await getNotesById(noteId);

    if (!response.success || !response.note || response.note.length === 0) {
        return (
            <PageWrapper
                breadcrums={[
                    { label: "dashboard", href: "/dashboard" },
                    { label: "Note not found", href: `/dashboard/note/${noteId}` },
                ]}
            >
                Note not found
            </PageWrapper>
        )
    }

    const {notebook} = await getNotebooksById(response?.note[0].notebookId);

    const data = response.note[0];
    return (
        <PageWrapper
            breadcrums={[
            { label: "dashboard", href: "/dashboard" },
            { label: notebook?.name || "notebook", href: `/dashboard/notebook/${data.notebookId}` },
            { label: data.title, href: `/dashboard/notebook/${data.notebookId}/note/${data.id}` }]}
            >
            {data.title}
            <div className="max-w-7xl">
            <RichTextEditor content={data.content || {}} />
            </div>
        </PageWrapper>
    )
}

export default Note