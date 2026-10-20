import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Sempre retorna um novo array (sem push, splice ou mutação direta)
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ao iniciar: carrega os dados salvos e dispara SET
  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: 'SET', payload: JSON.parse(stored) });
        }
      } catch (error) {
        console.warn('Erro ao carregar as despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // A cada alteração: salva a lista (só depois de carregar, para não
  // sobrescrever os dados salvos com a lista vazia inicial)
  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar as despesas:', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(data) {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
    dispatch({ type: 'ADD', payload: { ...data, id } });
  }

  function updateExpense(id, data) {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const value = { expenses, addExpense, updateExpense, deleteExpense };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}