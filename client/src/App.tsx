import "./App.css";

import { Header } from "@components/layout/header";
import { Footer } from "@components/layout/footer";
import { AppRoutes } from "@/routes/AppRoutes";

const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
