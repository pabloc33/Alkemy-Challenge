export const totalEgressIngress = (arr, key) =>
  arr
    ?.filter((item) => item.types === key)
    .map((item) => item.amount)
    .reduce((sum, value) => sum + value, 0);
