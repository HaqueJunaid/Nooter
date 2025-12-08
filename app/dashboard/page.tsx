
import { PageWrapper } from "@/components/page-wrapper"

const Dashboard = () => {
    return (
    <PageWrapper breadcrums={[{label: "dashboard", href: "/dashboard"}, {label: "home", href: "/"}]}>
      Dashboard
    </PageWrapper>
  )
}

export default Dashboard