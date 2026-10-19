import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      {/* BÔNUS: vermelho se ultrapassar R$ 200,00; senão, cor padrão */}
      <Text style={[styles.soma, somaDespesas > 200 && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10, backgroundColor: '#e8eaf6', borderRadius: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  periodo: { fontSize: 14, color: '#3f51b5' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#3f51b5' },
  somaAlta: { color: 'red' },
});