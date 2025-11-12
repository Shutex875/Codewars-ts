/**
 * ATM machines allow 4 or 6 digit PIN codes and PIN codes cannot contain anything but exactly 4 digits or exactly 6 digits.
 * If the function is passed a valid PIN string, return true, else return false.
 * Examples:
 * validatePIN("1234")   => true
 * validatePIN("12345")  => false
 * validatePIN("a234")   => false
 * validatePIN("123456") => true
 * validatePIN("1.234")  => false
 * validatePIN("-1234")  => false
 */
export function validatePIN(pin: string): boolean {
  const len = pin.length;
  if (len !== 4 && len !== 6) return false;
  for (let i = 0; i < len; i++) {
    if (pin[i] < "0" || pin[i] > "9") return false;
  }
  return true;
}
