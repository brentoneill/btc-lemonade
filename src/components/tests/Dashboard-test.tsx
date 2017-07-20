import * as React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../Dashboard';

const defaultProps = {

};

describe('<Dashboard /> component', () => {
    const dashboard = shallow(<Dashboard {...defaultProps} />);

    it('should render a div with className .Dashboard', () => {
        expect(dashboard.find('.Dashboard').length).toBe(1);
    });
});
