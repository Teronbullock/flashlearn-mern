import { useEffect, useContext, useState } from "react";
import PageTemplate from "../components-layouts/PageComponents/PageTemplate";
import DashboardForm from "../components/Forms/DashboardForm";
import axios from "axios";
import { DashboardSetData } from "./routes-types";
import { AuthContext } from "../context/AuthContext";


const Dashboard = () => {
  const { userId } = useContext(AuthContext);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    ( async () => {
      const res = await axios.get(`api/sets/${userId}`);
      const { rows, message } = res.data;

      // check if the response is successful
      if (res.status !== 200) {
        console.error(res.status, message);
        return;
      } 

      setSets(rows);
      console.log(`Res: api/sets/${userId} :`, res.data, res.status);
    
    })();

  },[userId]);

  return (
    <PageTemplate 
      currentPage={'dashboardPage'}
    >
      <section className="container py-12">
        { sets.length > 0 && sets.map((setData: DashboardSetData) => {
          return (
          <DashboardForm formData={setData} key={setData.ID} />
          )
        })
        }
      </section>
    </PageTemplate>
  )
}

export default Dashboard;