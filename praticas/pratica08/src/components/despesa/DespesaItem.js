import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function getDataFormatada(data) {
  return data.toLocaleDateString('pt-BR');
}

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('GerenciarDespesa', { despesaId: id })}>
      <View style={styles.item}>
        <View style={styles.esquerda}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          {/* NOVO: categoria destacada (tag cinza claro, bordas arredondadas) */}
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 12, marginVertical: 6, backgroundColor: '#3f51b5',
    borderRadius: 8, elevation: 3,
  },
  esquerda: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  data: { color: '#e0e0e0', marginBottom: 6 },
  categoriaTag: {
    alignSelf: 'flex-start', backgroundColor: '#e0e0e0',
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12,
  },
  categoriaTexto: { fontSize: 12, color: '#333', fontWeight: '600' },
  valorContainer: {
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#fff', paddingHorizontal: 12, borderRadius: 6, minWidth: 90,
  },
  valor: { fontWeight: 'bold', color: '#3f51b5' },
});