import { PageWrapper } from "@/components/page-wrapper";
import { getNotesById } from "@/server/notes";

type Params = Promise<{
    noteId: string;
}>

const page = async ({ params }: { params: Params }) => {
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

    const data = response.note[0];
    return (
        <PageWrapper
            breadcrums={[
            { label: "dashboard", href: "/dashboard" },
            { label: data.title, href: `/dashboard/note/${data.id}` }]}>
            {data.title}
        </PageWrapper>
    )
}

export default page