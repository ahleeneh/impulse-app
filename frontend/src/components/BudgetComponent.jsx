import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBudgetItemForm from './AddBudgetItemForm';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function BudgetComponent({ userBudget, category, selectedMonth, selectedYear }) {
    const [categoryItems, setCategoryItems] = useState(userBudget.categories?.[category] ?? []);

    useEffect(() => {
        setCategoryItems(userBudget.categories?.[category] ?? []);
    }, [userBudget]);

    const handleDeleteItem = async (item) => {
        try {
            const response = await axios.delete('/budget/delete', {
                data: {
                    category: category,
                    item_name: item.name,
                    month: selectedMonth,
                    year: selectedYear
                }
            });

            if (response.status === 200) {
                const updatedCategoryItems = categoryItems.filter((i) => i.name !== item.name);
                setCategoryItems(updatedCategoryItems);
            } else {
                console.error('error deleting item');
            }

        } catch (error) {
            console.error(error)
        }
    }

    const updateCategoryItems = (newItem) => {
        setCategoryItems([...categoryItems, newItem]);
    }

    return (
        <div className="budget-component">
            <div className={`card card-budget ${category}`}>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>

                <table>
                    <thead>
                        <tr>
                            <th className="item-header">Item</th>
                            <th className="cost-header">Cost</th>
                            <th className="delete-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.amount}</td>
                                <td>
                                    <span onClick={() => handleDeleteItem(item)}>
                                        <DeleteRoundedIcon />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <AddBudgetItemForm
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