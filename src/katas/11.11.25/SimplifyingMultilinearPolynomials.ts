/**
 * When we attended middle school were asked to simplify mathematical expressions like "3x-yx+2xy-x" (or usually bigger),
 * and that was easy-peasy ("2x+xy"). But tell that to your pc and we'll see!
 * Write a function: simplify, that takes a string in input, representing a multilinear non-constant polynomial in integers
 * coefficients (like "3x-zx+2xy-x"), and returns another string as output where the same expression has been simplified in
 * the following way ( -> means application of simplify):
 * All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:
 * "cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"
 * All monomials appears in order of increasing number of variables, e.g.:
 * "-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"
 * If two monomials have the same number of variables, they appears in lexicographic order, e.g.:
 * "a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz"
 * There is no leading + sign if the first coefficient is positive, e.g.:
 * "-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y"
 * N.B. to keep it simplest, the string in input is restricted to represent only multilinear non-constant polynomials, so
 * you won't find something like `-3+yx^2'. Multilinear means in this context: of degree 1 on each variable.
 * Warning: the string in input can contain arbitrary variables represented by lowercase characters in the english alphabet.
 * Good Work :)
 */
function simplify(poly: string): string {
  const terms = poly.split(/(?=[+-])/);
  const monomials: { [key: string]: number } = {};
  for (let term of terms) {
    if (!term) continue;
    let sign = 1;
    if (term[0] === "+") {
      term = term.substring(1);
    } else if (term[0] === "-") {
      sign = -1;
      term = term.substring(1);
    }
    const match = term.match(/^(\d*)([a-z]*)$/);
    if (!match) continue;
    let coefficient = match[1] ? parseInt(match[1]) : 1;
    let variables = match[2];
    variables = variables.split("").sort().join("");
    monomials[variables] = (monomials[variables] || 0) + sign * coefficient;
  }
  const result: { vars: string; coef: number }[] = [];
  for (const [vars, coef] of Object.entries(monomials)) {
    if (coef !== 0) {
      result.push({ vars, coef });
    }
  }
  result.sort((a, b) => {
    if (a.vars.length !== b.vars.length) {
      return a.vars.length - b.vars.length;
    }
    return a.vars.localeCompare(b.vars);
  });
  const parts: string[] = [];
  for (const { vars, coef } of result) {
    if (coef === 0) continue;
    let term = "";
    if (coef === 1 && vars) {
      term = vars;
    } else if (coef === -1 && vars) {
      term = "-" + vars;
    } else if (coef === 1 && !vars) {
      term = "1";
    } else if (coef === -1 && !vars) {
      term = "-1";
    } else {
      term = coef.toString() + vars;
    }
    if (parts.length === 0) {
      parts.push(term);
    } else {
      parts.push(term[0] === "-" ? term : "+" + term);
    }
  }
  let final = parts.join("");
  if (final[0] === "+") {
    final = final.substring(1);
  }
  return final;
}
