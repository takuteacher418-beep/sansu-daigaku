(() => {
  "use strict";

  const STORAGE_KEY = "sansuDaigakuV11Fixed";
  let appData = loadData();
  let session = null;
  let activeProblem = null;
  let answerMode = "text";

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
        problems: Array.isArray(parsed.problems) ? parsed.problems : clone(DEFAULT_APP_DATA.problems)
      };
      merged.problems = merged.problems.map((problem, index) => ({
        ...clone(DEFAULT_APP_DATA.problems[index] || {}),
        ...problem,
        professor: problem.professor || DEFAULT_APP_DATA.problems[index]?.professor || "たっくん教授"
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
    ["studentHomeView", "problemView", "profileView", "teacherView"].forEach((id) => {
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
    return appData.problems.find((problem) => !completed.has(problem.id)) || appData.problems[0];
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

    const units = ["すべて", ...new Set(appData.problems.map((problem) => problem.unit))];
    $("#unitFilter").innerHTML = units.map((unit) => `<option value="${unit}">${unit}</option>`).join("");
    $("#unitFilter").onchange = renderProblemList;
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

  function renderProblemList() {
    const student = currentStudent();
    const unit = $("#unitFilter").value;
    const visibleProblems = appData.problems.filter((problem) => unit === "すべて" || problem.unit === unit);
    $("#problemList").innerHTML = visibleProblems.map((problem) => {
      const best = Math.max(0, ...student.history.filter((item) => item.problemId === problem.id).map((item) => item.score));
      return `<article class="problem-card ${best >= 60 ? "done" : ""}">
        <div class="row"><span class="tag">${problem.unit}</span><span>${"★".repeat(problem.difficulty)}</span></div>
        <h3>${problem.title}</h3><p>${problem.question}</p>
        <div class="row"><small>${best ? best + "点" : "未挑戦"}</small><button class="btn soft challenge-btn" data-id="${problem.id}" type="button">挑戦する</button></div>
      </article>`;
    }).join("");
    $$(".challenge-btn").forEach((button) => button.addEventListener("click", () => openProblem(button.dataset.id)));
  }

  function openProblem(problemId) {
    activeProblem = appData.problems.find((problem) => problem.id === problemId);
    if (!activeProblem) return;
    answerMode = currentStudent().profile.choice ? "choice" : "text";
    showPage("problemView");
    renderProblem();
  }

  function renderProblem() {
    const profile = currentStudent().profile;
    const professor = professorForProblem(activeProblem);
    $("#problemProfessor").textContent = professor.name;
    $("#battleProfessorImage").src = professor.image;
    $("#battleProfessorImage").alt = professor.name;
    $("#problemMeta").textContent = `${activeProblem.unit}｜難易度 ${"★".repeat(activeProblem.difficulty)}`;
    $("#problemTitle").textContent = activeProblem.title;
    $("#questionText").innerHTML = profile.easy ? activeProblem.simpleQuestion : (activeProblem.rubyText || activeProblem.question);
    $("#questionText").classList.toggle("ruby-on", profile.ruby);
    $("#questionText").classList.toggle("large", profile.large);
    $("#visualAid").innerHTML = activeProblem.visual || "";
    $("#visualAid").classList.toggle("hidden", !profile.visual || !activeProblem.visual);
    $("#readAloudBtn").classList.toggle("hidden", !profile.audio);
    $("#furiganaBtn").classList.toggle("hidden", !profile.ruby);
    $("#hintBox").classList.add("hidden");
    $("#feedbackBox").classList.add("hidden");
    renderAnswerModes();
  }

  function renderAnswerModes() {
    const profile = currentStudent().profile;
    const modes = [["text", "文章"], ["choice", "選択"]];
    if (profile.template) modes.push(["template", "文の型"]);

    $("#answerModeTabs").innerHTML = modes.map(([id, label]) =>
      `<button class="answer-tab ${answerMode === id ? "active" : ""}" data-mode="${id}" type="button">${label}</button>`
    ).join("");
    $$(".answer-tab").forEach((button) => button.addEventListener("click", () => {
      answerMode = button.dataset.mode;
      renderAnswerModes();
    }));

    if (answerMode === "text") {
      $("#answerArea").innerHTML = '<textarea id="freeAnswer" placeholder="自分の考えを書こう"></textarea>';
    } else if (answerMode === "choice") {
      $("#answerArea").innerHTML = (activeProblem.choices || []).map((choice) =>
        `<label class="choice"><input type="radio" name="choiceAnswer" value="${choice}" />${choice}</label>`
      ).join("");
    } else {
      $("#answerArea").innerHTML = `
        <label>まず、何をしましたか<input id="template1" /></label>
        <label>次に、何をしましたか<input id="template2" /></label>
        <label>だから、答えは<input id="template3" /></label>`;
    }
  }

  function collectAnswer() {
    if (answerMode === "text") return $("#freeAnswer")?.value.trim() || "";
    if (answerMode === "choice") return document.querySelector('input[name="choiceAnswer"]:checked')?.value || "";
    return [$("#template1")?.value, $("#template2")?.value, $("#template3")?.value].filter(Boolean).join("。");
  }

  $("#backToHomeBtn").addEventListener("click", renderStudentHome);
  $("#openProfileBtn").addEventListener("click", renderProfile);
  $("#backFromProfileBtn").addEventListener("click", renderStudentHome);
  $("#showHintBtn").addEventListener("click", () => {
    $("#hintBox").textContent = activeProblem.hint || "ヒントはありません。";
    $("#hintBox").classList.remove("hidden");
  });
  $("#furiganaBtn").addEventListener("click", () => {
    $("#questionText").classList.toggle("ruby-on");
    $("#furiganaBtn").classList.toggle("active");
  });
  $("#largeTextBtn").addEventListener("click", () => {
    $("#questionText").classList.toggle("large");
    $("#largeTextBtn").classList.toggle("active");
  });
  $("#readAloudBtn").addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      showToast("このブラウザは読み上げに対応していません");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentStudent().profile.easy ? activeProblem.simpleQuestion : activeProblem.question);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  });
  $("#submitAnswerBtn").addEventListener("click", () => {
    const answer = collectAnswer();
    if (!answer) {
      showToast("答えを入力または選択してください");
      return;
    }
    const keywords = activeProblem.keywords || [];
    const hits = keywords.filter((keyword) => answer.includes(keyword)).length;
    let score = Math.min(100, Math.round((hits / Math.max(2, keywords.length)) * 90) + (answer.length >= 10 ? 10 : 0));
    if (answerMode === "choice" && answer === activeProblem.choices?.[0]) score = 100;

    const student = currentStudent();
    const gain = score >= 80 ? 30 : score >= 60 ? 20 : 10;
    student.history.push({ problemId: activeProblem.id, score, answer, answerMode, date: new Date().toISOString() });
    student.xp += gain;
    student.points += Math.ceil(gain / 2);
    saveData();

    $("#feedbackBox").className = "feedback " + (score >= 60 ? "good" : "");
    const professor = professorForProblem(activeProblem);
    $("#feedbackBox").innerHTML = `
      <div class="professor-feedback">
        <img src="${professor.image}" alt="${professor.name}">
        <div>
          <div class="feedback-score">${score}点</div>
          <strong>${professor.name}：${score >= 60 ? professor.success : professor.retry}</strong>
        </div>
      </div>
      <p>模範例：${activeProblem.modelAnswer || "設定されていません"}</p>
      <button id="feedbackHomeBtn" class="btn soft" type="button">キャンパスへ戻る</button>`;
    $("#feedbackHomeBtn").addEventListener("click", renderStudentHome);
  });

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
        <h2>Version 11.0</h2>
        <p>児童別のプロフィールに応じ、読み上げ・ふりがな・文字サイズ・回答形式・図・簡略問題を切り替えます。</p>
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
        <div class="section-head"><div><h2>問題管理</h2><p class="muted">通常文・簡略文・図・選択肢・採点基準を登録できます。</p></div><button id="addProblemBtn" class="btn primary" type="button">＋問題登録</button></div>
        <div class="table-wrap"><table><thead><tr><th>単元</th><th>問題</th><th>教授</th><th>操作</th></tr></thead>
        <tbody>${appData.problems.map((problem) => `<tr>
          <td>${problem.unit}</td><td>${problem.title}</td><td>${problem.professor}</td>
          <td><button class="btn soft edit-problem-btn" data-id="${problem.id}" type="button">編集</button></td>
        </tr>`).join("")}</tbody></table></div>
      </section>`;
    $("#addProblemBtn").addEventListener("click", () => openProblemDialog());
    $$(".edit-problem-btn").forEach((button) => button.addEventListener("click", () => openProblemDialog(button.dataset.id)));
  }

  function renderTeacherResults() {
    const rows = appData.students.flatMap((student) => student.history.map((result) => {
      const problem = appData.problems.find((item) => item.id === result.problemId);
      return `<tr><td>${student.name}</td><td>${problem?.title || "削除済み"}</td><td>${result.answerMode}</td><td>${result.score}</td><td>${new Date(result.date).toLocaleDateString("ja-JP")}</td></tr>`;
    })).reverse().join("");
    $("#teacherContent").innerHTML = `
      <section class="panel"><h2>学習結果</h2><div class="table-wrap"><table>
      <thead><tr><th>児童</th><th>問題</th><th>回答形式</th><th>点</th><th>日付</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="5">まだ結果がありません。</td></tr>'}</tbody></table></div></section>`;
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
    $("#problemUnitField").value = problem?.unit || "";
    $("#problemTitleField").value = problem?.title || "";
    $("#problemProfessorField").value = problem?.professor || "たっくん教授";
    $("#problemDifficultyField").value = problem?.difficulty || 2;
    $("#problemQuestionField").value = problem?.question || "";
    $("#problemSimpleField").value = problem?.simpleQuestion || "";
    $("#problemVisualField").value = problem?.visual?.replaceAll("<br>", "\n") || "";
    $("#problemChoicesField").value = (problem?.choices || []).join("\n");
    $("#problemKeywordsField").value = (problem?.keywords || []).join("、");
    $("#problemModelField").value = problem?.modelAnswer || "";
    $("#problemHintField").value = problem?.hint || "";
    $("#problemDialog").showModal();
  }

  $("#closeProblemDialogBtn").addEventListener("click", () => $("#problemDialog").close());
  $("#problemForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = $("#editingProblemId").value || "p" + Date.now();
    const existing = appData.problems.find((problem) => problem.id === id);
    const question = $("#problemQuestionField").value.trim();
    const problem = {
      id,
      unit: $("#problemUnitField").value.trim(),
      title: $("#problemTitleField").value.trim(),
      professor: $("#problemProfessorField").value.trim(),
      difficulty: Number($("#problemDifficultyField").value),
      question,
      rubyText: question,
      simpleQuestion: $("#problemSimpleField").value.trim() || question,
      visual: $("#problemVisualField").value.trim().replaceAll("\n", "<br>"),
      choices: $("#problemChoicesField").value.split("\n").map((item) => item.trim()).filter(Boolean),
      keywords: $("#problemKeywordsField").value.split(/[、,]/).map((item) => item.trim()).filter(Boolean),
      modelAnswer: $("#problemModelField").value.trim(),
      hint: $("#problemHintField").value.trim()
    };
    if (existing) Object.assign(existing, problem);
    else appData.problems.push(problem);
    saveData();
    $("#problemDialog").close();
    renderTeacherProblems();
    showToast("問題を保存しました");
  });
})();
