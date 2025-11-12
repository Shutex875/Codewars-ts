/**
 * ROT13 is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet.
 * ROT13 is an example of the Caesar cipher.
 * Create a function that takes a string and returns the string ciphered with Rot13. If there are numbers or special
 * characters included in the string, they should be returned as they are. Only letters from the latin/english alphabet
 * should be shifted, like in the original Rot13 "implementation".
 */
function rot13(message: string): string {
  const alphabet: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const rot13Alphabet: string =
    "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";
  let result: string = "";
  for (let i = 0; i < message.length; i++) {
    const char: string = message[i];
    const index: number = alphabet.indexOf(char);
    if (index !== -1) {
      result += rot13Alphabet[index];
    } else {
      result += char;
    }
  }
  return result;
}
