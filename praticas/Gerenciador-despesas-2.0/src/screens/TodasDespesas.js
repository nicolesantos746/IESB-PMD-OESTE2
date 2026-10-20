import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getColors } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const colors = getColors(useColorScheme());

  const [busca, setBusca] = useState('');
  const buscaDebounced = useDebounce(busca, 400);

  // Busca por descrição, sem diferenciar maiúsculas/minúsculas
  const despesasFiltradas = useMemo(() => {
    const termo = buscaDebounced.trim().toLowerCase();
    if (!termo) return expenses;
    return expenses.filter((expense) => expense.description.toLowerCase().includes(termo));
  }, [expenses, buscaDebounced]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[
          styles.busca,
          { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border },
        ]}
        placeholder="Buscar por descrição"
        placeholderTextColor={colors.textSecondary}
        value={busca}
        onChangeText={setBusca}
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={buscaDebounced.trim() ? 'Resultado da busca' : 'Total'}
        mensagemVazia={
          buscaDebounced.trim()
            ? 'Nenhuma despesa encontrada para essa busca.'
            : 'Nenhuma despesa. Toque em + para adicionar.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  busca: {
    margin: 16,
    marginBottom: 0,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
  },
});