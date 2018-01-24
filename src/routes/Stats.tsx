import * as React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from 'recharts';

interface IStatsProps {}

interface IStatsState {}

export default class Stats extends React.Component<IStatsProps, IStatsState> {
    render() {
        const data = [
            { name: 'pageA', value: 400 },
            { name: 'pageB', value: 300 },
            { name: 'pageC', value: 300 },
            { name: 'pageD', value: 200 },
            { name: 'pageE', value: 350 },
            { name: 'pageF', value: 100 }
        ];
        return (
            <div className="Stats">
               Stats
               <div>
               <LineChart width={600} height={300} data={data}>
                 <Line type="monotone" dataKey="value" stroke="#8884d8" />
                 <CartesianGrid stroke="#ccc" />
                 <XAxis dataKey="name" />
                 <YAxis />
                </LineChart>
               </div>
            </div>
        );
    }
}
