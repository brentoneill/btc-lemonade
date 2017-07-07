import * as React from 'react';
import { shallow } from 'enzyme';
import TransactionFeed from '../TransactionFeed';

const defaultProps = {
    addresses: [],
    btcToUSD: 2600
};

describe('<TransactionFeed /> component', () => {
    const transactionFeed = shallow(<TransactionFeed {...defaultProps} />);

    it('should render a div with className .TransactionFeed', () => {
        expect(transactionFeed.find('.TransactionFeed').length).toBe(1);
    });
});
