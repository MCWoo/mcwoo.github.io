var errLog = true;

var num1;
var num2;
var operand;
var result;
var max = 12;
var min = 0;
var numTries;
var maxTries = 3;
var initLast = -3.33;

var last;
var restartFlag;

function mark(name, link, width, height) {
  this.name = name;
  this.link = link;
  this.width = width;
  this.height = height;
}

var correct;
var wrong;
var divImage
var imgHeight = 50;

var init = function() {
  if(errLog) console.log('init');
  
  num1 = document.getElementById('top');
  num2 = document.getElementById('bot');
  operand = document.getElementById('op');
  result = document.getElementById('input');
  restartFlag = false;
  numTries = 0;
  last = initLast;
  
  correct = new mark('correct', './images/correct.png', 446, 400);
  wrong = new mark('wrong', './images/wrong.png', 350, 400);
  divImage = document.getElementById('image');
  divImage.style.width = '0px';
  divImage.style.height = imgHeight + 'px';
  
  setOperand();
  initNums();
};

var restart = function() {
  if(errLog) console.log('restart');
  
  if(restartFlag){
    initNums();
    clearResult();
    clearAnswer();
    enableSubmit();
    result.focus();
    restartFlag = false;
    numTries = 0;
    last = initLast;
    
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
  if(errLog) console.log('setOperand');
  
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

var getNumPx = function(str) {
  if(errLog) console.log('getNumPx');
  var w = str.substring(0, str.length-2);
  w = parseInt(w);
  return w;
}

// When the answer is submitted 
var submit = function(event) {
  if(errLog) console.log('submit');
  
  if(event.keyIdentifier === 'Enter') {
    var answer = input.value;
    answer = parseInt(answer);
    if( isNaN(answer) );
    else if( isCorrect(answer) ) {
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
}

var disableSubmit = function() {
  if(errLog) console.log('disableSubmit');
  input.onkeydown = null;
}

var enableSubmit = function() {
  if(errLog) console.log('enableSubmit');
  input.onkeydown = function onkeydown(event) { submit(event) };
}

var isCorrect = function(input) {
  if(errLog) console.log('isCorrect');
  
  var answer = getNum(num1);
  answer += getNum(num2);
  
  if(input === answer) {
    return true;
  }
  return false;
};

var showCorrect = function() {
  divImage.innerHTML += '<img src="' + correct.link + '" style="height:0px;" />';
  
  // Adjust div and image sizes
  var w = getNumPx(divImage.style.width);
  var img = divImage.getElementsByTagName('img');
  img = img[img.length-1];
  increaseSize(img, 0, w);
  
  var divText = document.getElementById('text');
  var a = getNum(num1);
  var b = getNum(num2);
  divText.innerHTML = 'Yeah! ' + a + ' + ' + b + ' = ' + (a+b);
  divText.innerHTML += '<br><button onclick="restart()">Ok!</button>';
  
  document.getElementsByTagName('button')[0].focus();
  disableSubmit();
}

var showWrong = function() {
  numTries++;
  divImage.innerHTML += '<img src="' + wrong.link + '" style="height:0px;" />';  
  
  // Adjust div size and image size
  var w = getNumPx(divImage.style.width);
  var img = divImage.getElementsByTagName('img');
  img = img[img.length-1];
  increaseSize(img, 0, w);

  if( numTries >= maxTries ) {
    var divText = document.getElementById('text');
    var a = getNum(num1);
    var b = getNum(num2);
    divText.innerHTML = 'Noooooo! ' + a + ' + ' + b + ' = ' + (a+b) + '!';
    divText.innerHTML += '<br><button onClick="restart()">I understand...</button>';
    
    document.getElementsByTagName('button')[0].focus();
    disableSubmit();
  }
}

var increaseSize = function(img,i,origWidth) {
  if(errLog) console.log('increaseSize');
  if( i > 1 )
    return;
  img.style.height = imgHeight * Math.sqrt(i) + 'px';
  
  var w = origWidth + Math.ceil(img.width * (imgHeight / img.height));
  divImage.style.width = w + 'px';
  
  i += 0.05;
  setTimeout( function() { increaseSize(img,i,origWidth) }, 1);
}

var clearResult = function() {
  var divImage = document.getElementById('image');
  divImage.innerHTML = '';
  divImage.style.width = 0;
  
  var divText = document.getElementById('text');
  divText.innerHTML = '';
}

var clearAnswer = function() {
  result.value = '';
}


window.onload = init;