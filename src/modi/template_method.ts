/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Clase abstracta que define un método de plantilla para procesar números.
 * @abstract
 */
export abstract class TemplateMethod {
  /**
   * Método abstracto que debe ser implementado por las clases hijas para reducir una lista de números.
   * @param numbers - Lista de números a reducir.
   * @returns El número reducido.
   */
  protected abstract reduce(numbers: number[]): number;
  
  /**
   * Filtra una lista de números según un predicado dado.
   * @param numbers - Lista de números a filtrar.
   * @param predicate - Función de predicado para filtrar los números.
   * @returns Lista de números filtrados.
   */
  filter(numbers: number[], predicate: (num: number) => boolean): number[] {
    const filteredNumbers: number[] = [];
    for (const num of numbers) {
      if (predicate(num)) filteredNumbers.push(num);
    }
    return filteredNumbers;
  }
  
  /**
   * Mapea una lista de números aplicando una transformación dada.
   * @param numbers - Lista de números a mapear.
   * @param transform - Función de transformación a aplicar a los números.
   * @returns Lista de números mapeados.
   */
  map(numbers: number[], transform: (num: number) => number): number[] {
    const mappedNumbers: number[] = [];
    for (const num of numbers) {
      mappedNumbers.push(transform(num));
    }
    return mappedNumbers;
  }
  
  /**
   * Procesa una lista de números mediante filtrado, mapeo y reducción.
   * @param numbers - Lista de números a procesar.
   * @param predicate - Función de predicado para filtrar los números.
   * @param transform - Función de transformación a aplicar a los números.
   * @returns El resultado del proceso.
   */
  process(numbers: number[], predicate: (num: number) => boolean, transform: (num: number) => number): number {
    this.beforeFilter(numbers);
    const filteredNumbers = this.filter(numbers, predicate);
    this.afterFilter(filteredNumbers);

    this.beforeMap(filteredNumbers);
    const mappedNumbers = this.map(filteredNumbers, transform);
    this.afterMap(mappedNumbers);

    this.beforeReduce(mappedNumbers);
    const result = this.reduce(mappedNumbers);
    this.afterReduce(result);

    return result;
  }

  /**
   * Método de gancho que se ejecuta antes de aplicar el filtro.
   * @param numbers - Lista de números a filtrar.
   */
  beforeFilter(numbers: number[]): string | void {}

  /**
   * Método de gancho que se ejecuta después de aplicar el filtro.
   * @param filteredNumbers - Lista de números filtrados.
   */
  afterFilter(filteredNumbers: number[]): string | void {}

  /**
   * Método de gancho que se ejecuta antes de aplicar el mapeo.
   * @param numbers - Lista de números a mapear.
   */
  beforeMap(numbers: number[]): string | void {}

  /**
   * Método de gancho que se ejecuta después de aplicar el mapeo.
   * @param mappedNumbers - Lista de números mapeados.
   */
  afterMap(mappedNumbers: number[]): string | void {}

  /**
   * Método de gancho que se ejecuta antes de aplicar la reducción.
   * @param mappedNumbers - Lista de números mapeados.
   */
  beforeReduce(mappedNumbers: number[]): string | void {}

  /**
   * Método de gancho que se ejecuta después de aplicar la reducción.
   * @param result - Resultado de la reducción.
   */
  afterReduce(result: number): string | void {}
}