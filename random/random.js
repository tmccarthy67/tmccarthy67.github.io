var studentMax;
var tempStudent;
var students = new Array ();



function test()
  {
  var userInput = document.getElementById("studentNumber").value;
  studentMax = userInput;

  	tempStudent = parseInt (Math.random() * studentMax + 1);

  	console.log(tempStudent);
// add temp student to students array
// check if next random is part of students
// report next random and add to students
//repeat unitl students.length = studentMax
// add reset button

  }

