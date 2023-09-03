import React from 'react';

// UserExpenseMeter component to display a card with the user's current balance and expense meter
function UserExpenseMeter({ expensesPercentage, totalRemaining, totalExpenses, formatCurrency }) {
    return (
        <div className="card card-full-width">
            <p>{formatCurrency(totalRemaining)}</p>
            <h3>Current Balance</h3>

            <div className="expense-meter">
                <div
                    className={`expense-indicator ${expensesPercentage > 100 ? 'over-budget' : ''}`}
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
    );

}

export default UserExpenseMeter;