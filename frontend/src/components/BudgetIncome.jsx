import axios from 'axios';
import React, { useState } from 'react';

function BudgetIncome({ userBudget, refreshBudget }) {
    const [newIncomeName, setNewIncomeName] = useState('');
    const [newIncomeAmount, setNewIncomeAmount] = useState('');
    const [isAddingItem, setIsAddingItem] = useState(false);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let filteredIncome = [];

    // Filter income items for the current month/year
    if (userBudget && userBudget.categories && userBudget.categories.income) {
        filteredIncome = userBudget.categories.income.filter(item => {
            return userBudget.month === currentMonth && userBudget.year === currentYear;
        });
        filteredIncome = userBudget.categories.income
    }

    const handleAddItemToggle = () => {
        setIsAddingItem(!isAddingItem);
    }
    
    const handleAddItem = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('/budget', {
                category: 'income',
                item_name: newIncomeName,
                item_amount: newIncomeAmount,
                month: currentMonth,
                year: currentYear
            })

            if (response.status === 200) {
                refreshBudget();
                setIsAddingItem(false);
                setNewIncomeName('');
                setNewIncomeAmount('');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="budget-component">
            <div className="card card-budget income">
                <h3>Income</h3>

                <table>
                    <thead>
                        <tr>
                            <th className="item-header">Item</th>
                            <th className="cost-header">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncome.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isAddingItem ? (
                    <div className="add-item-form">
                        <div className="add-item-input-container">
                            <input
                                className="item-header"
                                type="text"
                                placeholder="Income"
                                value={newIncomeName}
                                onChange={(e) => setNewIncomeName(e.target.value)}
                            />
                            <input
                                className="cost-header"
                                type="number"
                                placeholder='Amount'
                                value={newIncomeAmount}
                                onChange={(e) => setNewIncomeAmount(e.target.value)}
                            />
                        </div>

                        <div className="add-item-span-container">
                            <span className="add-span" onClick={handleAddItem}>+ Add Item</span>
                            <span className="cancel-span" onClick={handleAddItemToggle}>Cancel</span>
                        </div>
                    </div>
                ) : (
                    <span className="add-span" onClick={handleAddItemToggle}>+ Add Item</span>
                )}

            </div>
        </div >
    );

}

export default BudgetIncome;