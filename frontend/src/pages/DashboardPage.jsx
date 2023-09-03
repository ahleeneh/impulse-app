import React, { useState,  useEffect } from 'react';
import UserOverview from '../components/UserOverview';
import UserPageWrapper from '../components/UserPageWrapper';
import IncomeExpenseGraph from '../components/IncomeExpenseGraph';
import useUserBudget from '../hooks/useUserBudget';
import axios, { all } from 'axios';

function DashboardPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const { userBudget, isLoading } = useUserBudget(currentMonth, currentYear);
    const [allUserBudgets, setAllUserBudgets] = useState([]);

    const getAllBudgets = async () => {
        try {
            const response = await axios.get('/budget/all-budgets');
            if (response.status === 200) {
                setAllUserBudgets(response.data);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllBudgets();
    }, []);

    return (
        <UserPageWrapper pageName="User Dashboard">
            {isLoading ? (
                <></>
            ) : (
                <>
                    <UserOverview userBudget={userBudget} />
                    <IncomeExpenseGraph allUserBudgets={allUserBudgets} />
                </>
            )}
        </UserPageWrapper>
    );

}

export default DashboardPage;