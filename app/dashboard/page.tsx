import CreateNotebookButton from "@/components/create-notebook";
import { PageWrapper } from "@/components/page-wrapper"
import { getNotebooks } from "@/server/notebooks"

const Dashboard = async () => {
    const response = await getNotebooks();
    console.log(response);

    const rows = (response as any)?.data ?? [];

    // Group notes by notebook id from the flat join rows
    const notebooksMap = new Map<string, { id: string; name: string; notes: any[] }>();
    rows.forEach((row: any) => {
        const notebook = row?.notebooks;
        const note = row?.notes;
        if (!notebook) return;

        if (!notebooksMap.has(notebook.id)) {
            notebooksMap.set(notebook.id, { id: notebook.id, name: notebook.name, notes: [] });
        }

        if (note) {
            notebooksMap.get(notebook.id)!.notes.push(note);
        }
    });

    const notebooks = Array.from(notebooksMap.values());

    return (
    <PageWrapper breadcrums={[{label: "dashboard", href: "/dashboard"}]}>

      {response.success && notebooks.length === 0 && (
        <div>No notebook found</div>
      )}

    </PageWrapper>
  )
}

export default Dashboard