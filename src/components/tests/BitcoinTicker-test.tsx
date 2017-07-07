import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import BitcoinTicker from '../BitcoinTicker';

const defaultProps = {
    currencyPair: 'btcusd',
    onChange: sinon.spy()
};

describe('<BitcoinTicker /> component', () => {
    const bitcoinTicker = shallow(<BitcoinTicker {...defaultProps} />);

    it('should render a <BitcoinTicker>', () => {
        expect(bitcoinTicker.find('.BitcoinTicker').length).toBe(1);
    });
});
