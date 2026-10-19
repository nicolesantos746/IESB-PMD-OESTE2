import { createElement, useEffect, useState } from 'react';
import { Alert, Button, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getDataFormatada } from '../components/despesa/DespesaItem';

// O DateTimePicker só é carregado no celular (não existe versão para web)
const DateTimePicker =
  Platform.OS === 'web' ? null : require('@react-native-community/datetimepicker').default;

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Alert.alert não funciona na web, então usamos window.alert nela
function avisar(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

// Converte a data para o formato yyyy-mm-dd do input de data da web
function dataParaInput(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export default function GerenciarDespesa({ route, navigation, despesas, adicionarDespesa, atualizarDespesa }) {
  const despesaId = route.params?.despesaId;
  const editando = !!despesaId;

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [categoria, setCategoria] = useState(''); // NOVO (conforme o enunciado)

  // Se for edição, preenche os campos com a despesa existente
  useEffect(() => {
    if (editando) {
      const despesa = despesas.find((d) => d.id === despesaId);
      if (despesa) {
        setDescricao(despesa.descricao);
        setValor(despesa.valor.toString());
        setData(despesa.data);
        setCategoria(despesa.categoria);
      }
    }
  }, []);

  // Mantido: Regex para limitar a duas casas decimais
  function tratarValor(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  // Mantido: seleção de data com @react-native-community/datetimepicker
  function aoMudarData(evento, dataSelecionada) {
    setMostrarPicker(false);
    if (dataSelecionada) setData(dataSelecionada);
  }

  function confirmar() {
    const valorNumero = parseFloat(valor);

    // NOVO: valida descrição, valor e categoria
    if (!descricao.trim() || !valorNumero || !categoria) {
      avisar('Dados inválidos', 'Preencha descrição, valor e categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumero, data, categoria };

    if (editando) {
      atualizarDespesa(despesaId, dados);
    } else {
      adicionarDespesa(dados);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Ex: Almoço" />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={tratarValor}
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      {Platform.OS === 'web' ? (
        createElement('input', {
          type: 'date',
          value: dataParaInput(data),
          onChange: (e) => {
            if (e.target.value) {
              const [ano, mes, dia] = e.target.value.split('-');
              setData(new Date(ano, mes - 1, dia));
            }
          },
          style: {
            padding: 10, fontSize: 16, borderRadius: 6,
            border: '1px solid #ccc', backgroundColor: '#fafafa',
          },
        })
      ) : (
        <>
          <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
            <Text>{getDataFormatada(data)}</Text>
          </Pressable>
          {mostrarPicker && <DateTimePicker value={data} mode="date" onChange={aoMudarData} />}
        </>
      )}

      {/* NOVO: seleção de categoria com Pressable lado a lado */}
      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.botaoCategoria, categoria === cat && styles.categoriaAtiva]}
          >
            <Text style={categoria === cat ? styles.textoAtivo : styles.textoCategoria}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.botoes}>
        <Button title="Cancelar" color="gray" onPress={() => navigation.goBack()} />
        <Button title={editando ? 'Atualizar' : 'Adicionar'} onPress={confirmar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 10, fontSize: 16, backgroundColor: '#fafafa',
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  botaoCategoria: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
    borderWidth: 1, borderColor: '#999',
  },
  categoriaAtiva: { backgroundColor: '#3f51b5', borderColor: '#3f51b5' },
  textoCategoria: { color: '#333' },
  textoAtivo: { color: '#fff', fontWeight: 'bold' },
  botoes: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
});