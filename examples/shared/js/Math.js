export function truncate(number, decimalPlaces = 0)
{
  if (decimalPlaces === 0)
    return Math.round(number)

  const multiplier = Math.pow(10, decimalPlaces)

  return Math.round(number * multiplier) / multiplier
}
