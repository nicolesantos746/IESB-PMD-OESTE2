// components/CompromissoList.js
import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>{listaVazia}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemTexto}>
              <Text style={styles.itemTitulo}>{item.texto}</Text>
              <Text style={styles.itemData}>{item.criadoEm}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoRemoverPressionado,
              ]}
              android_ripple={{ color: '#7f1d1d' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.botaoRemoverTexto}>X</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e293b',
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    color: '#94a3b8',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemTexto: {
    flex: 1,
    marginRight: 10,
  },
  itemTitulo: {
    fontSize: 15,
    color: '#0f172a',
  },
  itemData: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  botaoRemover: {
    backgroundColor: '#dc2626',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoRemoverPressionado: {
    opacity: 0.7,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
