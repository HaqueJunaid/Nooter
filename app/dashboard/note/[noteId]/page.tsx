import { PageWrapper } from "@/components/page-wrapper";
import { getNotesById } from "@/server/notes";

type Params = Promise<{
    noteId: string;
}>

const page = async ({ params }: { params: Params }) => {
    const { noteId } = await params;
    const { note } = await getNotesById(noteId);
    let data = note[0];
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