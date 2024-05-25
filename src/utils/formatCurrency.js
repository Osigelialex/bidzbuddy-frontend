export const formatCurrency = (amount) => {
  return Intl.NumberFormat('en-US').format(amount);
}