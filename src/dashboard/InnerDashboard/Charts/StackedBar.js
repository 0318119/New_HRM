// import "./styles.css";
import { Flex } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "2001 - 2002",
    male: 4000,
    female: 2400,
    amt: 2400
  },
  {
    name: "2001 - 2002",
    male: 3000,
    female: 1398,
    amt: 2210
  },
  {
    name: "2001 - 2002",
    male: 2000,
    female: 9800,
    amt: 2290
  },
  {
    name: "2001 - 2002",
    male: 2780,
    female: 3908,
    amt: 2000
  },
  {
    name: "2001 - 2002",
    male: 1890,
    female: 4800,
    amt: 2181
  },
  {
    name: "2001 - 2002",
    male: 2390,
    female: 3800,
    amt: 2500
  },
  {
    name: "2001 - 2002",
    male: 3490,
    female: 4300,
    amt: 2100
  }
];  

export default function StackedBar() {
  return (
    <>
    
    <BarChart
      width={400}
      height={165}
      data={data}
      margin={{
        top: 20,
        right: 60,
        // left: 20,
        bottom: 5
      }}
     
    >
      
      <CartesianGrid strokeDasharray="0 0" />
      <XAxis dataKey="name" style={{fontSize:10}} />
      <YAxis  style={{fontSize:10}} />
      <Tooltip />
      <Legend />
       <Bar dataKey="male" stackId="a" fill="#77e4d4" style={{fontSize:10}}  />
       <Bar dataKey="female" stackId="a" fill="#E48900" style={{fontSize:10}} />
    </BarChart>
    </>
  );
}
