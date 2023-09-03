import React, { useState } from 'react';
import axios from 'axios';

// BudgetAddItemForm component for adding items to a budget category
function BudgetAddItemForm({ category, selectedMonth, selectedYear, updateCategoryItems }) {
    // State for the new item's name, amount, and adding item state
    const [newItemName, setNewItemName] = useState('');
    const [newItemAmount, setNewItemAmount] = useState('');
    const [isAddingItem, setIsAddingItem] = useState(false);

    // Toggle the adding item form
    const handleAddItemToggle = () => {
        setIsAddingItem(!isAddingItem);
    }

    // Handle the form submission when adding a new item
    const handleAddItem = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to add the new item
            const response = await axios.post('/budget', {
                category,
                item_name: newItemName,
                item_amount: newItemAmount,
                month: selectedMonth,
                year: selectedYear
            });

            console.log(response);
            if (response.status === 200) {
                // If successful, update the category items and reset the form fields
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

export default BudgetAddItemForm;