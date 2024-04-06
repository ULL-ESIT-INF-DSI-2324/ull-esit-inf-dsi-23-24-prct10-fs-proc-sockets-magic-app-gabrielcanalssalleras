import { expect } from 'chai';
import 'mocha';
import { FilterMapAddReduce } from '../src/modi/filter_map_add_reduce.js';
import { FilterMapSubReduce } from '../src/modi/filter_map_sub_reduce.js';
import { FilterMapProdReduce } from '../src/modi/filter_map_prod_reduce.js';
import { FilterMapDivReduce } from '../src/modi/filter_map_div_reduce.js';
import { TemplateMethod } from '../src/modi/template_method.js';

describe('Modi', () => {

  const numbers = [1, 2, 3, 4, 5];
  const filterMapAddReduce = new FilterMapAddReduce();
  const filterMapSubReduce = new FilterMapSubReduce();
  const filterMapProdReduce = new FilterMapProdReduce();
  const filterMapDivReduce = new FilterMapDivReduce();

  it ('Las clases de la modificación responden a la clase abstracta de TemplateMethod', () => {
    expect(filterMapAddReduce).to.be.an.instanceof(TemplateMethod);
    expect(filterMapDivReduce).to.be.an.instanceof(TemplateMethod);
    expect(filterMapProdReduce).to.be.an.instanceof(TemplateMethod);
    expect(filterMapSubReduce).to.be.an.instanceof(TemplateMethod);
  });

  it ('Las clases pueden ejecutar el método process sin errores', () => {
    expect(filterMapAddReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num * 2)).to.not.throw;
    expect(filterMapSubReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num - 1)).to.not.throw;
    expect(filterMapProdReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num)).to.not.throw;
    expect(filterMapDivReduce.process(numbers, (num: number) => num !== 0, (num: number) => num + 1)).to.not.throw;
  });

  it ('Las subclases cuentan con métodos gancho para el reduce que muestran el antes y el después de la operación', () => {
    expect(filterMapAddReduce.beforeReduce(numbers)).to.equal("Vamos a aplicar \"reduce\" con una suma a los números ya filtrados y transformados: " + numbers);
    expect(filterMapAddReduce.afterReduce(15)).to.equal("El resultado de aplicar \"reduce\" con una suma es: 15");
    expect(filterMapSubReduce.beforeReduce(numbers)).to.equal("Vamos a aplicar \"reduce\" con una resta a los números ya filtrados y transformados: " + numbers);
    expect(filterMapSubReduce.afterReduce(3)).to.equal("El resultado de aplicar \"reduce\" con una resta es: 3");
    expect(filterMapProdReduce.beforeReduce(numbers)).to.equal("Vamos a aplicar \"reduce\" con una multiplicación a los números ya filtrados y transformados: " + numbers);
    expect(filterMapProdReduce.afterReduce(48)).to.equal("El resultado de aplicar \"reduce\" con una multiplicación es: 48");
    expect(filterMapDivReduce.beforeReduce(numbers)).to.equal("Vamos a aplicar \"reduce\" con una división a los números ya filtrados y transformados: " + numbers);
    expect(filterMapDivReduce.afterReduce(0.008333333333333333)).to.equal("El resultado de aplicar \"reduce\" con una división es: 0.008333333333333333");
  });

  it ('El método reduce de la subclase FilterMapAddReduce suma los números', () => {
    expect(filterMapAddReduce.reduce(numbers)).to.equal(15);
  }),

  it ('El método reduce de la subclase FilterMapSubReduce resta los números', () => {
    expect(filterMapSubReduce.reduce(numbers)).to.equal(-15);
  }),

  it ('El método reduce de la subclase FilterMapProdReduce multiplica los números', () => {
    expect(filterMapProdReduce.reduce(numbers)).to.equal(120);
  }),

  it ('El método reduce de la subclase FilterMapDivReduce divide los números', () => {
    expect(filterMapDivReduce.reduce(numbers)).to.equal(0.008333333333333333);
  }),

  it ('El método process de FilterMapAddReduce filtra, mapea y reduce los números con una suma', () => {
    // 2 * 2 + 4 * 2 = 12
    expect(filterMapAddReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num * 2)).to.equal(12);
  })

  it ('El método process de FilterMapSubReduce filtra, mapea y reduce los números con una resta', () => {
    // - (2 - 1) - (4 - 1) = -4
    expect(filterMapSubReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num - 1)).to.equal(-4);
  })

  it ('El método process de FilterMapProdReduce filtra, mapea y reduce los números con una multiplicación', () => {
    // 1 * 3 * 5 = 15
    expect(filterMapProdReduce.process(numbers, (num: number) => num % 2 === 1, (num: number) => num)).to.equal(15);
  })

  it ('El método process de FilterMapDivReduce filtra, mapea y reduce los números con una división', () => {
    // 2 / 3 / 4 / 5 / 6 = 0.001388888888888889
    expect(filterMapDivReduce.process(numbers, (num: number) => num !== 0, (num: number) => num + 1)).to.equal(0.001388888888888889);
  })
});