"use strict";
// Primitives: number, string, boolean
// Complex types: arrays, objects
// Function types, parameters
// Primitives
let age;
age = 12;
let userName = "hello hi i am a string";
let isTurtle = true;
// Complex types
// Array types
let arrayOfNumbers;
let arrayOfStrings;
arrayOfNumbers = [1, 2, 3];
let person;
// let person: {
//    name: string;
//    age: number;
// };
person = {
    name: 'Max',
    age: 32
};
// Type inference
let course = 'How to Legally Consume Paperclips - The Complete Guide';
// course = 1234; // TypeScript automatically infers the type based on what we initialized
course = 'This works';
// Union types
let title = 'This is a title';
title = 1234; // with union types, this works! You can use both
title = 'This works';
// Functions & types
function adder(a, b) {
    return a + b;
}
function printSomething(value) {
    console.log(value);
}
// Generics
function insertAtBeginning(array, value) {
    const newArray = [value, ...array]; // ... is spread operator, basically same thing as .push
    return newArray;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, 0); // [1, 2, 3] --> [0, 1, 2, 3]
// Classes
class Student {
    constructor(first, last, age, courses) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }
    enroll(courseName) {
        this.courses.push(courseName);
    }
    listCourses() {
        return this.courses;
    }
}
const student = new Student('Ryan', 'Bey', 24, ['React', 'Angular']);
student.enroll('JavaScript');
let ryan;
ryan = {
    firstName: 'Ryan',
    age: 24,
    greet() {
        console.log('Hello!');
    }
};
