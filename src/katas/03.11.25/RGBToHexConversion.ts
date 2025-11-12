/**
 * The rgb function is incomplete. Complete it so that passing in RGB decimal values
 * will result in a hexadecimal representation being returned.
 * Valid decimal values for RGB are 0 - 255.
 * Any values that fall out of that range must be rounded to the closest valid value.
 *
 * Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.
 *
 * Examples:
 * rgb(255, 255, 255) => "FFFFFF"
 * rgb(255, 255, 300) => "FFFFFF"
 * rgb(0, 0, 0)       => "000000"
 * rgb(148, 0, 211)   => "9400D3"
 */
export function rgb(r: number, g: number, b: number): string {
  const clamp = (x: number): number => Math.max(0, Math.min(255, x));
  return [r, g, b]
    .map((x) => clamp(x).toString(16).toUpperCase().padStart(2, "0"))
    .join("");
}
