import React, { Component } from 'react';

export class HomeData extends Component {
    static displayName = HomeData.name;

    constructor(props) {
        super(props);
        this.state = { currentCount: 0, users: [], loading: true };
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });

        //fetch('api/Users/Create', {
        //    method: 'POST',
        //    body: data,

        //}).then((response) => response.json())
        //    .then((responseJson) => {
        //        this.props.history.push("/fetchemployee");
        //    })
    }

    componentDidMount() {
        this.populateUsersData();
    }

    static renderUsersTable(users) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>UserId</th>
                        <th>Date Registration</th>
                        <th>Date Last Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.dateRegistration}</td>
                            <td>{user.dateLastActivity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : HomeData.renderUsersTable(this.state.users);

        return (
            <div>
                <h1 id="tabelLabel" >Test project</h1>
                <p>This component demonstrates fetching data from the PostgreSQL.</p>
                {contents}
                <label for="dateRegistration" className="label-control">
                    Date Registration
                    <input type="text" id="dateRegistration" ref="dateRegistration" className="input-control" />
                </label>
                <label for="dateLastActivity" className="label-control">
                    Date Last Activity
                    <input type="text" id="dateLastActivity" ref="dateLastActivity" className="input-control" />
                </label>
                <p aria-live="polite">Rolling Retention 7 day: (количество пользователей, вернувшихся в систему в X-ый день или позже) / (количество пользователей, зарегистрировавшихся в приложении X дней назад или раньше) * 100%<strong>{this.state.currentCount}</strong></p>

                <button className="btn btn-primary" onClick={this.incrementCounter}>Calculate</button>
            </div>
        );
    }

    async populateUsersData() {
        const response = await fetch('users');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }
}
