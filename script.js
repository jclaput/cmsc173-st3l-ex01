'use strict';

var arrStringNumSequence = [];
var correctShortTermAnsCount = 0;
var correctLongTermAnsCount = 0;
var currentUserAnswer = "";
var MAX_NUM_OF_ITEMS = 5;

var randomStringNumSequence = (sequenceLength) => {
    let output=""
    for(let i = 0; i < sequenceLength; i++){
        output += (Math.floor(Math.random() * 10)).toString();
    }

    return output;
};

var getUserAnswerShortTermTest = (itemNum=1) => {
    var currentNumSeq = randomStringNumSequence(2 + itemNum);
    arrStringNumSequence.push(currentNumSeq)

    document.getElementById("pageText").innerHTML = itemNum.toString() + ".) Remember: " + currentNumSeq;
    setTimeout(function() {
        document.getElementById("pageText").innerHTML = "Memory Test";

        setTimeout(function() {
            currentUserAnswer = prompt("Enter answer: ");

            if(currentNumSeq == currentUserAnswer){
                document.getElementById("responseCorrectnessIndicator").innerHTML = "Correct!";
                correctShortTermAnsCount += 1;
            }else{
                document.getElementById("responseCorrectnessIndicator").innerHTML = "Wrong!";
            }
            
            if (itemNum == MAX_NUM_OF_ITEMS) {
                getUserAnswerLongTermTest()
                return;
            }

            getUserAnswerShortTermTest(itemNum+1)
        }, 100);
    }, 5000);
}

var getUserAnswerLongTermTest = (itemNum=1) => {
    document.getElementById("pageText").innerHTML = "Do You Remember: " + itemNum + ".) ?";

    setTimeout(function() {
        document.getElementById("pageText").innerHTML = "Memory Test";

        setTimeout(function() {
            currentUserAnswer = prompt("Enter answer: ");

            if(arrStringNumSequence[itemNum-1] == currentUserAnswer){
                document.getElementById("responseCorrectnessIndicator").innerHTML = "Correct!";
                correctLongTermAnsCount += 1;
            }else{
                document.getElementById("responseCorrectnessIndicator").innerHTML = "Wrong!";
            }
            
            if (itemNum == MAX_NUM_OF_ITEMS) {
                document.getElementById("responseCorrectnessIndicator").innerHTML = "_";
                document.getElementById("pageText").innerHTML = "Short Term Memory Score: " + correctShortTermAnsCount.toString() + " <br> Long Term Memory Score: " + correctLongTermAnsCount.toString();
                return;
            }

            getUserAnswerLongTermTest(itemNum+1)
        }, 100);
    }, 5000);
}

var startTest = () =>{
    document.getElementById("pageButton").remove()
    getUserAnswerShortTermTest()
};
