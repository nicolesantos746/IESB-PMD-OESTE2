import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// NOVO: função de filtragem com .filter()
function filtrarPorCategoria(despesas, categoriaSelecionada) {
  if (categoriaSelecionada === 'Todas') return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoriaSelecionada);
}

export default function TodasDespesas({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaSelecionada);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtros}>
          {['Todas', ...CATEGORIAS].map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategoriaSelecionada(cat)}
              style={[styles.chip, categoriaSelecionada === cat && styles.chipAtivo]}
            >
              <Text style={categoriaSelecionada === cat ? styles.chipTextoAtivo : styles.chipTexto}>{cat}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* A lista filtrada vai como prop para o DespesaSaida */}
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoriaSelecionada === 'Todas' ? 'Total' : categoriaSelecionada}
        textoFallback="Nenhuma despesa encontrada."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  filtros: { padding: 12, gap: 8 },
  chip: {
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20,
    borderWidth: 1, borderColor: '#999',
  },
  chipAtivo: { backgroundColor: '#3f51b5', borderColor: '#3f51b5' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
});