import React from "react";
import { Bar, BarChart, Tooltip, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import './chart.scss';

const Chart = ({ data }) => {
    //  console.log(data)

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" height={50}/>
                <Bar dataKey="completed" className="completed-bar"/>
                <Bar dataKey="active" className="active-bar"/>
            </BarChart>
        </ResponsiveContainer>
    )
};
export default Chart;