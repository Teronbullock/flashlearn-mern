import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import ManageSetData from "../features/sets/ManageSetData";
import  { PageTempContext } from "../context/PageTempContext";


const Dashboard = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { userId } = useParams();
  const headerNavArr = [
    {
      "className": "btn--tertiary",
      "btnText": "Create Set",
      "to": `/set/user/${userId}/create`,
      "ariaLabel": "Create Set Button. Click to create a new set of flashcards."
    }
  ];

  useEffect(() => {
    setHeaderNav(headerNavArr);
  }, []);

  return (
    <PageTemplate currentPage={'dashboardPage'} >
      <ManageSetData />
    </PageTemplate>
  )
}

export default Dashboard;