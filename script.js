// Game State Management
const gameState = {
    studentName: '',
    currentDifficulty: 'easy',
    totalScore: 0,
    topicScores: {},
    currentTopic: null,
    currentQuestionIndex: 0,
    sessionQuestions: [],
    answeredCorrectly: 0,
    gameScore: 0,
    gameCorrectAnswers: 0,
    stats: {
        totalAttempts: 0,
        correctAnswers: 0,
        topicsCompleted: 0,
        level: 1
    }
};

// Question Database with Multiple Difficulties
const questionDatabase = {
    linear: {
        easy: [
            { question: "Bagi persamaan: y = 2x + 3", subQuestion: "Apakah nilai y apabila x = 2?", correctAnswer: "7", hint: "Gantikan x = 2 ke dalam persamaan: y = 2(2) + 3 = 4 + 3 = 7" },
            { question: "Bagi persamaan: y = 3x + 1", subQuestion: "Apakah nilai y apabila x = 1?", correctAnswer: "4", hint: "Gantikan x = 1 ke dalam persamaan: y = 3(1) + 1 = 4" },
            { question: "Bagi persamaan: y = x + 5", subQuestion: "Apakah nilai y apabila x = 3?", correctAnswer: "8", hint: "Gantikan x = 3 ke dalam persamaan: y = 3 + 5 = 8" },
            { question: "Bagi persamaan: y = 4x - 2", subQuestion: "Apakah nilai y apabila x = 1?", correctAnswer: "2", hint: "Gantikan x = 1 ke dalam persamaan: y = 4(1) - 2 = 2" },
            { question: "Bagi persamaan: y = 2x", subQuestion: "Apakah nilai y apabila x = 5?", correctAnswer: "10", hint: "Gantikan x = 5 ke dalam persamaan: y = 2(5) = 10" }
        ],
        medium: [
            { question: "Bagi persamaan: y = 2x + 3", subQuestion: "Apakah nilai x apabila y = 9?", correctAnswer: "3", hint: "Gantikan y = 9: 9 = 2x + 3, jadi 6 = 2x, x = 3" },
            { question: "Bagi persamaan: y = 3x - 2", subQuestion: "Apakah nilai x apabila y = 7?", correctAnswer: "3", hint: "Gantikan y = 7: 7 = 3x - 2, jadi 9 = 3x, x = 3" },
            { question: "Cari kecerunan (slope) bagi persamaan: y = 5x + 2", subQuestion: "Apakah nilai kecerunan?", correctAnswer: "5", hint: "Dalam bentuk y = mx + c, kecerunan adalah m" },
            { question: "Cari pintasan-y bagi persamaan: y = 2x + 8", subQuestion: "Apakah nilai pintasan-y?", correctAnswer: "8", hint: "Dalam bentuk y = mx + c, pintasan-y adalah c" },
            { question: "Bagi persamaan: y = -x + 4", subQuestion: "Apakah nilai y apabila x = -2?", correctAnswer: "6", hint: "Gantikan x = -2: y = -(-2) + 4 = 2 + 4 = 6" }
        ],
        hard: [
            { question: "Cari persamaan garis yang melalui titik (0,2) dan (4,6)", subQuestion: "Tulis dalam bentuk y = mx + c", correctAnswer: "y=x+2", hint: "Kecerunan = (6-2)/(4-0) = 1, Pintasan-y = 2" },
            { question: "Dua garis selari mempunyai kecerunan yang sama", subQuestion: "Jika garis pertama adalah y = 2x + 3, cari persamaan garis selari melalui (0,5)", correctAnswer: "y=2x+5", hint: "Kecerunan sama = 2, Guna titik (0,5) untuk cari c: 5 = 2(0) + c, c = 5" },
            { question: "Cari pintasan-x bagi persamaan: y = 2x - 8", subQuestion: "Apakah nilai x apabila y = 0?", correctAnswer: "4", hint: "Gantikan y = 0: 0 = 2x - 8, jadi 2x = 8, x = 4" },
            { question: "Bagi persamaan: 2x + 3y = 12", subQuestion: "Cari pintasan-x (apabila y = 0)", correctAnswer: "6", hint: "Gantikan y = 0: 2x = 12, x = 6" },
            { question: "Bagi persamaan: y = -3x + 9", subQuestion: "Apakah nilai x apabila y = 0?", correctAnswer: "3", hint: "Gantikan y = 0: 0 = -3x + 9, jadi 3x = 9, x = 3" }
        ]
    },
    quadratic: {
        easy: [
            { question: "Bagi persamaan: y = x² - 4x + 3", subQuestion: "Cari nilai minimum graf", correctAnswer: "-1", hint: "Gunakan formula: x = -b/2a. Di sini a=1, b=-4, jadi x=2. Gantikan: y = 4 - 8 + 3 = -1" },
            { question: "Bagi persamaan: y = x²", subQuestion: "Apakah nilai y apabila x = 3?", correctAnswer: "9", hint: "Gantikan x = 3: y = 3² = 9" },
            { question: "Bagi persamaan: y = (x - 2)²", subQuestion: "Apakah nilai minimum y?", correctAnswer: "0", hint: "Bentuk (x - 2)² mempunyai nilai minimum 0 apabila x = 2" },
            { question: "Bagi persamaan: y = x² + 4", subQuestion: "Apakah nilai minimum y?", correctAnswer: "4", hint: "x² selalu ≥ 0, jadi y minimum adalah 0 + 4 = 4" },
            { question: "Bagi persamaan: y = -x²", subQuestion: "Apakah nilai maksimum y?", correctAnswer: "0", hint: "-x² selalu ≤ 0, jadi nilai maksimum adalah 0" }
        ],
        medium: [
            { question: "Bagi persamaan: y = 2x² - 8x + 6", subQuestion: "Cari nilai minimum (gunakan x = -b/2a)", correctAnswer: "-2", hint: "x = -(-8)/(2·2) = 8/4 = 2. y = 2(4) - 8(2) + 6 = 8 - 16 + 6 = -2" },
            { question: "Bagi persamaan: y = x² - 6x + 5", subQuestion: "Cari punca-punca (apabila y = 0)", correctAnswer: "1,5", hint: "Faktorkan: (x - 1)(x - 5) = 0, jadi x = 1 atau x = 5" },
            { question: "Bagi persamaan: y = (x + 2)² - 3", subQuestion: "Apakah nilai minimum?", correctAnswer: "-3", hint: "(x + 2)² ≥ 0, jadi minimum y = 0 - 3 = -3 apabila x = -2" },
            { question: "Bagi persamaan: y = -x² + 4x", subQuestion: "Cari nilai maksimum", correctAnswer: "4", hint: "x = -4/(2·-1) = 2. y = -(4) + 4(2) = -4 + 8 = 4" },
            { question: "Bagi persamaan: y = x² - 4", subQuestion: "Cari pintasan-x (punca-punca)", correctAnswer: "-2,2", hint: "0 = x² - 4, jadi x² = 4, x = ±2" }
        ],
        hard: [
            { question: "Bagi persamaan: y = 3x² + 6x + 2", subQuestion: "Cari koordinat titik minimum", correctAnswer: "-1,-1", hint: "x = -6/(2·3) = -1. y = 3(1) + 6(-1) + 2 = 3 - 6 + 2 = -1" },
            { question: "Bagi persamaan: y = -2x² + 8x - 6", subQuestion: "Cari nilai maksimum", correctAnswer: "2", hint: "x = -8/(2·-2) = 2. y = -2(4) + 8(2) - 6 = -8 + 16 - 6 = 2" },
            { question: "Bagi persamaan: y = x² - 5x + 6", subQuestion: "Cari punca-punca (faktorkan)", correctAnswer: "2,3", hint: "Faktorkan: (x - 2)(x - 3) = 0, jadi x = 2 atau x = 3" },
            { question: "Bagi persamaan: y = (x - 3)² + 2", subQuestion: "Apakah titik minimum?", correctAnswer: "3,2", hint: "Bentuk vertex: titik minimum adalah (3, 2)" },
            { question: "Bagi persamaan: y = 2x² - 12x + 16", subQuestion: "Cari nilai minimum", correctAnswer: "-2", hint: "x = 12/(2·2) = 3. y = 2(9) - 12(3) + 16 = 18 - 36 + 16 = -2" }
        ]
    },
    exponential: {
        easy: [
            { question: "Bagi persamaan: y = 2^x", subQuestion: "Apakah nilai y apabila x = 2?", correctAnswer: "4", hint: "Gantikan x = 2: y = 2² = 2 × 2 = 4" },
            { question: "Bagi persamaan: y = 3^x", subQuestion: "Apakah nilai y apabila x = 1?", correctAnswer: "3", hint: "Gantikan x = 1: y = 3¹ = 3" },
            { question: "Bagi persamaan: y = 2^x", subQuestion: "Apakah nilai y apabila x = 0?", correctAnswer: "1", hint: "Sebarang nombor pangkat 0 adalah 1: y = 2⁰ = 1" },
            { question: "Bagi persamaan: y = 2^x", subQuestion: "Apakah nilai y apabila x = -1?", correctAnswer: "0.5", hint: "2^(-1) = 1/2 = 0.5" },
            { question: "Bagi persamaan: y = 10^x", subQuestion: "Apakah nilai y apabila x = 2?", correctAnswer: "100", hint: "Gantikan x = 2: y = 10² = 100" }
        ],
        medium: [
            { question: "Bagi persamaan: y = 2 × 3^x", subQuestion: "Apakah nilai y apabila x = 2?", correctAnswer: "18", hint: "Gantikan x = 2: y = 2 × 3² = 2 × 9 = 18" },
            { question: "Bagi persamaan: y = 5 × 2^x", subQuestion: "Apakah nilai y apabila x = 3?", correctAnswer: "40", hint: "Gantikan x = 3: y = 5 × 2³ = 5 × 8 = 40" },
            { question: "Bagi persamaan: y = (1/2)^x", subQuestion: "Apakah nilai y apabila x = 3?", correctAnswer: "0.125", hint: "(1/2)³ = 1/8 = 0.125" },
            { question: "Bagi persamaan pertumbuhan: N = 100 × 2^t", subQuestion: "Berapakah N apabila t = 2?", correctAnswer: "400", hint: "N = 100 × 2² = 100 × 4 = 400" },
            { question: "Bagi persamaan peluruhan: N = 500 × (1/2)^t", subQuestion: "Berapakah N apabila t = 2?", correctAnswer: "125", hint: "N = 500 × (1/2)² = 500 × 1/4 = 125" }
        ],
        hard: [
            { question: "Bagi persamaan: y = e^x (e ≈ 2.718)", subQuestion: "Apakah nilai y apabila x = 0?", correctAnswer: "1", hint: "e⁰ = 1 (sama untuk semua asas)" },
            { question: "Bagi persamaan: y = 3 × 2^(x-1)", subQuestion: "Apakah nilai y apabila x = 3?", correctAnswer: "12", hint: "y = 3 × 2^(3-1) = 3 × 2² = 3 × 4 = 12" },
            { question: "Bagi persamaan: y = 2^x + 1", subQuestion: "Apakah nilai y apabila x = 2?", correctAnswer: "5", hint: "y = 2² + 1 = 4 + 1 = 5" },
            { question: "Bagi persamaan: y = 100 × (0.9)^t (peluruhan)", subQuestion: "Berapakah y apabila t = 1?", correctAnswer: "90", hint: "y = 100 × 0.9 = 90" },
            { question: "Bagi pertumbuhan: P = 1000 × 1.05^n", subQuestion: "Berapakah P apabila n = 2?", correctAnswer: "1102.5", hint: "P = 1000 × (1.05)² = 1000 × 1.1025 = 1102.5" }
        ]
    },
    trigonometric: {
        easy: [
            { question: "Bagi persamaan: y = sin(x)", subQuestion: "Apakah nilai y apabila x = 0°?", correctAnswer: "0", hint: "sin(0°) = 0" },
            { question: "Bagi persamaan: y = cos(x)", subQuestion: "Apakah nilai y apabila x = 0°?", correctAnswer: "1", hint: "cos(0°) = 1" },
            { question: "Bagi persamaan: y = sin(x)", subQuestion: "Apakah nilai y apabila x = 90°?", correctAnswer: "1", hint: "sin(90°) = 1 (maksimum)" },
            { question: "Bagi persamaan: y = cos(x)", subQuestion: "Apakah nilai y apabila x = 90°?", correctAnswer: "0", hint: "cos(90°) = 0" },
            { question: "Bagi persamaan: y = tan(x)", subQuestion: "Apakah nilai y apabila x = 0°?", correctAnswer: "0", hint: "tan(0°) = 0" }
        ],
        medium: [
            { question: "Bagi persamaan: y = sin(x)", subQuestion: "Apakah nilai y apabila x = 30°?", correctAnswer: "0.5", hint: "sin(30°) = 1/2 = 0.5" },
            { question: "Bagi persamaan: y = cos(x)", subQuestion: "Apakah nilai y apabila x = 60°?", correctAnswer: "0.5", hint: "cos(60°) = 1/2 = 0.5" },
            { question: "Bagi persamaan: y = 2sin(x)", subQuestion: "Apakah nilai maksimum?", correctAnswer: "2", hint: "Amplitud adalah 2, jadi nilai maksimum = 2" },
            { question: "Bagi persamaan: y = sin(x) + 1", subQuestion: "Apakah nilai minimum?", correctAnswer: "0", hint: "sin(x) minimum = -1, jadi -1 + 1 = 0" },
            { question: "Bagi persamaan: y = 3cos(x)", subQuestion: "Apakah nilai maksimum?", correctAnswer: "3", hint: "Amplitud adalah 3, jadi nilai maksimum = 3" }
        ],
        hard: [
            { question: "Bagi persamaan: y = 2sin(x) + 3", subQuestion: "Apakah nilai maksimum?", correctAnswer: "5", hint: "Maksimum sin(x) = 1, jadi 2(1) + 3 = 5" },
            { question: "Bagi persamaan: y = cos(2x)", subQuestion: "Apakah tempoh (period)?", correctAnswer: "180", hint: "Tempoh = 360/2 = 180°" },
            { question: "Bagi persamaan: y = sin(x/2)", subQuestion: "Apakah tempoh (period)?", correctAnswer: "720", hint: "Tempoh = 360/(1/2) = 720°" },
            { question: "Bagi persamaan: y = 3sin(x) - 1", subQuestion: "Apakah nilai minimum?", correctAnswer: "-4", hint: "Minimum sin(x) = -1, jadi 3(-1) - 1 = -4" },
            { question: "Bagi persamaan: y = 2cos(x + 90°)", subQuestion: "Apabila x = 0°, apakah nilai y?", correctAnswer: "0", hint: "y = 2cos(90°) = 2 × 0 = 0" }
        ]
    }
};

// AI Tutor Knowledge Base
const aiTutorKnowledge = {
    suggestions: [
        "Apakah itu graf linear?",
        "Bagaimana cara cari kecerunan?",
        "Apa beza antara linear dan kuadratik?",
        "Bagaimana cara menyelesaikan persamaan kuadratik?",
        "Apakah itu pintasan-y?"
    ],
    responses: {
        "linear": "Graf linear adalah garis lurus dengan persamaan y = mx + c, di mana m adalah kecerunan dan c adalah pintasan-y.",
        "kecerunan": "Kecerunan (slope) = perubahan y / perubahan x = (y₂ - y₁) / (x₂ - x₁)",
        "kuadratik": "Graf kuadratik adalah parabola dengan persamaan y = ax² + bx + c. Ia berbentuk U atau ∩.",
        "exponential": "Graf eksponen adalah y = a × b^x. Ia naik atau turun dengan cepat mengikut nilai a dan b.",
        "trigonometric": "Graf trigonometrik seperti sin(x), cos(x), tan(x) menunjukkan fungsi periodik yang berulang.",
        "default": "Saya dapat membantu anda memahami graf matematika. Sila tanyakan lebih spesifik tentang topik yang ingin dipelajari!"
    }
};

// Graph Game Data
const graphGameData = [
    { type: 'linear', description: 'Garis lurus, kecerunan positif' },
    { type: 'quadratic', description: 'Parabola membuka ke atas' },
    { type: 'exponential', description: 'Pertumbuhan eksponensial' },
    { type: 'trigonometric', description: 'Gelombang sinusoid' },
    { type: 'linear', description: 'Garis lurus, kecerunan negatif' }
];

// Core Game Functions
function startGame() {
    const nameInput = document.getElementById('studentName').value.trim();
    if (!nameInput) {
        alert('Sila masukkan nama anda');
        return;
    }
    gameState.studentName = nameInput;
    gameState.stats.level = 1;
    loadSuggestedQuestions();
    showPage('menu');
}

function setDifficulty(difficulty) {
    gameState.currentDifficulty = difficulty;
    document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function startTopic(topic) {
    gameState.currentTopic = topic;
    gameState.currentQuestionIndex = 0;
    gameState.answeredCorrectly = 0;
    const questions = questionDatabase[topic][gameState.currentDifficulty];
    gameState.sessionQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    loadQuestion();
    showPage('questionContainer');
}

function loadQuestion() {
    const question = gameState.sessionQuestions[gameState.currentQuestionIndex];
    if (!question) {
        endTopic();
        return;
    }
    const progressPercent = ((gameState.currentQuestionIndex) / gameState.sessionQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
    document.getElementById('questionCounter').textContent = `${gameState.currentQuestionIndex + 1}/${gameState.sessionQuestions.length}`;
    let html = `<h3>${gameState.currentTopic.toUpperCase()}</h3><p class="question-text">${question.question}</p>`;
    if (question.question.includes('y =') || question.question.includes('persamaan')) {
        html += `<div class="equation">${question.question.match(/y\s*=\s*[^<]*/)?.[0] || question.question}</div>`;
    }
    html += `<p class="question-text"><strong>${question.subQuestion}</strong></p>`;
    document.getElementById('questionContent').innerHTML = html;
    document.getElementById('answerInput').value = '';
    document.getElementById('feedbackMessage').innerHTML = '';
    document.getElementById('feedbackMessage').className = 'feedback-message';
    document.getElementById('answerInput').focus();
}

function submitAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const question = gameState.sessionQuestions[gameState.currentQuestionIndex];
    const correctAnswer = question.correctAnswer.toLowerCase();
    if (!userAnswer) {
        alert('Sila masukkan jawapan');
        return;
    }
    const feedbackEl = document.getElementById('feedbackMessage');
    gameState.stats.totalAttempts++;
    const isCorrect = userAnswer === correctAnswer || userAnswer === correctAnswer.replace(/,/g, ' ') || userAnswer.replace(/\s/g, '') === correctAnswer.replace(/,/g, '');
    if (isCorrect) {
        gameState.answeredCorrectly++;
        gameState.stats.correctAnswers++;
        gameState.totalScore += 10;
        feedbackEl.innerHTML = '✅ Betul! +10 markah';
        feedbackEl.className = 'feedback-message correct';
        document.getElementById('score').textContent = gameState.totalScore;
        setTimeout(() => {
            gameState.currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    } else {
        feedbackEl.innerHTML = `❌ Salah. Jawapan yang betul: ${question.correctAnswer}`;
        feedbackEl.className = 'feedback-message incorrect';
    }
}

function showHint() {
    const question = gameState.sessionQuestions[gameState.currentQuestionIndex];
    if (question) {
        document.getElementById('hintContent').innerHTML = `<p><strong>💡 Petunjuk:</strong></p><p>${question.hint}</p>`;
        showPage('hintPage');
    }
}

function backToQuestion() {
    showPage('questionContainer');
}

function endTopic() {
    const totalQuestions = gameState.sessionQuestions.length;
    const percentage = (gameState.answeredCorrectly / totalQuestions) * 100;
    gameState.topicScores[gameState.currentTopic] = {
        score: gameState.answeredCorrectly,
        total: totalQuestions,
        difficulty: gameState.currentDifficulty,
        percentage: percentage
    };
    document.getElementById('finalScore').textContent = Math.round(percentage);
    let performanceText = '';
    if (percentage === 100) performanceText = '🌟 Luar biasa! Anda sempurna!';
    else if (percentage >= 80) performanceText = '😊 Cemerlang! Terus begitu!';
    else if (percentage >= 60) performanceText = '👍 Bagus! Anda boleh buat lebih baik!';
    else performanceText = '💪 Jangan putus asa! Cuba lagi!';
    document.getElementById('performanceText').textContent = performanceText;
    if (gameState.totalScore >= 20) {
        gameState.stats.level = 2;
        document.getElementById('level2Btn').style.display = 'inline-block';
    }
    if (gameState.totalScore >= 60) gameState.stats.level = 3;
    gameState.stats.topicsCompleted++;
    showPage('success');
}

// AI TUTOR FUNCTIONS
function loadSuggestedQuestions() {
    const container = document.getElementById('suggestedQuestionsContainer');
    container.innerHTML = '';
    aiTutorKnowledge.suggestions.forEach((question, index) => {
        const btn = document.createElement('button');
        btn.className = 'suggested-btn';
        btn.textContent = question;
        btn.onclick = () => handleSuggestedQuestion(question);
        container.appendChild(btn);
    });
}

function sendQuestion() {
    const userQuestion = document.getElementById('userQuestion').value.trim();
    if (!userQuestion) {
        alert('Sila tanya soalan');
        return;
    }
    addChatMessage(userQuestion, 'user');
    const response = generateAIResponse(userQuestion);
    setTimeout(() => {
        addChatMessage(response, 'ai');
    }, 500);
    document.getElementById('userQuestion').value = '';
}

function handleSuggestedQuestion(question) {
    document.getElementById('userQuestion').value = question;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.getElementById('userQuestion').dispatchEvent(event);
    sendQuestion();
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userQuestion) {
    const questionLower = userQuestion.toLowerCase();
    for (const [keyword, response] of Object.entries(aiTutorKnowledge.responses)) {
        if (keyword !== 'default' && questionLower.includes(keyword)) {
            return response;
        }
    }
    return aiTutorKnowledge.responses.default;
}

// GUESS THE GRAPH GAME FUNCTIONS
function startGuessTheGraphGame() {
    gameState.gameScore = 0;
    gameState.gameCorrectAnswers = 0;
    gameState.currentQuestionIndex = 0;
    loadGraphGameQuestion();
    showPage('guessTheGraph');
}

function loadGraphGameQuestion() {
    if (gameState.currentQuestionIndex >= 5) {
        endGraphGame();
        return;
    }
    const progressPercent = ((gameState.currentQuestionIndex) / 5) * 100;
    document.getElementById('gameProgressFill').style.width = progressPercent + '%';
    document.getElementById('gameCounter').textContent = `${gameState.currentQuestionIndex + 1}/5`;
    const graphData = graphGameData[gameState.currentQuestionIndex];
    document.getElementById('graphGameContent').innerHTML = `
        <canvas id="graphCanvas" class="graph-canvas"></canvas>
        <p style="margin-top: 15px; font-size: 1.05em; color: var(--text-secondary);">
            <strong>${graphData.description}</strong>
        </p>
    `;
    drawGraph(graphData.type);
    loadGraphOptions();
    document.getElementById('gameMessage').innerHTML = '';
    document.getElementById('gameMessage').className = 'feedback-message';
}

function drawGraph(type) {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 40;
    ctx.beginPath();
    if (type === 'linear') {
        ctx.moveTo(0, centerY - 2 * scale);
        ctx.lineTo(canvas.width, centerY + 2 * scale);
    } else if (type === 'quadratic') {
        ctx.moveTo(0, centerY);
        for (let x = 0; x < canvas.width; x += 2) {
            const relX = (x - centerX) / scale;
            const y = centerY - (relX * relX * 30);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
    } else if (type === 'exponential') {
        ctx.moveTo(0, centerY + 100);
        for (let x = 0; x < canvas.width; x += 2) {
            const relX = (x - centerX) / scale / 2;
            const y = centerY - (Math.pow(1.5, relX) * 30);
            ctx.lineTo(x, y);
        }
    } else if (type === 'trigonometric') {
        ctx.moveTo(0, centerY);
        for (let x = 0; x < canvas.width; x += 2) {
            const relX = (x - centerX) / scale;
            const y = centerY - (Math.sin(relX) * 50);
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

function loadGraphOptions() {
    const optionsContainer = document.getElementById('graphOptions');
    optionsContainer.innerHTML = '';
    const types = ['linear', 'quadratic', 'exponential', 'trigonometric'];
    types.forEach(type => {
        const btn = document.createElement('button');
        btn.className = 'graph-option-btn';
        btn.textContent = type === 'linear' ? 'Linear' : type === 'quadratic' ? 'Kuadratik' : type === 'exponential' ? 'Eksponen' : 'Trigonometrik';
        btn.onclick = () => checkGraphAnswer(type);
        optionsContainer.appendChild(btn);
    });
}

function checkGraphAnswer(selectedType) {
    const correctType = graphGameData[gameState.currentQuestionIndex].type;
    const messageEl = document.getElementById('gameMessage');
    if (selectedType === correctType) {
        gameState.gameCorrectAnswers++;
        gameState.gameScore += 20;
        messageEl.innerHTML = '✅ Betul! +20 markah';
        messageEl.className = 'feedback-message correct';
    } else {
        messageEl.innerHTML = `❌ Salah. Jawapan yang betul: ${correctType.charAt(0).toUpperCase() + correctType.slice(1)}`;
        messageEl.className = 'feedback-message incorrect';
    }
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        loadGraphGameQuestion();
    }, 1500);
}

function endGraphGame() {
    const percentage = (gameState.gameCorrectAnswers / 5) * 100;
    document.getElementById('gameProgressFill').style.width = '100%';
    let performanceText = '';
    if (percentage === 100) performanceText = '🌟 Sempurna! Anda ahli!';
    else if (percentage >= 80) performanceText = '😊 Luar biasa!';
    else if (percentage >= 60) performanceText = '👍 Bagus!';
    else performanceText = '💪 Terus praktik!';
    alert(`Skor Anda: ${Math.round(percentage)}%\n${performanceText}`);
    showPage('menu');
}

// PAGE NAVIGATION
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(page);
    if (targetPage) targetPage.classList.add('active');
    if (page === 'menu') document.getElementById('score').textContent = gameState.totalScore;
    if (page === 'aiTutor') loadSuggestedQuestions();
    if (page === 'guessTheGraph') startGuessTheGraphGame();
}

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const answerInput = document.getElementById('answerInput');
    const userQuestion = document.getElementById('userQuestion');
    if (answerInput) answerInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') submitAnswer(); });
    if (userQuestion) userQuestion.addEventListener('keypress', function(e) { if (e.key === 'Enter') sendQuestion(); });
});
