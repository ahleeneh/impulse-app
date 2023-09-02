import React from 'react';
import AddBudgetItemForm from './AddBudgetItemForm';

function BudgetComponent({ userBudget, isLoading, refreshBudget, category, selectedMonth, selectedYear }) {

    let categoryItems = userBudget.categories && userBudget.categories[category] ? userBudget.categories[category] : [];

    return (
        <div className="budget-component">
            <div className={`card card-budget ${category}`}>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>

                <table>
                    <thead>
                        <tr>
                            <th className="item-header">Item</th>
                            <th className="cost-header">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <AddBudgetItemForm
                    category={category}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    refreshBudget={refreshBudget}
                />

            </div>
        </div >
    );

}

export default BudgetComponent;