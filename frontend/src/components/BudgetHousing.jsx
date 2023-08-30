import axios from 'axios';
import React, { useState, useEffect } from 'react';

function BudgetHousing({ userBudget, refreshBudget }) {
    const [newHousingName, setNewHousingName] = useState('');
    const [newHousingAmount, setNewHousingAmount] = useState('');
    const [isAddingItem, setIsAddingItem] = useState(false);

    const currentMonth = 8;
    const currentYear = new Date().getFullYear();

    let filteredHousing = [];

    if (userBudget && userBudget.categories && userBudget.categories.housing) {
        filteredHousing = userBudget.categories.housing.filter(item => {
            return userBudget.month === currentMonth && userBudget.year === currentYear;
        });
        filteredHousing = userBudget.categories.housing
        console.log(filteredHousing)
    }

    const handleAddItemToggle = () => {
        setIsAddingItem(!isAddingItem);
    }

    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/budget', {
                category: 'housing',
                item_name:  newHousingName,
                item_amount: newHousingAmount,
                month: currentMonth,
                year: currentYear
            })

            if (response.status === 200) {
                refreshBudget();
                setIsAddingItem(false);
                setNewHousingName('');
                setNewHousingAmount('');
                console.log(userBudget)
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="budget-component">
            <div className="card card-budget housing">
                <h3>Housing</h3>

                <table>
                    <thead>
                        <tr>
                            <th className="item-header">Item</th>
                            <th className="cost-header">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHousing.map((item, index) => (
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
                                placeholder="Housing"
                                value={newHousingName}
                                onChange={(e) => setNewHousingName(e.target.value)}
                            />
                            <input
                                className="cost-header"
                                type="number"
                                placeholder='Amount'
                                value={newHousingAmount}
                                onChange={(e) => setNewHousingAmount(e.target.value)}
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
        </div>
    );

}

export default BudgetHousing;