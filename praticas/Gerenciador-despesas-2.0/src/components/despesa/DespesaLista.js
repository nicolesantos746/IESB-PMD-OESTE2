import { FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors } from '../../constants/theme';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, mensagemVazia }) {
  const colors = getColors(useColorScheme());

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem {...item} />}
      contentContainerStyle={despesas.length === 0 && styles.vazioContainer}
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="wallet-outline" size={56} color={colors.textSecondary} />
          <Text style={[styles.vazioTexto, { color: colors.textSecondary }]}>{mensagemVazia}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  vazioContainer: { flexGrow: 1, justifyContent: 'center' },
  vazio: { alignItems: 'center', padding: 24 },
  vazioTexto: { marginTop: 12, fontSize: 16, textAlign: 'center' },
});