import React from 'react';

function UserOverview() {

    return (
        <div className="user-overview">

            <div className="card card-full-width">
                <h3>Money Available</h3>
            </div>

            <div className="card-container">
                <div className="card">
                    <h3>Income</h3>
                </div>
                <div className="card">
                    <h3>Housing</h3>
                </div>
                <div className="card">
                    <h3>Recurring</h3>
                </div>
                <div className="card">
                    <h3>Transactions</h3>
                </div>
            </div>

        </div>
    );

}

export default UserOverview;