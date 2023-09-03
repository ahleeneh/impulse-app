import React, { useState,  useEffect } from 'react';
import UserOverview from '../components/UserOverview';
import UserPageWrapper from '../components/UserPageWrapper';
import IncomeExpenseGraph from '../components/IncomeExpenseGraph';
import useUserBudget from '../hooks/useUserBudget';
import axios, { all } from 'axios';

// DashboardPage component displays the user's dashboard information
function DashboardPage() {
    // Obtain the current month and year
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Custom hook to fetch the user's budget data
    const { userBudget, isLoading } = useUserBudget(currentMonth, currentYear);

    // State to store all budgets
    const [allUserBudgets, setAllUserBudgets] = useState([]);

    // Function to fetch all of a user's budgets
    const getAllBudgets = async () => {
        try {
            // Send a GET request to retrieve all budgets associated with a user
            const response = await axios.get('/budget/all-budgets');
            if (response.status === 200) {
                // If successful, update the state with the fetched budgets
                setAllUserBudgets(response.data);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // When the component mounts, retrieve all budgets associated with a user
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