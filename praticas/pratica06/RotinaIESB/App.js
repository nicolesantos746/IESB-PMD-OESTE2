import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        Alert.alert('Erro', labels.erroCarregarDados);
      } finally {
        setCarregado(true);
      }
    }

    carregarCompromissos();
  }, []);


  useEffect(() => {
    
    if (!carregado) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert('Erro', labels.erroSalvarDados);
      }
    }

    salvarCompromissos();
  }, [compromissos, carregado]);

  function handleAdd() {
    if (texto.trim().length === 0) {
      Alert.alert('Atenção', labels.erroTextoVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  function handleDelete(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  const pendentes = compromissos.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <View>
              <Text style={styles.tituloApp}>{labels.tituloApp}</Text>
              <Text style={styles.contador}>{pendentes} pendentes</Text>
            </View>
          </View>

          {/* Formulário */}
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdd}
            labels={labels}
          />

          {/* Lista */}
          <CompromissoList
            itens={compromissos}
            onDelete={handleDelete}
            tituloLista={labels.tituloLista}
            listaVazia={labels.listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  tituloApp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  contador: {
    fontSize: 12,
    color: '#475569',
  },
});