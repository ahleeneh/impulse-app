import React, { useState, useEffect } from 'react';

function UserOverview({ userBudget, refreshBudget }) {
    const [totalIncome, setTotalIncome] = useState(null);

    const [totalHousing, setTotalHousing] = useState(null);
    const [totalRecurring, setTotalRecurring] = useState(null);
    const [totalAdditional, setTotalAdditional] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);

    const [leftoverBudget, setLeftoverBudget] = useState(null);

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

    const calculateLeftover = () => {
        if (totalIncome !== null && totalHousing !== null && totalRecurring !== null && totalAdditional !== null) {
            const expenses = totalHousing + totalRecurring + totalAdditional;
            setTotalExpenses(expenses);
            const newLeftover = totalIncome - expenses;
            setLeftoverBudget(newLeftover);
        }
    }

    useEffect(() => {
        // Calculate leftover when any of the category sums change
        calculateLeftover();
    }, [totalIncome, totalHousing, totalRecurring, totalAdditional]);

    const leftoverPercentage = ((totalIncome - totalExpenses) / totalIncome) * 100;

    return (
        <div className="user-overview">

            <div className="card card-full-width">
                <h3>Money Available</h3>
                <p>{formatCurrency(leftoverBudget)}</p>

                <div className="progress-bar">
                    <div className="leftover-bar" style={{ width: `${leftoverPercentage}%` }}></div>
                </div>
            </div>

            <div className="card-container">
                <div className="card">
                    <h3>Income</h3>

                    <p>{formatCurrency(totalIncome)}</p>
                </div>
                <div className="card">
                    <h3>Housing</h3>
                    <p>{formatCurrency(totalHousing)}</p>
                </div>
                <div className="card">
                    <h3>Recurring</h3>
                    <p>{formatCurrency(totalRecurring)}</p>
                </div>
                <div className="card">
                    <h3>Transactions</h3>
                    <p>{formatCurrency(totalAdditional)}</p>
                </div>
            </div>

        </div>
    );

}

export default UserOverview;