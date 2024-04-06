import { TemplateMethod } from "./template_method.js";

/**
 * Clase que extiende TemplateMethod para filtrar, mapear, y luego reducir una lista de números.
 */
export class FilterMapAddReduce extends TemplateMethod {
  /**
   * Método de gancho que se ejecuta antes de aplicar la reducción.
   * @param mappedNumbers - Lista de números mapeados.
   * @returns Un mensaje descriptivo del proceso antes de aplicar la reducción.
   */
  beforeReduce(mappedNumbers: number[]): string | void {
    console.log("Vamos a aplicar \"reduce\" con una suma a los números ya filtrados y transformados:", mappedNumbers);
    return "Vamos a aplicar \"reduce\" con una suma a los números ya filtrados y transformados: " + mappedNumbers;
  }

  /**
   * Reduce una lista de números sumándolos.
   * @param numbers - Lista de números a reducir.
   * @returns El resultado de la reducción.
   */
  reduce(numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0);
  }

  /**
   * Método de gancho que se ejecuta después de aplicar la reducción.
   * @param result - Resultado de la reducción.
   * @returns Un mensaje descriptivo del resultado de aplicar la reducción.
   */
  afterReduce(result: number): string | void {
    console.log("El resultado de aplicar \"reduce\" con una suma es:", result);
    return "El resultado de aplicar \"reduce\" con una suma es: " + result;
  }
}
