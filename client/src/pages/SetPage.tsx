import SetDataFetch from "../features/sets/SetDataFetch";
import PageTemplate from "../layouts/PageComponents/PageTemplate";

const Set = () => {
  return (
    <PageTemplate currentPage="setPage">
      <SetDataFetch />
    </PageTemplate>
  )
}

export default Set;