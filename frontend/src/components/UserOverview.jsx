import React, { useState, useEffect } from 'react';
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
            if (userBudget && userBudget.categories && userBudget.categories[category]) {
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

    const calculateRemaining = () => {
        if (totalIncome !== null && totalHousing !== null && totalRecurring !== null && totalAdditional !== null) {
            const expenses = totalHousing + totalRecurring + totalAdditional;
            setTotalExpenses(expenses);
            const newRemaining = totalIncome - expenses;
            setTotalRemaining(newRemaining);
        }
    }

    useEffect(() => {
        // Calculate remaining when any of the category sums change
        calculateRemaining();
    }, [totalIncome, totalHousing, totalRecurring, totalAdditional]);

    const expensesPercentage = (totalExpenses / totalIncome) * 100;

    return (
        <div className="user-overview">

            <div className="card card-full-width">
                <p>{formatCurrency(totalRemaining)}</p>
                <h3>Current Balance</h3>

                <div className="progress-bar">
                    <div
                        className={`expenses-bar ${expensesPercentage > 100 ? 'over-budget' : ''}`}
                        style={{ width: `${expensesPercentage > 100 ? 100 : expensesPercentage}%` }}>
                        <span className="label">
                            {expensesPercentage > 100
                                ? 'Budget exceeded!'
                                : `Expenses: ${formatCurrency(totalExpenses)}`
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className="card-container">
                <div className="card">
                    <WorkRoundedIcon className="icon icon-income" />
                    <p>{formatCurrency(totalIncome)}</p>
                    <h3>Total Income</h3>
                </div>

                <div className="card">
                    <ApartmentRoundedIcon className="icon icon-housing" />
                    <p>{formatCurrency(totalHousing)}</p>
                    <h3>Housing Expenses</h3>
                </div>

                <div className="card">
                    <PaymentRoundedIcon className="icon icon-recurring" />
                    <p>{formatCurrency(totalRecurring)}</p>
                    <h3>Recurring Expenses</h3>
                </div>

                <div className="card">
                    <LocalMallRoundedIcon className="icon icon-additional" />
                    <p>{formatCurrency(totalAdditional)}</p>
                    <h3>Additional Expenses</h3>
                </div>
            </div>

        </div>
    );

}

export default UserOverview;