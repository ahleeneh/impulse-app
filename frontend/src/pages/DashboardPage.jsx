import React from 'react';
import UserOverview from '../components/UserOverview';
import UserGoals from '../components/UserGoals';
import UserPageWrapper from '../components/UserPageWrapper';
import useUserBudget from '../hooks/useUserBudget';

function DashboardPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const { userBudget, isLoading, refreshBudget } = useUserBudget(currentMonth, currentYear);

    return (
        <UserPageWrapper pageName="User Dashboard">
            {isLoading ? (
                <>
                    <p>Loading</p></>
            ) : (
                <>
                    <UserOverview userBudget={userBudget} refreshBudget={refreshBudget} />
                    <UserGoals userBudget={userBudget} refreshBudget={refreshBudget} />
                </>
            )}
        </UserPageWrapper>
    );

}

export default DashboardPage;