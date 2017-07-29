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
                route: '/dashboard',
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
                <Sidebar className={'Layout__sidebar'} navigationLinks={navLinks}/>
                <div className="Layout__content">
                    <Header className={'Layout__header'} />
                    <div className="Layout__body">
                        {this.props.children}
                    </div>
                    <Footer className={'Layout__footer'} />
                </div>
            </div>
        );
    }
}

export default Layout;
