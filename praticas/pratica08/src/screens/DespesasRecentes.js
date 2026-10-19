import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ despesas }) {
  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  const recentes = despesas.filter((d) => d.data >= seteDiasAtras && d.data <= hoje);

  return (
    <DespesaSaida
      despesas={recentes}
      periodo="Últimos 7 dias"
      textoFallback="Nenhuma despesa nos últimos 7 dias."
    />
  );
}