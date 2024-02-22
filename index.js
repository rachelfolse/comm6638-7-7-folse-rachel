const quiz = document.querySelector("#quiz");
const timer = document.createElement("p");

let correct = 0;
let previousScore;
let questionCount;
let timerId;
let time;

var questionsArr= [
{ 
question: 'What product did Amazon originally sell?',
answer: 'Books',
options: [ 'Music',
        'Clothing',
        'Computers',
        'Books',
]
},  
{
question: 'Which company developed the first mobile phone?',
answer: 'Motorola', 
options: [ 'Apple',
           'Motorola',
           'Samsung',
           'Blackberry',
]
},
{
question: 'What programming language is often used to develop Android applications?',
answer: 'Java',
options: [ 'Python',
           'C++',
           'Java',
           'PHP',
]
},
{
question: 'What is the most downloaded app of the 2010s?',
answer: 'Facebook',
options: [ 'Facebook',
           'Instagram',
           'Twitter',
           'Tumblr',
]
},
{
question: 'One gigabite is equal to how many megabites?',
answer: '1000',
options: ['10',
          '100',
          '1000',
          '10000',
]
}
]

const resumeQuiz = () => {
	quiz.innerHTML = "";
	let answer = questionsArr[questionCount].answer;

	const question = document.createElement("p");
	question.textContent = questionsArr[questionCount].question;

	const answerBtns = document.createElement("div");
	questionsArr[questionCount].options.map((option) => {
		let ansBtn = document.createElement("button");
		ansBtn.className = "ansBtn";
		ansBtn.textContent = option;
		answerBtns.appendChild(ansBtn);

		ansBtn.onclick = (e) => {
			let userChoice = e.target.textContent;

			if (userChoice === answer) {
				correct++;
			}
			nextQuestion();
		};
	});

	quiz.appendChild(question);
	quiz.appendChild(answerBtns);
	quiz.appendChild(timer);

	time = 30;
	timer.textContent = time;
	startTimer(time);
};

const startTimer = (seconds) => {
	quiz.appendChild(timer);
	timerId = setInterval(() => {
		seconds--;
		timer.textContent = seconds;
		if (seconds === -1) {
			nextQuestion();
		}
	}, 1000);
};

const nextQuestion = () => {
	quiz.innerHTML = "";
	questionCount++;

	if (questionCount < questionsArr.length) {
		clearInterval(timerId);
		resumeQuiz();
	} else {
		clearInterval(timerId);
		endQuiz();
	}
};

const startQuiz = () => {
	questionCount = 0;
	correct = 0;
	quiz.innerHTML = "";
	previousScore = localStorage.getItem("previous-score");

	if (previousScore) {
		let score = document.createElement("p");
		score.textContent = `Previous score: ${localStorage.getItem("previous-score")}%`;
		quiz.appendChild(score);
	}

	const startBtn = document.createElement("button");
	startBtn.setAttribute(`id`, `start-quiz`);
	startBtn.textContent = "Start Quiz!";
	quiz.appendChild(startBtn);

	startBtn.onclick = resumeQuiz;
};

const endQuiz = () => {
	let endScore = Math.round((correct / questionsArr.length) * 100);
	localStorage.setItem("previous-score", endScore);

	startQuiz();
};

startQuiz();