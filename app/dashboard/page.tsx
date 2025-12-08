import CreateNotebookButton from "@/components/create-notebook";
import Notebooks from "@/components/Notebooks"
import { PageWrapper } from "@/components/page-wrapper"
import { getNotebooks } from "@/server/notebooks"

const Dashboard = async () => {
    const response = await getNotebooks();
    console.log(response);

    return (
    <PageWrapper breadcrums={[{label: "dashboard", href: "/dashboard"}, {label: "home", href: "/"}]}>
      <h1>Notebooks</h1>

      <CreateNotebookButton />

      {response.success && response?.allNotebooks?.map((notebook) => (
        <div key={notebook.id}>{notebook.name}</div>
      ))}
      {response.success && response?.allNotebooks?.length === 0 && (
        <div>No notebook found</div>
      )}

    </PageWrapper>
  )
}

export default Dashboard