export default class Socket {

    public connection;
    public uri;

    private type;

    constructor(uri: string, type?: string) {
        this.uri = uri;
        this.type = type;

        // Make the connection
        this.connection = new WebSocket(uri);

        // Bind socket events
        this.connection.onopen = this.onOpen;
        this.connection.onclose = this.onClose;
        this.connection.onerror = this.onError;
        this.connection.onmessage = this.onMessage;
    }

    onOpen(evt) {
        console.info('connection open on: ', evt.target.url, evt);
        // Pings to keep the connection open
        if (this.type && this.type.toLowerCase() === 'bitstamp') {
            this.setupPing();
        }
    }

    setupPing() {
        const msg = { 'op': 'ping'};
        this.sendMessage(msg);
        setInterval(function() {
            this.sendMessage(msg);
        }, 15000);
    }


    onError(error) {
        console.warn(error);
        throw new Error(error);
    }

    onClose(evt) {
        console.info('connection closed: ', evt);
    }

    onMessage(evt) {
        console.log('received message: ', JSON.parse(evt.data));
    }

    sendMessage(msg: Object) {
        const msgString = JSON.stringify(msg);
        this.connection.send(msgString);
    }
}
