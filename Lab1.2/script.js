// Q1
// Gets first value of array
function first() {
    array = ['1', '2', '3'];
    return array.shift()
}

// Q2
// Gets last value of array
function last() {
    array = ['1', '2', '3'];
    return array.pop()
}

// Q3
// Check if 'input' is in an array and returns a bool
function findInput() {
    array = ['output', 'input', 'love'];
    return array.includes('input')
}

// Q4
// Gets the length of an array
function length() {
    array = ['1', '2', '3'];
    return array.length
}

// Q5
// Lists content of a 1D Array
function list(array) {
    for (i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

// Q6
// Sorts an array of strings, outputing them alphabetically
function sortStrings() {
    months = ['March', 'Jan', 'Feb', 'Dec'];
    console.log(`This is the array not sorted: ${months}`);
    return (`This is the array sorted: ${months.sort()}`)
}

// Q7
// Sorts an array of numbers
function sortNumbers() {
    numbers = [8, 6, 1, 3];
    console.log(`This is the array not sorted: ${numbers}`);
    return (`This is the array sorted: ${numbers.sort()}`)
}

// Q8
// Finds the max and the min of an array using Math library
function findMaxMin() {
    numbers = [8, 6, 1, 3];
    console.log(`This max of the array is: ${Math.max(...numbers)}`);
    console.log(`This min of the array is: ${Math.min(...numbers)}`);
}

// Q9
// Converts array elements to a string using join() method
function toString() {
    months = ['March', 'Jan', 'Feb', 'Dec'];
    return months.join(',')
}

// Q10
// Converts array elements to a string seperated by a hyphen
function toHyphen() {
    months = ['March', 'Jan', 'Feb', 'Dec'];
    return months.join('-')
}

// Q11
// Adds 1 to each element using map() and returns a new list of the updated values
function add(numbers) {
    let numbers2 = numbers.map(item => item + 1);
    return numbers2
}

// Q12
// Returns a sum of all the values in an array using a for loop
function sum(numbers) {
    let sum = 0;
    for (i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }
    return sum
}

// Q13
// Filters an array for any value greater than 100 and returns it in a new list
function greaterThan100() {
    numbers = [100, 101, 10, 45, 234, 150]
    let numbers2 = numbers.filter(item => item > 100);
    return numbers2
}

// Q14
// indexOf searches for a value starting with index 0 and returns the position
// of the value and returns -1 if not found
function findValue(strings) {
    return strings.indexOf('Hello', 0)
}

// Q15
// Finds the most frequent value by sorting the values then
// taking away a from b using filter and returning the last/most frequent value
function mode(){
    let array = [10,4,5,3,4,3,8,6,4,5,1];
    return array.sort((a,b) =>
        array.filter(v => v===a).length - array.filter(v => v===b).length
    ).pop();
}

// Q16
// Changes the case of each letter in a text by checking
// what the case is for each character and adding it to a new varaiable
function changeCase() {
    let text = 'This IS a Sample TeXt';
    var newtext = "";
    for(var i = 0; i<text.length; i++){
        if(text[i] === text[i].toLowerCase()){
            newtext += text[i].toUpperCase();
        }else {
            newtext += text[i].toLowerCase();
        }
    }
    return newtext;
}

// Q17
// Displays the contents of a 2D array using two for loops
function displayContents() {
    let items = [[1, 2],[3, 4],[5, 6]];

    for (let i in items) {
        console.log("row " + i);
        for (let j in items[i]) {
            console.log(" " + items[i][j]);
        }
    }
}

