import * as React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';

const defaultProps = {

};

describe('<Layout /> component', () => {
    const layout = shallow(<Layout {...defaultProps} />);

    it('should render a div with className .layout and child div with className .layout__body', () => {
        expect(layout.find('.Layout').length).toBe(1);
        expect(layout.find('.Layout .Layout--body').length).toBe(1);
    });

    it('should render a connected <Header /> component with className .Layout--header', () => {
        console.log(layout.debug());
        expect(layout.find('Connect(Header)').length).toBe(1);
        expect(layout.find('Connect(Header)').props().className).toContain('Layout--header');
    });

    it('should render a <Footer /> component with className .Layout--footer', () => {
        expect(layout.find('Footer').length).toBe(1);
        expect(layout.find('Footer').props().className).toContain('Layout--footer');
    });
});
