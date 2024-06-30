import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import AddCard from "../features/cards/AddCard";
import CardDataFetch from "../features/cards/CardDataFetch";
import  { PageTempContext } from "../context/PageTempContext";


const CardAddEditPage = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { action, setId } = useParams();


  const headerNavArr = [
    {
      "className": "btn--outline-black",
      "btnText": "View Set",
      "to": `/set/${setId}/`,
      "ariaLabel": "Dashboard Button. Click to return to the dashboard."
    }
  ];

  useEffect(() => {
    setHeaderNav(headerNavArr);
  }, []);

  if(action === 'add') {
    return (
      <PageTemplate currentPage="addCardPage">
        <AddCard />
      </PageTemplate>
    );
  } else if (action === 'edit') {
    return (
      <PageTemplate currentPage="editCardPage">
        <CardDataFetch />
      </PageTemplate>
    );
  }
};

export default CardAddEditPage;