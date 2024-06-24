import { useState } from "react";
import PageTemplate from "../layouts/PageComponents/PageTemplate";
import CardEditPageForm from "../components/Forms/CardAddEditForm";


const CardAddEditPage = () => {

  return (
    <PageTemplate currentPage="editCardPage">
      <section className="container py-12 lg:max-w-screen-lg">
        <CardEditPageForm formType='edit' />
      </section>
    </PageTemplate>
  );
};

export default CardAddEditPage;