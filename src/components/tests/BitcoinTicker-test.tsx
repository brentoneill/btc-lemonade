import * as React from 'react';

import { shallow } from 'enzyme';
import BitcoinTicker from '../BitcoinTicker';

const defaultProps = {

};

describe('<BitcoinTicker /> component', () => {
    const bitcoinTicker = shallow(<BitcoinTicker {...defaultProps} />);

    it('should render a <BitcoinTicker>', () => {
        expect(bitcoinTicker.find('.BitcoinTicker').length).toBe(1);
    });
});
