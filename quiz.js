const questions=[
    {
        question:"which is the largest animal in the world",
        answers:[
            {text:"shark",correct:false},
            {text:"blue whale",correct:true},
            {text:"giraffe",correct:false},
            {text:"elephant",correct:false},
        ]
    },
    {
        question:"which is the smallest continent in the world",
        answers:[
            {text:"asia",correct:false},
            {text:"arctic",correct:false},
            {text:"australia",correct:true},
            {text:"africa",correct:false},
        ]
    },
    {
        question:"which is the largest desert in the world",
        answers:[
            {text:"antartica",correct:true},
            {text:"gobi",correct:false},
            {text:"sahara",correct:false},
            {text:"asia",correct:false},
        ]
        }
];
const questionelement=document.getElementById("question");
const answerbuttons=document.getElementById("answer-buttons");
const nextbutton=document.getElementById("next-btn");

let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML="next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion=questions[currentquestionindex]
    let questionno=currentquestionindex+1;
    questionelement.innerHTML=questionno+". "+currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
        button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectanswer);
    
    });
}
function resetstate(){
    nextbutton.style.display="none";
    while(answerbuttons.firstChild)
    {
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}
function selectanswer(e){
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbutton.style.display="block";
}
function showscore(){
    resetstate();
    questionelement.innerHTML= `you scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="play again";
    nextbutton.style.display="block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion();
    }else{
        showscore();
    }
}
nextbutton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }else{
        startquiz();
    }
})
startquiz();
