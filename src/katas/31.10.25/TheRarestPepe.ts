/**
 * You are given an array of Pepes (strings) and need to find the rarest one.
 * The rarest Pepe is the one with the lowest frequency in the array.
 * Rules:
 * - If the rarest Pepe has frequency of 5 or more, return "No rare pepes!"
 * - If there is only one rarest Pepe, return it as a string
 * - If there are multiple pepes with the same lowest frequency, return them sorted alphabetically in an array
 * Examples:
 * findRarestPepe(['Pepe', 'Pepe', 'Pepe']) => "No rare pepes!"
 * findRarestPepe(['Pepe', 'Kappa', 'Pepe']) => "Kappa"
 * findRarestPepe(['Pepe', 'Kappa', 'DatBoi', 'Kappa']) => ["DatBoi", "Pepe"]
 */
export function findRarestPepe(pepes: string[]): string | string[] {
  const freq: { [key: string]: number } = {};
  for (const pepe of pepes) {
    freq[pepe] = (freq[pepe] || 0) + 1;
  }
  const frequencies = Object.values(freq);
  const minFreq = Math.min(...frequencies);
  if (minFreq >= 5) return "No rare pepes!";
  const rarest = Object.keys(freq).filter((p) => freq[p] === minFreq);
  return rarest.length > 1 ? rarest.sort() : rarest[0];
}
