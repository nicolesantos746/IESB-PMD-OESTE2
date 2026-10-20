import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColors } from '../../constants/theme';

export function getDataFormatada(date) {
  return new Date(date).toLocaleDateString('pt-BR');
}

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = getColors(useColorScheme());

  return (
    <Pressable onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: id })}>
      <View style={[styles.item, { backgroundColor: colors.surface }]}>
        <View style={styles.esquerda}>
          <Text style={[styles.descricao, { color: colors.text }]}>{description}</Text>
          <Text style={[styles.data, { color: colors.textSecondary }]}>{getDataFormatada(date)}</Text>
          <View style={[styles.tag, { backgroundColor: colors.tag }]}>
            <Text style={[styles.tagTexto, { color: colors.tagText }]}>{category}</Text>
          </View>
        </View>
        <Text style={[styles.valor, { color: colors.primary }]}>R$ {amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.25)' },
    }),
  },
  esquerda: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  data: { marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagTexto: { fontSize: 12, fontWeight: '600' },
  valor: { fontSize: 16, fontWeight: 'bold' },
});