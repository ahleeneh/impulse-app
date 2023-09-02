import React from 'react';
import UserOverview from '../components/UserOverview';
import UserGoals from '../components/UserGoals';
import UserPageWrapper from '../components/UserPageWrapper';
import useUserBudget from '../hooks/useUserBudget';

function DashboardPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const { userBudget, isLoading } = useUserBudget(currentMonth, currentYear);

    return (
        <UserPageWrapper pageName="User Dashboard">
            {isLoading ? (
                <></>
            ) : (
                <>
                    <UserOverview userBudget={userBudget} />
                    {/* <UserGoals userBudget={userBudget} /> */}
                </>
            )}
        </UserPageWrapper>
    );

}

export default DashboardPage;