import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

function MetasList(props) {
  return (
    <FlatList
      data={props.array}
      renderItem={(itemData) => (
        <Pressable onPress={() => props.onDeleteMeta(itemData.index)}>
          <Text style={styles.item}>{itemData.item}</Text>
        </Pressable>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightblue',
  },
});

export default MetasList;