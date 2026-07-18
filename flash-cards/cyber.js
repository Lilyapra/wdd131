const terms = [
  {
    term: "Phishing",
    definition: "Tricking someone into handing over sensitive info by posing as a trustworthy sender, usually through email or text."
  },
  {
    term: "Malware",
    definition: "Any software written specifically to damage, disrupt, or gain unauthorized access to a device or network."
  },
  {
    term: "Firewall",
    definition: "A system that monitors incoming and outgoing network traffic and blocks anything that breaks its rules."
  },
  {
    term: "Encryption",
    definition: "Scrambling data into unreadable code so only someone with the right key can turn it back into plain text."
  },
  {
    term: "Vulnerability",
    definition: "A weakness in a system, app, or process that a threat could exploit to cause harm."
  },
  {
    term: "Ransomware",
    definition: "Malware that locks or encrypts a victim's files and demands payment before access is restored."
  },
  {
    term: "Two-Factor Authentication",
    definition: "A login process that requires two different proofs of identity, like a password plus a code sent to your phone."
  },
  {
    term: "VPN",
    definition: "A Virtual Private Network that encrypts your connection and hides your traffic as it crosses the internet."
  },
  {
    term: "Social Engineering",
    definition: "Manipulating a person, rather than a system, into breaking normal security procedures."
  },
  {
    term: "Zero-Day Exploit",
    definition: "An attack that targets a software flaw before the developer has released a fix for it."
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

if (document.querySelector('#card')) {
  let currentIndex = 0;

  const card = document.querySelector('#card');
  const cardFront = document.querySelector('#cardFront');
  const cardBack = document.querySelector('#cardBack');
  const progress = document.querySelector('#progress');

  function showCard(index) {
    card.classList.remove('is-flipped');
    cardFront.textContent = terms[index].term;
    cardBack.textContent = terms[index].definition;
    updateProgress(index);
  }

  function updateProgress(index) {
    progress.innerHTML = '';
    for (let i = 0; i < terms.length; i++) {
      const dot = document.createElement('span');
      if (i === index) dot.classList.add('seen');
      progress.appendChild(dot);
    }
  }

  card.addEventListener('click', () => card.classList.toggle('is-flipped'));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') card.classList.toggle('is-flipped');
  });

  document.querySelector('#flipBtn').addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });

  document.querySelector('#nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % terms.length;
    showCard(currentIndex);
  });

  document.querySelector('#prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + terms.length) % terms.length;
    showCard(currentIndex);
  });

  showCard(currentIndex);
}

if (document.querySelector('#quizApp')) {
  const BEST_SCORE_KEY = 'cyberterms-best-score';

  let quizTerms = shuffle([...terms]);
  let questionIndex = 0;
  let score = 0;
  let answered = false;

  const quizMeta = document.querySelector('#quizMeta');
  const questionBox = document.querySelector('#questionBox');
  const choicesEl = document.querySelector('#choices');
  const feedback = document.querySelector('#feedback');
  const nextBtn = document.querySelector('#nextBtn');

  function getChoices(correctTerm) {
    const distractors = shuffle(terms.filter((t) => t.term !== correctTerm))
      .slice(0, 3)
      .map((t) => t.term);
    return shuffle([correctTerm, ...distractors]);
  }

  function loadQuestion() {
    if (questionIndex >= quizTerms.length) {
      showResults();
      return;
    }

    answered = false;
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextBtn.hidden = true;

    quizMeta.textContent = `Question ${questionIndex + 1} of ${quizTerms.length} · Score: ${score}`;

    const current = quizTerms[questionIndex];
    questionBox.textContent = `${current.definition} is called a...`;

    choicesEl.innerHTML = '';
    getChoices(current.term).forEach((choice) => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.addEventListener('click', (e) => selectAnswer(e, current.term));
      choicesEl.appendChild(btn);
    });
  }

  function selectAnswer(e, correctTerm) {
    if (answered) return;
    answered = true;

    const chosen = e.target.textContent;
    choicesEl.querySelectorAll('button').forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === correctTerm) btn.classList.add('correct');
    });

    if (chosen === correctTerm) {
      score++;
      feedback.textContent = 'Correct!';
      feedback.classList.add('correct');
    } else {
      e.target.classList.add('incorrect');
      feedback.textContent = `Incorrect. The answer was ${correctTerm}.`;
      feedback.classList.add('incorrect');
    }

    nextBtn.hidden = false;
  }

  nextBtn.addEventListener('click', () => {
    questionIndex++;
    loadQuestion();
  });

  function showResults() {
    const bestScore = Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
    const isNewBest = score > bestScore;
    if (isNewBest) localStorage.setItem(BEST_SCORE_KEY, score);

    document.querySelector('#quizApp').innerHTML = `
      <h1>Quiz complete</h1>
      <div class="results">
        <p class="score">${score} / ${quizTerms.length}</p>
        <p class="best">${isNewBest ? 'New personal best!' : `Best score: ${Math.max(bestScore, score)} / ${quizTerms.length}`}</p>
        <button class="primary" onclick="location.reload()">Try again</button>
      </div>
    `;
  }

  loadQuestion();
}