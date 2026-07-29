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
