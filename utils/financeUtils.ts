export function processChartData(data: any[]) {
  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const resultado = meses.map((mes, index) => {
    const mesNumero = index + 1;

    const receitas = data
      .filter(item => item.mes === mesNumero && item.valor > 0)
      .reduce((acc, item) => acc + Number(item.valor), 0);

    const despesas = data
      .filter(item => item.mes === mesNumero && item.valor < 0)
      .reduce((acc, item) => acc + Math.abs(Number(item.valor)), 0);

    return {
      name: mes,
      receita: receitas,
      despesa: despesas
    };
  });

  return resultado;
}

export function processCategoryData(data: any[]) {
  const categorias: any = {};

  data.forEach(item => {
    const cat = item.categoria;

    if (!categorias[cat]) {
      categorias[cat] = 0;
    }

    categorias[cat] += Math.abs(Number(item.valor));
  });

  return Object.keys(categorias).map(cat => ({
    name: cat,
    value: categorias[cat]
  }));
}
