import React from 'react';
import UserOverview from '../components/UserOverview';
import UserGoals from '../components/UserGoals';
import UserPageWrapper from '../components/UserPageWrapper';
import useUserBudget from '../hooks/useUserBudget';

function DashboardPage() {
    const {userBudget, refreshBudget} = useUserBudget();

    return (
        <UserPageWrapper pageName="User Dashboard">
            <UserOverview userBudget={userBudget} refreshBudget={refreshBudget} />
            <UserGoals userBudget={userBudget} refreshBudget={refreshBudget} />
        </UserPageWrapper>
    );

}

export default DashboardPage;