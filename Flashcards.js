var questionBtn = document.getElementById("question-btn");
var closeBtn = document.getElementById("close-btn");
var saveBtn = document.getElementById("save-btn");
var questionText = document.getElementById("qustion-text");
var answerText = document.getElementById("answer-text");


if (typeof(Storage) !== "undefined") {
  // Retrieve
  var questionssaved = localStorage.getItem("questions");
  console.log(questionssaved);
  if(questionssaved) {
  document.getElementById("questions").innerHTML= questionssaved;
  }
  }

questionBtn.addEventListener("click" , function(){
document.getElementById("entries").classList.remove("invisible");
});

closeBtn.addEventListener("click",function(){
document.getElementById("entries").classList.add("invisible");
});

saveBtn.addEventListener("click",function(){
	if (questionText.value == "" || answerText.value == ""){
		document.getElementById("error-msg").classList.remove("invisible");
	}
	else {
		document.getElementById("error-msg").classList.add("invisible");
        createquestion();
        questionText.value = "" ;
        answerText.value = "" ;
    }
});

document.addEventListener("click",function(e){
if (e.target && e.target.textContent == "EDIT"){
	questionText.value = e.target.parentNode.parentNode.children[0].textContent;
	answerText.value = e.target.parentNode.parentNode.children[2].textContent;
	e.target.parentNode.parentNode.remove();
}

if (e.target && e.target.textContent == "DELETE"){
e.target.parentNode.parentNode.remove();
}
});


function createquestion(){
	// questoin continer 
var questionbox = document.createElement("Div");
questionbox.classList.add("question");
// question text
var question = document.createElement("P");
question.textContent = questionText.value;
question.classList.add("questiontext");
questionbox.appendChild(question);
// show / hide answer button
var showlink = document.createElement("Button");
var link = document.createTextNode("Show/Hide Answer");
showlink.classList.add("showlink");
showlink.addEventListener("click" , ()=> answer.classList.toggle("invisible"));
showlink.appendChild(link);  
questionbox.appendChild(showlink);
// answer text
var answer = document.createElement("P");
answer.textContent = answerText.value;
answer.classList.add("invisible");
answer.classList.add("answertext");
questionbox.appendChild(answer);
// controls buttons container
var controlBtns = document.createElement("Div");
controlBtns.classList.add("questions");
//edit button
var editBtn = document.createElement("Button");
editBtn.classList.add("btn");
editBtn.textContent = "EDIT";
questionbox.appendChild(editBtn);
// delete button
var deleteBtn = document.createElement("Button");
deleteBtn.classList.add("questionbtn");
deleteBtn.textContent = "DELETE";
controlBtns.appendChild(editBtn);
controlBtns.appendChild(deleteBtn); 
questionbox.appendChild(controlBtns);
// append questoin continer to questions 
document.getElementById("questions").appendChild(questionbox);
}

  window.onbeforeunload = function(event)
    {
        if (typeof(Storage) !== "undefined") {
  // Store
  localStorage.setItem("questions", document.getElementById("questions").innerHTML);
} else {
  console.log("Sorry, your browser does not support Web Storage...");
}
    };