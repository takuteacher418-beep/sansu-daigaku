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
  let activeAssignmentId = null;
  let popupAssignmentId = null;
  const dismissedAssignmentIds = new Set();

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[character]));
  }

  function normalizeClozeText(problem) {
    const existing = String(problem.clozeText || "").trim();
    if (existing.includes("［　］") && existing.replace("［　］", "").trim().length >= 4) return existing;
    const explanation = String(problem.correctExplanation || "").trim();
    const phrase = String(problem.blankPhrase || "").trim();
    if (explanation && phrase && explanation.includes(phrase)) return explanation.replace(phrase, "［　］");
    if (explanation) return `${explanation}<br>大切な言葉は［　］です。`;
    return `${problem.concept || "算数の言葉"}について、［　］に入る言葉を選びましょう。`;
  }

  function normalizePracticeItem(item, problem) {
    const normalized = { ...item };
    normalized.prompt = String(normalized.prompt || `${problem.concept || "この内容"}を使って答えましょう。`).trim();
    if (normalized.type === "cloze") {
      const text = String(normalized.clozeText || "").trim();
      normalized.clozeText = text.includes("［　］") && text.replace("［　］", "").trim().length >= 2
        ? text : `${normalized.prompt}<br>答えは［　］です。`;
      normalized.blankChoices = Array.isArray(normalized.blankChoices) ? normalized.blankChoices.filter(Boolean) : [];
      if (normalized.blankCorrect && !normalized.blankChoices.includes(normalized.blankCorrect)) {
        normalized.blankChoices.unshift(normalized.blankCorrect);
      }
    }
    return normalized;
  }

  const FURIGANA_DICTIONARY = [
    ["先生からの課題","せんせいからのかだい"],["問題を選んで挑戦しよう","もんだいをえらんでちょうせんしよう"],
    ["文字を大きく","もじをおおきく"],["今日のおすすめ問題","きょうのおすすめもんだい"],
    ["成長の記録","せいちょうのきろく"],["教授一覧","きょうじゅいちらん"],
    ["算数大学","さんすうだいがく"],["個別課題","こべつかだい"],["取り組み中","とりくみちゅう"],
    ["問題管理","もんだいかんり"],["支援分析","しえんぶんせき"],["単位量あたり","たんいりょうあたり"],
    ["小数のかけ算","しょうすうのかけざん"],["小数のたし算","しょうすうのたしざん"],
    ["小数のひき算","しょうすうのひきざん"],["分数のかけ算","ぶんすうのかけざん"],
    ["分数のわり算","ぶんすうのわりざん"],["わり算の筆算","わりざんのひっさん"],
    ["かけ算の筆算","かけざんのひっさん"],["たし算の筆算","たしざんのひっさん"],
    ["直方体","ちょくほうたい"],["立方体","りっぽうたい"],["折れ線グラフ","おれせんグラフ"],
    ["棒グラフ","ぼうグラフ"],["線対称","せんたいしょう"],["点対称","てんたいしょう"],
    ["四捨五入","ししゃごにゅう"],["単位量","たんいりょう"],["百分率","ひゃくぶんりつ"],
    ["平均値","へいきんち"],["中央値","ちゅうおうち"],["最頻値","さいひんち"],["代表値","だいひょうち"],
    ["正方形","せいほうけい"],["長方形","ちょうほうけい"],["三角形","さんかくけい"],["四角形","しかくけい"],
    ["円周率","えんしゅうりつ"],["底面積","ていめんせき"],["平行","へいこう"],["垂直","すいちょく"],
    ["一の位","いちのくらい"],["十の位","じゅうのくらい"],["百の位","ひゃくのくらい"],
    ["学び方","まなびかた"],["進め方","すすめかた"],["自分で解く","じぶんでとく"],
    ["少しずつ","すこしずつ"],["読み上げ","よみあげ"],["一文ずつ","いちぶんずつ"],
    ["読む場所","よむばしょ"],["正しい説明","ただしいせつめい"],["穴を埋める","あなをうめる"],
    ["説明を使って","せつめいをつかって"],["答えを確かめる","こたえをたしかめる"],
    ["新しい課題","あたらしいかだい"],["あとで見る","あとでみる"],["課題を開く","かだいをひらく"],
    ["児童","じどう"],["教師","きょうし"],["先生","せんせい"],["課題","かだい"],["問題","もんだい"],
    ["算数","さんすう"],["大学","だいがく"],["学年","がくねん"],["年生","ねんせい"],["単元","たんげん"],
    ["挑戦","ちょうせん"],["未挑戦","みちょうせん"],["今日","きょう"],["成長","せいちょう"],["記録","きろく"],
    ["研究","けんきゅう"],["教授","きょうじゅ"],["一覧","いちらん"],["説明","せつめい"],["正しい","ただしい"],
    ["選ぶ","えらぶ"],["文字","もじ"],["答え","こたえ"],["確かめる","たしかめる"],["練習","れんしゅう"],
    ["理解","りかい"],["表示","ひょうじ"],["設定","せってい"],["音声","おんせい"],["大きく","おおきく"],
    ["全体","ぜんたい"],["前の文","まえのぶん"],["次の文","つぎのぶん"],["強調","きょうちょう"],
    ["手順","てじゅん"],["考える","かんがえる"],["図形","ずけい"],["計算","けいさん"],["数量","すうりょう"],
    ["大きさ","おおきさ"],["同じ","おなじ"],["違い","ちがい"],["合わせた","あわせた"],["残り","のこり"],
    ["分ける","わける"],["全部","ぜんぶ"],["一の位","いちのくらい"],["位","くらい"],["億","おく"],["兆","ちょう"],
    ["概数","がいすう"],["切り捨て","きりすて"],["切り上げ","きりあげ"],["筆算","ひっさん"],
    ["繰り上がり","くりあがり"],["くり下がり","くりさがり"],["加える","くわえる"],["引く","ひく"],
    ["足す","たす"],["割る","わる"],["かけ算","かけざん"],["たし算","たしざん"],["ひき算","ひきざん"],
    ["わり算","わりざん"],["九九","くく"],["整数","せいすう"],["小数","しょうすう"],["分数","ぶんすう"],
    ["分母","ぶんぼ"],["分子","ぶんし"],["通分","つうぶん"],["約分","やくぶん"],["平均","へいきん"],
    ["割合","わりあい"],["比","ひ"],["比例","ひれい"],["反比例","はんぴれい"],["速さ","はやさ"],
    ["道のり","みちのり"],["時間","じかん"],["時刻","じこく"],["時計","とけい"],["長さ","ながさ"],
    ["重さ","おもさ"],["面積","めんせき"],["体積","たいせき"],["角度","かくど"],["直角","ちょっかく"],
    ["合同","ごうどう"],["対称","たいしょう"],["中心","ちゅうしん"],["円周","えんしゅう"],
    ["半径","はんけい"],["直径","ちょっけい"],["角柱","かくちゅう"],["円柱","えんちゅう"],
    ["高さ","たかさ"],["頂点","ちょうてん"],["目盛り","めもり"],["変化","へんか"],["等号","とうごう"],
    ["左側","ひだりがわ"],["右側","みぎがわ"],["合計","ごうけい"],["個数","こすう"],["何倍","なんばい"],
    ["何番目","なんばんめ"],["順番","じゅんばん"],["大切","たいせつ"],["言葉","ことば"],["意味","いみ"],
    ["方法","ほうほう"],["使い方","つかいかた"],["配信","はいしん"],["未読","みどく"],["完了","かんりょう"],
    ["取り組む","とりくむ"],["届きました","とどきました"],["新しい","あたらしい"],["開く","ひらく"],
    ["戻る","もどる"],["入る","はいる"],["登録","とうろく"],["選択","せんたく"],["確認","かくにん"],
    ["今回","こんかい"],["正解","せいかい"],["得点","とくてん"],["難易度","なんいど"],["画面","がめん"],
    ["結果","けっか"],["支援","しえん"],["分析","ぶんせき"],["概要","がいよう"],["管理","かんり"]
  ].sort((a,b) => b[0].length - a[0].length);

  function furiganaHtml(text) {
    const source = String(text ?? "");
    let output = "", index = 0;
    while (index < source.length) {
      let found = null;
      for (const pair of FURIGANA_DICTIONARY) {
        if (source.startsWith(pair[0], index)) { found = pair; break; }
      }
      if (found) {
        output += `<ruby data-auto-ruby="true" data-base-text="${escapeHtml(found[0])}">${escapeHtml(found[0])}<rt>${escapeHtml(found[1])}</rt></ruby>`;
        index += found[0].length;
      } else {
        output += escapeHtml(source[index]);
        index += 1;
      }
    }
    return output;
  }

  function unwrapGeneratedRuby(root) {
    root.querySelectorAll("ruby[data-auto-ruby='true']").forEach((ruby) => {
      ruby.replaceWith(document.createTextNode(ruby.dataset.baseText || ruby.firstChild?.textContent || ""));
    });
  }

  let accessibilityApplying = false;
  function applyAccessibility() {
    if (!session || session.role !== "student") return;
    const student = currentStudent();
    if (!student) return;
    const rubyEnabled = Boolean(student.profile.ruby);
    const largeEnabled = Boolean(student.profile.large);
    document.body.classList.toggle("global-large-text", largeEnabled);
    $("#globalAccessibilityTools").classList.remove("hidden");

    ["globalFuriganaBtn","furiganaBtn"].forEach((id) => {
      const button = $("#" + id);
      if (button) { button.classList.toggle("active", rubyEnabled); button.setAttribute("aria-pressed", String(rubyEnabled)); }
    });
    ["globalLargeTextBtn","largeTextBtn"].forEach((id) => {
      const button = $("#" + id);
      if (button) { button.classList.toggle("active", largeEnabled); button.setAttribute("aria-pressed", String(largeEnabled)); }
    });

    accessibilityApplying = true;
    [$("#studentHomeView"),$("#problemView"),$("#practiceView"),$("#profileView"),
     $("#assignmentMailPopup"),$("#assignmentInboxDialog"),$(".topbar")].filter(Boolean).forEach((root) => {
      if (!rubyEnabled) {
        unwrapGeneratedRuby(root);
        return;
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        const node = walker.currentNode, parent = node.parentElement;
        if (!parent || !node.nodeValue.trim() || !/[一-龯々]/.test(node.nodeValue)) continue;
        if (parent.closest("ruby,rt,script,style,textarea,input,select,option,[data-no-ruby]")) continue;
        nodes.push(node);
      }
      nodes.forEach((node) => node.replaceWith(document.createRange().createContextualFragment(furiganaHtml(node.nodeValue))));
    });
    accessibilityApplying = false;
  }

  let accessibilityTimer = null;
  function scheduleAccessibility() {
    if (accessibilityApplying || !session || session.role !== "student") return;
    clearTimeout(accessibilityTimer);
    accessibilityTimer = setTimeout(applyAccessibility, 0);
  }
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
        assignments: Array.isArray(student.assignments) ? student.assignments : [],
        profile: {
          audio: false, ruby: false, large: false, choice: false,
          template: false, visual: false, steps: false, easy: false,
          ...student.profile
        }
      }));
      const defaultProblemById = new Map(DEFAULT_APP_DATA.problems.map((problem) => [problem.id, problem]));
      merged.problems = merged.problems.map((problem) => {
        const fallback = defaultProblemById.get(problem.id) || {};
        const normalized = {
          ...clone(fallback), ...problem,
          grade: Number(problem.grade || fallback.grade || 5),
          professor: problem.professor || fallback.professor || "たっくん教授",
          correctExplanation: problem.correctExplanation || problem.modelAnswer || fallback.correctExplanation || "",
          distractors: problem.distractors || (problem.choices || []).slice(1) || fallback.distractors || [],
          choices: problem.choices || fallback.choices || [],
          blankPhrase: problem.blankPhrase || fallback.blankPhrase || "",
          blankDistractors: problem.blankDistractors || fallback.blankDistractors || [],
          clozeText: problem.clozeText || fallback.clozeText || "",
          practiceKind: problem.practiceKind || fallback.practiceKind || "manual",
          practiceItems: problem.practiceItems || fallback.practiceItems || [],
          smallSteps: problem.smallSteps || fallback.smallSteps || []
        };
        normalized.clozeText = normalizeClozeText(normalized);
        normalized.practiceItems = (normalized.practiceItems || []).map((item) => normalizePracticeItem(item, normalized));
        return normalized;
      });
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
    scheduleAccessibility();
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
      $("#globalAccessibilityTools").classList.add("hidden");
      document.body.classList.remove("global-large-text");
      $("#sessionInfo").innerHTML = "<strong>教師モード</strong><small>児童と問題を管理します</small>";
    } else {
      $("#globalAccessibilityTools").classList.remove("hidden");
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
    $("#startRecommendationBtn").onclick = () => { activeAssignmentId = null; openProblem(recommendation.id); };

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

    renderStudentAssignments();
  }


  function assignmentsForCurrentStudent() {
    const student = currentStudent();
    if (!Array.isArray(student.assignments)) student.assignments = [];
    return student.assignments
      .filter((assignment) => appData.problems.some((problem) => problem.id === assignment.problemId))
      .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt));
  }

  function assignmentStatusLabel(status) {
    if (status === "completed") return "完了";
    if (status === "opened") return "取り組み中";
    return "未読";
  }

  function renderStudentAssignments() {
    const assignments = assignmentsForCurrentStudent();
    const pending = assignments.filter((assignment) => assignment.status !== "completed");
    const unread = assignments.filter((assignment) => assignment.status === "unread");

    $("#assignmentInboxBtn").classList.toggle("hidden", assignments.length === 0);
    $("#assignmentInboxCount").textContent = pending.length;
    $("#assignmentInboxCount").classList.toggle("hidden", pending.length === 0);
    $("#assignmentInboxText").textContent = pending.length
      ? `取り組む課題が ${pending.length} 件あります`
      : "すべての課題が終わりました";

    const popupTarget = unread.find((assignment) => !dismissedAssignmentIds.has(assignment.id));
    if (popupTarget) showAssignmentMailPopup(popupTarget);
    else hideAssignmentMailPopup();
    scheduleAccessibility();
  }

  function showAssignmentMailPopup(assignment) {
    const problem = appData.problems.find((item) => item.id === assignment.problemId);
    if (!problem) return;
    popupAssignmentId = assignment.id;
    $("#assignmentMailTitle").textContent = problem.title;
    $("#assignmentMailMessage").textContent = assignment.message || "この問題をやってみてください。";
    $("#assignmentMailMeta").innerHTML = `<span>${problem.grade}年生</span><span>${problem.unit}</span><span>${new Date(assignment.assignedAt).toLocaleDateString("ja-JP")}</span>`;
    $("#assignmentMailPopup").classList.remove("hidden");
    scheduleAccessibility();
  }

  function hideAssignmentMailPopup() {
    $("#assignmentMailPopup").classList.add("hidden");
    popupAssignmentId = null;
  }

  function openAssignedProblem(assignmentId) {
    const assignment = assignmentsForCurrentStudent().find((item) => item.id === assignmentId);
    if (!assignment) return;
    assignment.status = assignment.status === "completed" ? "completed" : "opened";
    assignment.openedAt = assignment.openedAt || new Date().toISOString();
    activeAssignmentId = assignment.id;
    saveData();
    hideAssignmentMailPopup();
    $("#assignmentInboxDialog").close();
    openProblem(assignment.problemId);
  }

  function renderAssignmentInbox() {
    const assignments = assignmentsForCurrentStudent();
    $("#assignmentInboxList").innerHTML = assignments.length ? assignments.map((assignment) => {
      const problem = appData.problems.find((item) => item.id === assignment.problemId);
      const status = assignmentStatusLabel(assignment.status);
      return `<article class="assignment-mail-item ${assignment.status}">
        <div class="assignment-mail-symbol">✉️</div>
        <div class="assignment-mail-body">
          <div class="row"><span class="tag">${status}</span><small>${new Date(assignment.assignedAt).toLocaleDateString("ja-JP")}</small></div>
          <h3>${problem?.title || "削除された問題"}</h3>
          <p>${assignment.message || "この問題をやってみてください。"}</p>
          <small>${problem ? `${problem.grade}年｜${problem.unit}` : ""}${assignment.score != null ? `｜結果 ${assignment.score}点` : ""}</small>
        </div>
        ${problem && assignment.status !== "completed"
          ? `<button class="btn soft open-inbox-assignment-btn" data-id="${assignment.id}" type="button">取り組む</button>`
          : ""}
      </article>`;
    }).join("") : '<p class="notice">先生から届いた課題はまだありません。</p>';

    $$(".open-inbox-assignment-btn").forEach((button) =>
      button.addEventListener("click", () => openAssignedProblem(button.dataset.id))
    );
    scheduleAccessibility();
  }

  $("#assignmentInboxBtn").addEventListener("click", () => {
    renderAssignmentInbox();
    $("#assignmentInboxDialog").showModal();
  });
  $("#closeAssignmentInboxBtn").addEventListener("click", () => $("#assignmentInboxDialog").close());
  $("#openAssignmentBtn").addEventListener("click", () => {
    if (popupAssignmentId) openAssignedProblem(popupAssignmentId);
  });
  function dismissCurrentAssignmentPopup() {
    if (popupAssignmentId) dismissedAssignmentIds.add(popupAssignmentId);
    hideAssignmentMailPopup();
  }
  $("#laterAssignmentBtn").addEventListener("click", dismissCurrentAssignmentPopup);
  $("#closeAssignmentMailBtn").addEventListener("click", dismissCurrentAssignmentPopup);

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
    scheduleAccessibility();
  }

  $("#problemList").addEventListener("click", (event) => {
    const button = event.target.closest(".challenge-btn");
    if (!button) return;
    event.preventDefault();
    activeAssignmentId = null;
    openProblem(button.dataset.id);
  });

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
    let content;

    if (sentenceMode && sentences.length) {
      content = `<span class="focused-sentence">${escapeHtml(sentences[sentenceIndex])}</span>`;
      $("#sentenceProgress").textContent = `${sentenceIndex + 1} / ${sentences.length} 文`;
      $("#sentenceProgress").classList.remove("hidden");
      $("#sentenceNavigation").classList.remove("hidden");
      $("#prevSentenceBtn").disabled = sentenceIndex === 0;
      $("#nextSentenceBtn").disabled = sentenceIndex === sentences.length - 1;
    } else {
      content = escapeHtml(profile.easy ? activeProblem.simpleQuestion : activeProblem.question);
      $("#sentenceProgress").classList.add("hidden");
      $("#sentenceNavigation").classList.add("hidden");
    }

    $("#questionText").innerHTML = content;
    $("#questionText").classList.toggle("ruby-on", profile.ruby);
    $("#questionText").classList.toggle("large", profile.large);
    $("#questionText").classList.toggle("line-focus", lineFocusMode);
    scheduleAccessibility();
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
      const fullClozeText = normalizeClozeText(activeProblem);
      const clozeHtml = fullClozeText.split("<br>").map((part) => escapeHtml(part)).join("<br>")
        .replace("［　］", '<span id="clozeBlank" class="cloze-blank">ここを選ぶ</span>');
      $("#answerArea").innerHTML = `
        <div class="cloze-card">
          <p class="cloze-instruction"><strong>［　］に入る言葉を選びましょう。</strong></p>
          <p class="cloze-full-text">${clozeHtml}</p>
          <div class="cloze-options">${options.map((option) => `<button class="cloze-option" data-value="${escapeHtml(option)}" type="button">${escapeHtml(option)}</button>`).join("")}</div>
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
  function toggleFurigana() {
    const student = currentStudent();
    if (!student) return;
    student.profile.ruby = !student.profile.ruby;
    supportUsage.ruby = student.profile.ruby;
    saveData();
    applyAccessibility();
  }
  function toggleLargeText() {
    const student = currentStudent();
    if (!student) return;
    student.profile.large = !student.profile.large;
    supportUsage.large = student.profile.large;
    saveData();
    applyAccessibility();
  }
  $("#furiganaBtn").addEventListener("click", toggleFurigana);
  $("#largeTextBtn").addEventListener("click", toggleLargeText);
  $("#globalFuriganaBtn").addEventListener("click", toggleFurigana);
  $("#globalLargeTextBtn").addEventListener("click", toggleLargeText);
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
    const normalizedItem = normalizePracticeItem(item, activeProblem);
    practiceItems[practiceIndex] = normalizedItem;
    $("#practiceQuestion").innerHTML = `<h2>${escapeHtml(normalizedItem.prompt)}</h2>${normalizedItem.supportText ? `<div class="test-support">${escapeHtml(normalizedItem.supportText)}</div>` : ""}`;
    $("#practiceExplanationKey").textContent = activeProblem.correctExplanation;
    $("#practiceExplanationKey").classList.add("hidden");
    $("#togglePracticeKeyBtn").textContent = "説明を確認する";
    $("#practiceFeedback").classList.add("hidden");
    $("#checkPracticeBtn").classList.remove("hidden");
    $("#practiceDots").innerHTML = practiceItems.map((_,i)=>`<span class="practice-dot ${practiceResults[i]===true?'good':practiceResults[i]===false?'bad':i===practiceIndex?'current':''}">${i+1}</span>`).join("");
    if (normalizedItem.type === "choice") {
      $("#practiceAnswerArea").innerHTML = normalizedItem.choices.map(choice=>`<label class="choice explanation-choice"><input type="radio" name="practiceChoice" value="${escapeHtml(choice)}"><span>${escapeHtml(choice)}</span></label>`).join("");
    } else {
      const practiceClozeHtml = normalizedItem.clozeText.split("<br>").map((part) => escapeHtml(part)).join("<br>")
        .replace("［　］",'<span id="practiceBlank" class="cloze-blank">ここを選ぶ</span>');
      $("#practiceAnswerArea").innerHTML = `<div class="cloze-card"><p class="cloze-instruction"><strong>［　］に入る答えを選びましょう。</strong></p><p class="cloze-full-text">${practiceClozeHtml}</p><div class="cloze-options">${normalizedItem.blankChoices.map(v=>`<button class="practice-cloze-option cloze-option" data-value="${escapeHtml(v)}" type="button">${escapeHtml(v)}</button>`).join("")}</div><input id="practiceClozeAnswer" type="hidden"></div>`;
      $$(".practice-cloze-option").forEach(button=>button.addEventListener("click",()=>{
        $$(".practice-cloze-option").forEach(x=>x.classList.toggle("selected",x===button));
        $("#practiceClozeAnswer").value=button.dataset.value; $("#practiceBlank").textContent=button.dataset.value;
      }));
    }
    scheduleAccessibility();
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
    student.history.push({problemId:activeProblem.id,score,answerMode,supports:{...supportUsage,answerMode},practiceCorrect:correctCount,practiceTotal:practiceItems.length,route:supportUsage.route||learningRoute,hintCount,elapsedSeconds:Math.round((Date.now()-problemStartedAt)/1000),assignmentId:activeAssignmentId,date:new Date().toISOString()});
    if (activeAssignmentId) {
      const assignment = (student.assignments || []).find((item) => item.id === activeAssignmentId);
      if (assignment) {
        assignment.status = "completed";
        assignment.completedAt = new Date().toISOString();
        assignment.score = score;
      }
    }
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
    if (viewName === "assignments") renderTeacherAssignments();
    if (viewName === "results") renderTeacherResults();
  }

  function renderTeacherDashboard() {
    const results = appData.students.flatMap((student) => student.history);
    const average = results.length ? Math.round(results.reduce((sum, item) => sum + item.score, 0) / results.length) : 0;
    const assignments = allAssignmentRows();
    const pendingAssignments = assignments.filter((assignment) => assignment.status !== "completed").length;
    $("#teacherContent").innerHTML = `
      <section class="teacher-metrics">
        <div class="metric"><span>登録児童</span><strong>${appData.students.length}</strong></div>
        <div class="metric"><span>総挑戦数</span><strong>${results.length}</strong></div>
        <div class="metric"><span>平均点</span><strong>${average}</strong></div>
        <div class="metric"><span>登録問題</span><strong>${appData.problems.length}</strong></div>
        <div class="metric"><span>未完了課題</span><strong>${pendingAssignments}</strong></div>
      </section>
      <section class="panel" style="margin-top:12px">
        <h2>Version 11.8.1</h2>
        <p>個別の児童へ問題を配信し、児童画面ではメールのような小さな通知として受け取れるようになりました。</p>
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


  function allAssignmentRows() {
    return appData.students.flatMap((student) =>
      (student.assignments || []).map((assignment) => ({
        ...assignment,
        studentId: student.id,
        studentName: student.name
      }))
    ).sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt));
  }

  function renderTeacherAssignments() {
    const rows = allAssignmentRows();
    const gradeOptions = [1,2,3,4,5,6].map((grade) => `<option value="${grade}">${grade}年生</option>`).join("");
    $("#teacherContent").innerHTML = `
      <section class="panel assignment-send-panel">
        <div class="section-head">
          <div><p class="eyebrow">SEND ASSIGNMENT</p><h2>個別に課題を配信する</h2><p class="muted">児童を一人選び、取り組んでほしい問題を送ります。</p></div>
          <div class="assignment-send-icon">✉️</div>
        </div>
        <div class="assignment-form-grid">
          <label>配信する児童
            <select id="assignmentStudentField">
              ${appData.students.map((student) => `<option value="${student.id}">${student.name}（${student.grade}年）</option>`).join("")}
            </select>
          </label>
          <label>問題の学年
            <select id="assignmentGradeField">${gradeOptions}</select>
          </label>
          <label class="assignment-problem-field">配信する問題
            <select id="assignmentProblemField"></select>
          </label>
          <label class="assignment-message-field">先生からのメッセージ
            <input id="assignmentMessageField" value="この問題をやってみてください。" maxlength="80">
          </label>
        </div>
        <div id="assignmentProblemPreview" class="assignment-problem-preview"></div>
        <button id="sendAssignmentBtn" class="btn primary large" type="button">この児童に配信する</button>
        <p class="notice">この試作版では、同じブラウザの保存データ内に課題を登録します。</p>
      </section>

      <section class="panel" style="margin-top:12px">
        <div class="section-head"><div><h2>配信した課題</h2><p class="muted">未読・取り組み中・完了を確認できます。</p></div></div>
        <div class="table-wrap"><table>
          <thead><tr><th>児童</th><th>問題</th><th>配信日</th><th>状態</th><th>結果</th><th>操作</th></tr></thead>
          <tbody>${rows.length ? rows.map((assignment) => {
            const problem = appData.problems.find((item) => item.id === assignment.problemId);
            return `<tr>
              <td>${assignment.studentName}</td>
              <td>${problem ? `${problem.grade}年｜${problem.title}` : "削除済み"}</td>
              <td>${new Date(assignment.assignedAt).toLocaleString("ja-JP")}</td>
              <td><span class="assignment-status ${assignment.status}">${assignmentStatusLabel(assignment.status)}</span></td>
              <td>${assignment.score != null ? assignment.score + "点" : "—"}</td>
              <td><button class="btn ghost delete-assignment-btn" data-student="${assignment.studentId}" data-id="${assignment.id}" type="button">取り消す</button></td>
            </tr>`;
          }).join("") : '<tr><td colspan="6">まだ課題を配信していません。</td></tr>'}</tbody>
        </table></div>
      </section>`;

    const selectedStudent = appData.students.find((student) => student.id === $("#assignmentStudentField").value);
    $("#assignmentGradeField").value = String(selectedStudent?.grade || 5);

    function refreshAssignmentProblemOptions() {
      const grade = Number($("#assignmentGradeField").value);
      const problems = appData.problems.filter((problem) => Number(problem.grade) === grade);
      $("#assignmentProblemField").innerHTML = problems.map((problem) =>
        `<option value="${problem.id}">${problem.unit}｜${problem.title}</option>`
      ).join("");
      refreshAssignmentPreview();
    }

    function refreshAssignmentPreview() {
      const problem = appData.problems.find((item) => item.id === $("#assignmentProblemField").value);
      $("#assignmentProblemPreview").innerHTML = problem
        ? `<span class="tag">${problem.grade}年｜${problem.unit}</span><strong>${problem.title}</strong><p>${problem.correctExplanation}</p>`
        : '<p class="notice">この学年には問題がありません。</p>';
    }

    $("#assignmentStudentField").addEventListener("change", () => {
      const student = appData.students.find((item) => item.id === $("#assignmentStudentField").value);
      if (student) $("#assignmentGradeField").value = String(student.grade);
      refreshAssignmentProblemOptions();
    });
    $("#assignmentGradeField").addEventListener("change", refreshAssignmentProblemOptions);
    $("#assignmentProblemField").addEventListener("change", refreshAssignmentPreview);
    refreshAssignmentProblemOptions();

    $("#sendAssignmentBtn").addEventListener("click", () => {
      const student = appData.students.find((item) => item.id === $("#assignmentStudentField").value);
      const problem = appData.problems.find((item) => item.id === $("#assignmentProblemField").value);
      if (!student || !problem) {
        showToast("児童と問題を選んでください");
        return;
      }
      if (!Array.isArray(student.assignments)) student.assignments = [];
      student.assignments.push({
        id: `assignment_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
        problemId: problem.id,
        message: $("#assignmentMessageField").value.trim() || "この問題をやってみてください。",
        status: "unread",
        assignedAt: new Date().toISOString(),
        openedAt: null,
        completedAt: null,
        score: null
      });
      saveData();
      renderTeacherAssignments();
      showToast(`${student.name}さんに課題を配信しました`);
    });

    $$(".delete-assignment-btn").forEach((button) => button.addEventListener("click", () => {
      const student = appData.students.find((item) => item.id === button.dataset.student);
      if (!student) return;
      student.assignments = (student.assignments || []).filter((assignment) => assignment.id !== button.dataset.id);
      saveData();
      renderTeacherAssignments();
      showToast("課題を取り消しました");
    }));
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