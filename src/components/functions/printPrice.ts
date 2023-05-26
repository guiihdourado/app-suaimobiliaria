const printPrice = (
  value: any,
  currencyCode?: string,
  locale?: any,
): string => {
  return new Intl.NumberFormat(locale || 'pt-BR', {
    style: 'currency',
    currency: currencyCode || 'BRL',
  }).format(value)
}

export { printPrice }
