import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar, { INavLink } from './Sidebar';

import './styles/Layout.scss';

interface ILayoutProps {}
interface ILayoutState {}

class Layout extends React.Component<ILayoutProps, ILayoutState> {

    render(): JSX.Element {

        const navLinks: INavLink[] = [
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
        ];

        return (
            <div className="Layout">
                <Sidebar className={'Layout--sidebar'} navigationLinks={navLinks}/>
                <div className="Layout--content">
                    <Header className={'Layout--header'} />
                    <div className="Layout--body">
                        {this.props.children}
                    </div>
                    <Footer className={'Layout--footer'} />
                </div>
            </div>
        );
    }
}

export default Layout;
