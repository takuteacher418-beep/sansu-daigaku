(() => {
  "use strict";

  const APP_VERSION = "12.5.1";
  const APP_BUILD_DATE = "2026.07.29";
  const APP_RELEASE_NOTES = [
    "日本語表記の分数を教科書型の分数記号へ変換",
    "半角・全角スラッシュの分数表示を改善",
    "バージョン番号を1か所で管理",
    "教師画面にビルド情報と更新内容を表示",
    "分数同士の演算記号を分数線の中央に配置",
    "CSS・JavaScriptが読み込まれない表示崩れを修正"
  ];

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
  let activeFinalTest = null;
  let activeFinalAnswer = "";
  let pendingPracticeSummary = null;
  let popupReturnedSubmissionId = null;
  let activeMarkCanvas = null;
  let activeMarkCanvasContext = null;
  let isDrawingMark = false;
  let markPenSize = 7;
  let markPenMode = "pen";
  let markCanvasDirty = false;
  let audioRecorder = null;
  let audioChunks = [];
  let recordedAudioDataUrl = "";
  let audioRecordingStartedAt = 0;
  let audioTimerId = null;
  const dismissedAssignmentIds = new Set();
  const dismissedReturnedSubmissionIds = new Set();

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[character]));
  }

  function fractionMarkup(numerator, denominator, extraClass = "") {
    const numeratorText = String(numerator);
    const denominatorText = String(denominator);
    return `<span class="math-fraction ${extraClass}" role="img" aria-label="${escapeHtml(denominatorText)}分の${escapeHtml(numeratorText)}">`
      + `<span class="math-numerator">${escapeHtml(numeratorText)}</span>`
      + `<span class="math-denominator">${escapeHtml(denominatorText)}</span>`
      + `</span>`;
  }

  function formatMathText(value, options = {}) {
    const { lineBreaks = false } = options;
    const source = String(value ?? "");
    const tokens = [];
    const token = (html) => {
      const key = `@@MATH_${tokens.length}@@`;
      tokens.push(html);
      return key;
    };

    let protectedText = source;

    // 日本語の帯分数。「1と2分の1」→ 1 1/2 の教科書型表示。
    protectedText = protectedText.replace(
      /(^|[^\d])(\d+)\s*と\s*(\d+)\s*分の\s*(\d+)(?!\d)/g,
      (match, prefix, whole, denominator, numerator) =>
        `${prefix}${token(
          `<span class="mixed-number" role="img" aria-label="${escapeHtml(whole)}と${escapeHtml(denominator)}分の${escapeHtml(numerator)}">`
          + `<span class="mixed-whole">${escapeHtml(whole)}</span>`
          + `${fractionMarkup(numerator, denominator, "mixed-fraction")}</span>`
        )}`
    );

    // 日本語の分数。「4分の1」では 1 が分子、4 が分母。
    protectedText = protectedText.replace(
      /(^|[^\d])(\d+)\s*分の\s*(\d+)(?!\d)/g,
      (match, prefix, denominator, numerator) =>
        `${prefix}${token(fractionMarkup(numerator, denominator, "japanese-fraction"))}`
    );

    // スラッシュ表記の帯分数。半角・全角スペース、半角・全角スラッシュに対応。
    protectedText = protectedText.replace(
      /(^|[^\d])(\d+)[ \u3000]+(\d+)\s*[\/／]\s*(\d+)(?![\d\/／])/g,
      (match, prefix, whole, numerator, denominator) =>
        `${prefix}${token(
          `<span class="mixed-number" role="img" aria-label="${escapeHtml(whole)}と${escapeHtml(denominator)}分の${escapeHtml(numerator)}">`
          + `<span class="mixed-whole">${escapeHtml(whole)}</span>`
          + `${fractionMarkup(numerator, denominator, "mixed-fraction")}</span>`
        )}`
    );

    // スラッシュ表記の真分数・仮分数。
    protectedText = protectedText.replace(
      /(^|[^\d\/／])(\d+)\s*[\/／]\s*(\d+)(?![\d\/／])/g,
      (match, prefix, numerator, denominator) =>
        `${prefix}${token(fractionMarkup(numerator, denominator, "slash-fraction"))}`
    );

    // 分数と分数の間にある演算子を、数式全体としてまとめる。
    // これにより「÷」「×」「＋」「－」が分数線の中央に揃う。
    protectedText = protectedText.replace(
      /@@MATH_(\d+)@@\s*([+＋\-−－×÷])\s*@@MATH_(\d+)@@/g,
      (match, leftIndex, operator, rightIndex) => token(
        `<span class="fraction-expression" role="group" aria-label="分数の計算">`
        + `${tokens[Number(leftIndex)]}`
        + `<span class="math-operator" aria-hidden="true">${escapeHtml(operator)}</span>`
        + `${tokens[Number(rightIndex)]}`
        + `</span>`
      )
    );

    let text = escapeHtml(protectedText);
    tokens.forEach((html, index) => {
      text = text.replace(`@@MATH_${index}@@`, html);
    });
    if (lineBreaks) text = text.replace(/\r?\n/g, "<br>");
    return text;
  }

  function formatMathInElement(element) {
    if (!element) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const targets = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.nodeValue || "";
      if (!(/[\/／]/.test(text) || /\d+\s*分の\s*\d+/.test(text))) continue;
      if (node.parentElement?.closest(".math-fraction, .mixed-number, input, textarea, option, script, style, code, pre")) continue;
      targets.push(node);
    }
    targets.forEach((node) => {
      const formatted = formatMathText(node.nodeValue);
      if (formatted === escapeHtml(node.nodeValue)) return;
      const template = document.createElement("template");
      template.innerHTML = formatted;
      node.replaceWith(template.content);
    });
  }

  function formatAllVisibleMath() {
    [
      "#loginView", "#studentHomeView", "#problemView", "#practiceView",
      "#profileView", "#teacherView", "#assignmentInboxDialog",
      "#returnedMarkDialog", "#researchDetailDialog", "#markingImageDialog"
    ].forEach((selector) => formatMathInElement($(selector)));
  }

  function applyAppMetadata() {
    document.title = `算数大学 Version ${APP_VERSION}`;
    $$("[data-app-version]").forEach((element) => {
      element.textContent = `Version ${APP_VERSION}`;
    });
    $$("[data-app-build]").forEach((element) => {
      element.textContent = `Build ${APP_BUILD_DATE}`;
    });
  }


  function dataUrlIsImage(value) {
    return typeof value === "string" && value.startsWith("data:image/");
  }

  function initMarkCanvas(savedImage = "") {
    activeMarkCanvas = $("#teacherMarkCanvas");
    if (!activeMarkCanvas) return;
    const ratio = window.devicePixelRatio || 1;
    const cssWidth = Math.max(640, activeMarkCanvas.parentElement?.clientWidth || 640);
    const cssHeight = 420;
    activeMarkCanvas.width = cssWidth * ratio;
    activeMarkCanvas.height = cssHeight * ratio;
    activeMarkCanvas.style.width = cssWidth + "px";
    activeMarkCanvas.style.height = cssHeight + "px";

    activeMarkCanvasContext = activeMarkCanvas.getContext("2d");
    activeMarkCanvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    activeMarkCanvasContext.lineCap = "round";
    activeMarkCanvasContext.lineJoin = "round";
    activeMarkCanvasContext.lineWidth = markPenSize;
    activeMarkCanvasContext.strokeStyle = "#e23e3e";
    activeMarkCanvasContext.fillStyle = "#fff";
    activeMarkCanvasContext.fillRect(0, 0, cssWidth, cssHeight);

    const background = new Image();
    background.onload = () => {
      activeMarkCanvasContext.drawImage(background, 0, 0, cssWidth, cssHeight);
      markCanvasDirty = false;
    };
    if (dataUrlIsImage(savedImage)) background.src = savedImage;
    else drawMarkCanvasTemplate();

    function pointFromEvent(event) {
      const rect = activeMarkCanvas.getBoundingClientRect();
      const source = event.touches?.[0] || event;
      return { x: source.clientX - rect.left, y: source.clientY - rect.top };
    }
    function startDrawing(event) {
      event.preventDefault();
      isDrawingMark = true;
      const point = pointFromEvent(event);
      activeMarkCanvasContext.beginPath();
      activeMarkCanvasContext.moveTo(point.x, point.y);
    }
    function draw(event) {
      if (!isDrawingMark) return;
      event.preventDefault();
      const point = pointFromEvent(event);
      activeMarkCanvasContext.globalCompositeOperation = markPenMode === "eraser" ? "destination-out" : "source-over";
      activeMarkCanvasContext.strokeStyle = markPenMode === "eraser" ? "rgba(0,0,0,1)" : "#e23e3e";
      activeMarkCanvasContext.lineWidth = markPenMode === "eraser" ? Math.max(18, markPenSize * 3) : markPenSize;
      activeMarkCanvasContext.lineTo(point.x, point.y);
      activeMarkCanvasContext.stroke();
      markCanvasDirty = true;
    }
    function stopDrawing(event) {
      if (event) event.preventDefault();
      isDrawingMark = false;
      activeMarkCanvasContext.beginPath();
    }

    activeMarkCanvas.addEventListener("mousedown", startDrawing);
    activeMarkCanvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDrawing);
    activeMarkCanvas.addEventListener("touchstart", startDrawing, { passive: false });
    activeMarkCanvas.addEventListener("touchmove", draw, { passive: false });
    activeMarkCanvas.addEventListener("touchend", stopDrawing, { passive: false });
  }

  function drawMarkCanvasTemplate() {
    if (!activeMarkCanvas || !activeMarkCanvasContext) return;
    const width = parseFloat(activeMarkCanvas.style.width);
    const height = parseFloat(activeMarkCanvas.style.height);
    const context = activeMarkCanvasContext;
    context.save();
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#d4dee6";
    context.lineWidth = 1;
    for (let y = 42; y < height; y += 42) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
    context.fillStyle = "#587080";
    context.font = "700 15px sans-serif";
    context.fillText("ここに、花丸・赤丸・線・ことばなどを書けます。", 20, 28);
    context.restore();
    markCanvasDirty = false;
  }

  function clearMarkCanvas() {
    drawMarkCanvasTemplate();
  }

  function markCanvasDataUrl() {
    return activeMarkCanvas ? activeMarkCanvas.toDataURL("image/png") : "";
  }


  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function stopAudioTimer() {
    clearInterval(audioTimerId);
    audioTimerId = null;
  }

  function updateAudioTimer() {
    const timer = $("#audioRecordingTimer");
    if (!timer || !audioRecordingStartedAt) return;
    const seconds = Math.floor((Date.now() - audioRecordingStartedAt) / 1000);
    timer.textContent = `${seconds}秒`;
  }

  async function startTeacherAudioRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      showToast("このブラウザでは録音機能を使えません");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      const mimeOptions = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4"
      ];
      const mimeType = mimeOptions.find((type) => MediaRecorder.isTypeSupported?.(type)) || "";
      audioRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      audioRecorder.addEventListener("dataavailable", (event) => {
        if (event.data?.size) audioChunks.push(event.data);
      });
      audioRecorder.addEventListener("stop", async () => {
        stopAudioTimer();
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(audioChunks, { type: audioRecorder.mimeType || "audio/webm" });
        if (blob.size > 1_500_000) {
          recordedAudioDataUrl = "";
          showToast("録音が長すぎます。30秒以内で録音してください");
        } else {
          recordedAudioDataUrl = await blobToDataUrl(blob);
          const preview = $("#teacherAudioPreview");
          if (preview) {
            preview.src = recordedAudioDataUrl;
            preview.classList.remove("hidden");
          }
          const status = $("#audioRecordingStatus");
          if (status) status.textContent = "録音できました。再生して確認できます。";
        }
        const startButton = $("#startAudioRecordBtn");
        const stopButton = $("#stopAudioRecordBtn");
        if (startButton) startButton.classList.remove("hidden");
        if (stopButton) stopButton.classList.add("hidden");
      });
      audioRecorder.start();
      audioRecordingStartedAt = Date.now();
      updateAudioTimer();
      audioTimerId = setInterval(updateAudioTimer, 500);
      $("#startAudioRecordBtn")?.classList.add("hidden");
      $("#stopAudioRecordBtn")?.classList.remove("hidden");
      $("#audioRecordingStatus").textContent = "録音しています。30秒以内がおすすめです。";
    } catch (error) {
      showToast("マイクの使用が許可されませんでした");
    }
  }

  function stopTeacherAudioRecording() {
    if (audioRecorder && audioRecorder.state !== "inactive") audioRecorder.stop();
  }

  function clearTeacherAudioRecording() {
    recordedAudioDataUrl = "";
    const preview = $("#teacherAudioPreview");
    if (preview) {
      preview.pause();
      preview.removeAttribute("src");
      preview.load();
      preview.classList.add("hidden");
    }
    const status = $("#audioRecordingStatus");
    if (status) status.textContent = "録音はまだありません。";
  }

  function dataUrlIsAudio(value) {
    return typeof value === "string" && value.startsWith("data:audio/");
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

  function buildFallbackFinalTest(problem, fallback = {}) {
    const sourceProblem = { ...fallback, ...problem };
    const practices = Array.isArray(sourceProblem.practiceItems) ? sourceProblem.practiceItems : [];
    const item = practices[practices.length - 1] || {};
    if (item.type === "cloze") {
      return {
        type: "cloze",
        prompt: `さいごの かくにんテストです。\n${item.prompt || sourceProblem.question || ""}`,
        clozeText: item.clozeText || "答えは［　］です。",
        blankChoices: item.blankChoices || [],
        blankCorrect: item.blankCorrect || "",
        explanation: item.explanation || sourceProblem.correctExplanation || "",
        teacherNote: "答えと考え方を見てください。"
      };
    }
    return {
      type: "choice",
      prompt: `さいごの かくにんテストです。\n${item.prompt || sourceProblem.question || ""}`,
      choices: item.choices || [sourceProblem.correctExplanation, ...(sourceProblem.distractors || [])].filter(Boolean),
      correct: item.correct || sourceProblem.correctExplanation || "",
      explanation: item.explanation || sourceProblem.correctExplanation || "",
      teacherNote: "答えと考え方を見てください。"
    };
  }

  function normalizeFinalTest(test, problem) {
    const normalized = { ...buildFallbackFinalTest(problem), ...(test || {}) };
    normalized.prompt = String(normalized.prompt || "さいごの かくにんテストです。").trim();
    if (normalized.type === "cloze") {
      normalized.clozeText = String(normalized.clozeText || "答えは［　］です。");
      normalized.blankChoices = Array.isArray(normalized.blankChoices) ? normalized.blankChoices.filter(Boolean) : [];
      if (normalized.blankCorrect && !normalized.blankChoices.includes(normalized.blankCorrect)) {
        normalized.blankChoices.unshift(normalized.blankCorrect);
      }
    } else {
      normalized.type = "choice";
      normalized.choices = Array.isArray(normalized.choices) ? normalized.choices.filter(Boolean) : [];
      if (normalized.correct && !normalized.choices.includes(normalized.correct)) normalized.choices.unshift(normalized.correct);
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
     $("#assignmentMailPopup"),$("#assignmentInboxDialog"),$("#returnedMarkPopup"),$("#returnedMarkDialog"),$("#markingImageDialog"),$("#researchDetailDialog"),$("#avatarDialog"),$(".topbar")].filter(Boolean).forEach((root) => {
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
    formatAllVisibleMath();
    if (accessibilityApplying || !session || session.role !== "student") return;
    clearTimeout(accessibilityTimer);
    accessibilityTimer = setTimeout(applyAccessibility, 0);
  }

  let mathObserverTimer = null;
  const mathObserver = new MutationObserver((mutations) => {
    if (!mutations.some((mutation) => mutation.addedNodes?.length || mutation.type === "characterData")) return;
    clearTimeout(mathObserverTimer);
    mathObserverTimer = setTimeout(formatAllVisibleMath, 0);
  });

  document.addEventListener("DOMContentLoaded", () => {
    applyAppMetadata();
    mathObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    formatAllVisibleMath();
  });

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
          const defaultIds = new Set(DEFAULT_APP_DATA.problems.map((problem) => problem.id));
          const customProblems = savedProblems.filter((problem) => !defaultIds.has(problem.id));
          // 標準問題は最新版を必ず使う。古い保存データの空欄・説明欠落を引き継がない。
          return [...clone(DEFAULT_APP_DATA.problems), ...customProblems];
        })()
      };
      merged.submissions = Array.isArray(parsed.submissions) ? parsed.submissions : [];
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
        const isDefaultProblem = Boolean(defaultProblemById.get(problem.id));
        const sourceProblem = isDefaultProblem ? clone(fallback) : problem;
        const normalized = {
          ...clone(fallback), ...sourceProblem,
          grade: Number(sourceProblem.grade || fallback.grade || 5),
          professor: sourceProblem.professor || fallback.professor || "たっくん教授",
          correctExplanation: sourceProblem.correctExplanation || sourceProblem.modelAnswer || fallback.correctExplanation || "",
          distractors: sourceProblem.distractors || (sourceProblem.choices || []).slice(1) || fallback.distractors || [],
          choices: sourceProblem.choices || fallback.choices || [],
          blankPhrase: sourceProblem.blankPhrase || fallback.blankPhrase || "",
          blankDistractors: sourceProblem.blankDistractors || fallback.blankDistractors || [],
          clozeText: sourceProblem.clozeText || fallback.clozeText || "",
          practiceKind: sourceProblem.practiceKind || fallback.practiceKind || "manual",
          practiceItems: sourceProblem.practiceItems || fallback.practiceItems || [],
          smallSteps: sourceProblem.smallSteps || fallback.smallSteps || [],
          finalTest: sourceProblem.finalTest || fallback.finalTest || buildFallbackFinalTest(sourceProblem, fallback)
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

  const CAMPUS_STAGES = [
    { minClears: 0, image: "images/campus/campus-1.svg", title: "はじまりの校舎" },
    { minClears: 3, image: "images/campus/campus-2.svg", title: "緑のキャンパス" },
    { minClears: 8, image: "images/campus/campus-3.svg", title: "研究棟のある大学" },
    { minClears: 15, image: "images/campus/campus-4.svg", title: "時計塔のキャンパス" },
    { minClears: 25, image: "images/campus/campus-5.svg", title: "光り輝く算数大学" }
  ];
  const AVATAR_IMAGES = [
    "images/avatars/avatar-blue.svg",
    "images/avatars/avatar-green.svg",
    "images/avatars/avatar-orange.svg",
    "images/avatars/avatar-purple.svg"
  ];

  function avatarVariantFromId(id) {
    return Array.from(String(id || "student")).reduce((sum, character) => sum + character.charCodeAt(0), 0) % AVATAR_IMAGES.length;
  }

  function avatarImageForStudent(student) {
    const variant = Number.isInteger(student.profile?.avatarVariant)
      ? student.profile.avatarVariant % AVATAR_IMAGES.length
      : avatarVariantFromId(student.id);
    return AVATAR_IMAGES[variant];
  }

  function campusProgressForStudent(student) {
    const clears = new Set(student.history.filter((item) => item.score >= 60).map((item) => item.problemId)).size;
    let stageIndex = 0;
    CAMPUS_STAGES.forEach((stage, index) => {
      if (clears >= stage.minClears) stageIndex = index;
    });
    const stage = CAMPUS_STAGES[stageIndex];
    const next = CAMPUS_STAGES[stageIndex + 1] || null;
    return { clears, stageIndex, stage, next };
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
    const campusProgress = campusProgressForStudent(student);
    $("#studentAvatarImage").src = avatarImageForStudent(student);
    $("#campusGrowthImage").src = campusProgress.stage.image;
    $("#campusGrowthTitle").textContent = campusProgress.stage.title;
    $("#campusGrowthNext").textContent = campusProgress.next
      ? `あと${campusProgress.next.minClears - campusProgress.clears}問クリアでキャンパスが成長`
      : "キャンパスが最高ランクになりました！";
    $("#campusLevel").textContent = `キャンパス Lv.${campusProgress.stageIndex + 1}`;
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
    renderReturnedMarkNotification();
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


  function returnedSubmissionsForCurrentStudent() {
    const student = currentStudent();
    if (!student || !Array.isArray(appData.submissions)) return [];
    return appData.submissions
      .filter((submission) => submission.studentId === student.id && submission.status === "returned")
      .sort((a, b) => new Date(b.returnedAt || b.reviewedAt) - new Date(a.returnedAt || a.reviewedAt));
  }

  function renderReturnedMarkNotification() {
    const unread = returnedSubmissionsForCurrentStudent().find((submission) =>
      !submission.studentViewedAt && !dismissedReturnedSubmissionIds.has(submission.id)
    );
    if (!unread) {
      $("#returnedMarkPopup").classList.add("hidden");
      popupReturnedSubmissionId = null;
      return;
    }
    const problem = appData.problems.find((item) => item.id === unread.problemId);
    popupReturnedSubmissionId = unread.id;
    $("#returnedMarkPopupTitle").textContent = `${problem?.title || "テスト"}の丸つけが とどきました！`;
    $("#returnedMarkPopupMessage").textContent = unread.comment || "先生からコメントが届いています。";
    $("#returnedMarkPopup").classList.remove("hidden");
    scheduleAccessibility();
  }

  function openReturnedMark(submissionId) {
    const submission = appData.submissions.find((item) => item.id === submissionId);
    if (!submission) return;
    const problem = appData.problems.find((item) => item.id === submission.problemId);
    submission.studentViewedAt = new Date().toISOString();
    saveData();
    $("#returnedMarkPopup").classList.add("hidden");
    $("#returnedMarkContent").innerHTML = `
      <article class="returned-mark-paper">
        <div class="returned-mark-symbol ${submission.mark}">${escapeHtml(submission.mark || "○")}</div>
        <p class="eyebrow">${escapeHtml(problem?.unit || "かくにんテスト")}</p>
        <h2>${escapeHtml(problem?.title || "先生からのおへんじ")}</h2>
        <div class="returned-answer-row">
          <span>あなたの答え</span>
          <strong>${formatMathText(submission.answer)}</strong>
        </div>
        <div class="returned-answer-row correct">
          <span>正しい答え</span>
          <strong>${formatMathText(submission.correctAnswer)}</strong>
        </div>
        ${dataUrlIsImage(submission.markingImage) ? `
          <button id="openMarkingImageBtn" class="returned-handwriting-card" type="button">
            <img src="${submission.markingImage}" alt="先生の手書き丸つけ">
            <span>先生の手書き丸つけを見る</span>
          </button>` : ""}
        ${dataUrlIsAudio(submission.audioMessage) ? `
          <div class="returned-audio-card">
            <div class="returned-audio-icon">🔊</div>
            <div>
              <strong>先生の声を聞く</strong>
              <audio controls src="${submission.audioMessage}"></audio>
            </div>
          </div>` : ""}
        <div class="returned-teacher-comment">
          <div class="teacher-comment-avatar">👩‍🏫</div>
          <div><small>先生から</small><p>${formatMathText(submission.comment, { lineBreaks: true })}</p></div>
        </div>
        <button id="closeReturnedFromContentBtn" class="btn primary large full" type="button">わかりました</button>
      </article>`;
    $("#returnedMarkDialog").showModal();
    $("#closeReturnedFromContentBtn").addEventListener("click", () => $("#returnedMarkDialog").close());
    const handwritingButton = $("#openMarkingImageBtn");
    if (handwritingButton) handwritingButton.addEventListener("click", () => {
      $("#markingImageLarge").src = submission.markingImage;
      $("#markingImageDialog").showModal();
    });
    popupReturnedSubmissionId = null;
    scheduleAccessibility();
  }

  $("#openReturnedMarkBtn").addEventListener("click", () => {
    if (popupReturnedSubmissionId) openReturnedMark(popupReturnedSubmissionId);
  });
  $("#closeReturnedMarkPopupBtn").addEventListener("click", () => {
    if (popupReturnedSubmissionId) dismissedReturnedSubmissionIds.add(popupReturnedSubmissionId);
    $("#returnedMarkPopup").classList.add("hidden");
    popupReturnedSubmissionId = null;
  });
  $("#closeReturnedMarkDialogBtn").addEventListener("click", () => $("#returnedMarkDialog").close());
  $("#closeMarkingImageDialogBtn").addEventListener("click", () => $("#markingImageDialog").close());
  $("#closeResearchDetailDialogBtn").addEventListener("click", () => $("#researchDetailDialog").close());

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
        <h3>${formatMathText(problem.title)}</h3><p>${formatMathText(problem.question, { lineBreaks: true })}</p>
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
      content = `<span class="focused-sentence">${formatMathText(sentences[sentenceIndex])}</span>`;
      $("#sentenceProgress").textContent = `${sentenceIndex + 1} / ${sentences.length} 文`;
      $("#sentenceProgress").classList.remove("hidden");
      $("#sentenceNavigation").classList.remove("hidden");
      $("#prevSentenceBtn").disabled = sentenceIndex === 0;
      $("#nextSentenceBtn").disabled = sentenceIndex === sentences.length - 1;
    } else {
      content = formatMathText((profile.easy ? activeProblem.simpleQuestion : activeProblem.question)
        || `「${activeProblem.concept || activeProblem.unit}」の正しいせつめいを1つえらびましょう。`, { lineBreaks: true });
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
    $("#answerModeTabs").closest(".panel").classList.toggle(
      "answer-panel-muted",
      learningRoute === "smallStep" && stepIndex < explanationSteps(activeProblem).length
    );

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
      const explanationChoices = (activeProblem.choices || []).filter((choice) => String(choice || "").trim());
      const safeChoices = explanationChoices.length >= 2
        ? explanationChoices
        : [activeProblem.correctExplanation, ...(activeProblem.distractors || [])].filter((choice) => String(choice || "").trim());
      $("#answerArea").innerHTML = `
        <div class="easy-choice-guide">三つの文をゆっくり読み、いちばん合う文を1つえらびましょう。</div>
        <div class="explanation-choice-list">
          ${safeChoices.map((choice) =>
            `<label class="choice explanation-choice"><input type="radio" name="choiceAnswer" value="${escapeHtml(choice)}" /><span>${formatMathText(choice)}</span></label>`
          ).join("")}
        </div>`;
    } else {
      const options = shuffle([activeProblem.blankPhrase, ...(activeProblem.blankDistractors || [])].filter(Boolean));
      const fullClozeText = normalizeClozeText(activeProblem);
      const clozeHtml = fullClozeText.split("<br>").map((part) => formatMathText(part)).join("<br>")
        .replace("［　］", '<span id="clozeBlank" class="cloze-blank">ここを選ぶ</span>');
      $("#answerArea").innerHTML = `
        <div class="cloze-card">
          <p class="cloze-instruction"><strong>［　］に入る言葉を選びましょう。</strong></p>
          <p class="cloze-full-text">${clozeHtml}</p>
          <div class="cloze-options">${options.map((option) => `<button class="cloze-option" data-value="${escapeHtml(option)}" type="button">${formatMathText(option)}</button>`).join("")}</div>
          <input id="clozeAnswer" type="hidden" />
        </div>`;
      $$(".cloze-option").forEach((button) => button.addEventListener("click", () => {
        $$(".cloze-option").forEach((item) => item.classList.toggle("selected", item === button));
        $("#clozeAnswer").value = button.dataset.value;
        $("#clozeBlank").innerHTML = formatMathText(button.dataset.value);
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
    const fullClozeText = normalizeClozeText(problem);
    return [
      {
        prompt: `${problem.concept || problem.unit}について、正しいせつめいを1つえらびましょう。`,
        instruction: "三つの文を、はじめからゆっくり読みましょう。",
        type: "choice",
        options: shuffle([problem.correctExplanation, ...(problem.distractors || [])].filter(Boolean)),
        correct: problem.correctExplanation,
        support: problem.hint || "三つの文を、もう一度ゆっくり読みくらべましょう。"
      },
      {
        prompt: "文を読んで、［　］に入る言葉をえらびましょう。",
        instruction: "文の中の［　］に、どの言葉が入るか考えましょう。",
        type: "cloze-choice",
        clozeText: fullClozeText,
        options: shuffle([problem.blankPhrase, ...(problem.blankDistractors || [])].filter(Boolean)),
        correct: problem.blankPhrase,
        support: `もとの文は「${problem.correctExplanation}」です。`
      }
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
      $("#stepContent").innerHTML = `
        <p class="small-step-instruction">${escapeHtml(step.instruction || "")}</p>
        <div class="step-choice-list">
          ${step.options.map((option) =>
            `<label class="choice small-step-choice">
              <input type="radio" name="stepChoice" value="${escapeHtml(option)}">
              <span>${escapeHtml(option)}</span>
            </label>`
          ).join("")}
        </div>`;
    } else if (step.type === "cloze-choice") {
      const safeClozeText = String(step.clozeText || "").trim();
      const repairedClozeText = safeClozeText.includes("［　］")
        ? safeClozeText
        : normalizeClozeText(activeProblem);
      const clozeHtml = repairedClozeText
        .split("<br>")
        .map((part) => escapeHtml(part))
        .join("<br>")
        .replace("［　］", '<span id="smallStepBlank" class="cloze-blank small-step-blank">［　］</span>');

      $("#stepContent").innerHTML = `
        <p class="small-step-instruction">${escapeHtml(step.instruction || "")}</p>
        <div class="small-step-cloze-card">
          <p class="small-step-cloze-text">${clozeHtml}</p>
        </div>
        <div class="step-choice-list">
          ${step.options.map((option) =>
            `<label class="choice small-step-choice">
              <input type="radio" name="stepChoice" value="${escapeHtml(option)}">
              <span>${escapeHtml(option)}</span>
            </label>`
          ).join("")}
        </div>`;

      document.querySelectorAll('input[name="stepChoice"]').forEach((input) => {
        input.addEventListener("change", () => {
          const blank = $("#smallStepBlank");
          if (blank) blank.textContent = input.value;
        });
      });
    }
    scheduleAccessibility();
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
      const totalSteps = explanationSteps(activeProblem).length;
      $("#nextStepBtn").textContent = stepIndex === totalSteps - 1
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
    const totalSteps = explanationSteps(activeProblem).length;
    if (stepIndex < totalSteps - 1) {
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
      <div class="explanation-confirmation"><small>正しい説明</small><strong>${formatMathText(activeProblem.correctExplanation)}</strong></div>
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
    activeFinalTest = null;
    activeFinalAnswer = "";
    pendingPracticeSummary = null;
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
    $("#practiceQuestion").innerHTML = `<h2>${formatMathText(normalizedItem.prompt, { lineBreaks: true })}</h2>${normalizedItem.supportText ? `<div class="test-support">${formatMathText(normalizedItem.supportText, { lineBreaks: true })}</div>` : ""}`;
    $("#practiceExplanationKey").textContent = activeProblem.correctExplanation;
    $("#practiceExplanationKey").classList.add("hidden");
    $("#togglePracticeKeyBtn").textContent = "説明を確認する";
    $("#practiceFeedback").classList.add("hidden");
    $("#checkPracticeBtn").classList.remove("hidden");
    $("#practiceDots").innerHTML = practiceItems.map((_,i)=>`<span class="practice-dot ${practiceResults[i]===true?'good':practiceResults[i]===false?'bad':i===practiceIndex?'current':''}">${i+1}</span>`).join("");
    if (normalizedItem.type === "choice") {
      $("#practiceAnswerArea").innerHTML = normalizedItem.choices.map(choice=>`<label class="choice explanation-choice"><input type="radio" name="practiceChoice" value="${escapeHtml(choice)}"><span>${formatMathText(choice)}</span></label>`).join("");
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
    if (activeFinalTest && $("#practiceCounter").textContent === "さいごのテスト") {
      if (!activeFinalAnswer) {
        showToast("答えを選んでください");
        return;
      }
      renderMarkingChoice();
      return;
    }
    const item = practiceItems[practiceIndex];
    const answer = item.type === "choice" ? document.querySelector('input[name="practiceChoice"]:checked')?.value : $("#practiceClozeAnswer")?.value;
    if (!answer) { showToast("答えを選んでください"); return; }
    const correct = answer === (item.type === "choice" ? item.correct : item.blankCorrect);
    practiceResults[practiceIndex] = correct;
    $("#practiceFeedback").className = `feedback ${correct?'good':''}`;
    $("#practiceFeedback").innerHTML = `<strong>${correct?'説明を実際の問題で使えた！':'使い方を確かめよう'}</strong><p>${formatMathText(item.explanation || activeProblem.correctExplanation, { lineBreaks: true })}</p><button id="nextPracticeBtn" class="btn ${correct?'gold':'soft'}" type="button">${practiceIndex===practiceItems.length-1?'結果を見る':'次の問題へ'}</button>`;
    $("#checkPracticeBtn").classList.add("hidden");
    $("#nextPracticeBtn").addEventListener("click",()=>{
      if (practiceIndex < practiceItems.length-1) { practiceIndex++; renderPracticeItem(); } else finishPracticeSession();
    });
  });


  function finishPracticeSession() {
    const correctCount = practiceResults.filter(Boolean).length;
    const score = Math.round(correctCount / practiceItems.length * 100);
    pendingPracticeSummary = {
      correctCount,
      score,
      practiceTotal: practiceItems.length
    };
    renderFinalTest();
  }

  function renderFinalTest() {
    activeFinalTest = normalizeFinalTest(activeProblem.finalTest, activeProblem);
    activeFinalAnswer = "";
    $("#practiceCounter").textContent = "さいごのテスト";
    $("#practiceProgressFill").style.width = "100%";
    $("#practiceDots").innerHTML = `
      ${practiceItems.map((_, i) => `<span class="practice-dot good">${i + 1}</span>`).join("")}
      <span class="practice-dot current">テスト</span>`;
    $("#practiceProfessor").innerHTML = `
      <div class="final-test-emblem">📝</div>
      <div><small>FINAL CHECK</small><strong>さいごは、自分の力でやってみよう。</strong></div>`;
    $("#practiceQuestion").innerHTML = `
      <div class="final-test-heading">
        <span>さいごの かくにんテスト</span>
        <h2>${formatMathText(activeFinalTest.prompt, { lineBreaks: true })}</h2>
      </div>`;
    $("#practiceExplanationKey").classList.add("hidden");
    $("#togglePracticeKeyBtn").classList.add("hidden");
    $("#practiceFeedback").classList.add("hidden");
    $("#checkPracticeBtn").classList.remove("hidden");
    $("#checkPracticeBtn").textContent = "答えを決める";

    if (activeFinalTest.type === "cloze") {
      const clozeHtml = String(activeFinalTest.clozeText)
        .split("<br>").map((part) => formatMathText(part)).join("<br>")
        .replace("［　］", '<span id="finalTestBlank" class="cloze-blank">ここを選ぶ</span>');
      $("#practiceAnswerArea").innerHTML = `
        <div class="final-test-answer-card">
          <p class="cloze-full-text">${clozeHtml}</p>
          <div class="cloze-options">
            ${activeFinalTest.blankChoices.map((value) =>
              `<button class="final-test-option cloze-option" data-value="${escapeHtml(value)}" type="button">${formatMathText(value)}</button>`
            ).join("")}
          </div>
          <input id="finalTestAnswer" type="hidden">
        </div>`;
      $$(".final-test-option").forEach((button) => button.addEventListener("click", () => {
        $$(".final-test-option").forEach((item) => item.classList.toggle("selected", item === button));
        activeFinalAnswer = button.dataset.value;
        $("#finalTestAnswer").value = activeFinalAnswer;
        $("#finalTestBlank").innerHTML = formatMathText(activeFinalAnswer);
      }));
    } else {
      $("#practiceAnswerArea").innerHTML = `
        <div class="final-test-answer-card final-choice-list">
          ${activeFinalTest.choices.map((choice) =>
            `<label class="choice explanation-choice">
              <input type="radio" name="finalTestChoice" value="${escapeHtml(choice)}">
              <span>${formatMathText(choice)}</span>
            </label>`
          ).join("")}
        </div>`;
      $$('input[name="finalTestChoice"]').forEach((input) => input.addEventListener("change", () => {
        activeFinalAnswer = input.value;
      }));
    }
    scheduleAccessibility();
  }

  function renderMarkingChoice() {
    $("#practiceQuestion").innerHTML = `
      <div class="marking-choice-heading">
        <div class="marking-choice-icon">📮</div>
        <h2>だれが 丸つけを しますか？</h2>
        <p>自分ですぐに たしかめることも、先生に見てもらうこともできます。</p>
      </div>`;
    $("#practiceAnswerArea").innerHTML = `
      <div class="marking-choice-grid">
        <button id="selfMarkBtn" class="marking-choice-card self-mark-card" type="button">
          <span class="marking-card-icon">✅</span>
          <strong>丸つけをする</strong>
          <small>今すぐ答えをたしかめます</small>
        </button>
        <button id="teacherMarkBtn" class="marking-choice-card teacher-mark-card" type="button">
          <span class="marking-card-icon">📨</span>
          <strong>先生に丸つけをしてもらう</strong>
          <small>先生の提出箱へ送ります</small>
        </button>
      </div>`;
    $("#checkPracticeBtn").classList.add("hidden");
    $("#practiceFeedback").classList.add("hidden");
    $("#selfMarkBtn").addEventListener("click", completeWithSelfMark);
    $("#teacherMarkBtn").addEventListener("click", submitForTeacherMark);
    scheduleAccessibility();
  }

  function correctAnswerForFinalTest(test) {
    return test.type === "cloze" ? test.blankCorrect : test.correct;
  }

  function recordCompletedLearning(extra = {}) {
    const summary = pendingPracticeSummary || {
      correctCount: practiceResults.filter(Boolean).length,
      score: Math.round(practiceResults.filter(Boolean).length / Math.max(1, practiceItems.length) * 100),
      practiceTotal: practiceItems.length
    };
    const student = currentStudent();
    const gain = summary.correctCount * 10 + 10;
    student.history.push({
      problemId: activeProblem.id,
      score: summary.score,
      answerMode,
      supports: {...supportUsage, answerMode},
      practiceCorrect: summary.correctCount,
      practiceTotal: summary.practiceTotal,
      finalTestAnswer: activeFinalAnswer,
      finalTestMarking: extra.finalTestMarking || "self",
      submissionId: extra.submissionId || null,
      route: supportUsage.route || learningRoute,
      hintCount,
      elapsedSeconds: Math.round((Date.now() - problemStartedAt) / 1000),
      assignmentId: activeAssignmentId,
      date: new Date().toISOString()
    });
    if (activeAssignmentId) {
      const assignment = (student.assignments || []).find((item) => item.id === activeAssignmentId);
      if (assignment) {
        assignment.status = "completed";
        assignment.completedAt = new Date().toISOString();
        assignment.score = summary.score;
      }
    }
    student.xp += gain;
    student.points += Math.ceil(gain / 2);
    saveData();
    return summary;
  }

  function completeWithSelfMark() {
    const correctAnswer = correctAnswerForFinalTest(activeFinalTest);
    const correct = activeFinalAnswer === correctAnswer;
    const summary = recordCompletedLearning({ finalTestMarking: "self" });
    const professor = professorForProblem(activeProblem);
    $("#practiceQuestion").innerHTML = `
      <div class="practice-result final-self-result">
        <img src="${professor.image}" alt="${professor.name}">
        <div class="self-mark-symbol">${correct ? "○" : "△"}</div>
        <h2>${correct ? "正解です！" : "答えをたしかめました"}</h2>
        <p><strong>あなたの答え：</strong>${formatMathText(activeFinalAnswer)}</p>
        <p><strong>正しい答え：</strong>${formatMathText(correctAnswer)}</p>
        <div class="teacher-style-comment">${formatMathText(activeFinalTest.explanation || activeProblem.correctExplanation, { lineBreaks: true })}</div>
        <small>確認問題は ${summary.correctCount} / ${summary.practiceTotal} 問正解でした。</small>
      </div>`;
    $("#practiceAnswerArea").innerHTML = `<button id="practiceHomeBtn" class="btn primary large full" type="button">キャンパスへ戻る</button>`;
    $("#practiceHomeBtn").addEventListener("click", renderStudentHome);
    scheduleAccessibility();
  }

  function submitForTeacherMark() {
    if (!Array.isArray(appData.submissions)) appData.submissions = [];
    const student = currentStudent();
    const submission = {
      id: `submission_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      studentId: student.id,
      problemId: activeProblem.id,
      question: activeFinalTest.prompt,
      answerType: activeFinalTest.type,
      answer: activeFinalAnswer,
      correctAnswer: correctAnswerForFinalTest(activeFinalTest),
      teacherNote: activeFinalTest.teacherNote || "",
      status: "pending",
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      returnedAt: null,
      mark: null,
      comment: "",
      studentViewedAt: null
    };
    appData.submissions.push(submission);
    recordCompletedLearning({ finalTestMarking: "teacher", submissionId: submission.id });
    saveData();

    $("#practiceQuestion").innerHTML = `
      <div class="practice-result submitted-result">
        <div class="submitted-envelope">📨</div>
        <h2>先生に おくりました！</h2>
        <p>先生が丸つけをしたら、ホーム画面におへんじが届きます。</p>
        <div class="submitted-answer-preview">
          <small>あなたの答え</small>
          <strong>${formatMathText(activeFinalAnswer)}</strong>
        </div>
      </div>`;
    $("#practiceAnswerArea").innerHTML = `<button id="practiceHomeBtn" class="btn primary large full" type="button">キャンパスへ戻る</button>`;
    $("#practiceHomeBtn").addEventListener("click", renderStudentHome);
    scheduleAccessibility();
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

  function openAvatarDialog() {
    const student = currentStudent();
    if (!student) return;
    $("#avatarDialogImage").src = avatarImageForStudent(student);
    $("#avatarDialogName").textContent = student.name + " さん";
    $("#avatarDialogLevel").textContent = `学生レベル ${levelFromXp(student.xp)}｜${student.points} pt`;
    $("#avatarDialog").showModal();
    scheduleAccessibility();
  }
  $("#studentAvatarBtn").addEventListener("click", openAvatarDialog);
  $("#closeAvatarDialogBtn").addEventListener("click", () => $("#avatarDialog").close());

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
    updateSubmissionBadge();
    if (viewName === "dashboard") renderTeacherDashboard();
    if (viewName === "students") renderTeacherStudents();
    if (viewName === "problems") renderTeacherProblems();
    if (viewName === "assignments") renderTeacherAssignments();
    if (viewName === "submissions") renderTeacherSubmissions();
    if (viewName === "results") renderTeacherResults();
  }

  function renderTeacherDashboard() {
    const results = appData.students.flatMap((student) => student.history);
    const average = results.length ? Math.round(results.reduce((sum, item) => sum + item.score, 0) / results.length) : 0;
    const assignments = allAssignmentRows();
    const pendingAssignments = assignments.filter((assignment) => assignment.status !== "completed").length;
    const pendingSubmissions = allSubmissionRows().filter((submission) => submission.status === "pending").length;
    $("#teacherContent").innerHTML = `
      <section class="teacher-metrics">
        <div class="metric"><span>登録児童</span><strong>${appData.students.length}</strong></div>
        <div class="metric"><span>総挑戦数</span><strong>${results.length}</strong></div>
        <div class="metric"><span>平均点</span><strong>${average}</strong></div>
        <div class="metric"><span>登録問題</span><strong>${appData.problems.length}</strong></div>
        <div class="metric"><span>未完了課題</span><strong>${pendingAssignments}</strong></div>
        <div class="metric"><span>丸つけ待ち</span><strong>${pendingSubmissions}</strong></div>
      </section>
      <section class="panel app-build-panel" style="margin-top:12px">
        <div class="section-head compact">
          <div>
            <p class="eyebrow">APP INFORMATION</p>
            <h2 data-app-version>Version ${APP_VERSION}</h2>
          </div>
          <span class="tag" data-app-build>Build ${APP_BUILD_DATE}</span>
        </div>
        <h3>今回の更新</h3>
        <ul class="release-note-list">
          ${APP_RELEASE_NOTES.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
        <p class="notice">画面上のバージョン番号は、今後APP_VERSIONの1か所から自動反映されます。</p>
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
        ? `<span class="tag">${problem.grade}年｜${escapeHtml(problem.unit)}</span><strong>${formatMathText(problem.title)}</strong><p>${formatMathText(problem.correctExplanation, { lineBreaks: true })}</p>`
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


  function allSubmissionRows() {
    if (!Array.isArray(appData.submissions)) appData.submissions = [];
    return appData.submissions.map((submission) => {
      const student = appData.students.find((item) => item.id === submission.studentId);
      const problem = appData.problems.find((item) => item.id === submission.problemId);
      return {
        ...submission,
        studentName: student?.name || "削除された児童",
        studentGrade: student?.grade || "",
        problemTitle: problem?.title || "削除された問題",
        problemUnit: problem?.unit || ""
      };
    }).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }

  function updateSubmissionBadge() {
    const pending = allSubmissionRows().filter((item) => item.status === "pending").length;
    const badge = $("#submissionTabBadge");
    if (!badge) return;
    badge.textContent = pending;
    badge.classList.toggle("hidden", pending === 0);
  }

  function submissionStatusLabel(status) {
    if (status === "returned") return "返却済み";
    if (status === "reviewed") return "確認済み";
    return "未確認";
  }

  function renderTeacherSubmissions() {
    const rows = allSubmissionRows();
    const pendingCount = rows.filter((item) => item.status === "pending").length;
    $("#teacherContent").innerHTML = `
      <section class="panel submission-inbox-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">SUBMISSION BOX</p>
            <h2>提出箱</h2>
            <p class="muted">児童から「丸つけをしてほしい」と届いたテストです。</p>
          </div>
          <div class="submission-inbox-count"><strong>${pendingCount}</strong><small>未確認</small></div>
        </div>
        <div class="submission-filter-row">
          <button class="btn soft submission-filter active" data-filter="all" type="button">すべて</button>
          <button class="btn ghost submission-filter" data-filter="pending" type="button">未確認</button>
          <button class="btn ghost submission-filter" data-filter="returned" type="button">返却済み</button>
        </div>
        <div id="teacherSubmissionList" class="teacher-submission-list"></div>
      </section>`;

    function drawList(filter = "all") {
      const filtered = filter === "all" ? rows : rows.filter((item) => item.status === filter);
      $("#teacherSubmissionList").innerHTML = filtered.length ? filtered.map((submission) => `
        <article class="teacher-submission-card ${submission.status}">
          <div class="submission-student-avatar">${escapeHtml((submission.studentName || "?").slice(0,1))}</div>
          <div class="submission-card-main">
            <div class="row">
              <span class="tag">${escapeHtml(submission.studentGrade)}年</span>
              <span class="submission-status ${submission.status}">${submissionStatusLabel(submission.status)}</span>
            </div>
            <h3>${escapeHtml(submission.studentName)}さん</h3>
            <p><strong>${escapeHtml(submission.problemTitle)}</strong>｜${escapeHtml(submission.problemUnit)}</p>
            <small>${new Date(submission.submittedAt).toLocaleString("ja-JP")}</small>
          </div>
          <button class="btn ${submission.status === "pending" ? "primary" : "soft"} open-submission-btn" data-id="${submission.id}" type="button">
            ${submission.status === "pending" ? "丸つけする" : "内容を見る"}
          </button>
        </article>`).join("") : '<p class="notice">この条件の提出はありません。</p>';
      $$(".open-submission-btn").forEach((button) =>
        button.addEventListener("click", () => openTeacherSubmission(button.dataset.id))
      );
    }

    $$(".submission-filter").forEach((button) => button.addEventListener("click", () => {
      $$(".submission-filter").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.classList.toggle("soft", item === button);
        item.classList.toggle("ghost", item !== button);
      });
      drawList(button.dataset.filter);
    }));
    drawList();
    updateSubmissionBadge();
  }

  function openTeacherSubmission(submissionId) {
    const submission = appData.submissions.find((item) => item.id === submissionId);
    if (!submission) return;
    const student = appData.students.find((item) => item.id === submission.studentId);
    const problem = appData.problems.find((item) => item.id === submission.problemId);

    $("#teacherContent").innerHTML = `
      <section class="panel teacher-marking-panel">
        <button id="backToSubmissionListBtn" class="btn ghost" type="button">← 提出箱へ戻る</button>
        <div class="marking-paper">
          <div class="marking-paper-head">
            <div>
              <p class="eyebrow">FINAL TEST</p>
              <h2>${escapeHtml(student?.name || "児童")}さんの かくにんテスト</h2>
              <span class="tag">${escapeHtml(problem?.grade || "")}年｜${escapeHtml(problem?.unit || "")}</span>
            </div>
            <div id="markPreview" class="mark-preview ${submission.mark || ""}">${submission.mark || "？"}</div>
          </div>

          <div class="marking-question-block">
            <small>問題</small>
            <p>${formatMathText(submission.question, { lineBreaks: true })}</p>
          </div>
          <div class="marking-answer-block">
            <small>児童の答え</small>
            <strong>${formatMathText(submission.answer)}</strong>
          </div>
          <details class="correct-answer-details">
            <summary>正しい答えを確認する</summary>
            <p>${formatMathText(submission.correctAnswer)}</p>
            ${submission.teacherNote ? `<small>${formatMathText(submission.teacherNote, { lineBreaks: true })}</small>` : ""}
          </details>

          <div class="teacher-mark-controls">
            <h3>丸つけ</h3>
            <div class="mark-button-grid">
              <button class="teacher-mark-btn circle ${submission.mark === "○" ? "selected" : ""}" data-mark="○" type="button">○<small>よくできました</small></button>
              <button class="teacher-mark-btn triangle ${submission.mark === "△" ? "selected" : ""}" data-mark="△" type="button">△<small>もう少し</small></button>
              <button class="teacher-mark-btn retry ${submission.mark === "×" ? "selected" : ""}" data-mark="×" type="button">×<small>もう一度考えよう</small></button>
            </div>
          </div>

          <section class="hand-marking-section">
            <div class="section-head compact">
              <div>
                <h3>手書きで丸つけ</h3>
                <p class="muted">マウス・指・ペンで、花丸や赤ペンを書けます。</p>
              </div>
              <span class="tag">赤ペン</span>
            </div>
            <div class="mark-canvas-toolbar">
              <button id="markPenBtn" class="btn soft active" type="button">✏️ 書く</button>
              <button id="markEraserBtn" class="btn ghost" type="button">消しゴム</button>
              <label>太さ
                <select id="markPenSizeField">
                  <option value="4">細い</option>
                  <option value="7" selected>ふつう</option>
                  <option value="12">太い</option>
                </select>
              </label>
              <button id="markFlowerBtn" class="btn gold" type="button">💮 花丸を押す</button>
              <button id="clearMarkCanvasBtn" class="btn ghost" type="button">全部消す</button>
            </div>
            <div class="mark-canvas-wrap">
              <canvas id="teacherMarkCanvas" aria-label="手書き丸つけキャンバス"></canvas>
            </div>
          </section>

          <section class="teacher-audio-section">
            <div class="section-head compact">
              <div>
                <h3>声でほめる</h3>
                <p class="muted">短い音声メッセージを録音して返却できます。</p>
              </div>
              <span id="audioRecordingTimer" class="tag">0秒</span>
            </div>
            <div class="teacher-audio-controls">
              <button id="startAudioRecordBtn" class="btn primary" type="button">🎤 録音を始める</button>
              <button id="stopAudioRecordBtn" class="btn danger hidden" type="button">■ 録音を止める</button>
              <button id="clearAudioRecordBtn" class="btn ghost" type="button">録音を消す</button>
            </div>
            <p id="audioRecordingStatus" class="notice">${submission.audioMessage ? "前回の録音があります。" : "録音はまだありません。"}</p>
            <audio id="teacherAudioPreview" class="${submission.audioMessage ? "" : "hidden"}" controls ${submission.audioMessage ? `src="${submission.audioMessage}"` : ""}></audio>
          </section>

          <label class="teacher-comment-field">
            先生からのコメント
            <textarea id="teacherSubmissionComment" rows="4" maxlength="300" placeholder="できたことを具体的にほめましょう。">${escapeHtml(submission.comment || "")}</textarea>
          </label>
          <div class="quick-comment-row">
            <button class="quick-comment-btn" data-comment="よく考えて答えられました！" type="button">よく考えたね</button>
            <button class="quick-comment-btn" data-comment="学習したことを使って答えられました！" type="button">学習を使えたね</button>
            <button class="quick-comment-btn" data-comment="もう一度問題をゆっくり読むと、もっとよくなります。" type="button">もう一歩</button>
          </div>
          <button id="returnSubmissionBtn" class="btn primary large full" type="button">
            ${submission.status === "returned" ? "内容を更新して返却する" : "児童に返却する"}
          </button>
        </div>
      </section>`;

    let selectedMark = submission.mark || "";
    $$(".teacher-mark-btn").forEach((button) => button.addEventListener("click", () => {
      selectedMark = button.dataset.mark;
      $$(".teacher-mark-btn").forEach((item) => item.classList.toggle("selected", item === button));
      $("#markPreview").textContent = selectedMark;
      $("#markPreview").className = `mark-preview ${selectedMark}`;
    }));

    recordedAudioDataUrl = submission.audioMessage || "";
    initMarkCanvas(submission.markingImage || "");
    $("#startAudioRecordBtn").addEventListener("click", startTeacherAudioRecording);
    $("#stopAudioRecordBtn").addEventListener("click", stopTeacherAudioRecording);
    $("#clearAudioRecordBtn").addEventListener("click", clearTeacherAudioRecording);
    $("#markPenBtn").addEventListener("click", () => {
      markPenMode = "pen";
      $("#markPenBtn").classList.add("active");
      $("#markEraserBtn").classList.remove("active");
    });
    $("#markEraserBtn").addEventListener("click", () => {
      markPenMode = "eraser";
      $("#markEraserBtn").classList.add("active");
      $("#markPenBtn").classList.remove("active");
    });
    $("#markPenSizeField").addEventListener("change", (event) => {
      markPenSize = Number(event.target.value) || 7;
    });
    $("#clearMarkCanvasBtn").addEventListener("click", clearMarkCanvas);
    $("#markFlowerBtn").addEventListener("click", () => {
      if (!activeMarkCanvasContext || !activeMarkCanvas) return;
      const context = activeMarkCanvasContext;
      const width = parseFloat(activeMarkCanvas.style.width);
      context.save();
      context.globalCompositeOperation = "source-over";
      context.translate(width - 105, 100);
      context.rotate(-0.12);
      context.strokeStyle = "#e23e3e";
      context.lineWidth = 6;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
        context.beginPath();
        context.ellipse(Math.cos(angle) * 35, Math.sin(angle) * 35, 20, 34, angle, 0, Math.PI * 2);
        context.stroke();
      }
      context.beginPath();
      context.arc(0, 0, 30, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = "#e23e3e";
      context.font = "900 22px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("よくできました", 0, 0);
      context.restore();
      markCanvasDirty = true;
    });

    $$(".quick-comment-btn").forEach((button) => button.addEventListener("click", () => {
      const field = $("#teacherSubmissionComment");
      field.value = field.value.trim()
        ? `${field.value.trim()}\n${button.dataset.comment}`
        : button.dataset.comment;
    }));
    $("#backToSubmissionListBtn").addEventListener("click", renderTeacherSubmissions);
    $("#returnSubmissionBtn").addEventListener("click", () => {
      const comment = $("#teacherSubmissionComment").value.trim();
      if (!selectedMark) {
        showToast("○・△・×のどれかを選んでください");
        return;
      }
      if (!comment) {
        showToast("先生からのコメントを入力してください");
        return;
      }
      submission.mark = selectedMark;
      submission.comment = comment;
      submission.markingImage = markCanvasDataUrl();
      submission.audioMessage = recordedAudioDataUrl;
      submission.status = "returned";
      submission.reviewedAt = new Date().toISOString();
      submission.returnedAt = new Date().toISOString();
      submission.studentViewedAt = null;
      saveData();
      updateSubmissionBadge();
      renderTeacherSubmissions();
      showToast(`${student?.name || "児童"}さんに返却しました`);
    });
  }

  function renderTeacherResults() {
    const grades = [...new Set(appData.students.map((student) => Number(student.grade)))].sort((a,b) => a-b);
    const defaultGrade = grades[0] || 1;
    $("#teacherContent").innerHTML = `
      <section class="panel student-analysis-panel">
        <div class="section-head">
          <div>
            <p class="eyebrow">STUDENT ANALYSIS</p>
            <h2 class="results-single-line-title">結果・支援分析</h2>
            <p class="muted">学年を選び、そのあと児童名を選んでください。</p>
          </div>
        </div>
        <div class="analysis-grade-selector">
          <label>学年
            <select id="analysisGradeField">
              ${grades.map((grade) => `<option value="${grade}">${grade}年</option>`).join("")}
            </select>
          </label>
        </div>
        <div id="analysisStudentTabs" class="analysis-student-tabs"></div>
        <div id="studentAnalysisContent"></div>
      </section>`;

    function studentsInGrade(grade) {
      return appData.students.filter((student) => Number(student.grade) === Number(grade));
    }

    function renderStudentTabs(grade) {
      const students = studentsInGrade(grade);
      $("#analysisStudentTabs").innerHTML = students.length ? students.map((student, index) => `
        <button class="analysis-student-tab ${index === 0 ? "active" : ""}" data-student="${student.id}" type="button">
          <span class="analysis-tab-avatar">${escapeHtml(student.name.slice(0,1))}</span>
          <span><strong>${escapeHtml(student.name)}</strong><small>${student.grade}年</small></span>
        </button>`).join("") : '<p class="notice">この学年には児童がいません。</p>';

      $$(".analysis-student-tab").forEach((button) => button.addEventListener("click", () => {
        $$(".analysis-student-tab").forEach((item) => item.classList.toggle("active", item === button));
        renderSelectedStudentAnalysis(button.dataset.student);
      }));
      if (students[0]) renderSelectedStudentAnalysis(students[0].id);
      else $("#studentAnalysisContent").innerHTML = "";
    }

    function getStudentAnalysis(student) {
      const history = [...(student.history || [])].sort((a,b) => new Date(b.date) - new Date(a.date));
      const scores = history.map((item) => Number(item.score || 0));
      const average = scores.length ? Math.round(scores.reduce((sum,score) => sum + score, 0) / scores.length) : 0;
      const firstHalf = scores.slice(Math.ceil(scores.length / 2));
      const recentHalf = scores.slice(0, Math.floor(scores.length / 2));
      const firstAverage = firstHalf.length ? firstHalf.reduce((a,b)=>a+b,0)/firstHalf.length : average;
      const recentAverage = recentHalf.length ? recentHalf.reduce((a,b)=>a+b,0)/recentHalf.length : average;
      const trend = Math.round(recentAverage - firstAverage);
      const uniqueProblems = new Set(history.map((item) => item.problemId)).size;
      const teacherMarked = history.filter((item) => item.finalTestMarking === "teacher").length;
      const selfMarked = history.filter((item) => item.finalTestMarking === "self").length;
      const submissions = allSubmissionRows().filter((item) => item.studentId === student.id);
      const returned = submissions.filter((item) => item.status === "returned");
      const markCounts = returned.reduce((counts,item) => {
        counts[item.mark || "未評価"] = (counts[item.mark || "未評価"] || 0) + 1;
        return counts;
      }, {});
      const hintTotal = history.reduce((sum,item) => sum + Number(item.hintCount || 0), 0);
      const elapsedValues = history.map((item) => Number(item.elapsedSeconds || 0)).filter(Boolean);
      const averageSeconds = elapsedValues.length ? Math.round(elapsedValues.reduce((a,b)=>a+b,0)/elapsedValues.length) : 0;
      const supportCounts = history.reduce((counts,item) => {
        const supports = item.supports || {};
        ["ruby","large","easy","readAloud","lineFocus"].forEach((key) => {
          if (supports[key]) counts[key] = (counts[key] || 0) + 1;
        });
        return counts;
      }, {});
      const routeCounts = history.reduce((counts,item) => {
        const route = item.route || "direct";
        counts[route] = (counts[route] || 0) + 1;
        return counts;
      }, {});
      const unitScores = {};
      history.forEach((item) => {
        const problem = appData.problems.find((entry) => entry.id === item.problemId);
        const unit = problem?.unit || "その他";
        if (!unitScores[unit]) unitScores[unit] = [];
        unitScores[unit].push(Number(item.score || 0));
      });
      const unitAverages = Object.entries(unitScores).map(([unit,values]) => ({
        unit,
        average: Math.round(values.reduce((a,b)=>a+b,0)/values.length),
        count: values.length
      })).sort((a,b) => a.average - b.average);
      return {
        history, scores, average, trend, uniqueProblems, teacherMarked, selfMarked,
        submissions, returned, markCounts, hintTotal, averageSeconds,
        supportCounts, routeCounts, unitAverages
      };
    }

    function renderSelectedStudentAnalysis(studentId) {
      const student = appData.students.find((item) => item.id === studentId);
      if (!student) return;
      const analysis = getStudentAnalysis(student);
      const recentRows = analysis.history.slice(0, 12).map((item) => {
        const problem = appData.problems.find((entry) => entry.id === item.problemId);
        const submission = item.submissionId ? appData.submissions.find((entry) => entry.id === item.submissionId) : null;
        return `<tr>
          <td>${new Date(item.date).toLocaleDateString("ja-JP")}</td>
          <td>${escapeHtml(problem?.title || "問題")}</td>
          <td>${item.score}点</td>
          <td>${item.practiceCorrect ?? "—"} / ${item.practiceTotal ?? "—"}</td>
          <td>${item.finalTestMarking === "teacher" ? "先生" : "自分"}</td>
          <td>${submission?.mark || "—"}</td>
        </tr>`;
      }).join("");

      const recentScores = analysis.history.slice(0,8).reverse();
      $("#studentAnalysisContent").innerHTML = `
        <div class="selected-student-head">
          <div>
            <h3>${escapeHtml(student.name)}さんの学習結果</h3>
            <p>${student.grade}年｜レベル ${levelFromXp(student.xp)}｜${student.points} pt</p>
          </div>
          <span class="analysis-average ${analysis.average >= 80 ? "good" : analysis.average >= 60 ? "middle" : "needs-support"}">${analysis.average}<small>平均点</small></span>
        </div>

        <div class="analysis-metric-grid">
          <div class="analysis-metric"><span>取り組んだ問題</span><strong>${analysis.uniqueProblems}</strong><small>種類</small></div>
          <div class="analysis-metric"><span>学習回数</span><strong>${analysis.history.length}</strong><small>回</small></div>
          <div class="analysis-metric"><span>先生へ提出</span><strong>${analysis.teacherMarked}</strong><small>回</small></div>
          <div class="analysis-metric"><span>返却済み</span><strong>${analysis.returned.length}</strong><small>件</small></div>
        </div>

        <div class="analysis-two-column">
          <article class="analysis-card">
            <h3>最近の点数</h3>
            <div class="score-bar-list">
              ${recentScores.length ? recentScores.map((item) => {
                const problem = appData.problems.find((entry) => entry.id === item.problemId);
                return `<div class="score-bar-row">
                  <span>${escapeHtml(problem?.title || "問題")}</span>
                  <div class="score-bar-track"><i style="width:${Math.max(0,Math.min(100,item.score))}%"></i></div>
                  <strong>${item.score}</strong>
                </div>`;
              }).join("") : '<p class="notice">まだ学習結果がありません。</p>'}
            </div>
          </article>

          <article class="analysis-card">
            <h3>使った支援</h3>
            <div class="support-chip-list">
              <span>ふりがな <strong>${analysis.supportCounts.ruby || 0}</strong></span>
              <span>文字拡大 <strong>${analysis.supportCounts.large || 0}</strong></span>
              <span>やさしい文 <strong>${analysis.supportCounts.easy || 0}</strong></span>
              <span>読み上げ <strong>${analysis.supportCounts.readAloud || 0}</strong></span>
              <span>行の強調 <strong>${analysis.supportCounts.lineFocus || 0}</strong></span>
              <span>ヒント <strong>${analysis.hintTotal}</strong></span>
            </div>
            <div class="support-summary">
              <p><strong>自分で丸つけ：</strong>${analysis.selfMarked}回</p>
              <p><strong>先生に依頼：</strong>${analysis.teacherMarked}回</p>
              <p><strong>少しずつ考える：</strong>${analysis.routeCounts.smallStep || 0}回</p>
            </div>
          </article>
        </div>

        <div class="analysis-detail-launch">
          <div>
            <h3>研究用の詳細分析</h3>
            <p>得点の変化、単元別傾向、支援利用、提出行動などを詳しく見ます。</p>
          </div>
          <button id="openResearchDetailBtn" class="btn primary" type="button">詳細を見る →</button>
        </div>

        <article class="analysis-card analysis-history-card">
          <div class="section-head compact">
            <div><h3>学習履歴</h3><p class="muted">新しい順に12件まで表示します。</p></div>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>日</th><th>問題</th><th>点</th><th>確認問題</th><th>丸つけ</th><th>先生評価</th></tr></thead>
              <tbody>${recentRows || '<tr><td colspan="6">まだ学習履歴がありません。</td></tr>'}</tbody>
            </table>
          </div>
        </article>`;

      $("#openResearchDetailBtn").addEventListener("click", () => renderResearchDetail(student, analysis));
    }

    function renderResearchDetail(student, analysis) {
      const strongest = [...analysis.unitAverages].sort((a,b)=>b.average-a.average)[0];
      const weakest = analysis.unitAverages[0];
      const supportTotal = Object.values(analysis.supportCounts).reduce((a,b)=>a+b,0);
      const teacherRequestRate = analysis.history.length
        ? Math.round(analysis.teacherMarked / analysis.history.length * 100) : 0;
      const selfMarkRate = analysis.history.length
        ? Math.round(analysis.selfMarked / analysis.history.length * 100) : 0;
      const returnedMarks = analysis.returned.length;
      const positiveMarks = (analysis.markCounts["○"] || 0);
      const positiveRate = returnedMarks ? Math.round(positiveMarks / returnedMarks * 100) : 0;

      const interpretation = [];
      if (analysis.trend >= 10) interpretation.push("最近の得点は、前半より上がっています。学習の定着が進んでいる可能性があります。");
      else if (analysis.trend <= -10) interpretation.push("最近の得点は、前半より下がっています。疲労、問題の難しさ、支援の合い方を確認する必要があります。");
      else interpretation.push("得点の大きな変化は見られません。継続的な観察が必要です。");
      if (supportTotal > analysis.history.length) interpretation.push("一つの学習で複数の支援を使うことがあります。どの支援が得点や自立度に結び付いたかを個別に見るとよいです。");
      if (teacherRequestRate >= 50) interpretation.push("先生への丸つけ依頼が多めです。安心して提出できている一方、自分で確かめる力とのバランスも観察できます。");
      if (weakest && weakest.average < 60) interpretation.push(`${weakest.unit}は平均${weakest.average}点で、重点的に支援する候補です。`);

      $("#researchDetailTitle").textContent = `${student.name}さんの詳細分析`;
      $("#researchDetailContent").innerHTML = `
        <div class="research-warning">
          この分析は学習支援の手がかりです。診断や能力の断定には使わず、授業中の様子や本人の話と合わせて判断してください。
        </div>

        <div class="research-metric-grid">
          <div><span>得点の変化</span><strong>${analysis.trend >= 0 ? "+" : ""}${analysis.trend}</strong><small>前半との差</small></div>
          <div><span>平均時間</span><strong>${analysis.averageSeconds}</strong><small>秒／回</small></div>
          <div><span>先生依頼率</span><strong>${teacherRequestRate}</strong><small>％</small></div>
          <div><span>自分で丸つけ</span><strong>${selfMarkRate}</strong><small>％</small></div>
          <div><span>○の割合</span><strong>${positiveRate}</strong><small>％</small></div>
          <div><span>ヒント使用</span><strong>${analysis.hintTotal}</strong><small>回</small></div>
        </div>

        <section class="research-section">
          <h3>単元別の傾向</h3>
          <div class="unit-analysis-list">
            ${analysis.unitAverages.length ? analysis.unitAverages.map((item) => `
              <div class="unit-analysis-row">
                <span>${escapeHtml(item.unit)}</span>
                <div><i style="width:${item.average}%"></i></div>
                <strong>${item.average}点</strong>
                <small>${item.count}回</small>
              </div>`).join("") : '<p class="notice">まだ単元別に分析できる結果がありません。</p>'}
          </div>
          ${strongest ? `<p class="research-note">比較的得意：<strong>${escapeHtml(strongest.unit)}</strong>（${strongest.average}点）</p>` : ""}
          ${weakest ? `<p class="research-note">支援候補：<strong>${escapeHtml(weakest.unit)}</strong>（${weakest.average}点）</p>` : ""}
        </section>

        <section class="research-section">
          <h3>支援の利用状況</h3>
          <div class="research-support-table">
            <div><span>ふりがな</span><strong>${analysis.supportCounts.ruby || 0}</strong></div>
            <div><span>文字拡大</span><strong>${analysis.supportCounts.large || 0}</strong></div>
            <div><span>やさしい文</span><strong>${analysis.supportCounts.easy || 0}</strong></div>
            <div><span>読み上げ</span><strong>${analysis.supportCounts.readAloud || 0}</strong></div>
            <div><span>行の強調</span><strong>${analysis.supportCounts.lineFocus || 0}</strong></div>
            <div><span>少しずつ考える</span><strong>${analysis.routeCounts.smallStep || 0}</strong></div>
          </div>
        </section>

        <section class="research-section">
          <h3>読み取れる可能性</h3>
          <div class="interpretation-list">
            ${interpretation.map((text) => `<p>${escapeHtml(text)}</p>`).join("")}
          </div>
        </section>

        <section class="research-section">
          <h3>次に確認したいこと</h3>
          <ul class="research-question-list">
            <li>支援を使った回と使わなかった回で、得点や時間はどう変わるか。</li>
            <li>先生に丸つけを頼んだ理由は、安心感・難しさ・ほめられたい気持ちのどれに近いか。</li>
            <li>得点が低い単元で、問題文理解と計算技能のどちらにつまずいているか。</li>
            <li>支援を減らしても同じ水準で解けるようになっているか。</li>
          </ul>
        </section>`;
      $("#researchDetailDialog").showModal();
    }

    $("#analysisGradeField").value = String(defaultGrade);
    $("#analysisGradeField").addEventListener("change", (event) => renderStudentTabs(event.target.value));
    renderStudentTabs(defaultGrade);
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