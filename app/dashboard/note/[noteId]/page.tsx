import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { getNotesById } from "@/server/notes";

type Params = Promise<{
    noteId: string;
}>

const page = async ({ params }: { params: Params }) => {
    const { noteId } = await params;
    const response = await getNotesById(noteId);
    console.log("response", response.note);

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

    const data = response.note[0];
    return (
        <PageWrapper
            breadcrums={[
            { label: "dashboard", href: "/dashboard" },
            { label: data.title, href: `/dashboard/note/${data.id}` }]}>
            {data.title}
            <RichTextEditor noteId={noteId} content={response?.note[0]?.content as String} />
        </PageWrapper>
    )
}

export default page