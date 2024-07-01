import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import CreateSetDataFetch from "../features/sets/CreateSetDataFetch";
import { PageTempContext } from "../context/PageTempContext";
import { AuthContext } from "../context/AuthContext";



const CreateSet = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { userId } = useContext(AuthContext);
  const headerNavArr = [
    {
      "className": "btn--outline-black",
      "btnText": "Dashboard",
      "to": `/dashboard/${userId}/`,
      "ariaLabel": "Dashboard Button. Click to return to the dashboard."
    }
  ];

  useEffect(() => {
    setHeaderNav(headerNavArr);
  }, []);


  return (
    <PageTemplate currentPage="createSetPage" >
      <CreateSetDataFetch />
    </PageTemplate>
  )
}

export default CreateSet;