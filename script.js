// "use strict";
// Javascript week 2, day 1,
// Exercise 1a:
const names = ["Lars", "Jan", "Peter", "Bo", "Frederik"];
const namesWithA = names.filter(el => el.includes("a"));
console.log(namesWithA);

// Exercise 1b:
const reversed = names.map(el =>
  el
    .split("")
    .reverse()
    .join("")
);
console.log(reversed);

// Exercise 2a: myFilter
const myFilter = function(arr, cb) {
  const newArr = [];
  for (let idx in arr) {
    // for in loop using the array index
    //console.log("myFilter element",arr[idx])
    if (cb(arr[idx])) {
      newArr.push(arr[idx]);
    }
  }
  return newArr;
};
const namesWithA2 = myFilter(names, el => el.includes("a"));
console.log("my filter method:", namesWithA2);

// Exercise 2b: myMap
const myMap = function(arr, cb) {
  const newArr = [];
  for (let idx in arr) {
    // for in loop using the array index
    const changedEl = cb(arr[idx]);
    newArr.push(changedEl);
  }
  return newArr;
};

const reversed2 = myMap(names, el =>
  el
    .split("")
    .reverse()
    .join("")
);
console.log("my map method:", reversed2);

// Exercise 3 use prototype
Array.prototype.myFilter = function(cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i])) {
      res.push(this[i]);
    }
  }
  return res;
};
const containsR = names.myFilter(el => el.includes("r"));
console.log("contains r: ", containsR);

// Exercise 4a:
const numbers = [1, 3, 5, 10, 11];
const add2next = numbers.map((el, idx, arr) => {
  // console.log("element", el);
  // console.log("index", idx);
  // console.log("array", arr);

  if (idx === arr.length - 1) return el;
  return el + arr[idx + 1];
});
console.log("add2next:", add2next);

// Exercise 4b:
const aElements = names.map(el => {
  return '<a href="">' + el + "</a>\n";
});
console.log(aElements.join(""));

// Exercise 4c:
const persons = [
  { name: "Lars", phone: "1234567" },
  { name: "Peter", phone: "675843" },
  { name: "Jan", phone: "98547" },
  { name: "Bo", phone: "79345" }
];
const rowsOfTable = persons
  .map(el => "<tr><td>" + el.name + "</td><td>" + el.phone + "</td></tr>\n")
  .join("");
const htmlTable =
  "<table><tr><th>Name</th><th>Phone</th></tr>" + rowsOfTable + "</table>";
console.log(htmlTable);

// Exercise 4d:
document.getElementById("root").innerHTML = htmlTable;

// Exercise 4e: add button with click event
document.getElementById("root").innerHTML =
  '<button id="btn">Filter names with the letter a</button>';
document.getElementById("root").onclick = function(event) {
  if (event.target.id === "btn") {
    const personsFiltered = persons.filter(p=>p.name.includes('a'));
    const rowsOfTable = personsFiltered.map(el => "<tr><td>" + el.name + "</td><td>" + el.phone + "</td></tr>\n").join("");
    const htmlTable = "<table><tr><th>Name</th><th>Phone</th></tr>" + rowsOfTable + "</table>";
    const btn = document.getElementById('root').innerHTML;
    document.getElementById('root').innerHTML = htmlTable + btn;
  }
};

// Exercise 5a:
const all= ["Lars", "Peter", "Jan", "Bo"];
const joined = all.join(", #");
console.log(joined);

// Exercise 5b:
const numbs = [2, 3, 67, 33];
const sum = numbs.reduce((x,y)=>x+y);
console.log('sum',sum);

// Exercise 5c:
const members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}
];
const avg = members.reduce((acc,p,idx,arr)=>{
    console.log('idx',idx,'acc',acc,'p.age',p.age);
    if(idx === arr.length-1)
        return (acc + p.age) / arr.length;
    return acc + p.age;
},0);
console.log(avg);

// Exercise 5e:
const votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];

const electionResult = votes.reduce((acc, el)=>{
    if(acc[el])
        acc[el]++;
    else
        acc[el] = 1;
    return acc;
}, {});
console.log(electionResult);
 /* {
   'Clinton':1,
   'Trump': 2,
   'None': 0
 } */



// Exercise 6 Hoisting
console.log('function declaration is hoisted');
console.log(myHoistedFunc());

function myHoistedFunc(){
    return "I am the return value of myHoistedFunc()";
}

console.log('var declaration is hoisted, but not assignments');
console.log(myHoistedVar);

myHoistedVar = 'hoho';
console.log(myHoistedVar);
var myHoistedVar;

// Exercise 7 'this'
var clientData = {
    id: 1094545,
    fullName: "Not Set",
    // setUserName is a method on the clientData object
    setUserName: function (firstName, lastName)  {
      // this refers to the fullName property in this object
      this.fullName = firstName + " " + lastName;
    }
}

function getUserInput(firstName, lastName, callback)  {
    //check if callback was given and if it is a function
    if (typeof callback === "function") {
        callback (firstName, lastName);
    }
}

getUserInput ("Barack", "Obama", clientData.setUserName); //running in global context
console.log (clientData.fullName);// Not Set 

// The fullName property was initialized on the window object
console.log(window.fullName); // Barack Obama

// The fullName property is now initialized on the clientData object
clientData.setUserName('Hans','Fransen');
console.log(clientData.fullName)

// ######################### call(), apply() and bind() #####################################
// #### The call() method takes arguments separately.
// #### The apply() method takes arguments as an array.
// Using call() to execute a function as a method of an object given to call()
var person0 = {
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
  }
  var person1 = {
    firstName:"John",
    lastName: "Doe"
  }
  var person2 = {
    firstName:"Mary",
    lastName: "Doe"
  }
const fullName = person0.fullName.call(person1);  // Will return "John Doe" 
console.log('fullName: ',fullName);

// Using apply()
const personObj = {
   fullName: function(city, country) {
      return this.firstName + " " + this.lastName + "," + city + "," + country;
   }
}
var person1 = {
  firstName:"John",
  lastName: "Doe"
}
const fullName2 = personObj.fullName.apply(person1, ["Oslo", "Norway"]);
console.log('fullName2: ',fullName2);

// Using bind()
this.x = 9;    // this refers to global "window" object here in the browser
var module = {
  x: 81,
  getX: function() { return this.x; }
};

const resX = module.getX(); // 81
console.log('x:',resX);

var retrieveX = module.getX;
const xGlobal = retrieveX(); 
console.log('global x',xGlobal);
// returns 9 - The function gets invoked at the global scope

// Create a new function with 'this' bound to module
var boundGetX = retrieveX.bind(module);
const xBound2module = boundGetX(); // 81
console.log(xBound2module);

// Exercise 9 Closure
var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
})();
add();add();add();
const addResult = add();
console.log("closure",addResult);

// Exercise 9b Closure
const p = (function () {
    let name;
    let age;
    return {
        setName: function (name) { this.name = name; },
        setAge: function (age) { this.age = age; },
        getInfo: function () {  return this.name + ' ' + this.age;}
    }
})();
p.setName('Grey');
p.setAge(43);
console.log("person:",p.getInfo());
