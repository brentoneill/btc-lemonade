import * as React from 'react';
import { Header, Dropdown, List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

import './styles/Sidebar.scss';

export interface INavLink {
    icon?: {
        name: string;
        color?: string;
    };
    label: string;
    route: string;
}

interface ISidebarProps {
    className?: string;
    navigationLinks?: INavLink[];
}

interface ISidebarState {
    indicatorTop?: number;
}

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {

    renderIcon(icon): JSX.Element | null {
        return <List.Icon {...icon} verticalAlign={'middle'} />;
    }

    renderNavigationLinks(navigationLinks: INavLink[]): JSX.Element[] | null {
        if (navigationLinks && navigationLinks.length) {
            return navigationLinks.map(link => {
                const { route, label, icon } = link;
                return (
                    <List.Item key={label}>
                        {link.icon && this.renderIcon(icon)}
                        <List.Content><Link className="block" activeClassName="active" to={route}>{label}</Link></List.Content>
                    </List.Item>
                );
            });
        } else {
            return null;
        }
    }

    render(): JSX.Element {
        const indicatorTop = 94;

        return (
            <div className={`Sidebar ${this.props.className}`}>
                <header className={`Sidebar--header`}>
                    <Header as={'h4'}>
                        <Icon name="lemon" color="yellow" />
                        Sam's Lemonade
                    </Header>
                </header>
                <nav className={`Sidebar--navigation`}>
                    <List selection animated verticalAlign={'middle'}>
                        {this.renderNavigationLinks(this.props.navigationLinks)}
                    </List>
                    <div className={`Sidebar--nav-indicator`}>
                        <div className="arrow-left" style={{ top: indicatorTop }}></div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Sidebar;
