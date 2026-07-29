const DEFAULT_APP_DATA = {
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
      id: "p1", unit: "平均", title: "平均とはどんな数？", difficulty: 2, professor: "アルベルト教授",
      question: "平均とは、どのような数ですか。自分の言葉で説明しましょう。",
      rubyText: "<ruby>平均<rt>へいきん</rt></ruby>とは、どのような<ruby>数<rt>かず</rt></ruby>ですか。<ruby>自分<rt>じぶん</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>で<ruby>説明<rt>せつめい</rt></ruby>しましょう。",
      simpleQuestion: "いくつかの数を同じくらいにならした数を何といいますか。",
      visual: "8、4、6を同じ数にならすと<br>6、6、6になります。",
      choices: ["いくつかの数を同じくらいにならした数", "いちばん大きい数", "全部を足した数"],
      keywords: ["ならした", "同じくらい", "合計", "個数", "割る"],
      modelAnswer: "いくつかの数を同じくらいにならした数です。",
      hint: "全部の量を同じになるように分ける場面を思い出そう。"
    },
    {
      id: "p2", unit: "平均", title: "平均の求め方", difficulty: 3, professor: "メディアン教授",
      question: "5、7、9の平均を求める方法を、式と言葉で説明しましょう。",
      rubyText: "5、7、9の<ruby>平均<rt>へいきん</rt></ruby>を<ruby>求<rt>もと</rt></ruby>める<ruby>方法<rt>ほうほう</rt></ruby>を、<ruby>式<rt>しき</rt></ruby>と<ruby>言葉<rt>ことば</rt></ruby>で<ruby>説明<rt>せつめい</rt></ruby>しましょう。",
      simpleQuestion: "5、7、9を足して3で割ります。答えはいくつですか。",
      visual: "5＋7＋9＝21<br>21÷3＝？",
      choices: ["7", "21", "3"],
      keywords: ["21", "3", "割", "7"],
      modelAnswer: "5＋7＋9＝21、数は3個なので21÷3＝7です。",
      hint: "まず全部を足し、次に個数で割ります。"
    },
    {
      id: "p3", unit: "割合", title: "割合の意味", difficulty: 2, professor: "レシオ教授",
      question: "割合とは、どのような関係を表す数ですか。",
      rubyText: "<ruby>割合<rt>わりあい</rt></ruby>とは、どのような<ruby>関係<rt>かんけい</rt></ruby>を<ruby>表<rt>あらわ</rt></ruby>す<ruby>数<rt>かず</rt></ruby>ですか。",
      simpleQuestion: "比べる量が、もとにする量の何倍かを表す数を何といいますか。",
      visual: "比べる量 50 ÷ もとにする量 100 ＝ 0.5",
      choices: ["何倍にあたるか", "全部でいくつか", "差がいくつか"],
      keywords: ["何倍", "比べる量", "もとにする量", "割"],
      modelAnswer: "比べる量がもとにする量の何倍にあたるかを表す数です。",
      hint: "比べる量÷もとにする量で考えます。"
    }
  ]
};
