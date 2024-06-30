import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import SetDataFetch from "../features/sets/SetDataFetch";
import { PageTempContext } from "../context/PageTempContext";
import { AuthContext } from "../context/AuthContext";

const EditSet = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { userId } = useContext(AuthContext);
  const { action, setId } = useParams();
  let headerNavArr = [];

  console.log('EditSet Page', useParams());
  if (action === 'edit') {
    headerNavArr = [
      {
        "className": "btn--outline-black mr-6",
        "btnText": "View Set",
        "to": `/set/${setId}/`,
        "ariaLabel": "View Set Button. Click to view the current set."
      },
      {
        "className": "btn--outline-black",
        "btnText": "Dashboard",
        "to": `/dashboard/${userId}/`,
        "ariaLabel": "Dashboard Button. Click to return to the dashboard."
      }
    ];
  } else if (action === 'create') {

    headerNavArr = [
      {
        "className": "btn--outline-black",
        "btnText": "Dashboard",
        "to": `/dashboard/${userId}/`,
        "ariaLabel": "Dashboard Button. Click to return to the dashboard."
      }
    ];
  }



  useEffect(() => {
    setHeaderNav(headerNavArr);
  }, []);

    return (
      <PageTemplate currentPage="editSetPage" >
      <SetDataFetch />
    </PageTemplate>
    )
}

export default EditSet;