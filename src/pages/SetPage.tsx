import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ManageCardData from "../features/cards/ManageCardData";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import  { PageTempContext } from "../context/PageTempContext";
import { AuthContext } from "../context/AuthContext";


const Set = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { userId } = useContext(AuthContext);
  const { setId } = useParams();

  const headerNavArr = [
    {
      "className": "btn--tertiary mr-6",
      "btnText": "Add Card",
      "to": `/set/${setId}/card/add`,
      "ariaLabel": "Add Card Button. Click to add a new flashcard to this set."
    },
    {
      "className": "btn--outline-black mr-6",
      "btnText": "View Cards",
      "to": `/set/${setId}/cards/?page=1`,
      "ariaLabel": "View Cards Button. Click to view all flashcards in this set."
    },
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
    <PageTemplate currentPage="setPage">
      <ManageCardData />
    </PageTemplate>
  )
}

export default Set;