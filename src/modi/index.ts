import { FilterMapAddReduce } from "./filter_map_add_reduce.js";
import { FilterMapDivReduce } from "./filter_map_div_reduce.js";
import { FilterMapProdReduce } from "./filter_map_prod_reduce.js";
import { FilterMapSubReduce } from "./filter_map_sub_reduce.js";

const numbers = [1, 2, 3, 4, 5];

const filterMapAddReduce = new FilterMapAddReduce();
const filterMapSubReduce = new FilterMapSubReduce();
const filterMapProdReduce = new FilterMapProdReduce();
const filterMapDivReduce = new FilterMapDivReduce();

console.log(filterMapAddReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num * 2)); 
console.log(filterMapSubReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num - 1));
console.log(filterMapProdReduce.process(numbers, (num: number) => num % 2 === 0, (num: number) => num));
console.log(filterMapDivReduce.process(numbers, (num: number) => num !== 0, (num: number) => num + 1));
