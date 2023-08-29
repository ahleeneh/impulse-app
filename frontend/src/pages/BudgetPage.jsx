import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetIncome from '../components/BudgetIncome';
import BudgetHousing from '../components/BudgetHousing';
import BudgetRecurring from '../components/BudgetRecurring';
import BudgetAdditional from '../components/BudgetAdditional';
import UserPageWrapper from '../components/UserPageWrapper';

function BudgetPage() {
    const [userBudget, setUserBudget] = useState([])

    const getUserBudget = async () => {
        try {
            const response = await axios.get('/budget');
            if (response.status === 200) {
                setUserBudget(response.data);
                console.log('userBudget: ', response.data);
            }
        } catch (error) {
            console.log('uh oh!!');
            console.error(error);
        }
    }

    useEffect(() => {
        getUserBudget();
    }, []);

    return (
        <UserPageWrapper pageName="User Budget">
            <BudgetIncome userBudget={userBudget} refreshBudget={getUserBudget} />
            <BudgetHousing userBudget={userBudget} />
            <BudgetRecurring userBudget={userBudget} />
            <BudgetAdditional userBudget={userBudget} />
        </UserPageWrapper>
    );

}

export default BudgetPage;