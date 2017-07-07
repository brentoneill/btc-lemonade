import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import AddressInput from '../AddressInput';

const defaultProps = {
    onAddAddress: sinon.spy()
};

describe('<AddressInput /> component', () => {
    const addressInput = shallow(<AddressInput {...defaultProps} />);

    it('should render a div with className .AddressInput', () => {
        expect(addressInput.find('.AddressInput').length).toBe(1);
    });
});
