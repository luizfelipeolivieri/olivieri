export function getPrice(data: any[], produto: string, mercado: string) {
  const item = data.find(
    d => d.produto === produto && d.supermercado === mercado
  );

  return item?.preco || 0;
}

export function getIndicator(value: number, allValues: number[]) {
  const min = Math.min(...allValues.filter(v => v > 0));
  const max = Math.max(...allValues);

  if (value === min) return "▼";
  if (value === max) return "▲";
  return "";
}
