import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

export default function DespesaSumario({ despesas, periodo }) {
  const colors = getColors(useColorScheme());

  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.amount, 0);
  const quantidade = despesas.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.summary }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.primary }]}>{periodo}</Text>
        <Text style={{ color: colors.textSecondary }}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.soma, { color: colors.primary }]}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { fontSize: 14, fontWeight: '600' },
  soma: { fontSize: 18, fontWeight: 'bold' },
});