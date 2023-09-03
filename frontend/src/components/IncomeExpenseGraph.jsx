import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

// IncomeExpenseGraph displays a bar chart representing income and expenses for different months
function IncomeExpenseGraph({ allUserBudgets }) {
    // formatData takes an array of budgets and transforms into the format needed for the bar chart
    const formatData = (budgets) => {
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return budgets.map((budget) => ({
            month: `${monthNames[budget.month - 1]} ${budget.year}`,
            income: calculateTotalIncome(budget.categories),
            expenses: calculateTotalExpenses(budget.categories),
        }));
    };

    // Function to calculate the total income from the income category
    const calculateTotalIncome = (categories) => {
        return categories.income.reduce((sum, item) => sum + parseInt(item.amount), 0);
    };

    // Function to calculate the total expense from the housing, recurring, and additional expense categories
    const calculateTotalExpenses = (categories) => {
        const { housing, recurring, additional } = categories;
        const housingTotal = housing.reduce((sum, item) => sum + parseInt(item.amount), 0);
        const recurringTotal = recurring.reduce((sum, item) => sum + parseInt(item.amount), 0);
        const additionalTotal = additional.reduce((sum, item) => sum + parseInt(item.amount), 0);
        return housingTotal + recurringTotal + additionalTotal;
    };

    return (
        <div className="card card-graph">
            <BarChartRoundedIcon className="icon icon-graph"/>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formatData(allUserBudgets)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#3e525d" maxBarSize={40} />
                    <Bar dataKey="expenses" fill="#b6613c" maxBarSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default IncomeExpenseGraph;