import { useMemo } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const recentes = useMemo(() => {
    const limite = new Date();
    limite.setHours(0, 0, 0, 0);
    limite.setDate(limite.getDate() - 7);

    const fimDoDia = new Date();
    fimDoDia.setHours(23, 59, 59, 999);

    return expenses.filter((expense) => {
      const data = new Date(expense.date);
      return data >= limite && data <= fimDoDia;
    });
  }, [expenses]);

  return (
    <DespesaSaida
      despesas={recentes}
      periodo="Últimos 7 dias"
      mensagemVazia="Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar."
    />
  );
}