import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// BudgetTable component to display the a table of budget items for a category
function BudgetTable({ categoryItems, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="item-header">Item</th>
                    <th className="cost-header">Cost</th>
                    <th className="action-header">Actions</th>
                </tr>
            </thead>
            <tbody>
                {categoryItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>${item.amount}</td>
                        <td>
                            <span onClick={() => onDelete(item)}>
                                <DeleteRoundedIcon 
                                    className="delete-icon"
                                />
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BudgetTable;