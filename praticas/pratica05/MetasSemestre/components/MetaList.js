import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

function MetaItem({ item, onDelete, onToggle }) {
  return (
    <View style={styles.item}>
      <Pressable style={{ flex: 1 }} onPress={() => onToggle && onToggle(item.id)}>
        <Text style={[styles.texto, item.concluida && styles.textoConcluido]}>
          {item.texto}
        </Text>
        <Text style={styles.data}>
          Criada em: {new Date(item.criadaEm).toLocaleDateString()}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteText}>X</Text>
      </Pressable>
    </View>
  );
}

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MetaItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  texto: {
    fontSize: 16,
    color: '#222',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  data: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});