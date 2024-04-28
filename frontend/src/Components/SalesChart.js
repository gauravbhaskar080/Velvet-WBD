import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const SalesChart = ({ data,yDateKey = 'sales' }) => {
    return (
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fill: '#482121' }} />
        <YAxis tick={{ fill: '#482121' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={yDateKey} stroke="#482121" />
      </LineChart>
    );
  };
  
  export default SalesChart;
  