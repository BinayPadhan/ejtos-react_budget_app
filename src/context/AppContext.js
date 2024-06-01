import React, { createContext, useReducer, useState } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0) + action.payload.cost;
            if (totalExpenses <= state.budget) {
                const updatedExpenses = state.expenses.map(expense => {
                    if (expense.name === action.payload.name) {
                        return { ...expense, cost: expense.cost + action.payload.cost };
                    }
                    return expense;
                });
                return { ...state, expenses: updatedExpenses };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }
        }
        case 'SUB_EXPENSE': {
            const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0) - action.payload.cost;
            if (totalExpenses >= 0) {
                const updatedExpenses = state.expenses.map(expense => {
                    if (expense.name === action.payload.name) {
                        return { ...expense, cost: expense.cost - action.payload.cost };
                    }
                    return expense;
                });
                return { ...state, expenses: updatedExpenses };
            } else {
                alert("Cannot decrease the allocation! Out of funds");
                return state;
            }
        }

        case 'RED_EXPENSE': {
            const updatedExpenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name && expense.cost >= action.payload.cost) {
                    return { ...expense, cost: expense.cost - action.payload.cost };
                }
                return expense;
            });
            return { ...state, expenses: updatedExpenses };
        }

        case 'DELETE_EXPENSE': {
            const updatedExpenses = state.expenses.filter(expense => expense.name !== action.payload);
            return { ...state, expenses: updatedExpenses };
        }

        case 'SET_BUDGET': {
            return { ...state, budget: action.payload };
        }

        case 'CHG_CURRENCY': {
            return { ...state, currency: action.payload };
        }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// Define a Provider component that wraps other components and provides them with access to the state
export const AppProvider = (props) => {
    // Use the useReducer hook to manage the application state using a reducer function
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Use the useState hook to create a state variable called newBudget and a function called setNewBudget
    const [newBudget, setNewBudget] = useState(state.budget);

    // Use the useState hook to create a state variable called 
    const [currency, setCurrency] = useState(state.currency);

    // Calculate the total expenses by summing up the cost property of each expense item using the reduce method
    const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);

    // Calculate the remaining budget based on the total expenses and the current budget
    const remaining = newBudget - totalExpenses;

    // Define a function called handleNewBudgetChange that updates the newBudget state whenever the input field's value changes
    const handleNewBudgetChange = (value) => {
        // Set the newBudget state to the value of the input field
        setNewBudget(value);
    };

    const handleCurrencyChange = (currencyValue) => {
        setCurrency(currencyValue);
    };


    // Return a Provider component that provides the state and other values to its child components
    return (
        <AppContext.Provider
            value={{
                totalExpenses: totalExpenses,
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: currency,
                newBudget: newBudget,
                handleNewBudgetChange: handleNewBudgetChange,
                handleCurrencyChange: handleCurrencyChange
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
