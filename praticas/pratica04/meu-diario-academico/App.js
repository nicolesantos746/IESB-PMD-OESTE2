import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  titulo_app,
  placeholder_disciplina,
  texto_botao,
  titulo_lista,
} from './labels';

export default function App() {

  const disciplinas = [
    'Programação para Dispositivos Móveis',
    'Banco de Dados',
    'Engenharia de Software',
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <Text style={styles.title}>
          {titulo_app}
        </Text>

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            placeholder={placeholder_disciplina}
          />

          <View style={styles.buttonContainer}>
            <Button title={texto_botao} />
          </View>

        </View>

        <View style={styles.listContainer}>

          <Text style={styles.listTitle}>
            {titulo_lista}
          </Text>

          {disciplinas.map((disciplina, index) => (
            <Text
              key={index}
              style={styles.item}
            >
              {disciplina}
            </Text>
          ))}

        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,

    // column organiza os elementos verticalmente.
    flexDirection: 'column',

    // Centraliza os elementos no eixo horizontal.
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  inputContainer: {
    width: '100%',

    // Coloca o input e o botão lado a lado.
    flexDirection: 'row',

    // Distribui o espaço entre os elementos.
    justifyContent: 'space-between',

    alignItems: 'center',
  },

  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
  },

  buttonContainer: {
    width: '25%',
  },

  listContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  item: {
    margin: 5,
    padding: 15,
    backgroundColor: '#eeeeee',
    borderRadius: 8,
  },

});