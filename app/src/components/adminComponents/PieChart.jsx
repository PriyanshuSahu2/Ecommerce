import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE","#fd3807","#51f307"];

const style = {
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  lineHeight: "24px",
  textAlign: "center",
};

export default function CustomPieChart({ data }) {
  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={80}
          outerRadius={120}
          paddingAngle={5}
          dataKey="totalSales" // Use "totalSales" as the dataKey
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={COLORS[index % COLORS.length]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize="14"
              >
                {data[index]._id} {/* Use "_id" as the Legend name */}
              </text>
            );
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          layout="horizontal"
          verticalAlign="bottom"
          wrapperStyle={style}
          formatter={(value, payload) => payload.payload._id} // Use payload to access the data
        />
      </PieChart>
    </div>
  );
}
