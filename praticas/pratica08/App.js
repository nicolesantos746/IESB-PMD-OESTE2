import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

// NOVO: atributo categoria em cada objeto
const DESPESAS_INICIAIS = [
  { id: 'e1', descricao: 'Almoço', valor: 35.9, data: new Date(), categoria: 'Alimentação' },
  { id: 'e2', descricao: 'Uber', valor: 24.5, data: new Date(), categoria: 'Transporte' },
  { id: 'e3', descricao: 'Cinema', valor: 48.0, data: new Date(2026, 9, 1), categoria: 'Lazer' },
  { id: 'e4', descricao: 'Conta de luz', valor: 150.75, data: new Date(2026, 8, 20), categoria: 'Contas' },
  { id: 'e5', descricao: 'Mercado', valor: 89.9, data: new Date(2026, 9, 15), categoria: 'Alimentação' },
];

function VisaoGeral({ despesas }) {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 28, color: '#3f51b5' }}>+</Text>
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen name="DespesasRecentes" options={{ title: 'Recentes' }}>
        {() => <DespesasRecentes despesas={despesas} />}
      </Tabs.Screen>
      <Tabs.Screen name="TodasDespesas" options={{ title: 'Todas' }}>
        {() => <TodasDespesas despesas={despesas} />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(dados) {
    setDespesas((atual) => [{ ...dados, id: Date.now().toString() }, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VisaoGeral" options={{ headerShown: false }}>
          {() => <VisaoGeral despesas={despesas} />}
        </Stack.Screen>
        <Stack.Screen name="GerenciarDespesa" options={{ presentation: 'modal' }}>
          {(props) => (
            <GerenciarDespesa
              {...props}
              despesas={despesas}
              adicionarDespesa={adicionarDespesa}
              atualizarDespesa={atualizarDespesa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}