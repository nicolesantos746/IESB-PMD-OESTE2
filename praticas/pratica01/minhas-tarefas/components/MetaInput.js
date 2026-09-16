import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';

function MetaInput(props) {
  const [inputMetaText, setInputMetaText] = useState('');

  // Captura o texto digitado no campo
  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  // Dispara o evento de adicionar para o App.js
  function addMetaHandler() {
    if (inputMetaText.trim().length === 0) return; // Evita cadastrar texto vazio
    props.onAddMeta(inputMetaText);
    setInputMetaText(''); // Limpa a caixinha de texto
  }

  return (
    <View style={styles.inputContainer}>
      <View style={{ width: '65%' }}>
        <TextInput
          style={styles.inputText}
          placeholder={rotulo_input_meta}
          onChangeText={metaInputHandler}
          value={inputMetaText}
        />
      </View>
      <View style={{ width: '30%' }}>
        <Button
          title={rotulo_btn_cadastro_meta}
          onPress={addMetaHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 8,
  },
});

export default MetaInput;