import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


export default function Chart({ data }) {
  return (
    <AreaChart
      width={850}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="totalIncome"
        stroke="#8884d8"
        fill="#8884d8"
        max={200}
      />
    </AreaChart>
  );
}
