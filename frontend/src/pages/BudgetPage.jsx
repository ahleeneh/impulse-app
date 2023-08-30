import React, { useState } from 'react';
import UserPageWrapper from '../components/UserPageWrapper';
import BudgetComponent from '../components/BudgetComponent';
import useUserBudget from '../hooks/useUserBudget';

function BudgetPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { userBudget, refreshBudget } = useUserBudget(selectedMonth, selectedYear);

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    }

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    }

    return (
        <UserPageWrapper pageName="User Budget">

            <div className="select-date">
                <label>Select Month:</label>
                <input type="number" value={selectedMonth} onChange={handleMonthChange} />

                <label>Select Year:</label>
                <input type="number" value={selectedYear} onChange={handleYearChange} />
            </div>

            <BudgetComponent
                category="income"
                userBudget={userBudget}
                refreshBudget={refreshBudget}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear} />
            <BudgetComponent
                category="housing"
                userBudget={userBudget}
                refreshBudget={refreshBudget} 
                selectedMonth={selectedMonth}
                selectedYear={selectedYear} />
            <BudgetComponent
                category="recurring"
                userBudget={userBudget}
                refreshBudget={refreshBudget} 
                selectedMonth={selectedMonth}
                selectedYear={selectedYear} />
            <BudgetComponent
                category="additional"
                userBudget={userBudget}
                refreshBudget={refreshBudget} 
                selectedMonth={selectedMonth}
                selectedYear={selectedYear} />

        </UserPageWrapper>
    );

}

export default BudgetPage;