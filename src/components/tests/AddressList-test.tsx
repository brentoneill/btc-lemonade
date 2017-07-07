import * as React from 'react';
import { shallow } from 'enzyme';
import AddressList from '../AddressList';

const defaultProps = {
    addresses: [],
    btcToUSD: 2600
};

describe('<AddressList /> component', () => {
    const addressList = shallow(<AddressList {...defaultProps} />);

    it('should render a div with className .AddressList', () => {
        expect(addressList.find('.AddressList').length).toBe(1);
    });
});
