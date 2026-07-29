(() => {
  "use strict";

  const STORAGE_KEY = "sansuDaigakuV11Fixed";
  let appData = loadData();
  let session = null;
  let activeProblem = null;
  let answerMode = "text";
  let learningRoute = "independent";
  let sentenceMode = false;
  let lineFocusMode = false;
  let sentenceIndex = 0;
  let stepIndex = 0;
  let stepAnswers = [];
  let supportUsage = {};
  let problemStartedAt = null;
  let hintCount = 0;
  let practiceItems = [];
  let practiceIndex = 0;
  let practiceResults = [];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return clone(DEFAULT_APP_DATA);
      const parsed = JSON.parse(saved);
      const merged = {
        ...clone(DEFAULT_APP_DATA),
        ...parsed,
        professors: Array.isArray(parsed.professors) && parsed.professors.length
          ? parsed.professors
          : clone(DEFAULT_APP_DATA.professors),
        students: Array.isArray(parsed.students) ? parsed.students : clone(DEFAULT_APP_DATA.students),
        problems: (() => {
          const savedProblems = Array.isArray(parsed.problems) ? parsed.problems : [];
          const savedById = new Map(savedProblems.map((problem) => [problem.id, problem]));
          const defaultsWithSavedEdits = clone(DEFAULT_APP_DATA.problems).map((defaultProblem) => ({
            ...defaultProblem,
            ...(savedById.get(defaultProblem.id) || {})
          }));
          const customProblems = savedProblems.filter((problem) =>
            !DEFAULT_APP_DATA.problems.some((defaultProblem) => defaultProblem.id === problem.id)
          );
          return [...defaultsWithSavedEdits, ...customProblems];
        })()
      };
      merged.students = merged.students.map((student) => ({
        ...student,
        history: Array.isArray(student.history) ? student.history : [],
        profile: {
          audio: false, ruby: false, large: false, choice: false,
          template: false, visual: false, steps: false, easy: false,
          ...student.profile
        }
      }));
      merged.problems = merged.problems.map((problem, index) => ({
        ...clone(DEFAULT_APP_DATA.problems[index] || {}),
        ...problem,
        grade: Number(problem.grade || DEFAULT_APP_DATA.problems[index]?.grade || 5),
        professor: problem.professor || DEFAULT_APP_DATA.problems[index]?.professor || "たっくん教授",
        correctExplanation: problem.correctExplanation || problem.modelAnswer || DEFAULT_APP_DATA.problems[index]?.correctExplanation || "",
        distractors: problem.distractors || (problem.choices || []).slice(1) || DEFAULT_APP_DATA.problems[index]?.distractors || [],
        choices: problem.choices || DEFAULT_APP_DATA.problems[index]?.choices || [],
        blankPhrase: problem.blankPhrase || DEFAULT_APP_DATA.problems[index]?.blankPhrase || "",
        blankDistractors: problem.blankDistractors || DEFAULT_APP_DATA.problems[index]?.blankDistractors || [],
        clozeText: problem.clozeText || DEFAULT_APP_DATA.problems[index]?.clozeText || "",
        practiceKind: problem.practiceKind || DEFAULT_APP_DATA.problems[index]?.practiceKind || "manual",
        practiceItems: problem.practiceItems || DEFAULT_APP_DATA.problems[index]?.practiceItems || [],
        smallSteps: problem.smallSteps || DEFAULT_APP_DATA.problems[index]?.smallSteps || []
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (error) {
      console.error(error);
      return clone(DEFAULT_APP_DATA);
    }
  }
  function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(appData)); }
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2000);
  }
  function showPage(pageId) {
    ["studentHomeView", "problemView", "practiceView", "profileView", "teacherView"].forEach((id) => {
      $("#" + id).classList.toggle("hidden", id !== pageId);
    });
  }
  function currentStudent() {
    return appData.students.find((student) => student.id === session?.studentId);
  }
  function levelFromXp(xp) { return Math.floor(xp / 100) + 1; }
  function professorByName(name) {
    return appData.professors?.find((professor) => professor.name === name)
      || appData.professors?.[0]
      || { name: name || "たっくん教授", image: "images/professors/takkun.png", greeting: "今日も挑戦しよう！", success: "よくできました。", retry: "もう一度考えてみよう。" };
  }
  function professorForProblem(problem) {
    return professorByName(problem?.professor);
  }

  function profileLabels(profile) {
    const labels = [];
    if (profile.audio) labels.push("音声で聞く");
    if (profile.ruby) labels.push("ふりがな");
    if (profile.large) labels.push("大きな文字");
    if (profile.choice) labels.push("選んで答える");
    if (profile.template) labels.push("文の型");
    if (profile.visual) labels.push("図で考える");
    if (profile.steps) labels.push("手順を小分け");
    if (profile.easy) labels.push("やさしい問題から");
    return labels;
  }

  function enterApp() {
    $("#loginView").classList.add("hidden");
    $("#appView").classList.remove("hidden");
    if (session.role === "teacher") {
      $("#sessionInfo").innerHTML = "<strong>教師モード</strong><small>児童と問題を管理します</small>";
    } else {
      const student = currentStudent();
      $("#sessionInfo").innerHTML = `<strong>${student.name} さん</strong><small>${student.grade}年生</small>`;
    }
  }

  $("#studentTabBtn").addEventListener("click", () => {
    $("#studentTabBtn").classList.add("active");
    $("#teacherTabBtn").classList.remove("active");
    $("#studentLoginForm").classList.remove("hidden");
    $("#teacherLoginForm").classList.add("hidden");
  });

  $("#teacherTabBtn").addEventListener("click", () => {
    $("#teacherTabBtn").classList.add("active");
    $("#studentTabBtn").classList.remove("active");
    $("#teacherLoginForm").classList.remove("hidden");
    $("#studentLoginForm").classList.add("hidden");
  });

  $("#studentLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const loginId = $("#studentIdInput").value.trim();
    const password = $("#studentPasswordInput").value;
    const student = appData.students.find((item) => item.loginId === loginId && item.password === password);
    if (!student) {
      showToast("IDまたはパスワードが違います");
      return;
    }
    session = { role: "student", studentId: student.id };
    enterApp();
    renderStudentHome();
  });

  $("#teacherLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if ($("#teacherPasscodeInput").value !== "4180") {
      showToast("教師用パスコードが違います");
      return;
    }
    session = { role: "teacher" };
    enterApp();
    renderTeacherView("dashboard");
  });

  $("#logoutBtn").addEventListener("click", () => {
    session = null;
    $("#appView").classList.add("hidden");
    $("#loginView").classList.remove("hidden");
  });

  function chooseRecommendation(student) {
    const completed = new Set(student.history.filter((item) => item.score >= 80).map((item) => item.problemId));
    const sameGrade = appData.problems.filter((problem) => Number(problem.grade) === Number(student.grade));
    return sameGrade.find((problem) => !completed.has(problem.id))
      || sameGrade[0]
      || appData.problems.find((problem) => !completed.has(problem.id))
      || appData.problems[0];
  }

  function renderStudentHome() {
    showPage("studentHomeView");
    const student = currentStudent();
    const level = levelFromXp(student.xp);
    const labels = profileLabels(student.profile);
    const recommendation = chooseRecommendation(student);

    $("#studentDisplayName").textContent = student.name + " さん";
    $("#studentLevel").textContent = level;
    $("#campusLevel").textContent = "Lv." + Math.max(1, Math.floor(level / 2));
    $("#studentPoints").textContent = student.points + " pt";
    $("#studentClears").textContent = new Set(student.history.filter((item) => item.score >= 60).map((item) => item.problemId)).size + " 問";
    $("#studentStyleText").textContent = labels.slice(0, 3).join("・") || "スタンダードな学び方";
    $("#supportChips").innerHTML = (labels.length ? labels : ["自分の言葉で説明"]).map((label) => `<span class="chip">${label}</span>`).join("");
    $("#xpFill").style.width = (student.xp % 100) + "%";
    $("#xpText").textContent = `${student.xp % 100} / 100 EXP`;
    const homeProfessor = professorForProblem(recommendation);
    $("#recommendationBox").innerHTML = `<div class="recommendation-professor"><img src="${homeProfessor.image}" alt="${homeProfessor.name}"><div><strong>${recommendation.unit}｜${recommendation.title}</strong><p>担当：${homeProfessor.name}　${student.profile.visual ? "図を使って" : "自分の言葉で"}考えよう。</p></div></div>`;
    $("#startRecommendationBtn").onclick = () => openProblem(recommendation.id);

    const gradeOptions = [
      { value: String(student.grade), label: `${student.grade}年生（おすすめ）` },
      ...[1,2,3,4,5,6].filter((grade) => grade !== Number(student.grade)).map((grade) => ({ value: String(grade), label: `${grade}年生` })),
      { value: "all", label: "すべての学年" }
    ];
    $("#gradeFilter").innerHTML = gradeOptions.map((item) => `<option value="${item.value}">${item.label}</option>`).join("");
    $("#gradeFilter").value = String(student.grade);
    $("#gradeFilter").onchange = () => {
      renderUnitFilter();
      renderProblemList();
    };
    $("#unitFilter").onchange = renderProblemList;
    renderUnitFilter();
    renderProblemList();

    const average = student.history.length
      ? Math.round(student.history.reduce((sum, item) => sum + item.score, 0) / student.history.length)
      : 0;
    $("#studentMetrics").innerHTML = `
      <div class="metric"><span>挑戦回数</span><strong>${student.history.length}</strong></div>
      <div class="metric"><span>平均点</span><strong>${average}</strong></div>`;
    $("#recentHistory").innerHTML = student.history.slice(-5).reverse().map((item) => {
      const problem = appData.problems.find((entry) => entry.id === item.problemId);
      return `<div class="history-item">${problem?.title || "問題"}：${item.score}点</div>`;
    }).join("") || '<p class="muted">まだ記録がありません。</p>';
  }

  function renderUnitFilter() {
    const gradeValue = $("#gradeFilter").value;
    const gradeProblems = appData.problems.filter((problem) =>
      gradeValue === "all" || Number(problem.grade) === Number(gradeValue)
    );
    const currentUnit = $("#unitFilter").value;
    const units = ["すべて", ...new Set(gradeProblems.map((problem) => problem.unit))];
    $("#unitFilter").innerHTML = units.map((unit) => `<option value="${unit}">${unit}</option>`).join("");
    if (units.includes(currentUnit)) $("#unitFilter").value = currentUnit;
  }

  function renderProblemList() {
    const student = currentStudent();
    const gradeValue = $("#gradeFilter").value;
    const unit = $("#unitFilter").value;
    const visibleProblems = appData.problems.filter((problem) =>
      (gradeValue === "all" || Number(problem.grade) === Number(gradeValue))
      && (unit === "すべて" || problem.unit === unit)
    );
    $("#problemList").innerHTML = visibleProblems.map((problem) => {
      const best = Math.max(0, ...student.history.filter((item) => item.problemId === problem.id).map((item) => item.score));
      return `<article class="problem-card ${best >= 60 ? "done" : ""}">
        <div class="row"><span class="tag">${problem.grade}年｜${problem.unit}</span><span>${"★".repeat(problem.difficulty)}</span></div>
        <h3>${problem.title}</h3><p>${problem.question}</p>
        <div class="row"><small>${best ? best + "点" : "未挑戦"}</small><button class="btn soft challenge-btn" data-id="${problem.id}" type="button">挑戦する</button></div>
      </article>`;
    }).join("") || '<p class="notice">この条件の問題はありません。</p>';
    $$(".challenge-btn").forEach((button) => button.addEventListener("click", () => openProblem(button.dataset.id)));
  }

  function openProblem(problemId) {
    activeProblem = appData.problems.find((problem) => problem.id === problemId);
    if (!activeProblem) return;
    answerMode = "choice";
    learningRoute = currentStudent().profile.steps ? "smallStep" : "independent";
    sentenceMode = false;
    lineFocusMode = false;
    sentenceIndex = 0;
    stepIndex = 0;
    stepAnswers = [];
    hintCount = 0;
    problemStartedAt = Date.now();
    supportUsage = {
      audio: false, ruby: Boolean(currentStudent().profile.ruby),
      large: Boolean(currentStudent().profile.large), visual: Boolean(currentStudent().profile.visual),
      sentenceMode: false, lineFocus: false, hint: false,
      route: learningRoute, answerMode
    };
    showPage("problemView");
    renderProblem();
  }

  function getProblemSentences() {
    const source = currentStudent().profile.easy ? activeProblem.simpleQuestion : activeProblem.question;
    return source.split(/(?<=[。！？?])/).map((item) => item.trim()).filter(Boolean);
  }

  function renderQuestionText() {
    const profile = currentStudent().profile;
    const sentences = getProblemSentences();
    const useRuby = profile.ruby && !sentenceMode && activeProblem.rubyText;
    let content;

    if (sentenceMode && sentences.length) {
      content = `<span class="focused-sentence">${sentences[sentenceIndex]}</span>`;
      $("#sentenceProgress").textContent = `${sentenceIndex + 1} / ${sentences.length} 文`;
      $("#sentenceProgress").classList.remove("hidden");
      $("#sentenceNavigation").classList.remove("hidden");
      $("#prevSentenceBtn").disabled = sentenceIndex === 0;
      $("#nextSentenceBtn").disabled = sentenceIndex === sentences.length - 1;
    } else {
      content = useRuby ? activeProblem.rubyText : (profile.easy ? activeProblem.simpleQuestion : activeProblem.question);
      $("#sentenceProgress").classList.add("hidden");
      $("#sentenceNavigation").classList.add("hidden");
    }

    $("#questionText").innerHTML = content;
    $("#questionText").classList.toggle("ruby-on", profile.ruby);
    $("#questionText").classList.toggle("large", profile.large);
    $("#questionText").classList.toggle("line-focus", lineFocusMode);
  }

  function renderProblem() {
    const profile = currentStudent().profile;
    const professor = professorForProblem(activeProblem);
    $("#problemProfessor").textContent = professor.name;
    $("#battleProfessorImage").src = professor.image;
    $("#battleProfessorImage").alt = professor.name;
    $("#problemMeta").textContent = `${activeProblem.grade}年生｜${activeProblem.unit}｜難易度 ${"★".repeat(activeProblem.difficulty)}`;
    $("#problemTitle").textContent = activeProblem.title;

    renderQuestionText();

    $("#visualAid").innerHTML = activeProblem.visual || "";
    $("#visualAid").classList.toggle("hidden", !profile.visual || !activeProblem.visual);
    $("#readAloudBtn").classList.toggle("hidden", !profile.audio);
    $("#furiganaBtn").classList.toggle("active", profile.ruby);
    $("#largeTextBtn").classList.toggle("active", profile.large);
    $("#sentenceModeBtn").classList.toggle("active", sentenceMode);
    $("#lineFocusBtn").classList.toggle("active", lineFocusMode);
    $("#hintBox").classList.add("hidden");
    $("#feedbackBox").classList.add("hidden");

    $("#independentModeBtn").classList.toggle("active", learningRoute === "independent");
    $("#smallStepModeBtn").classList.toggle("active", learningRoute === "smallStep");
    $("#smallStepPanel").classList.toggle("hidden", learningRoute !== "smallStep");
    $("#answerModeTabs").closest(".panel").classList.toggle("answer-panel-muted", learningRoute === "smallStep" && stepIndex < (activeProblem.smallSteps || []).length);

    if (learningRoute === "smallStep") renderSmallStep();
    renderAnswerModes();
  }

  function renderAnswerModes() {
    const modes = [["choice", "正しい説明を選ぶ"], ["cloze", "説明の穴を埋める"]];
    $("#answerModeTabs").innerHTML = modes.map(([id, label]) =>
      `<button class="answer-tab ${answerMode === id ? "active" : ""}" data-mode="${id}" type="button">${label}</button>`
    ).join("");
    $$(".answer-tab").forEach((button) => button.addEventListener("click", () => {
      answerMode = button.dataset.mode;
      supportUsage.answerMode = answerMode;
      renderAnswerModes();
    }));

    if (answerMode === "choice") {
      $("#answerArea").innerHTML = (activeProblem.choices || []).map((choice) =>
        `<label class="choice explanation-choice"><input type="radio" name="choiceAnswer" value="${choice}" /><span>${choice}</span></label>`
      ).join("");
    } else {
      const options = shuffle([activeProblem.blankPhrase, ...(activeProblem.blankDistractors || [])].filter(Boolean));
      $("#answerArea").innerHTML = `
        <div class="cloze-card">
          <p>${(activeProblem.clozeText || activeProblem.correctExplanation || "").replace("［　］", '<span id="clozeBlank" class="cloze-blank">ここを選ぶ</span>')}</p>
          <div class="cloze-options">${options.map((option) => `<button class="cloze-option" data-value="${option}" type="button">${option}</button>`).join("")}</div>
          <input id="clozeAnswer" type="hidden" />
        </div>`;
      $$(".cloze-option").forEach((button) => button.addEventListener("click", () => {
        $$(".cloze-option").forEach((item) => item.classList.toggle("selected", item === button));
        $("#clozeAnswer").value = button.dataset.value;
        $("#clozeBlank").textContent = button.dataset.value;
      }));
    }
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function collectAnswer() {
    if (answerMode === "choice") return document.querySelector('input[name="choiceAnswer"]:checked')?.value || "";
    return $("#clozeAnswer")?.value || "";
  }


  function explanationSteps(problem) {
    return [
      { prompt: `${problem.concept || problem.unit}について、正しい説明を選びましょう。`, type: "choice", options: shuffle([problem.correctExplanation, ...(problem.distractors || [])]), correct: problem.correctExplanation, support: problem.hint || "正しい説明をもう一度見比べよう。" },
      { prompt: "説明の大切な言葉を入れましょう。", type: "choice", options: shuffle([problem.blankPhrase, ...(problem.blankDistractors || [])]), correct: problem.blankPhrase, support: `正しい説明は「${problem.correctExplanation}」です。` }
    ];
  }

  function currentStep() {
    return explanationSteps(activeProblem)[stepIndex];
  }

  function renderSmallStep() {
    const steps = explanationSteps(activeProblem);
    if (!steps.length) {
      $("#stepContent").innerHTML = '<p class="notice">この問題のスモールステップは準備中です。自分で解くに切り替えてください。</p>';
      $("#checkStepBtn").classList.add("hidden");
      return;
    }
    const step = steps[stepIndex];
    $("#stepCounter").textContent = `STEP ${stepIndex + 1} / ${steps.length}`;
    $("#stepProgressFill").style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
    $("#stepTitle").textContent = step.prompt;
    $("#stepFeedback").classList.add("hidden");
    $("#nextStepBtn").classList.add("hidden");
    $("#checkStepBtn").classList.remove("hidden");
    $("#prevStepBtn").disabled = stepIndex === 0;

    if (step.type === "choice") {
      $("#stepContent").innerHTML = `<div class="step-choice-list">${step.options.map((option) =>
        `<label class="choice"><input type="radio" name="stepChoice" value="${option}">${option}</label>`
      ).join("")}</div>`;
    }
  }

  function collectStepAnswer() {
    const step = currentStep();
    if (!step) return "";
    return document.querySelector('input[name="stepChoice"]:checked')?.value || "";
  }

  function checkCurrentStep() {
    const step = currentStep();
    const answer = collectStepAnswer();
    if (!answer) {
      showToast("この段の答えを入力または選択してください");
      return;
    }

    let correct = false;
    correct = answer === step.correct;

    stepAnswers[stepIndex] = { answer, correct };
    $("#stepFeedback").className = `step-feedback ${correct ? "good" : "retry"}`;
    $("#stepFeedback").innerHTML = correct
      ? `<strong>この段はクリア！</strong><p>考え方が一つつながりました。</p>`
      : `<strong>ここまで考えられています。</strong><p>${step.support || "もう一度、問題文や図を確かめよう。"}</p>`;
    $("#stepFeedback").classList.remove("hidden");

    if (correct) {
      $("#checkStepBtn").classList.add("hidden");
      $("#nextStepBtn").classList.remove("hidden");
      $("#nextStepBtn").textContent = stepIndex === (activeProblem.smallSteps || []).length - 1
        ? "最後の答えへ →" : "次の段へ →";
    }
  }

  function finishSmallSteps() {
    const assembled = stepAnswers.map((item) => item?.answer).filter(Boolean).join("。");
    learningRoute = "independent";
    supportUsage.route = "smallStep";
    renderProblem();
    answerMode = "choice";
    renderAnswerModes();
    showToast("一段ずつ考えた内容を、最後の答えにつなげよう");
  }

  $("#backToHomeBtn").addEventListener("click", renderStudentHome);
  $("#openProfileBtn").addEventListener("click", renderProfile);
  $("#backFromProfileBtn").addEventListener("click", renderStudentHome);
  $("#independentModeBtn").addEventListener("click", () => {
    learningRoute = "independent";
    supportUsage.route = "independent";
    renderProblem();
  });
  $("#smallStepModeBtn").addEventListener("click", () => {
    learningRoute = "smallStep";
    supportUsage.route = "smallStep";
    stepIndex = 0;
    stepAnswers = [];
    renderProblem();
  });
  $("#checkStepBtn").addEventListener("click", checkCurrentStep);
  $("#prevStepBtn").addEventListener("click", () => {
    if (stepIndex > 0) {
      stepIndex -= 1;
      renderSmallStep();
    }
  });
  $("#nextStepBtn").addEventListener("click", () => {
    const steps = explanationSteps(activeProblem);
    if (stepIndex < steps.length - 1) {
      stepIndex += 1;
      renderSmallStep();
    } else {
      finishSmallSteps();
    }
  });
  $("#showHintBtn").addEventListener("click", () => {
    $("#hintBox").textContent = activeProblem.hint || "ヒントはありません。";
    $("#hintBox").classList.remove("hidden");
    hintCount += 1;
    supportUsage.hint = true;
  });
  $("#furiganaBtn").addEventListener("click", () => {
    currentStudent().profile.ruby = !currentStudent().profile.ruby;
    supportUsage.ruby = currentStudent().profile.ruby;
    renderQuestionText();
    $("#furiganaBtn").classList.toggle("active", currentStudent().profile.ruby);
  });
  $("#largeTextBtn").addEventListener("click", () => {
    currentStudent().profile.large = !currentStudent().profile.large;
    supportUsage.large = currentStudent().profile.large;
    renderQuestionText();
    $("#largeTextBtn").classList.toggle("active", currentStudent().profile.large);
  });
  $("#sentenceModeBtn").addEventListener("click", () => {
    sentenceMode = !sentenceMode;
    sentenceIndex = 0;
    supportUsage.sentenceMode = sentenceMode;
    renderQuestionText();
    $("#sentenceModeBtn").classList.toggle("active", sentenceMode);
  });
  $("#lineFocusBtn").addEventListener("click", () => {
    lineFocusMode = !lineFocusMode;
    supportUsage.lineFocus = lineFocusMode;
    renderQuestionText();
    $("#lineFocusBtn").classList.toggle("active", lineFocusMode);
  });
  $("#prevSentenceBtn").addEventListener("click", () => {
    if (sentenceIndex > 0) sentenceIndex -= 1;
    renderQuestionText();
  });
  $("#nextSentenceBtn").addEventListener("click", () => {
    const sentences = getProblemSentences();
    if (sentenceIndex < sentences.length - 1) sentenceIndex += 1;
    renderQuestionText();
  });
  $("#showAllSentencesBtn").addEventListener("click", () => {
    sentenceMode = false;
    renderQuestionText();
    $("#sentenceModeBtn").classList.remove("active");
  });
  $("#readAloudBtn").addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      showToast("このブラウザは読み上げに対応していません");
      return;
    }
    speechSynthesis.cancel();
    supportUsage.audio = true;
    const sentences = getProblemSentences();
    const readText = sentenceMode && sentences.length ? sentences[sentenceIndex] : (currentStudent().profile.easy ? activeProblem.simpleQuestion : activeProblem.question);
    const utterance = new SpeechSynthesisUtterance(readText);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  });
  $("#submitAnswerBtn").addEventListener("click", () => {
    const answer = collectAnswer();
    if (!answer) {
      showToast("説明を選んでください");
      return;
    }
    const correct = answerMode === "choice"
      ? answer === activeProblem.correctExplanation
      : answer === activeProblem.blankPhrase;
    const score = correct ? 100 : 0;
    const student = currentStudent();
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - problemStartedAt) / 1000));

    $("#feedbackBox").className = "feedback " + (correct ? "good" : "");
    const professor = professorForProblem(activeProblem);
    $("#feedbackBox").innerHTML = `
      <div class="professor-feedback">
        <img src="${professor.image}" alt="${professor.name}">
        <div>
          <div class="feedback-score">${correct ? "説明できた！" : "もう一度確認"}</div>
          <strong>${professor.name}：${correct ? professor.success : professor.retry}</strong>
        </div>
      </div>
      <div class="explanation-confirmation"><small>正しい説明</small><strong>${activeProblem.correctExplanation}</strong></div>
      ${correct ? '<button id="startPracticeBtn" class="btn gold large full" type="button">確認問題を3問やってみる</button>' : '<button id="retryExplanationBtn" class="btn soft large full" type="button">説明を選び直す</button>'}`;

    if (correct) {
      $("#startPracticeBtn").addEventListener("click", () => startPracticeSession(elapsedSeconds, answer));
    } else {
      $("#retryExplanationBtn").addEventListener("click", () => {
        $("#feedbackBox").classList.add("hidden");
        renderAnswerModes();
      });
    }
  });

  function generateAveragePracticeItems() {
    return [
      {
        type: "choice",
        prompt: "4、6、8の平均を求めましょう。",
        supportText: "4＋6＋8＝18",
        choices: ["6", "18", "3"],
        correct: "6",
        explanation: "合計18を3個で割るので、平均は6です。"
      },
      {
        type: "cloze",
        prompt: "10、15、20の平均を求めましょう。",
        clozeText: "10＋15＋20＝45。45を［　］で割ると、平均は15です。",
        blankChoices: ["3", "15", "45"],
        blankCorrect: "3",
        explanation: "数が3個あるので、45÷3＝15です。"
      },
      {
        type: "choice",
        prompt: "3日間に歩いた歩数は、4000歩、5000歩、6000歩でした。1日平均は何歩ですか。",
        supportText: "4000＋5000＋6000＝15000",
        choices: ["5000歩", "15000歩", "3歩"],
        correct: "5000歩",
        explanation: "合計15000歩を3日で割るので、5000歩です。"
      }
    ];
  }

  function generateRatioPracticeItems() {
    return [
      {
        type: "choice",
        prompt: "もとにする量が100人、比べる量が40人です。割合はいくつですか。",
        supportText: "40÷100",
        choices: ["0.4", "2.5", "60"],
        correct: "0.4",
        explanation: "比べる量40÷もとにする量100＝0.4です。"
      },
      {
        type: "cloze",
        prompt: "もとにする量が50個、比べる量が20個です。割合を求めましょう。",
        clozeText: "20÷50＝［　］",
        blankChoices: ["0.4", "2.5", "30"],
        blankCorrect: "0.4",
        explanation: "20÷50＝0.4です。"
      },
      {
        type: "choice",
        prompt: "クラス40人のうち8人が図書委員です。クラス全体をもとにした割合はいくつですか。",
        supportText: "8÷40",
        choices: ["0.2", "5", "32"],
        correct: "0.2",
        explanation: "8÷40＝0.2です。"
      }
    ];
  }

  function buildPracticeItems(problem) {
    if (Array.isArray(problem.practiceItems) && problem.practiceItems.length >= 1) {
      return clone(problem.practiceItems);
    }
    if (problem.practiceKind === "averageCalculation") return generateAveragePracticeItems();
    if (problem.practiceKind === "ratioCalculation" || problem.practiceKind === "ratioMeaning") return generateRatioPracticeItems();

    return [
      {
        type: "choice",
        prompt: `${problem.concept}を使う簡単な問題です。教師画面で確認問題を設定してください。`,
        choices: ["準備中", "あとで挑戦", "教師に知らせる"],
        correct: "教師に知らせる",
        explanation: "この説明問題には、まだ活用問題が設定されていません。"
      }
    ];
  }

  function startPracticeSession(explanationSeconds, explanationAnswer) {
    practiceItems = buildPracticeItems(activeProblem).slice(0,3);
    practiceIndex = 0;
    practiceResults = [];
    supportUsage.explanationSeconds = explanationSeconds;
    supportUsage.explanationAnswer = explanationAnswer;
    showPage("practiceView");
    renderPracticeItem();
  }

  function renderPracticeItem() {
    const item = practiceItems[practiceIndex];
    const professor = professorForProblem(activeProblem);
    $("#practiceCounter").textContent = `${practiceIndex + 1} / ${practiceItems.length}`;
    $("#practiceProgressFill").style.width = `${((practiceIndex + 1) / practiceItems.length) * 100}%`;
    $("#practiceProfessor").innerHTML = `<img src="${professor.image}" alt="${professor.name}"><div><small>${professor.name}</small><strong>説明を使って確かめよう。</strong></div>`;
    $("#practiceQuestion").innerHTML = `<h2>${item.prompt}</h2>${item.supportText ? `<div class="test-support">${item.supportText}</div>` : ""}`;
    $("#practiceExplanationKey").textContent = activeProblem.correctExplanation;
    $("#practiceExplanationKey").classList.add("hidden");
    $("#togglePracticeKeyBtn").textContent = "説明を確認する";
    $("#practiceFeedback").classList.add("hidden");
    $("#checkPracticeBtn").classList.remove("hidden");
    $("#practiceDots").innerHTML = practiceItems.map((_,i)=>`<span class="practice-dot ${practiceResults[i]===true?'good':practiceResults[i]===false?'bad':i===practiceIndex?'current':''}">${i+1}</span>`).join("");
    if (item.type === "choice") {
      $("#practiceAnswerArea").innerHTML = item.choices.map(choice=>`<label class="choice explanation-choice"><input type="radio" name="practiceChoice" value="${choice}"><span>${choice}</span></label>`).join("");
    } else {
      $("#practiceAnswerArea").innerHTML = `<div class="cloze-card"><p>${item.clozeText.replace("［　］",'<span id="practiceBlank" class="cloze-blank">ここを選ぶ</span>')}</p><div class="cloze-options">${item.blankChoices.map(v=>`<button class="practice-cloze-option cloze-option" data-value="${v}" type="button">${v}</button>`).join("")}</div><input id="practiceClozeAnswer" type="hidden"></div>`;
      $$(".practice-cloze-option").forEach(button=>button.addEventListener("click",()=>{
        $$(".practice-cloze-option").forEach(x=>x.classList.toggle("selected",x===button));
        $("#practiceClozeAnswer").value=button.dataset.value; $("#practiceBlank").textContent=button.dataset.value;
      }));
    }
  }

  $("#togglePracticeKeyBtn").addEventListener("click", () => {
    const key = $("#practiceExplanationKey");
    const willShow = key.classList.contains("hidden");
    key.classList.toggle("hidden", !willShow);
    $("#togglePracticeKeyBtn").textContent = willShow ? "説明を隠す" : "説明を確認する";
    if (willShow) supportUsage.practiceKeyViewed = true;
  });

  $("#checkPracticeBtn").addEventListener("click", () => {
    const item = practiceItems[practiceIndex];
    const answer = item.type === "choice" ? document.querySelector('input[name="practiceChoice"]:checked')?.value : $("#practiceClozeAnswer")?.value;
    if (!answer) { showToast("答えを選んでください"); return; }
    const correct = answer === (item.type === "choice" ? item.correct : item.blankCorrect);
    practiceResults[practiceIndex] = correct;
    $("#practiceFeedback").className = `feedback ${correct?'good':''}`;
    $("#practiceFeedback").innerHTML = `<strong>${correct?'説明を実際の問題で使えた！':'使い方を確かめよう'}</strong><p>${item.explanation || activeProblem.correctExplanation}</p><button id="nextPracticeBtn" class="btn ${correct?'gold':'soft'}" type="button">${practiceIndex===practiceItems.length-1?'結果を見る':'次の問題へ'}</button>`;
    $("#checkPracticeBtn").classList.add("hidden");
    $("#nextPracticeBtn").addEventListener("click",()=>{
      if (practiceIndex < practiceItems.length-1) { practiceIndex++; renderPracticeItem(); } else finishPracticeSession();
    });
  });

  function finishPracticeSession() {
    const correctCount = practiceResults.filter(Boolean).length;
    const score = Math.round(correctCount / practiceItems.length * 100);
    const student = currentStudent();
    const gain = correctCount * 10 + 10;
    student.history.push({problemId:activeProblem.id,score,answerMode,supports:{...supportUsage,answerMode},practiceCorrect:correctCount,practiceTotal:practiceItems.length,route:supportUsage.route||learningRoute,hintCount,elapsedSeconds:Math.round((Date.now()-problemStartedAt)/1000),date:new Date().toISOString()});
    student.xp += gain; student.points += Math.ceil(gain/2); saveData();
    const professor=professorForProblem(activeProblem);
    $("#practiceQuestion").innerHTML=`<div class="practice-result"><img src="${professor.image}" alt="${professor.name}"><h2>確認問題 ${correctCount} / ${practiceItems.length} 問正解</h2><p>${correctCount===3?'説明を理解し、使うことができました！':'正しい説明を見ながら、もう一度挑戦できます。'}</p></div>`;
    $("#practiceAnswerArea").innerHTML=`<button id="practiceHomeBtn" class="btn primary large full" type="button">キャンパスへ戻る</button>`;
    $("#checkPracticeBtn").classList.add("hidden"); $("#practiceFeedback").classList.add("hidden");
    $("#practiceHomeBtn").addEventListener("click",renderStudentHome);
  }

  $("#leavePracticeBtn").addEventListener("click",renderStudentHome);

  function renderProfile() {
    showPage("profileView");
    const profile = currentStudent().profile;
    const cards = [
      ["📖", "読むとき", [[profile.audio, "問題を音声で聞く"], [profile.ruby, "ふりがなを使う"]]],
      ["✍️", "答えるとき", [[profile.large, "大きな文字"], [profile.choice, "選択肢"], [profile.template, "文の型"]]],
      ["📊", "考えるとき", [[profile.visual, "図を使う"], [profile.steps, "手順を小分け"], [profile.easy, "やさしい問題から"]]]
    ];
    $("#profileCards").innerHTML = cards.map(([icon, title, items]) => `
      <article class="profile-card"><div class="profile-icon">${icon}</div><h2>${title}</h2>
      <ul>${items.filter((item) => item[0]).map((item) => `<li>${item[1]}</li>`).join("") || "<li>スタンダード表示</li>"}</ul></article>
    `).join("");
  }


  function renderProfessorGallery() {
    const professors = appData.professors || [];
    $("#professorGallery").innerHTML = professors.map((professor) => `
      <article class="professor-card" data-professor-id="${professor.id}" tabindex="0" role="button" aria-label="${professor.name}のプロフィールを見る">
        <img src="${professor.image}" alt="${professor.name}">
        <div class="professor-card-body">
          <h3>${professor.name}</h3>
          <p>得意：${professor.specialty}</p>
        </div>
      </article>
    `).join("");
    $$(".professor-card").forEach((card) => {
      const open = () => openProfessorDetail(card.dataset.professorId);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") open(); });
    });
  }

  function openProfessorDetail(professorId) {
    const professor = (appData.professors || []).find((item) => item.id === professorId);
    if (!professor) return;
    const assignedProblems = appData.problems.filter((problem) => problem.professor === professor.name);
    $("#professorDetailContent").innerHTML = `
      <div class="professor-detail">
        <div class="professor-detail-image"><img src="${professor.image}" alt="${professor.name}"></div>
        <div class="professor-detail-copy">
          <p class="eyebrow">PROFESSOR PROFILE</p>
          <span class="professor-specialty">${professor.specialty}</span>
          <h1>${professor.name}</h1>
          <p>${professor.personality}</p>
          <div class="professor-quote">「${professor.greeting}」</div>
          <h3>担当している問題</h3>
          <div class="professor-problem-list">${assignedProblems.length ? assignedProblems.map((problem) => `<span>${problem.title}</span>`).join("") : "<span>今後追加予定</span>"}</div>
        </div>
      </div>`;
    $("#professorDetailDialog").showModal();
  }

  $("#openProfessorListBtn").addEventListener("click", () => {
    renderProfessorGallery();
    $("#professorDialog").showModal();
  });
  $("#closeProfessorDialogBtn").addEventListener("click", () => $("#professorDialog").close());
  $("#closeProfessorDetailBtn").addEventListener("click", () => $("#professorDetailDialog").close());

  $$(".teacher-tab").forEach((button) => button.addEventListener("click", () => {
    $$(".teacher-tab").forEach((item) => item.classList.toggle("active", item === button));
    renderTeacherView(button.dataset.view);
  }));

  function renderTeacherView(viewName) {
    showPage("teacherView");
    if (viewName === "dashboard") renderTeacherDashboard();
    if (viewName === "students") renderTeacherStudents();
    if (viewName === "problems") renderTeacherProblems();
    if (viewName === "results") renderTeacherResults();
  }

  function renderTeacherDashboard() {
    const results = appData.students.flatMap((student) => student.history);
    const average = results.length ? Math.round(results.reduce((sum, item) => sum + item.score, 0) / results.length) : 0;
    $("#teacherContent").innerHTML = `
      <section class="teacher-metrics">
        <div class="metric"><span>登録児童</span><strong>${appData.students.length}</strong></div>
        <div class="metric"><span>総挑戦数</span><strong>${results.length}</strong></div>
        <div class="metric"><span>平均点</span><strong>${average}</strong></div>
        <div class="metric"><span>登録問題</span><strong>${appData.problems.length}</strong></div>
      </section>
      <section class="panel" style="margin-top:12px">
        <h2>Version 11.6</h2>
        <p>1年生から6年生まで各10問、合計60問の説明問題を搭載しました。児童の学年を最初に表示し、他学年にも切り替えられます。</p>
        <p class="notice">現在のチェック項目は仮項目です。正式なLDIR項目を受け取った後、項目と判定ロジックを反映できます。</p>
      </section>`;
  }

  function renderTeacherStudents() {
    $("#teacherContent").innerHTML = `
      <section class="panel">
        <div class="section-head"><div><h2>児童・LDIR設定</h2><p class="muted">児童ごとの支援方法を設定します。</p></div><button id="addStudentBtn" class="btn primary" type="button">＋児童登録</button></div>
        <div class="table-wrap"><table><thead><tr><th>名前</th><th>学年</th><th>ID</th><th>支援</th><th>操作</th></tr></thead>
        <tbody>${appData.students.map((student) => `<tr>
          <td>${student.name}</td><td>${student.grade}年</td><td>${student.loginId}</td>
          <td>${profileLabels(student.profile).map((label) => `<span class="tag">${label}</span>`).join("") || "標準"}</td>
          <td><button class="btn soft edit-student-btn" data-id="${student.id}" type="button">編集</button></td>
        </tr>`).join("")}</tbody></table></div>
      </section>`;
    $("#addStudentBtn").addEventListener("click", () => openStudentDialog());
    $$(".edit-student-btn").forEach((button) => button.addEventListener("click", () => openStudentDialog(button.dataset.id)));
  }

  function renderTeacherProblems() {
    $("#teacherContent").innerHTML = `
      <section class="panel">
        <div class="section-head"><div><h2>問題管理</h2><p class="muted">正しい説明と誤った説明を入力するだけで、選択式・穴埋め式・確認問題3問を作ります。</p></div><button id="addProblemBtn" class="btn primary" type="button">＋問題登録</button></div>
        <div class="table-wrap"><table><thead><tr><th>学年</th><th>単元</th><th>説明する内容</th><th>回答形式</th><th>教授</th><th>操作</th></tr></thead>
        <tbody>${appData.problems.slice().sort((a,b) => Number(a.grade)-Number(b.grade) || a.unit.localeCompare(b.unit, "ja")).map((problem) => `<tr>
          <td>${problem.grade}年</td><td>${problem.unit}</td><td>${problem.title}</td><td>選択・穴埋め</td><td>${problem.professor}</td>
          <td><button class="btn soft edit-problem-btn" data-id="${problem.id}" type="button">編集</button></td>
        </tr>`).join("")}</tbody></table></div>
      </section>`;
    $("#addProblemBtn").addEventListener("click", () => openProblemDialog());
    $$(".edit-problem-btn").forEach((button) => button.addEventListener("click", () => openProblemDialog(button.dataset.id)));
  }

  function renderTeacherResults() {
    const allResults = appData.students.flatMap((student) =>
      student.history.map((result) => ({ ...result, studentName: student.name }))
    );
    const supportNames = {
      audio: "読み上げ", ruby: "ふりがな", large: "文字拡大",
      visual: "図", sentenceMode: "一文表示", lineFocus: "読む場所強調",
      hint: "ヒント"
    };
    const supportStats = {};
    allResults.forEach((result) => {
      Object.entries(result.supports || {}).forEach(([key, used]) => {
        if (!supportNames[key] || !used) return;
        if (!supportStats[key]) supportStats[key] = { count: 0, totalScore: 0, totalTime: 0 };
        supportStats[key].count += 1;
        supportStats[key].totalScore += result.score || 0;
        supportStats[key].totalTime += result.elapsedSeconds || 0;
      });
    });

    const analytics = Object.entries(supportStats).map(([key, stat]) => `
      <div class="support-stat-card">
        <span>${supportNames[key]}</span>
        <strong>${stat.count}回</strong>
        <small>平均 ${Math.round(stat.totalScore / stat.count)}点・${Math.round(stat.totalTime / stat.count)}秒</small>
      </div>`).join("");

    const rows = allResults.reverse().map((result) => {
      const problem = appData.problems.find((item) => item.id === result.problemId);
      const supports = Object.entries(result.supports || {})
        .filter(([key, used]) => supportNames[key] && used)
        .map(([key]) => supportNames[key]).join("・") || "なし";
      const route = result.route === "smallStep" ? "少しずつ" : "自分で";
      return `<tr>
        <td>${result.studentName}</td><td>${problem?.title || "削除済み"}</td>
        <td>${route}</td><td>${result.answerMode}</td><td>${supports}</td>
        <td>${result.score}</td><td>${result.elapsedSeconds || "-"}秒</td>
        <td>${new Date(result.date).toLocaleDateString("ja-JP")}</td>
      </tr>`;
    }).join("");

    $("#teacherContent").innerHTML = `
      <section class="panel">
        <p class="eyebrow">SUPPORT ANALYTICS</p><h2>支援の利用状況</h2>
        <p class="muted">正答率だけでなく、利用回数と回答時間を併せて確認します。</p>
        <div class="support-stat-grid">${analytics || '<p class="muted">支援の利用記録はまだありません。</p>'}</div>
      </section>
      <section class="panel" style="margin-top:12px"><h2>学習結果</h2><div class="table-wrap"><table>
      <thead><tr><th>児童</th><th>問題</th><th>進め方</th><th>回答形式</th><th>使った支援</th><th>点</th><th>時間</th><th>日付</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="8">まだ結果がありません。</td></tr>'}</tbody></table></div></section>`;
  }

  function openStudentDialog(studentId = "") {
    const student = appData.students.find((item) => item.id === studentId);
    $("#editingStudentId").value = student?.id || "";
    $("#studentNameField").value = student?.name || "";
    $("#studentGradeField").value = student?.grade || 5;
    $("#studentLoginField").value = student?.loginId || "";
    $("#studentPasswordField").value = student?.password || "1234";
    const profile = student?.profile || {};
    $("#supportAudio").checked = Boolean(profile.audio);
    $("#supportRuby").checked = Boolean(profile.ruby);
    $("#supportLarge").checked = Boolean(profile.large);
    $("#supportChoice").checked = Boolean(profile.choice);
    $("#supportTemplate").checked = Boolean(profile.template);
    $("#supportVisual").checked = Boolean(profile.visual);
    $("#supportSteps").checked = Boolean(profile.steps);
    $("#supportEasy").checked = Boolean(profile.easy);
    $("#studentDialog").showModal();
  }

  $("#closeStudentDialogBtn").addEventListener("click", () => $("#studentDialog").close());
  $("#studentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = $("#editingStudentId").value || "s" + Date.now();
    const existing = appData.students.find((student) => student.id === id);
    const student = {
      id,
      name: $("#studentNameField").value.trim(),
      grade: Number($("#studentGradeField").value),
      loginId: $("#studentLoginField").value.trim(),
      password: $("#studentPasswordField").value,
      xp: existing?.xp || 0,
      points: existing?.points || 0,
      history: existing?.history || [],
      profile: {
        audio: $("#supportAudio").checked,
        ruby: $("#supportRuby").checked,
        large: $("#supportLarge").checked,
        choice: $("#supportChoice").checked,
        template: $("#supportTemplate").checked,
        visual: $("#supportVisual").checked,
        steps: $("#supportSteps").checked,
        easy: $("#supportEasy").checked
      }
    };
    if (existing) Object.assign(existing, student);
    else appData.students.push(student);
    saveData();
    $("#studentDialog").close();
    renderTeacherStudents();
    showToast("児童情報を保存しました");
  });

  function openProblemDialog(problemId = "") {
    const problem = appData.problems.find((item) => item.id === problemId);
    $("#editingProblemId").value = problem?.id || "";
    $("#problemGradeField").value = problem?.grade || 5;
    $("#problemUnitField").value = problem?.unit || "";
    $("#problemConceptField").value = problem?.concept || problem?.unit || "";
    $("#problemTitleField").value = problem?.title || "";
    $("#problemProfessorField").innerHTML = (appData.professors || []).map(professor => `<option value="${professor.name}" ${professor.name === (problem?.professor || "たっくん教授") ? "selected" : ""}>${professor.name}</option>`).join("");
    $("#problemCorrectExplanationField").value = problem?.correctExplanation || "";
    $("#problemDistractorsField").value = (problem?.distractors || []).join("\n");
    $("#problemBlankPhraseField").value = problem?.blankPhrase || "";
    $("#problemBlankDistractorsField").value = (problem?.blankDistractors || []).join("\n");
    $("#problemVisualField").value = problem?.visual?.replaceAll("<br>", "\n") || "";
    $("#problemHintField").value = problem?.hint || "";
    $("#problemPracticeKindField").value = problem?.practiceKind || "manual";
    const practices = problem?.practiceItems || [];
    [1,2,3].forEach((number, index) => {
      const item = practices[index] || {};
      $("#practicePrompt" + number).value = item.prompt || "";
      const choices = item.type === "cloze" ? (item.blankChoices || []) : (item.choices || []);
      const correct = item.type === "cloze" ? item.blankCorrect : item.correct;
      const ordered = correct ? [correct, ...choices.filter((choice) => choice !== correct)] : choices;
      $("#practiceChoices" + number).value = ordered.join("\n");
    });
    updatePracticeBuilderVisibility();
    $("#problemDialog").showModal();
  }

  function updatePracticeBuilderVisibility() {
    const manual = $("#problemPracticeKindField").value === "manual";
    $("#manualPracticeFields").classList.toggle("hidden", !manual);
  }
  $("#problemPracticeKindField").addEventListener("change", updatePracticeBuilderVisibility);

  $("#closeProblemDialogBtn").addEventListener("click", () => $("#problemDialog").close());
  $("#problemForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = $("#editingProblemId").value || "p" + Date.now();
    const existing = appData.problems.find((problem) => problem.id === id);
    const concept = $("#problemConceptField").value.trim();
    const correctExplanation = $("#problemCorrectExplanationField").value.trim();
    const distractors = $("#problemDistractorsField").value.split("\n").map(x=>x.trim()).filter(Boolean);
    const blankPhrase = $("#problemBlankPhraseField").value.trim();
    const blankDistractors = $("#problemBlankDistractorsField").value.split("\n").map(x=>x.trim()).filter(Boolean);
    const practiceKind = $("#problemPracticeKindField").value;
    let practiceItems = [];
    if (practiceKind === "manual") {
      practiceItems = [1,2,3].map((number) => {
        const prompt = $("#practicePrompt" + number).value.trim();
        const choices = $("#practiceChoices" + number).value.split("\n").map(x => x.trim()).filter(Boolean);
        if (!prompt || choices.length < 2) return null;
        return { type: "choice", prompt, choices, correct: choices[0], explanation: `正解は「${choices[0]}」です。` };
      }).filter(Boolean);
    } else if (practiceKind === "averageCalculation") {
      practiceItems = generateAveragePracticeItems();
    } else if (practiceKind === "ratioCalculation") {
      practiceItems = generateRatioPracticeItems();
    }
    if (distractors.length < 2) { showToast("まちがった説明を2つ以上入力してください"); return; }
    if (!correctExplanation.includes(blankPhrase)) { showToast("正しい説明の中に、穴埋めにする言葉を含めてください"); return; }
    if (!practiceItems.length) { showToast("確認問題を1問以上入力してください"); return; }
    const problem = {
      id, grade: Number($("#problemGradeField").value), unit: $("#problemUnitField").value.trim(), concept,
      title: $("#problemTitleField").value.trim(), professor: $("#problemProfessorField").value,
      difficulty: 2,
      question: `${concept}について、正しく説明している文を選びましょう。`,
      rubyText: `${concept}について、正しく説明している文を選びましょう。`,
      simpleQuestion: `${concept}の正しい説明を選びましょう。`,
      visual: $("#problemVisualField").value.trim().replaceAll("\n","<br>"),
      correctExplanation, distractors, choices: [correctExplanation,...distractors],
      blankPhrase, blankDistractors,
      clozeText: correctExplanation.replace(blankPhrase,"［　］"),
      hint: $("#problemHintField").value.trim(),
      practiceKind, practiceItems
    };
    if (existing) Object.assign(existing,problem); else appData.problems.push(problem);
    saveData(); $("#problemDialog").close(); renderTeacherProblems(); showToast("説明問題と実際に解く確認問題を作成しました");
  });
})();
