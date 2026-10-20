import { createElement, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { getDataFormatada } from '../components/despesa/DespesaItem';
import { CATEGORIES, getColors } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';

// O DateTimePicker só é carregado no celular (não existe versão para web)
const DateTimePicker =
  Platform.OS === 'web' ? null : require('@react-native-community/datetimepicker').default;

function inicioDoDia(date) {
  const copia = new Date(date);
  copia.setHours(0, 0, 0, 0);
  return copia;
}

// Formato yyyy-mm-dd do input de data da web
function dataParaInput(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Retorna um objeto errors com uma mensagem por campo inválido
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (!amount || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (inicioDoDia(values.date) > inicioDoDia(new Date())) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  // Estado único do formulário (já abre preenchido no modo edição)
  const [form, setForm] = useState(() => {
    const existing = expenses.find((expense) => expense.id === expenseId);
    if (existing) {
      return {
        description: existing.description,
        amount: existing.amount.toString(),
        date: new Date(existing.date),
        category: existing.category,
      };
    }
    return { description: '', amount: '', date: new Date(), category: '' };
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  // Atualiza um campo com spread; se o campo estava com erro, revalida
  // para a mensagem sumir assim que ele for corrigido
  function handleChange(field, value) {
    const newForm = { ...form, [field]: value };
    setForm(newForm);

    if (errors[field]) {
      const newErrors = validate(newForm);
      setErrors((current) => ({ ...current, [field]: newErrors[field] }));
    }
  }

  // Máscara de valor: no máximo 2 casas decimais
  function handleAmountChange(text) {
    if (/^\d*\.?\d{0,2}$/.test(text)) {
      handleChange('amount', text);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowPicker(false);
    if (selectedDate) handleChange('date', selectedDate);
  }

  function handleSave() {
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    function confirmDelete() {
      deleteExpense(expenseId);
      navigation.goBack();
    }

    // Alert.alert não funciona na web, então usamos window.confirm nela
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja realmente excluir esta despesa?')) confirmDelete();
      return;
    }

    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: confirmDelete },
    ]);
  }

  // Estilo do campo, com borda vermelha quando há erro
  function inputStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: colors.inputBg,
        borderColor: errors[field] ? colors.error : colors.border,
      },
    ];
  }

  function renderError(field) {
    return errors[field] ? (
      <Text style={[styles.errorText, { color: colors.error }]}>{errors[field]}</Text>
    ) : null;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          style={[inputStyle('description'), { color: colors.text }]}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex: Almoço"
          placeholderTextColor={colors.textSecondary}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          style={[inputStyle('amount'), { color: colors.text }]}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={handleAmountChange}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        {Platform.OS === 'web' ? (
          createElement('input', {
            type: 'date',
            value: dataParaInput(form.date),
            onChange: (e) => {
              if (e.target.value) {
                const [ano, mes, dia] = e.target.value.split('-');
                handleChange('date', new Date(ano, mes - 1, dia));
              }
            },
            style: {
              padding: 10,
              fontSize: 16,
              borderRadius: 6,
              border: `1px solid ${errors.date ? colors.error : colors.border}`,
              backgroundColor: colors.inputBg,
              color: colors.text,
              colorScheme: colorScheme === 'dark' ? 'dark' : 'light',
            },
          })
        ) : (
          <>
            <Pressable style={inputStyle('date')} onPress={() => setShowPicker(true)}>
              <Text style={{ color: colors.text }}>{getDataFormatada(form.date)}</Text>
            </Pressable>
            {showPicker && <DateTimePicker value={form.date} mode="date" onChange={handleDateChange} />}
          </>
        )}
        {renderError('date')}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setModalVisible(true)}>
          <Text style={{ color: form.category ? colors.text : colors.textSecondary }}>
            {form.category || 'Selecione a categoria'}
          </Text>
        </Pressable>
        {renderError('category')}

        <View style={styles.botoes}>
          <Pressable
            style={[styles.botao, { backgroundColor: colors.tag }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: colors.tagText, fontWeight: 'bold' }}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.botao, { backgroundColor: colors.primary }]} onPress={handleSave}>
            <Text style={styles.botaoSalvarTexto}>Salvar</Text>
          </Pressable>
        </View>

        {isEditing && (
          <Pressable style={[styles.botaoExcluir, { borderColor: colors.error }]} onPress={handleDelete}>
            <Text style={{ color: colors.error, fontWeight: 'bold' }}>Excluir despesa</Text>
          </Pressable>
        )}
      </ScrollView>

      {/* Categoria escolhida em Modal: sem digitação livre */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitulo, { color: colors.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[styles.opcao, { borderBottomColor: colors.border }]}
                onPress={() => {
                  handleChange('category', category);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: form.category === category ? colors.primary : colors.text,
                    fontWeight: form.category === category ? 'bold' : 'normal',
                    fontSize: 16,
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, fontSize: 16 },
  errorText: { fontSize: 12, marginTop: 4 },
  botoes: { flexDirection: 'row', gap: 12, marginTop: 30 },
  botao: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoSalvarTexto: { color: '#fff', fontWeight: 'bold' },
  botaoExcluir: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  modalContent: { padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  opcao: { paddingVertical: 14, borderBottomWidth: 1 },
});