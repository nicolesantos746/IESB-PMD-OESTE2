// Lista de categorias (usada no Modal do formulário)
export const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export const theme = {
  light: {
    background: '#f5f5f7',
    surface: '#ffffff',
    summary: '#e8eaf6',
    text: '#1c1c1e',
    textSecondary: '#6b6b6b',
    primary: '#3f51b5',
    border: '#cccccc',
    inputBg: '#fafafa',
    tag: '#e0e0e0',
    tagText: '#333333',
    error: '#d32f2f',
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    background: '#121212',
    surface: '#1e1e1e',
    summary: '#262b4d',
    text: '#f2f2f2',
    textSecondary: '#a0a0a0',
    primary: '#8c9eff',
    border: '#3a3a3a',
    inputBg: '#1a1a1a',
    tag: '#3a3a3a',
    tagText: '#e0e0e0',
    error: '#ff6b6b',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

// Recebe o valor do useColorScheme() e devolve as cores do modo
export function getColors(colorScheme) {
  return colorScheme === 'dark' ? theme.dark : theme.light;
}