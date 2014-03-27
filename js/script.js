var num1;
var num2;
var operand;
var result;
var max = 12;
var min = 0;
var numTries;
var maxTries = 3;

var last;
var restartFlag;

var correct = './images/correct.png';
var wrong = './images/wrong.png';

var init = function() {
  console.log('init');
  
  num1 = document.getElementById('top');
  num2 = document.getElementById('bot');
  operand = document.getElementById('op');
  result = document.getElementById('input');
  restartFlag = false;
  numTries = 0;
  last = -98779;
  
  setOperand();
  initNums();
};

var restart = function() {
  console.log('restart');
  
  if(restartFlag){
    initNums();
    clearResult();
    clearAnswer();
    result.focus();
    restartFlag = false;
    numTries = 0;
    
    return;
  }
  restartFlag = true;
};

// Return a random number between min and max, taking the floor of Math.random()
var rng = function() {
  var diff = max - min + 1;
  var ret = diff * Math.random();
  ret += min;
  ret = Math.floor(ret);
  return ret;
};

var setOperand = function() {
  console.log('setOperand');
  
  operand.innerText = '+';
};

var initNums = function() {
  setNum(num1, rng());
  setNum(num2, rng());
};

var setNum = function(div, num) {
  div.innerText = num;
};

var getNum = function(div) {
  return parseInt(div.innerText);
};

// When the answer is submitted 
var submit = function(event) {
  console.log('submit');
  
  if(event.keyIdentifier === 'Enter') {
    var answer = input.value;
    answer = parseInt(answer);
    if( isCorrect(answer) ) {
      showCorrect();
    }
    else {
      if(answer != last) {
        result.select();
        showWrong();
        last = answer;
      }
    }
  }
};

var isCorrect = function(input) {
  console.log('isCorrect');
  
  var answer = getNum(num1);
  answer += getNum(num2);
  
  if(input === answer) {
    return true;
  }
  return false;
};

var showCorrect = function() {
  var divImage = document.getElementById('image');
  divImage.innerHTML = '<img src="' + correct + '" height=50 />';
  
  var divText = document.getElementById('text');
  var a = getNum(num1);
  var b = getNum(num2);
  divText.innerHTML = 'Yeah! ' + a + ' + ' + b + ' = ' + (a+b);
  divText.innerHTML += '<br><button onclick="restart()">Ok!</button>';
  
  document.getElementsByTagName('button')[0].focus();
};

var showWrong = function() {
  numTries++;
  
  var divImage = document.getElementById('image');
  divImage.innerHTML += '<img src="' + wrong + '" height=50 />';

  if( numTries >= maxTries ) {
    var divText = document.getElementById('text');
    var a = getNum(num1);
    var b = getNum(num2);
    divText.innerHTML = 'Noooooo! ' + a + ' + ' + b + ' = ' + (a+b) + '!';
    divText.innerHTML += '<br><button onClick="restart()">I understand...</button>';
    
    document.getElementsByTagName('button')[0].focus();
  }
};

var clearResult = function() {
  var divImage = document.getElementById('image');
  divImage.innerHTML = '';
  
  var divText = document.getElementById('text');
  divText.innerHTML = '';
}

var clearAnswer = function() {
  result.value = '';
}