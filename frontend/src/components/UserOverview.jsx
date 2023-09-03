import React, { useState, useEffect } from 'react';
import UserExpenseMeter from './UserExpenseMeter';
import CategoryCard from './CategoryCard';

import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

// UserOverview component displays the user's budget categories and expense meter
function UserOverview({ userBudget }) {
    // State variables to store category totals and other calculations
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalHousing, setTotalHousing] = useState(null);
    const [totalRecurring, setTotalRecurring] = useState(null);
    const [totalAdditional, setTotalAdditional] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [totalRemaining, setTotalRemaining] = useState(null);

    // Function to format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Function to tally the sum for a given category
    const tallyCategory = (category, setCategoryTotal) => {
        try {
            if (userBudget?.categories?.[category]) {
                const tallySum = userBudget.categories[category].reduce(
                    (sum, item) => sum + parseInt(item.amount), 0
                );
                setCategoryTotal(tallySum);
            } else {
                setCategoryTotal(0);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Effect to fetch and calculate category totals when the components mounts or the userBudget changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch and calculate totals for different categories
                await Promise.all([
                    tallyCategory('income', setTotalIncome),
                    tallyCategory('housing', setTotalHousing),
                    tallyCategory('recurring', setTotalRecurring),
                    tallyCategory('additional', setTotalAdditional)
                ])
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userBudget]);

    // Effect to calculate remaining budget and percentage of expenses when the component mounts
    // or any of the category sums change
    useEffect(() => {
        // Calculate total expenses and the remaining budget
        if (totalIncome !== null && totalHousing !== null && totalRecurring !== null && totalAdditional !== null) {
            const expenses = totalHousing + totalRecurring + totalAdditional;
            setTotalExpenses(expenses);
            const newRemaining = totalIncome - expenses;
            setTotalRemaining(newRemaining);
        }
    }, [totalIncome, totalHousing, totalRecurring, totalAdditional]);

    // Calculate the percentage of expenses relative to income for user expense meter
    const expensesPercentage = (totalExpenses / totalIncome) * 100;

    return (
        <div className="user-overview">

            <UserExpenseMeter
                expensesPercentage={expensesPercentage}
                totalRemaining={totalRemaining}
                totalExpenses={totalExpenses}
                formatCurrency={formatCurrency}
            />

            <div className="card-container">
                <CategoryCard
                    icon={<WorkRoundedIcon className="icon icon-income" />}
                    amount={formatCurrency(totalIncome)}
                    title="Total Monthly Income"
                />

                <CategoryCard
                    icon={<ApartmentRoundedIcon className="icon icon-housing" />}
                    amount={formatCurrency(totalHousing)}
                    title="Housing Expenses"
                />

                <CategoryCard
                    icon={<PaymentRoundedIcon className="icon icon-recurring" />}
                    amount={formatCurrency(totalRecurring)}
                    title="Recurring Expenses"
                />

                <CategoryCard
                    icon={<LocalMallRoundedIcon className="icon icon-additional" />}
                    amount={formatCurrency(totalAdditional)}
                    title="Additional Expenses"
                />
            </div>

        </div>
    );

}

export default UserOverview;