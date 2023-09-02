import React, { useState, useEffect } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalMallIcon from '@mui/icons-material/LocalMall';

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

    const remainingPercentage = ((totalIncome - totalExpenses) / totalIncome) * 100;

    return (
        <div className="user-overview">

            <div className="card card-full-width">
                <p>{formatCurrency(totalRemaining)}</p>
                <h3>Current Balance</h3>

                <div className="progress-bar">
                    <div className="remaining-bar" style={{ width: `${remainingPercentage}%` }}></div>
                </div>
            </div>

            <div className="card-container">
                <div className="card">
                    <WorkIcon className="icon icon-income" />
                    <p>{formatCurrency(totalIncome)}</p>
                    <h3>Total Income</h3>
                </div>
                
                <div className="card">
                    <ApartmentIcon className="icon icon-housing" />
                    <p>{formatCurrency(totalHousing)}</p>
                    <h3>Housing Expenses</h3>
                </div>

                <div className="card">
                    <PaymentIcon className="icon icon-recurring" />
                    <p>{formatCurrency(totalRecurring)}</p>
                    <h3>Recurring Expenses</h3>
                </div>

                <div className="card">
                    <LocalMallIcon className="icon icon-additional" />
                    <p>{formatCurrency(totalAdditional)}</p>
                    <h3>Additional Expenses</h3>
                </div>
            </div>

        </div>
    );

}

export default UserOverview;