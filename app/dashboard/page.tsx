import CreateNotebookButton from "@/components/create-notebook";
import { PageWrapper } from "@/components/page-wrapper"
import { getNotebooks } from "@/server/notebooks"
import NotebookCard from "@/components/notebook-card";

export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  const { success, allNotebooks } = await getNotebooks();

  if (!success || allNotebooks?.length === 0) {
    return (
      <PageWrapper breadcrums={[{ label: "dashboard", href: "/dashboard" }]}>
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
          <h2 className="text-2xl font-semibold">No Notebooks Found</h2>
          <CreateNotebookButton />
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper breadcrums={[{ label: "dashboard", href: "/dashboard" }]}>
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold">All Notebooks</h1>
        <CreateNotebookButton />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {allNotebooks?.map((notebook) => (
          <NotebookCard notebook={notebook} key={notebook.id} />
        ))}
      </div>

    </PageWrapper>
  )
}

export default Dashboard