import * as React from 'react';
import * as Pusher from 'pusher-js';
import axios from 'axios';
import { Card, Loader, Icon, Header, Statistic } from 'semantic-ui-react';
const currencyFormatter = require('currency-formatter');

import { store } from '../';
import { updateBTC } from '../actions';

import './styles/BitcoinTicker.scss';

export interface IBitcoinTickerProps {
    currencyPair?: string;
    animateOnUpdate?: boolean;
    showTimestamp?: boolean;
    onChange?: (order: any) => void;
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
        let subscribeString = this.props.currencyPair ? `live_trades_${this.props.currencyPair}` : `live_trades`;
        this.tradesChannel = this.socketBitStamp.subscribe(subscribeString);
    }

    componentWillMount() {
        // Initialize the price
        axios.get(`https://chain.so/api/v2/get_price/BTC`)
            .then(res => {
                const priceData = res.data.data.prices.find(data => {
                    return data.exchange === 'coinbase';
                });
                this.setState({ currentPrice: priceData.price, time: priceData.time }, () => {

                });
            });

        // Bind an event to the 'trade' event on the live_trades channel
        this.tradesChannel.bind('trade', data => {
            if (this.props.onChange && this.state.currentPrice !== data.price ) {
                this.props.onChange(data);
            }

            this.setState({ currentPrice: data.price, updating: true, time: parseInt(data.timestamp) }, () => {
                store.dispatch(updateBTC(data));
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

    renderTimestamp(showTimestamp: boolean, timeInUTC: number ): JSX.Element | null {
        if (showTimestamp && timeInUTC) {
            const dateTime = new Date(0);
            dateTime.setUTCSeconds(timeInUTC);
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
        const { updating, currencyPair, currentPrice, time } = this.state;
        const { showTimestamp } = this.props;

        const cssClasses = ['BitcoinTicker'];
        const timeStamp = this.renderTimestamp(showTimestamp, time);
        const iconName = !this.props.currencyPair ? 'bitcoin' : 'viacoin';

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
                            <Statistic.Label>1<Icon name={iconName} /></Statistic.Label>
                            <Statistic.Value>{currencyFormatter.format(currentPrice, { code: 'USD' })}</Statistic.Value>
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
