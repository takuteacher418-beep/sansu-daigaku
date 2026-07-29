const DEFAULT_APP_DATA = {
  professors: [
    {
      id: "takkun", name: "たっくん教授", image: "images/professors/takkun.png",
      specialty: "学び方と挑戦", personality: "明るく、失敗を次の研究につなげる学長",
      greeting: "今日も自分に合った方法で進めよう！",
      success: "素晴らしい！考え方がしっかり伝わったよ。",
      retry: "考えの種は見えているよ。ヒントを使ってもう一度研究しよう。"
    },
    {
      id: "albert", name: "アルベルト教授", image: "images/professors/albert.png",
      specialty: "平均・数量関係", personality: "穏やかで、言葉を整理するのが得意",
      greeting: "数をならして見ると、隠れた関係が見えてきます。",
      success: "よく整理できています。説明にも筋道がありますね。",
      retry: "まず、全部の量と個数を分けて考えてみましょう。"
    },
    {
      id: "median", name: "メディアン教授", image: "images/professors/median.png",
      specialty: "データ・代表値", personality: "観察力が高く、複数の見方を教える",
      greeting: "数字を順に並べると、データの顔が見えてきます。",
      success: "データの特徴を正しくつかめています。",
      retry: "数字の並び方をもう一度観察してみましょう。"
    },
    {
      id: "ratio", name: "レシオ教授", image: "images/professors/ratio.png",
      specialty: "割合・比", personality: "論理的で、比べる基準を大切にする",
      greeting: "何をもとにして比べるのか、それが割合の鍵です。",
      success: "もとにする量との関係が正しく説明できています。",
      retry: "比べる量と、もとにする量を確かめましょう。"
    },
    {
      id: "geomet", name: "ジオメト教授", image: "images/professors/geomet.png",
      specialty: "図形・面積・体積", personality: "図を使い、形の秘密を見つける",
      greeting: "図にかき込むと、形の秘密が見えてきますよ。",
      success: "図と式がきれいにつながっています。",
      retry: "分かっている長さを図に書き込んでみましょう。"
    },
    {
      id: "vero", name: "ヴェロ教授", image: "images/professors/vero.png",
      specialty: "速さ・単位量", personality: "テンポよく、手順を小分けにして導く",
      greeting: "道のり・時間・速さを一つずつ整理しましょう。",
      success: "三つの量の関係を正しく使えています。",
      retry: "求めたいものを一つ決めて、関係図にしてみましょう。"
    },
    {
      id: "numero", name: "ニュメロ教授", image: "images/professors/numero.png",
      specialty: "数と計算", personality: "計算の仕組みを丁寧に研究する",
      greeting: "答えだけでなく、計算の仕組みも研究しましょう。",
      success: "計算と説明の両方が正確です。",
      retry: "位をそろえて、一段ずつ確かめてみましょう。"
    }
  ],
  students: [
    {
      id: "s1", name: "あおい", grade: 5, loginId: "aoi01", password: "1234",
      xp: 160, points: 240,
      profile: { audio: true, ruby: true, large: false, choice: true, template: true, visual: true, steps: true, easy: false },
      history: []
    }
  ],
  problems: [
    {
      id: "p1", unit: "平均", concept: "平均", title: "平均とはどんな数？", difficulty: 2, professor: "アルベルト教授",
      question: "平均について、正しく説明している文を選びましょう。",
      rubyText: "<ruby>平均<rt>へいきん</rt></ruby>について、<ruby>正<rt>ただ</rt></ruby>しく<ruby>説明<rt>せつめい</rt></ruby>している<ruby>文<rt>ぶん</rt></ruby>を<ruby>選<rt>えら</rt></ruby>びましょう。",
      simpleQuestion: "平均の正しい説明を選びましょう。", visual: "8、4、6を同じ数にならすと<br>6、6、6になります。",
      correctExplanation: "いくつかの数を同じくらいにならした数です。",
      distractors: ["いちばん大きい数です。", "全部を足した数です。"],
      choices: ["いくつかの数を同じくらいにならした数です。", "いちばん大きい数です。", "全部を足した数です。"],
      blankPhrase: "同じくらいにならした", blankDistractors: ["大きい順に並べた", "全部かけた"],
      clozeText: "平均とは、いくつかの数を［　］数です。", hint: "数を同じになるように分ける場面を思い出そう.",
      practiceKind: "averageCalculation",
      practiceItems: [
        {
          type: "choice",
          prompt: "4、6、8の平均を求めましょう。",
          supportText: "4＋6＋8＝18、18÷3",
          choices: ["6", "18", "3"],
          correct: "6",
          explanation: "全部を足した18を、数の個数3で割るので、平均は6です。"
        },
        {
          type: "cloze",
          prompt: "10、15、20の平均を求めましょう。",
          clozeText: "10＋15＋20＝45。45を［　］で割ると、平均は15です。",
          blankChoices: ["3", "15", "45"],
          blankCorrect: "3",
          explanation: "数は3個あるので、合計45を3で割ります。"
        },
        {
          type: "choice",
          prompt: "3日間に読んだ本のページ数は、12ページ、18ページ、15ページでした。1日平均は何ページですか。",
          supportText: "12＋18＋15＝45",
          choices: ["15ページ", "45ページ", "3ページ"],
          correct: "15ページ",
          explanation: "合計45ページを3日で割るので、1日平均は15ページです。"
        }
      ]
    },
    {
      id: "p2", unit: "平均", concept: "平均の求め方", title: "平均の求め方を説明しよう", difficulty: 3, professor: "メディアン教授",
      question: "平均の求め方を、正しく説明している文を選びましょう。",
      rubyText: "<ruby>平均<rt>へいきん</rt></ruby>の<ruby>求<rt>もと</rt></ruby>め<ruby>方<rt>かた</rt></ruby>を、<ruby>正<rt>ただ</rt></ruby>しく<ruby>説明<rt>せつめい</rt></ruby>している<ruby>文<rt>ぶん</rt></ruby>を<ruby>選<rt>えら</rt></ruby>びましょう。",
      simpleQuestion: "平均の求め方として正しい文を選びましょう。", visual: "5＋7＋9＝21<br>21÷3＝7",
      correctExplanation: "全部の数を足し、その合計を数の個数で割ります。",
      distractors: ["全部の数をかけ、いちばん大きい数で割ります。", "いちばん大きい数と小さい数を足します。"],
      choices: ["全部の数を足し、その合計を数の個数で割ります。", "全部の数をかけ、いちばん大きい数で割ります。", "いちばん大きい数と小さい数を足します。"],
      blankPhrase: "数の個数", blankDistractors: ["いちばん大きい数", "合計"],
      clozeText: "平均は、全部の数を足し、その合計を［　］で割って求めます。", hint: "合計を、数がいくつあるかで分けます。",
      practiceKind: "averageCalculation",
      practiceItems: [
        {
          type: "choice",
          prompt: "5、7、9の平均を求めましょう。",
          supportText: "5＋7＋9＝21",
          choices: ["7", "21", "3"],
          correct: "7",
          explanation: "合計21を、数の個数3で割るので、平均は7です。"
        },
        {
          type: "cloze",
          prompt: "6、8、10、12の平均を求めましょう。",
          clozeText: "6＋8＋10＋12＝36。36を［　］で割ると、平均は9です。",
          blankChoices: ["4", "9", "36"],
          blankCorrect: "4",
          explanation: "数が4個あるので、合計36を4で割ります。"
        },
        {
          type: "choice",
          prompt: "4回のテストの点数は、70点、80点、90点、80点でした。平均点は何点ですか。",
          supportText: "70＋80＋90＋80＝320",
          choices: ["80点", "320点", "4点"],
          correct: "80点",
          explanation: "合計320点を4回で割るので、平均は80点です。"
        }
      ]
    },
    {
      id: "p3", unit: "割合", concept: "割合", title: "割合の意味を説明しよう", difficulty: 2, professor: "レシオ教授",
      question: "割合について、正しく説明している文を選びましょう。",
      rubyText: "<ruby>割合<rt>わりあい</rt></ruby>について、<ruby>正<rt>ただ</rt></ruby>しく<ruby>説明<rt>せつめい</rt></ruby>している<ruby>文<rt>ぶん</rt></ruby>を<ruby>選<rt>えら</rt></ruby>びましょう。",
      simpleQuestion: "割合の正しい説明を選びましょう。", visual: "比べる量 50 ÷ もとにする量 100 ＝ 0.5",
      correctExplanation: "比べる量が、もとにする量の何倍にあたるかを表す数です。",
      distractors: ["二つの量の差だけを表す数です。", "二つの量を足した合計を表す数です。"],
      choices: ["比べる量が、もとにする量の何倍にあたるかを表す数です。", "二つの量の差だけを表す数です。", "二つの量を足した合計を表す数です。"],
      blankPhrase: "もとにする量", blankDistractors: ["答え", "いちばん大きい量"],
      clozeText: "割合とは、比べる量が［　］の何倍にあたるかを表す数です。", hint: "何を基準にして比べるかを考えよう。",
      practiceKind: "ratioCalculation",
      practiceItems: [
        {
          type: "choice",
          prompt: "もとにする量が100人、比べる量が40人です。割合はいくつですか。",
          supportText: "40÷100",
          choices: ["0.4", "2.5", "60"],
          correct: "0.4",
          explanation: "比べる量40を、もとにする量100で割るので0.4です。"
        },
        {
          type: "cloze",
          prompt: "もとにする量が50個、比べる量が20個です。割合を求めましょう。",
          clozeText: "20÷50＝［　］",
          blankChoices: ["0.4", "2.5", "30"],
          blankCorrect: "0.4",
          explanation: "比べる量20÷もとにする量50＝0.4です。"
        },
        {
          type: "choice",
          prompt: "クラス40人のうち、図書委員は8人です。クラス全体をもとにした図書委員の割合はいくつですか。",
          supportText: "8÷40",
          choices: ["0.2", "5", "32"],
          correct: "0.2",
          explanation: "8÷40＝0.2です。"
        }
      ]
    }
  ]
};
