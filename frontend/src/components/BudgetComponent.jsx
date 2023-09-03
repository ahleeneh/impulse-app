import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetAddItemForm from './BudgetAddItemForm';
import BudgetTable from './BudgetTable';

// BudgetComponent for rendering a budget's category items
function BudgetComponent({ userBudget, category, selectedMonth, selectedYear }) {
    // State for categoryItems, initialized with the userBudget's category items
    const [categoryItems, setCategoryItems] = useState(userBudget.categories?.[category] ?? []);

    // UseEffect to update categoryItems when userBudget changes
    useEffect(() => {
        setCategoryItems(userBudget.categories?.[category] ?? []);
    }, [userBudget]);

    // Handle the deletion of a budget item
    const handleDeleteItem = async (item) => {
        try {
            // Send a DELETE request to remove the selected item
            const response = await axios.delete('/budget/delete', {
                data: {
                    category: category,
                    item_name: item.name,
                    month: selectedMonth,
                    year: selectedYear
                }
            });

            if (response.status === 200) {
                // If successful, update categoryItems by filtering out the deleted item
                const updatedCategoryItems = categoryItems.filter((i) => i.name !== item.name);
                setCategoryItems(updatedCategoryItems);
            } else {
                console.error('error deleting item');
            }

        } catch (error) {
            console.error(error)
        }
    }

    // Function to update categoryItems when a new item is added
    const updateCategoryItems = (newItem) => {
        setCategoryItems([...categoryItems, newItem]);
    }

    return (
        <div className="budget-component">
            <div className={`card card-budget ${category}`}>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>

                <BudgetTable 
                    categoryItems={categoryItems}
                    onDelete={handleDeleteItem}
                />

                <BudgetAddItemForm
                    category={category}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    updateCategoryItems={updateCategoryItems}
                />

            </div>
        </div >
    );

}

export default BudgetComponent;