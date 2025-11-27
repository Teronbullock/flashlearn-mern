import "./App.css";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
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
