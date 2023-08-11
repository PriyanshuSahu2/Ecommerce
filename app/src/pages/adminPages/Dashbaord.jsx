import React, { useEffect, useState } from "react";
import Chart from "../../components/adminComponents/Chart";
import styled from "@emotion/styled";
import LabelData from "../../components/adminComponents/LabelData";
import PieChart from "../../components/adminComponents/PieChart";
import HeaderComponent from "../../components/HeaderComponent";
import { userRequest } from "../../requestMethod";
import SidebarComponents from "../../components/adminComponents/SidebarComponents";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 1200px;
  display: flex;
`;
const Left = styled.div``;
const Right = styled.div`
  margin-left: 20px;
`;
const SectionHeading = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-bottom: 30px;
`;

const ChartSection = styled.div`
  margin-bottom: 50px;
`;

const PieChartContainer = styled.div`
  display: flex;
`;

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await userRequest("sales/stats");
        console.log(response.data);
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.log(`AllProductSection ${err}`);
      }
    };
    getStats();
  }, []);
  return (
    <Container>
      <HeaderComponent />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Wrapper>
          <Left>
            <SidebarComponents />
          </Left>
          <Right>
            {" "}
            <SectionHeading>Dashboard</SectionHeading>
            <DataContainer>
              <LabelData
                label="Sales"
                value={"$" + stats.totalIncome}
                to={"/admin/"}
              />
              <LabelData
                label="Users"
                value={stats.totalUsers}
                to={"/admin/users"}
              />
              <LabelData
                label="Orders"
                value={stats.totalOrders}
                to={"/admin/orders"}
              />
            </DataContainer>
            <ChartSection>
              <SectionHeading>Sales</SectionHeading>
              <Chart data={stats?.totalIncomeByMonth} />
            </ChartSection>
            <ChartSection>
              <SectionHeading>Categories And Brands</SectionHeading>
              <PieChartContainer>
                <PieChart data={stats?.salesByCategories} />
                <PieChart data={stats?.salesByBrands} />
              </PieChartContainer>
            </ChartSection>
          </Right>
        </Wrapper>
      )}
    </Container>
  );
};

export default Dashboard;
