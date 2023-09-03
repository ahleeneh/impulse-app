import React, { useState, useEffect } from 'react';
import UserExpenseMeter from './UserExpenseMeter';
import CategoryCard from './CategoryCard';

import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

function UserOverview({ userBudget }) {
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalHousing, setTotalHousing] = useState(null);
    const [totalRecurring, setTotalRecurring] = useState(null);
    const [totalAdditional, setTotalAdditional] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [totalRemaining, setTotalRemaining] = useState(null);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const tallyCategory = (category, setCategoryTotal) => {
        try {
            if (userBudget?.categories?.[category]) {
                let tallySum = 0;
                for (let i = 0; i < userBudget.categories[category].length; i++) {
                    tallySum += parseInt(userBudget.categories[category][i].amount)
                }
                setCategoryTotal(tallySum);
            } else {
                setCategoryTotal(0);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    useEffect(() => {
        // Calculate the remaining when any of the category sums change
        if (totalIncome !== null && totalHousing !== null && totalRecurring !== null && totalAdditional !== null) {
            const expenses = totalHousing + totalRecurring + totalAdditional;
            setTotalExpenses(expenses);
            const newRemaining = totalIncome - expenses;
            setTotalRemaining(newRemaining);
        }
    }, [totalIncome, totalHousing, totalRecurring, totalAdditional]);

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