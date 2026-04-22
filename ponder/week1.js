const PI = 3.14;
let radius = 3;

const one = 1;
const two = '2';

let course = "CSE131"; // global scope

if (true) {
    let student = "John";
    console.log(course);  // works
    console.log(student); // works
}

console.log(course); // works
console.log(student); // ERROR: student is block-scoped
