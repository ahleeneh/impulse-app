import React from 'react';

// CategoryCard component to display a card with a icon, title, and amount for a category
function CategoryCard({ icon, title, amount }) {
    return (
        <div className="card">
            {icon}
            <p>{amount}</p>
            <h3>{title}</h3>
        </div>
    );
}

export default CategoryCard;