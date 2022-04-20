// Primitives: number, string, boolean
// Complex types: arrays, objects
// Function types, parameters

// Primitives
let age: number;
age = 12;
let userName: string = "hello hi i am a string";
let isTurtle: boolean = true;

// Complex types
// Array types
let arrayOfNumbers: number[];
let arrayOfStrings: string[];
arrayOfNumbers = [1, 2, 3];

// Object types
type Person = {
   name: string;
   age: number;
} // Type alias

let person: Person;

// let person: {
//    name: string;
//    age: number;
// };

person = {
   name: 'Max',
   age: 32
}

// Type inference
let course = 'How to Legally Consume Paperclips - The Complete Guide';
// course = 1234; // TypeScript automatically infers the type based on what we initialized
course = 'This works';

// Union types
let title: string | number = 'This is a title';
title = 1234; // with union types, this works! You can use both
title = 'This works';

// Functions & types
function adder(a: number, b: number): number {
   return a + b;
}

function printSomething(value: any): void { // You don't need to explicitely state types, just an example here
   console.log(value);
}

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
   const newArray = [value, ...array];  // ... is spread operator, basically same thing as .push
   return newArray;
}

const demoArray= [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, 0);  // [1, 2, 3] --> [0, 1, 2, 3]

// Classes
class Student {
   firstName: string;
   lastName: string;
   age: number;
   private courses: string[];

   constructor(first: string, last: string, age: number, courses: string[]) {
      this.firstName = first;
      this.lastName = last;
      this.age = age;
      this.courses = courses;
   }

   enroll(courseName: string) {
      this.courses.push(courseName);
   }

   listCourses() {
      return this.courses;
   }
}

const student = new Student('Ryan', 'Bey', 24, ['React', 'Angular']);
student.enroll('JavaScript');

// Interfaces
interface Human {
   firstName: string;
   age: number;

   greet: () => void;
}

let ryan: Human;
ryan = {
   firstName: 'Ryan',
   age: 24,
   greet() {
      console.log('Hello!');
   }
};

class Instructor implements Human {
   firstName: string;
   age: number;
   greet() {
      console.log('Hello class!');
   }
}