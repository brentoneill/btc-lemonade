import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import BitcoinTicker from '../BitcoinTicker';

const defaultProps = {
    showTimestamp: true,
    currencyPair: 'btcusd',
    onChange: sinon.spy(),
    title: 'BTC to USD'
};

describe('<BitcoinTicker /> component', () => {
    const bitcoinTicker = shallow(<BitcoinTicker {...defaultProps} />);

    it('should render a div with className .BitcoinTicker and a Card with Loader', () => {
        expect(bitcoinTicker.find('.BitcoinTicker').length).toBe(1);
        expect(bitcoinTicker.find('Card').length).toBe(1);
    });

    it('should render the correct title', () => {
        expect(bitcoinTicker.find('.BitcoinTicker__header').length).toBe(1);
        expect(bitcoinTicker.find('.BitcoinTicker__header').props().children[1]).toEqual(defaultProps.title);
    });

    it('should render the correct icon for each currency inside the title', () => {
        expect(bitcoinTicker.find('.BitcoinTicker__header span').length).toEqual(1);
        expect(bitcoinTicker.find('.BitcoinTicker__header span').props().className).toContain('BTC-alt');
    });

    it('should render a Loader when there is no currentPrice', () => {
        bitcoinTicker.setState({ currentPrice: null });
        expect(bitcoinTicker.find('Loader').length).toBe(1);
    });

    it('should render a <Statistic> when there is a currentPrice', () => {
        bitcoinTicker.setState({ currentPrice: 2600 });
        expect(bitcoinTicker.find('Loader').length).toBe(0);
        expect(bitcoinTicker.find('Statistic').length).toBe(1);
    });

    it('should render the time when there is a time on the state', () => {
        bitcoinTicker.setState({ time: new Date() });
        expect(bitcoinTicker.find('CardContent').at(2).find('Icon').length).toBe(1);
        expect(bitcoinTicker.find('CardContent').at(2).find('.BitcoinTicker__time').length).toBe(1);
    });

    it('should fire the onChange callback on initial load', () => {
        expect(defaultProps.onChange.calledOnce).toBe(true);
    });

});
