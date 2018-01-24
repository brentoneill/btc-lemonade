import * as React from 'react';
import * as Pusher from 'pusher-js';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';

interface IStatsProps {
    btcToUSD?: any;
    btcUpdatedAt?: any;
}

interface IStatsState {
    data?: {
        btcUSD?: number;
        updatedTime?: any;
    }[]
}

class Stats extends React.Component<IStatsProps, IStatsState> {

    public socket;
    private _tradesChannel;

    constructor(props: IStatsProps) {
        super();

        // TODO: Remove and use the app wide state
        // Create the socket
        this.socket = new Pusher('de504dc5763aeef9ff52');

        // TODO: Init with some data from the order book
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        // Subscribe to BTC trades
        this._tradesChannel = this.socket.subscribe('live_trades');
        // Bind an event to the 'trade' event on the live_trades channel
        this._tradesChannel.bind('trade', tradeData => {
            // console.log(data);

            // Create a new array as copy of data
            let data = this.state.data.slice();

            // Add the new piece of info
            data.push({
                btcUSD: tradeData.price,
                updatedTime: tradeData.timestamp
            });

            this.setState({ data });
        });
    }

    componentWillUnmount() {
        this.socket.unsubscribe('live_trades');
        this.socket.disconnect();
    }

    componentWillReceiveProps(nextProps: IStatsProps) {

    }

    render() {
        const { data } = this.state;

        return (
            <div className="Stats">
               Stats
               <div>
               <LineChart width={600} height={300} data={data}>
                 <Line type="monotone" dataKey="btcUSD" stroke="#8884d8" />
                 <CartesianGrid stroke="#ccc" />
                 <XAxis dataKey="updatedTime" />
                 <YAxis />
                 <Tooltip />
                </LineChart>
               </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        btcToUSD: state.dash.btcToUSD,
    };
};

export default connect(mapStateToProps)(Stats);
