import React from 'react';
import BudgetIncome from '../components/BudgetIncome';
import BudgetHousing from '../components/BudgetHousing';
import BudgetRecurring from '../components/BudgetRecurring';
import BudgetAdditional from '../components/BudgetAdditional';
import UserPageWrapper from '../components/UserPageWrapper';
import useUserBudget from '../hooks/useUserBudget';

function BudgetPage() {
    const currentMonth = 9; // Adding 1 to get 1-based month
    const currentYear = new Date().getFullYear();
    const {userBudget, refreshBudget } = useUserBudget(currentMonth, currentYear);

    return (
        <UserPageWrapper pageName="User Budget">
            <BudgetIncome userBudget={userBudget} refreshBudget={refreshBudget} />
            <BudgetHousing userBudget={userBudget} refreshBudget={refreshBudget} />
            <BudgetRecurring userBudget={userBudget} refreshBudget={refreshBudget} />
            <BudgetAdditional userBudget={userBudget} refreshBudget={refreshBudget} />
        </UserPageWrapper>
    );

}

export default BudgetPage;