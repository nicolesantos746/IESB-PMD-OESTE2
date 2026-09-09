import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setMetas(JSON.parse(dados));
        }
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
        Alert.alert('Erro', 'Não foi possível carregar suas metas salvas.');
      } finally {
        setCarregando(false);
      }
    }
    carregarMetas();
  }, []);

  useEffect(() => {
    if (carregando) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        console.error('Erro ao salvar metas:', error);
        Alert.alert('Erro', 'Não foi possível salvar suas metas.');
      }
    }
    salvarMetas();
  }, [metas, carregando]);

  function handleAdicionar() {
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((prev) => [novaMeta, ...prev]);
    setTexto('');
  }

  function handleRemover(id) {
    setMetas((prev) => prev.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((prev) =>
      prev.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
        />

        <MetaList
          metas={metas}
          onDelete={handleRemover}
          onToggle={handleToggle}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  contador: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});