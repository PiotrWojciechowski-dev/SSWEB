//Q1
function changeTitle(x) {
    document.getElementById("lab3").innerHTML = x;
    return true;
}

//Q2 + 3
function getInput() {
    let x = document.getElementById('inputA').value;
    console.log(x);
}

//Q4
function showOutput() {
    let x = document.getElementById('inputA').value;
    document.getElementById("output").innerHTML = x;
}

//Q5
function getP() {
    let x = document.getElementsByTagName('P');
    for (i = 0; i < x.length; i++) {
        console.log(x[i].innerHTML);
    }
    return true;
}

//Q6 Calculator
// Call this function when Add button is clicked
document.getElementById("calc1").addEventListener("click", calcAdd)

function calcAdd() {
    let numA = 0;
    let numB = 0;
    let answer = 0;
    let answerText = `${numA} + ${numB} = ${answer}`;
  
    // use getElementById() to get values
    // do addition
    // display anser on page
    numA = document.getElementById('numA').value;
    numB = document.getElementById('numB').value;
    numA = parseInt(numA)
    numB = parseInt(numB)
    answer = numA + numB;
    answerText = `${numA} + ${numB} = ${answer}`;
    document.getElementById('answer').innerHTML = answer;
  
    // Log to console (useful for debugging)
    console.log(answerText);
    return true;
  }
  
// Implement the other calculator functions
// Call this function when Subtract button is clicked
document.getElementById("calc2").addEventListener("click", calcSub)

function calcSub() {
    numA = document.getElementById('numA').value;
    numB = document.getElementById('numB').value;
    numA = parseInt(numA)
    numB = parseInt(numB)
    answer = numA - numB;
    answerText = `${numA} - ${numB} = ${answer}`;
    document.getElementById('answer').innerHTML = answer;
  
    // Log to console (useful for debugging)
    console.log(answerText);
    return true;
  }
  
  // Call this function when Multiply button is clicked
  document.getElementById("calc3").addEventListener("click", calcMulti)

  function calcMulti() {
    numA = document.getElementById('numA').value;
    numB = document.getElementById('numB').value;
    numA = parseInt(numA)
    numB = parseInt(numB)
    answer = numA * numB;
    answerText = `${numA} * ${numB} = ${answer}`;
    document.getElementById('answer').innerHTML = answer;
  
    // Log to console (useful for debugging)
    console.log(answerText);
    return true;
  }
  
// Call this function when Divide button is clicked
document.getElementById("calc4").addEventListener("click", calcDivide)

function calcDivide() {
    numA = document.getElementById('numA').value;
    numB = document.getElementById('numB').value;
    numA = parseInt(numA)
    numB = parseInt(numB)
    answer = numA / numB;
    answerText = `${numA} / ${numB} = ${answer}`;
    document.getElementById('answer').innerHTML = answer;
  
    // Log to console (useful for debugging)
    console.log(answerText);
    return true;
  }