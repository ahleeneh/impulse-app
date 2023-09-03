import React, { useEffect, useState } from 'react';
import UserPageWrapper from '../components/UserPageWrapper';
import BudgetComponent from '../components/BudgetComponent';
import useUserBudget from '../hooks/useUserBudget';

function BudgetPage() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { userBudget, isLoading, refreshBudget } = useUserBudget(selectedMonth, selectedYear);

  useEffect(() => {
    refreshBudget();
  }, [selectedMonth, selectedYear]);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleResetToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth() + 1);
    setSelectedYear(today.getFullYear());
  }

  return (
    <UserPageWrapper pageName="User Budget">

      <div className="date-picker">
        <span className="pointer" onClick={handlePrevMonth}>&lt;</span>
        <h3 className="pointer" onClick={handleResetToday}>{months[selectedMonth - 1]} {selectedYear}</h3>
        <span className="pointer" onClick={handleNextMonth}>&gt;</span>
      </div>

      {isLoading ? (
        <>
          <p>Loading</p>
        </>
      ) : (
        <>
          <BudgetComponent
            category="income"
            userBudget={userBudget}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear} />

          <BudgetComponent
            category="housing"
            userBudget={userBudget}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear} />

          <BudgetComponent
            category="recurring"
            userBudget={userBudget}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear} />

          <BudgetComponent
            category="additional"
            userBudget={userBudget}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear} />
        </>
      )}


    </UserPageWrapper>
  );

}

export default BudgetPage;