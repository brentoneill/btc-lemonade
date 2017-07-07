import * as React from 'react';
import * as Pusher from 'pusher-js';
import axios from 'axios';
import { Card, Loader, Icon, Header, Statistic } from 'semantic-ui-react';
const currencyFormatter = require('currency-formatter');

import { store } from '../';
import { updateBTC } from '../actions';

import './styles/BitcoinTicker.scss';

export interface IBitcoinTickerProps {
    currencyPair?: string; // ltcusd or btcusd
    animateOnUpdate?: boolean;
    showTimestamp?: boolean;
    onChange: (orderData: any) => void;
}

export interface IBitcoinTrackerState {
    currencyPair?: string;
    currentPrice?: number;
    updating?: boolean;
    // time is epoch
    time?: number;
}

export default class BitcoinTicker extends React.Component<IBitcoinTickerProps, IBitcoinTrackerState> {

    public socketBitStamp;
    private tradesChannel;

    constructor(props: IBitcoinTickerProps) {
        super(props);
        this.state = {
            updating: false
        };

        // BitStamp socket
        this.socketBitStamp = new Pusher('de504dc5763aeef9ff52');

        let subscribeString: string;
        if (this.props.currencyPair === 'btcusd') {
            subscribeString = 'live_trades';
        } else {
            subscribeString = `live_trades_${this.props.currencyPair}`;
        }

        this.tradesChannel = this.socketBitStamp.subscribe(subscribeString);
    }

    componentWillMount() {
        const { currencyPair } = this.props;
        // Initialize the price
        axios.get(`http://api.coindesk.com/v1/bpi/currentprice.json`)
            .then(res => {
                if (res && res.data) {
                    console.log(res)
                    const price = res.data.bpi.USD.rate_float;
                    const timestamp = res.data.time.updated;
                    const data = { price, timestamp }

                    this.props.onChange(data);
                    this.setState({ currentPrice: price, time: timestamp });
                }
            });

        // Bind an event to the 'trade' event on the live_trades channel
        this.tradesChannel.bind('trade', data => {
            if (this.props.onChange && this.state.currentPrice !== data.price ) {
                this.props.onChange(data);
            }

            this.setState({ currentPrice: data.price, updating: true, time: parseInt(data.timestamp) }, () => {
                setTimeout(() => {
                    this.setState({ updating: false });
                }, 1500);
            });
        });
    }

    componenetWillUnMount() {
        this.socketBitStamp.disconnect();
    }

    componentWillReceiveProps(nextProps: IBitcoinTickerProps) {
        let currencyPair;
        if (nextProps.currencyPair) {
            this.setState({ currencyPair });
        }
    }

    renderTimestamp(showTimestamp: boolean, time: number | string ): JSX.Element | null {
        if (showTimestamp && time) {
            const dateTime = new Date(time as string);
            return (
                <div>
                    <Icon name={'refresh'} />
                    <small className="BitcoinTicker--time"><i>Updated at {dateTime.toLocaleTimeString()}</i></small>
                </div>

            );
        } else {
            return null;
        }
    }

    render(): JSX.Element {
        const { updating, currentPrice, time } = this.state;
        const { showTimestamp, currencyPair } = this.props;

        const cssClasses = ['BitcoinTicker'];
        const timeStamp = this.renderTimestamp(showTimestamp, time);

        let iconName;
        switch (currencyPair) {
            case 'ltcusd':
                iconName = 'viacoin';
                break;
            default:
            case 'btcusd':
                iconName = 'bitcoin';
                break;
        }

        let card: JSX.Element;

        if (updating) {
            cssClasses.push('BitcoinTicker__updating');
        }

        if (!currentPrice) {
            card = (
                <Card fluid>
                    <Card.Content>
                        <Loader active>
                            Loading...
                        </Loader>
                    </Card.Content>
                </Card>
            );
        } else {
            card = (
                <Card fluid>
                    <Card.Content>
                        <Statistic color="blue">
                            <Statistic.Value>{currencyFormatter.format(currentPrice, { code: 'USD' })}</Statistic.Value>
                            <Statistic.Label>1<Icon name={iconName} /></Statistic.Label>
                        </Statistic>
                    </Card.Content>
                    <Card.Content extra>
                        {timeStamp}
                    </Card.Content>
                </Card>
            );
        }

        return (
            <div className={cssClasses.join(' ')}>
                {card}
            </div>
        );
    }
}
