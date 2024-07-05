import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import useManageSetData from "../hooks/useManageSetData";
import ListCardForm from "../components/Forms/ListCardForm";
import  { PageTempContext } from "../context/PageTempContext";
import { SetDataConfig } from "../types/pages-types";


const Dashboard = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { userId } = useParams();
  const { sets, handleSubmit } = useManageSetData();

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
      <section className="container py-12">
        { sets.length > 0 && sets.map((setData: SetDataConfig) => {
          const { title, description, cardCount, ID } = setData;

          return (
            <ListCardForm
              key={ID}
              id={ID}
              title={title}
              description={description}
              cardCount={cardCount}
              onSubmit={handleSubmit}
              listType={'set'}
              btnOneTo={`/set/${ID}`}
              btnTwoTo={`/set/${ID}/edit`}
            />
          )
        })}
      </section>
    </PageTemplate>
  )
}

export default Dashboard;