import React from 'react';
import UserOverview from '../components/UserOverview';
import UserGoals from '../components/UserGoals';
import UserPageWrapper from '../components/UserPageWrapper';

function DashboardPage() {
    return (
        <UserPageWrapper pageName="User Dashboard">
            <UserOverview />
            <UserGoals />
        </UserPageWrapper>
    );

}

export default DashboardPage;