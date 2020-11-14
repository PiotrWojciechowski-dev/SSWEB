// Q1
// Add two numbers
function add(a,b) {
    console.log(`${a} + ${b} = ${a + b}`);
}

// Q2
// Check which number is greater or if they are equal
function CheckNums(num1, num2) {
    if (num1 < num2) {
        console.log(`${num2} is greater than ${num1}`);
    } else if (num1 > num2) {
        console.log(`${num1} is greater than ${num2}`);
    } else {
        console.log(`${num1} and ${num2} are equal`);
    }
}

// Q3
// Output 4 words in a comma seperated list
function words(word1, word2, word3, word4) {
    console.log(`${word1}, ${word2}, ${word3}, ${word4}`);
}

// Q4
// Convert minutes to hours and minutes and output the result
function convertMinutes(total_minutes) {
    hours = Math.floor(total_minutes / 60);
    minutes = total_minutes % 60;
    console.log(`${total_minutes} minutes is ${hours} hour(s) and ${minutes} minute(s)`)
}

// Q5
// Calculate the area and perimiter of a circle using the radius
function circleCalculator(radius) {
    let area = Math.PI * radius ** 2;
    let permimeter = 2 * Math.PI * radius;
    console.log(`The area of a circle with radius ${radius} is ${area.toFixed(2)}`)
    console.log(`The perimeter of a circle with radius ${radius} is ${permimeter.toFixed(2)}`)
}

// Q6
// Convert the distance to either miles or km depending on the unit used
function convertDistance(distance, unit) {
    const miles = 0.62137119;
    const km = 1.609344;
    let new_dist = 0;
    if (unit == "miles") {
        new_dist = distance * km
        console.log(`${distance} km(s) is ${new_dist.toFixed(2)} in miles`)

    } else if (unit == "km") {
        new_dist = distance * miles
        console.log(`${distance} mile(s) is ${new_dist.toFixed(2)} kilometres`)
    } else {
        console.log(`Unit specified is incorrect`)
    }
}

// Q7
// Calculate two numbers depending on what operator is used
function calculator(val1, val2, operator) {
    if (operator == "+") {
        console.log(`${val1} + ${val2} = ${val1 + val2}`);
    } else if (operator == "-") {
        console.log(`${val1} - ${val2} = ${val1 - val2}`);
    } else if (operator == "*") {
        console.log(`${val1} * ${val2} = ${val1 * val2}`);
    } else if (operator == "/") {
        console.log(`${val1} / ${val2} = ${val1 / val2}`);
    } else {
        console.log(`Opeator "${operator}" isn't allowed use (+, -, *, /) `)
    }
}