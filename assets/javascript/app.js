var questionAnswer = [
{ "question": "Who was the president of the Confederate states during the U.S. Civil War?",
"answer" : [ "George Washington" , "Jefferson Davis" , "John Adams" , "Abraham Linconln"], 
"correctAnswer": "Jefferson Davis" },

{ "question": "True or False- Polar Bears eat Penguins.",
"answer": [ "True" , "False" ],
"correctAnswer": "False" },

{ "question": "What's 20% of 240?",
"answer": [ 21, 48, 24, 20 ],
"correctAnswer": "48" },

{ "question": "The post office sells 136 stamps in one hour. How many stamps can it sell in 8 hours?", 
"answer": [1278, 935, 1088, 1036],
"correctAnswer": "1088" },

{ "question": "What is the capital of Colorado?",
"answer": [ "Boulder" , "Aspen" , "Denver" , "Aurora" ],
"correctAnswer": "Denver" },

{"question": "The adult human body has ___ bones.",
"answer": [215, 300, 206, 195],
"correctAnswer": "206" },

{"question": "Is there a size difference between the left lung and right lung?",
"answer": [ "Yes", "No" ],
"correctAnswer": "Yes" }
]


var intervalId;
var score=0;
var j=0;


$( document ).ready(function() {

var stopwatch = {

		time: 10,

		reset: function () {

			stopwatch.time=10;
		},

		start: function () {
			intervalId = setInterval(stopwatch.count, 1000);
		},

		count: function () {
			
			stopwatch.time--;

			var converted = stopwatch.timeConverter(stopwatch.time);
			$( ".timer" ).html(converted);
			console.log("stop watch time" + stopwatch.time)
				if (stopwatch.time===0) {
					console.log("i know im smaller than 0")
					wrongOrTimedOut();
				}


		},

		stop: function () {
			
			clearInterval(intervalId);	
			stopwatch.reset();
			
			if (j!==questionAnswer.length) {
				setTimeout(generateQuestionAnswer,2000);
				console.log("I ran the stop function")
			} else {
				endGame();
			}


		},

		timeConverter: function (t) {
			var minutes = Math.floor(t / 60);
		    var seconds = t - (minutes * 60);

		    if (seconds < 10) {
		      seconds = "0" + seconds;
		    }

		    if (minutes === 0) {
		      minutes = "00";
		    }
		    else if (minutes < 10) {
		      minutes = "0" + minutes;
		    }

		    return minutes + ":" + seconds;			
		}
}


function wrongOrTimedOut(){
	$( ".message" ).html("SORRY!");
	$( ".message" ).append(" The correct answer was "+ questionAnswer[j].correctAnswer + ".");
	j++
	console.log("what is J in wrongOrTimedOut "+ j);
	stopwatch.stop();
}

function endGame(){
	console.log("i ended things in end game")
	$( ".message" ).html("GAME OVER");
	$( ".question" ).empty();
	$( ".answerSection" ).empty();
	$( ".timer" ).empty();
	$( ".score" ).html(" Final Score: " + score + "/" + questionAnswer.length );
		if (score !== questionAnswer.length) {	
			$( ".snarkyComment" ).append ("You're not smarter than a 5th grader! Ouch!");
		} else {
			$( ".snarkyComment" ).append ("Don't be so proud, you're only as smart as a 5th grader.");
		}


}


function generateQuestionAnswer() {	

		$( ".message" ).html("");
		$( ".question" ).html( questionAnswer[j].question );
		$( ".answerSection" ).empty ();
		$( ".timer" ).empty ();

		for (var i=0; i<questionAnswer[j].answer.length; i++) {
		(function(currentIndex) {
			setTimeout(function() {
				var $newDiv = $("<div>");
				$newDiv.attr("class","answer")
				$( ".answerSection" ).append( $newDiv );
				$newDiv.append (questionAnswer[j].answer[currentIndex] );
			}, 1000*i); 
		})(i);
		}
		

		setTimeout(stopwatch.start,1000*questionAnswer[j].answer.length);

}


if (stopwatch.time>0) {
	$( ".answerSection" ).on( "click", ".answer", function () {
		userSelection = $(this);

			if ( userSelection[0].innerHTML === questionAnswer[j].correctAnswer ) {
					score++;
					$( ".message" ).html("YOU GO, GENIUS");
					$( ".score" ).html(" Current Score: " + score);	
					j++;			
					stopwatch.stop();



			} else if ( userSelection[0].innerHTML !== questionAnswer[j].correctAnswer ) {
					console.log("wrong excuted");
					$( ".score" ).html(" Current Score: " + score);	
					wrongOrTimedOut();

			}
	});		

}


generateQuestionAnswer();




});


