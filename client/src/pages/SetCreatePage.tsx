import PageTemplate from "../layouts/PageComponents/PageTemplate";
import CreateSetDataFetch from "../features/sets/CreateSetDataFetch";



const CreateSet = () => {
  return (
    <PageTemplate currentPage="createSetPage" >
      <CreateSetDataFetch />
    </PageTemplate>
  )
}

export default CreateSet;