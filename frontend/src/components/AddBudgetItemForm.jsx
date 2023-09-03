import React, { useState } from 'react';
import axios from 'axios';

function AddBudgetItemForm({ category, selectedMonth, selectedYear, updateCategoryItems }) {
    const [newItemName, setNewItemName] = useState('');
    const [newItemAmount, setNewItemAmount] = useState('');
    const [isAddingItem, setIsAddingItem] = useState(false);

    const handleAddItemToggle = () => {
        setIsAddingItem(!isAddingItem);
    }

    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/budget', {
                category,
                item_name: newItemName,
                item_amount: newItemAmount,
                month: selectedMonth,
                year: selectedYear
            });

            console.log(response);
            if (response.status === 200) {
                const newItem = { name: newItemName, amount: newItemAmount };
                updateCategoryItems(newItem);
                setIsAddingItem(false);
                setNewItemName('');
                setNewItemAmount('');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {isAddingItem ? (
                <div className="add-item-form">
                    <div className="add-item-input-container">
                        <input
                            className="add-item-header"
                            type="text"
                            placeholder={category.charAt(0).toUpperCase() + category.slice(1)}
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                        <input
                            className="add-cost-header"
                            type="number"
                            placeholder='Amount'
                            value={newItemAmount}
                            onChange={(e) => setNewItemAmount(e.target.value)}
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
        </>
    );

}

export default AddBudgetItemForm;