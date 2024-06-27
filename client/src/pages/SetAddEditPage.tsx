import PageTemplate from "../layouts/PageComponents/PageTemplate";
import SetDataFetch from "../features/sets/SetDataFetch";

const EditSet = () => {
    return (
      <PageTemplate currentPage="editSetPage" >
      <SetDataFetch />
    </PageTemplate>
    )
}

export default EditSet;