import * as React from 'react';
import { Grid, Card } from 'semantic-ui-react';

import BitcoinTicker from './BitcoinTicker';
import TransactionFeed from './TransactionFeed';
import AddressInput from './AddressInput';

interface IDashboardProps {
    fetchPosts?: any;
}

interface IDashboardState {

}

import './styles/Dashboard.scss';

const transactions = [
    {
        date: new Date().toLocaleString(),
        payee: 'Bob\'s Burgers',
        amount: 100
    },
    {
        date: new Date().toLocaleString(),
        payee: 'Bob\'s Burgers',
        amount: 100
    },
    {
        date: new Date().toLocaleString(),
        payee: 'Bob\'s Burgers',
        amount: 100
    },
];

export default class Dashboard extends React.Component<IDashboardProps, IDashboardState> {

    render() {
        return (
            <div className="Dashboard">
                <Grid>
                    <Grid.Row columns={16}>
                        <Grid.Column width={6}>
                            <BitcoinTicker animateOnUpdate={true} showTimestamp={true}/>
                            <AddressInput />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <TransactionFeed transactions={transactions} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
