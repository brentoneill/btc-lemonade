import * as React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '../Sidebar';

const defaultProps = {
    navigationLinks: [
        {
            label: 'Dashboard',
            route: '/',
            icon: {
                name: 'dashboard'
            }
        },
        {
            label: 'Stats',
            route: '/stats',
            icon: {
                name: 'bar graph'
            }
        },
        {
            label: 'Settings',
            route: '/settings',
            icon: {
                name: 'settings'
            }
        }
    ]
};

describe('<Sidebar /> component', () => {
    const sidebar = shallow(<Sidebar {...defaultProps} />);

    it('should render a div with className .Sidebar and two children: .Sidebar--header and .Side--navigation', () => {
        expect(sidebar.find('.Sidebar').length).toBe(1);
        expect(sidebar.find('.Sidebar .Sidebar--header').length).toBe(1);
        expect(sidebar.find('.Sidebar .Sidebar--navigation').length).toBe(1);
    });

    it('should render a Header inside .Sidebar--header', () => {
        expect(sidebar.find('.Sidebar .Sidebar--header Header').length).toBe(1);
    });

    it('should render a List inside .Sidebar--navigation', () => {
        expect(sidebar.find('.Sidebar .Sidebar--navigation List').length).toBe(1);
    });
});
