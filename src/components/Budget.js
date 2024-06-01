
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, handleNewBudgetChange, remaining, currency} = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [error, setError] = useState('');
    const handleBudgetChange = (event) => {
        let value = event.target.value;
        // setNewBudget(event.target.value);
        handleNewBudgetChange(value);

        if (value > 20000) {
            setError('Budget cannot exceed £20,000');
            alert(`The value can not exceed ${currency}20,000 `);
        } else {
            setError('');
            setNewBudget(value);
        }

        if(remaining < 0) {
            alert(`You cannot reduce the budget value lower than the spending`)
        }
    }
    return (
<div className='alert alert-secondary' style={{ display: 'flex' }}>
<span>Budget: {currency}</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;