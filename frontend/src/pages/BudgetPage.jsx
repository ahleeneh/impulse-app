import React from 'react';
import BudgetIncome from '../components/BudgetIncome';
import BudgetHousing from '../components/BudgetHousing';
import BudgetRecurring from '../components/BudgetRecurring';
import BudgetAdditional from '../components/BudgetAdditional';
import UserPageWrapper from '../components/UserPageWrapper';
import useUserBudget from '../hooks/useUserBudget';

function BudgetPage() {
    const {userBudget, refreshBudget } = useUserBudget();

    return (
        <UserPageWrapper pageName="User Budget">
            <BudgetIncome userBudget={userBudget} refreshBudget={refreshBudget} />
            <BudgetHousing userBudget={userBudget} />
            <BudgetRecurring userBudget={userBudget} />
            <BudgetAdditional userBudget={userBudget} />
        </UserPageWrapper>
    );

}

export default BudgetPage;