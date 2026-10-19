import { StyleSheet, Text, View } from 'react-native';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({ despesas, periodo, textoFallback }) {
  const conteudo =
    despesas.length > 0 ? (
      <DespesaLista despesas={despesas} />
    ) : (
      <Text style={styles.info}>{textoFallback}</Text>
    );

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {conteudo}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  info: { textAlign: 'center', marginTop: 32, fontSize: 16, color: '#666' },
});