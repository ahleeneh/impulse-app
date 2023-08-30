import React from 'react';
import UserPageWrapper from '../components/UserPageWrapper';
import BudgetComponent from '../components/BudgetComponent';
import useUserBudget from '../hooks/useUserBudget';


function BudgetPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const { userBudget, refreshBudget } = useUserBudget(currentMonth, currentYear);

    return (
        <UserPageWrapper pageName="User Budget">
            <BudgetComponent userBudget={userBudget} refreshBudget={refreshBudget} category="income" />
            <BudgetComponent userBudget={userBudget} refreshBudget={refreshBudget} category="housing" />
            <BudgetComponent userBudget={userBudget} refreshBudget={refreshBudget} category="recurring" />
            <BudgetComponent userBudget={userBudget} refreshBudget={refreshBudget} category="additional" />
        </UserPageWrapper>
    );

}

export default BudgetPage;