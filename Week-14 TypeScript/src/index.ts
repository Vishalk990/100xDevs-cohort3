// function greet(firstName: string) {
//   console.log(`Hello ${firstName}`);
// }

// greet("Vishal");

// function sum(a: number, b: number): number {
//   return a + b;
// }

// sum(1, 2);

// function isLegal(age: number): boolean {
//   return age >= 18 ? true : false;
// }

// console.log(isLegal(10));

// function delayedCall(fn: Function) {
//   setTimeout(fn, 1000);
// }

// delayedCall(()=> {
//     console.log("Hello");
// })

/* INTERFACE */

interface UserType {
  name: string;
  age: number;
  address?: {
    city: string;
    state: string;
    pincode: number;
  };
}

// function greet(user: UserType) {
//   console.log(user);
// }

// let user: UserType = {
//   name:"Vishal",
//   age: 21,
//   address: {
//     city: "Pune",
//     state: "Maharashtra",
//     pincode: 411057
//   }
// };

// function isLegal(user: UserType): boolean {
//     return user.age >= 18 ? true : false;
// }

// console.log(isLegal(user));

// interface People {
//   name: string;
//   age: number;
// //   greet(): string;
// }

// class Manager implements People {
//     name:string;
//     age:number;
//     constructor(name:string,age:number) {
//         this.name = name;
//         this.age = age;
//     }
// }

// let user = new Manager("john",40);

// console.log(user);


interface Point2D {  
  x: number;  
  y: number;  
}  
const p1: Point2D = { x: 3, y: 5 };     // OK  
const p2: Point2D = { x: 1.8, y: 7.2 }; // OK  

// const p3: Point2D = {
//   x: 1,
//   y: 1,
//   name: "John",
//   age: 29,
// }; 
// all of a sudden John is 2D point!  

const intermediaryPoint = { x: 1, y: 1, name: "John", age: 29 };  
const p3: Point2D = intermediaryPoint; // No error from excess property check