import * as React from 'react';
import {connect} from 'react-redux';
import Pusher from 'pusher-js';

import {addBlock} from '../actions/index';
import {convertFromSatoshi, convertToSatoshi, convertUSDtoBTC, converBTCtoUSD} from '../util';
import BitcoinTicker from './BitcoinTicker';

// socket io things

function onOpen(evt, socket) {
    console.info('connection open on: ', evt.target.url);
    // Pings to keep the connection open
    setupPing(socket);
    // Subscribes to all new blocks
    sendMessage({'op': 'blocks_sub'}, socket);
    // Subscribes to a wallet address
    // sendMessage({'op': 'addr_sub', 'addr': '1A828tTnkVFJfSvLCqF42ohZ51ksS3jJgX'}, socket);
}

function setupPing(socket) {
    const msg = {'op': 'ping'};
    sendMessage(msg, socket);
    setInterval(function() {
        sendMessage(msg, socket);
    }, 15000);
}

function onError(evt) {
    console.log('error: ', evt);
}

function onClose(evt) {
    console.log('connection closed: ', evt );
}

function onMessage(message) {
    console.log('received message: ', JSON.parse(message.data));
}

function sendMessage(message, socket) {
    message = JSON.stringify(message);
    socket.send(message);
}

import './styles/main';

interface IAppProps {
    price?: any;
    blocks?: any;
    updating?: boolean;
}

interface IAppState {
    blocks?: any[];
    updating?: boolean;
    fetchPrices?: Function;
}

export default class App extends React.Component<IAppState, IAppProps> {

    private socketBlockhainInfo;

    constructor(props) {
        super(props);
        this.state = {
            blocks: [],
            updating: false
        };

        // Blockhain.info socket
        const uri = 'wss://ws.blockchain.info/inv';

        this.socketBlockhainInfo = new WebSocket(uri);
        this.socketBlockhainInfo.onopen = (evt) => {
            onOpen(evt, this.socketBlockhainInfo);
        };
        this.socketBlockhainInfo.onclose = function(evt) { onClose(evt); };
        this.socketBlockhainInfo.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            if (data.op === 'block') {
                const { blocks } = this.state;
                blocks.push(data.x);
                this.setState({ blocks });
            }
        };
        this.socketBlockhainInfo.onerror = function(evt) { onError(evt); };
    }

    componentWillMount(): void {

    }

    componentWillUnmount(): void {
        this.socketBlockhainInfo.close();
    }

    render(): JSX.Element {
        return (
            <div className="App__container">
                {this.props.children}
            </div>
        );
    }
}
