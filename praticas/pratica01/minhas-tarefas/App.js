import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MetaInput from './components/MetaInput';
import MetasList from './components/MetasList';

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    if (inputMeta.trim().length === 0) return;
    setMetas((metasAtuais) => [...metasAtuais, inputMeta]);
  }

  function deletarMetaHandler(indexParaRemover) {
    setMetas((metasAtuais) => {
      return metasAtuais.filter((meta, index) => index !== indexParaRemover);
    });
  }

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />
      <View style={styles.metaContainer}>
        <MetasList array={metas} onDeleteMeta={deletarMetaHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },
  metaContainer: {
    flex: 15,
  },
});