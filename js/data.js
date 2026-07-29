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
    "id": "g1_01",
    "grade": 1,
    "unit": "たし算",
    "concept": "たし算",
    "title": "たし算はどんな計算？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "たし算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "たし算の正しい説明を選びましょう。",
    "rubyText": "たし算について、正しく説明している文を選びましょう。",
    "visual": "●●● ＋ ●● ＝ ●●●●●",
    "correctExplanation": "たし算は、二つ以上の数を合わせた数を求める計算です。",
    "distractors": [
      "たし算は、数を小さくする計算です。",
      "たし算は、同じ数ずつ分ける計算です。"
    ],
    "choices": [
      "たし算は、二つ以上の数を合わせた数を求める計算です。",
      "たし算は、数を小さくする計算です。",
      "たし算は、同じ数ずつ分ける計算です。"
    ],
    "blankPhrase": "合わせた数",
    "blankDistractors": [
      "残った数",
      "分けた数"
    ],
    "clozeText": "たし算は、二つ以上の数を［　］を求める計算です。",
    "hint": "「たし算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "3こあります。2こもらいました。ぜんぶで何こですか。",
        "choices": [
          "5こ",
          "1こ",
          "6こ"
        ],
        "correct": "5こ",
        "explanation": "3＋2＝5なので5こです。"
      },
      {
        "type": "cloze",
        "prompt": "式を完成させましょう。",
        "clozeText": "4＋3＝［　］",
        "blankChoices": [
          "7",
          "1",
          "12"
        ],
        "blankCorrect": "7",
        "explanation": "4と3を合わせると7です。"
      },
      {
        "type": "choice",
        "prompt": "赤い花が5本、白い花が4本あります。全部で何本ですか。",
        "choices": [
          "9本",
          "1本",
          "20本"
        ],
        "correct": "9本",
        "explanation": "5＋4＝9です。"
      }
    ]
  },
  {
    "id": "g1_02",
    "grade": 1,
    "unit": "ひき算",
    "concept": "ひき算",
    "title": "ひき算はどんな計算？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "ひき算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "ひき算の正しい説明を選びましょう。",
    "rubyText": "ひき算について、正しく説明している文を選びましょう。",
    "visual": "●●●●●●●● → 3こ取る",
    "correctExplanation": "ひき算は、全体からいくつかを取った残りや、二つの数の違いを求める計算です。",
    "distractors": [
      "ひき算は、数を合わせる計算です。",
      "ひき算は、同じ数を何回も足す計算です。"
    ],
    "choices": [
      "ひき算は、全体からいくつかを取った残りや、二つの数の違いを求める計算です。",
      "ひき算は、数を合わせる計算です。",
      "ひき算は、同じ数を何回も足す計算です。"
    ],
    "blankPhrase": "残り",
    "blankDistractors": [
      "合計",
      "順番"
    ],
    "clozeText": "ひき算は、全体からいくつかを取った［　］や、二つの数の違いを求める計算です。",
    "hint": "「ひき算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "8こから3こ使いました。残りは何こですか。",
        "choices": [
          "5こ",
          "11こ",
          "3こ"
        ],
        "correct": "5こ",
        "explanation": "8－3＝5です。"
      },
      {
        "type": "cloze",
        "prompt": "式を完成させましょう。",
        "clozeText": "9－4＝［　］",
        "blankChoices": [
          "5",
          "13",
          "4"
        ],
        "blankCorrect": "5",
        "explanation": "9から4を取ると5です。"
      },
      {
        "type": "choice",
        "prompt": "7人と4人では、何人ちがいますか。",
        "choices": [
          "3人",
          "11人",
          "4人"
        ],
        "correct": "3人",
        "explanation": "7－4＝3です。"
      }
    ]
  },
  {
    "id": "g1_03",
    "grade": 1,
    "unit": "数",
    "concept": "0",
    "title": "0はどんな数？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "0について、正しく説明している文を選びましょう。",
    "simpleQuestion": "0の正しい説明を選びましょう。",
    "rubyText": "0について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "0は、一つもないことを表す数です。",
    "distractors": [
      "0は、いちばん大きい数です。",
      "0は、10と同じ数です。"
    ],
    "choices": [
      "0は、一つもないことを表す数です。",
      "0は、いちばん大きい数です。",
      "0は、10と同じ数です。"
    ],
    "blankPhrase": "一つもない",
    "blankDistractors": [
      "たくさんある",
      "半分ある"
    ],
    "clozeText": "0は、［　］ことを表す数です。",
    "hint": "「0」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "あめが3こあり、3こ全部食べました。残りは何こですか。",
        "choices": [
          "0こ",
          "3こ",
          "6こ"
        ],
        "correct": "0こ",
        "explanation": "3－3＝0です。"
      },
      {
        "type": "choice",
        "prompt": "0＋5はいくつですか。",
        "choices": [
          "5",
          "0",
          "10"
        ],
        "correct": "5",
        "explanation": "何もない0に5を合わせると5です。"
      },
      {
        "type": "cloze",
        "prompt": "式を完成させましょう。",
        "clozeText": "6－6＝［　］",
        "blankChoices": [
          "0",
          "6",
          "12"
        ],
        "blankCorrect": "0",
        "explanation": "同じ数を全部引くと0です。"
      }
    ]
  },
  {
    "id": "g1_04",
    "grade": 1,
    "unit": "数",
    "concept": "10のまとまり",
    "title": "10のまとまりで数える",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "10のまとまりについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "10のまとまりの正しい説明を選びましょう。",
    "rubyText": "10のまとまりについて、正しく説明している文を選びましょう。",
    "visual": "10のまとまり｜10のまとまり｜ばら3こ",
    "correctExplanation": "大きな数は、10のまとまりとばらに分けると数えやすくなります。",
    "distractors": [
      "大きな数は、全部ばらばらにしないと数えられません。",
      "10のまとまりは1として数えません。"
    ],
    "choices": [
      "大きな数は、10のまとまりとばらに分けると数えやすくなります。",
      "大きな数は、全部ばらばらにしないと数えられません。",
      "10のまとまりは1として数えません。"
    ],
    "blankPhrase": "10のまとまり",
    "blankDistractors": [
      "5のまとまり",
      "100のまとまり"
    ],
    "clozeText": "大きな数は、［　］とばらに分けると数えやすくなります。",
    "hint": "「10のまとまり」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "10のまとまりが2こ、ばらが3こあります。いくつですか。",
        "choices": [
          "23",
          "5",
          "203"
        ],
        "correct": "23",
        "explanation": "20と3で23です。"
      },
      {
        "type": "cloze",
        "prompt": "数を完成させましょう。",
        "clozeText": "10が3こ、1が4こで［　］",
        "blankChoices": [
          "34",
          "7",
          "304"
        ],
        "blankCorrect": "34",
        "explanation": "30と4で34です。"
      },
      {
        "type": "choice",
        "prompt": "47は、10のまとまりがいくつありますか。",
        "choices": [
          "4こ",
          "7こ",
          "47こ"
        ],
        "correct": "4こ",
        "explanation": "47は40と7なので、10のまとまりは4こです。"
      }
    ]
  },
  {
    "id": "g1_05",
    "grade": 1,
    "unit": "順序",
    "concept": "何番目",
    "title": "何番目の表し方",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "何番目について、正しく説明している文を選びましょう。",
    "simpleQuestion": "何番目の正しい説明を選びましょう。",
    "rubyText": "何番目について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "何番目は、決めた向きの端から順に数えた位置を表します。",
    "distractors": [
      "何番目は、全部の人数を表します。",
      "何番目は、いちばん大きい数を表します。"
    ],
    "choices": [
      "何番目は、決めた向きの端から順に数えた位置を表します。",
      "何番目は、全部の人数を表します。",
      "何番目は、いちばん大きい数を表します。"
    ],
    "blankPhrase": "決めた向き",
    "blankDistractors": [
      "真ん中",
      "好きな向き"
    ],
    "clozeText": "何番目は、［　］の端から順に数えた位置を表します。",
    "hint": "「何番目」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "左から3番目はどれですか。　○ △ □ ☆",
        "choices": [
          "□",
          "△",
          "☆"
        ],
        "correct": "□",
        "explanation": "左から○、△、□の順なので□です。"
      },
      {
        "type": "choice",
        "prompt": "5人の列で、右から2番目の人の右には何人いますか。",
        "choices": [
          "1人",
          "2人",
          "3人"
        ],
        "correct": "1人",
        "explanation": "右から2番目なら、その右には1人です。"
      },
      {
        "type": "cloze",
        "prompt": "左から4番目を表します。",
        "clozeText": "左の端から［　］数えます。",
        "blankChoices": [
          "4人",
          "3人",
          "5人"
        ],
        "blankCorrect": "4人",
        "explanation": "端から順に4人目を見ます。"
      }
    ]
  },
  {
    "id": "g1_06",
    "grade": 1,
    "unit": "量",
    "concept": "長さくらべ",
    "title": "長さを比べる方法",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "長さくらべについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "長さくらべの正しい説明を選びましょう。",
    "rubyText": "長さくらべについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "長さは、片方の端をそろえて比べます。",
    "distractors": [
      "長さは、真ん中をそろえて比べます。",
      "長さは、色だけで比べます。"
    ],
    "choices": [
      "長さは、片方の端をそろえて比べます。",
      "長さは、真ん中をそろえて比べます。",
      "長さは、色だけで比べます。"
    ],
    "blankPhrase": "端をそろえて",
    "blankDistractors": [
      "色を見て",
      "曲げて"
    ],
    "clozeText": "長さは、片方の［　］比べます。",
    "hint": "「長さくらべ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2本の鉛筆の長さを比べるとき、どこをそろえますか。",
        "choices": [
          "片方の端",
          "真ん中",
          "色"
        ],
        "correct": "片方の端",
        "explanation": "端をそろえると、どちらが長いか分かります。"
      },
      {
        "type": "choice",
        "prompt": "赤いひもは積み木5こ分、青いひもは4こ分です。長いのはどちらですか。",
        "choices": [
          "赤いひも",
          "青いひも",
          "同じ"
        ],
        "correct": "赤いひも",
        "explanation": "5こ分の方が長いです。"
      },
      {
        "type": "cloze",
        "prompt": "長さを比べます。",
        "clozeText": "片方の［　］をそろえます。",
        "blankChoices": [
          "端",
          "色",
          "太さ"
        ],
        "blankCorrect": "端",
        "explanation": "端をそろえて比べます。"
      }
    ]
  },
  {
    "id": "g1_07",
    "grade": 1,
    "unit": "量",
    "concept": "かさくらべ",
    "title": "かさを比べる方法",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "かさくらべについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "かさくらべの正しい説明を選びましょう。",
    "rubyText": "かさくらべについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "かさは、同じ大きさの入れ物がいくつ分入るかで比べられます。",
    "distractors": [
      "かさは、入れ物の色で比べます。",
      "かさは、長さだけで比べます。"
    ],
    "choices": [
      "かさは、同じ大きさの入れ物がいくつ分入るかで比べられます。",
      "かさは、入れ物の色で比べます。",
      "かさは、長さだけで比べます。"
    ],
    "blankPhrase": "同じ大きさの入れ物",
    "blankDistractors": [
      "ちがう大きさの入れ物",
      "色"
    ],
    "clozeText": "かさは、［　］がいくつ分入るかで比べられます。",
    "hint": "「かさくらべ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "Aは同じコップ4杯分、Bは3杯分です。かさが多いのはどちらですか。",
        "choices": [
          "A",
          "B",
          "同じ"
        ],
        "correct": "A",
        "explanation": "4杯分のAの方が多いです。"
      },
      {
        "type": "choice",
        "prompt": "かさを正しく比べるには、どんなコップを使いますか。",
        "choices": [
          "同じ大きさ",
          "大きさが違うもの",
          "色が同じだけ"
        ],
        "correct": "同じ大きさ",
        "explanation": "単位にする入れ物を同じにします。"
      },
      {
        "type": "cloze",
        "prompt": "かさを比べます。",
        "clozeText": "［　］が何杯分かを調べます。",
        "blankChoices": [
          "同じコップ",
          "違うコップ",
          "大きい箱"
        ],
        "blankCorrect": "同じコップ",
        "explanation": "同じコップを使います。"
      }
    ]
  },
  {
    "id": "g1_08",
    "grade": 1,
    "unit": "時刻",
    "concept": "時計",
    "title": "時計の長い針と短い針",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "時計について、正しく説明している文を選びましょう。",
    "simpleQuestion": "時計の正しい説明を選びましょう。",
    "rubyText": "時計について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "時計では、短い針がおよその時を、長い針が分を表します。",
    "distractors": [
      "長い針だけで時刻を全部表します。",
      "短い針は分だけを表します。"
    ],
    "choices": [
      "時計では、短い針がおよその時を、長い針が分を表します。",
      "長い針だけで時刻を全部表します。",
      "短い針は分だけを表します。"
    ],
    "blankPhrase": "短い針",
    "blankDistractors": [
      "秒針",
      "数字"
    ],
    "clozeText": "時計では、［　］がおよその時を、長い針が分を表します。",
    "hint": "「時計」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "短い針が3、長い針が12を指しています。何時ですか。",
        "choices": [
          "3時",
          "12時15分",
          "3時12分"
        ],
        "correct": "3時",
        "explanation": "長い針が12ならちょうど3時です。"
      },
      {
        "type": "choice",
        "prompt": "長い針が6を指すと、何分ですか。",
        "choices": [
          "30分",
          "6分",
          "60分"
        ],
        "correct": "30分",
        "explanation": "文字盤の6は30分です。"
      },
      {
        "type": "cloze",
        "prompt": "2時30分です。",
        "clozeText": "短い針は2と3の間、長い針は［　］を指します。",
        "blankChoices": [
          "6",
          "3",
          "12"
        ],
        "blankCorrect": "6",
        "explanation": "30分は長い針が6です。"
      }
    ]
  },
  {
    "id": "g1_09",
    "grade": 1,
    "unit": "図形",
    "concept": "三角形・四角形",
    "title": "形を辺の数で見る",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "三角形・四角形について、正しく説明している文を選びましょう。",
    "simpleQuestion": "三角形・四角形の正しい説明を選びましょう。",
    "rubyText": "三角形・四角形について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "三角形は辺が3本、四角形は辺が4本ある形です。",
    "distractors": [
      "三角形は辺が4本ある形です。",
      "四角形は辺が3本ある形です。"
    ],
    "choices": [
      "三角形は辺が3本、四角形は辺が4本ある形です。",
      "三角形は辺が4本ある形です。",
      "四角形は辺が3本ある形です。"
    ],
    "blankPhrase": "辺が3本",
    "blankDistractors": [
      "角が1つ",
      "辺が5本"
    ],
    "clozeText": "三角形は［　］、四角形は辺が4本ある形です。",
    "hint": "「三角形・四角形」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "辺が3本ある形は何ですか。",
        "choices": [
          "三角形",
          "四角形",
          "円"
        ],
        "correct": "三角形",
        "explanation": "三角形です。"
      },
      {
        "type": "choice",
        "prompt": "辺が4本ある形は何ですか。",
        "choices": [
          "四角形",
          "三角形",
          "円"
        ],
        "correct": "四角形",
        "explanation": "四角形です。"
      },
      {
        "type": "cloze",
        "prompt": "形の名前を答えます。",
        "clozeText": "辺が［　］本ある形を三角形といいます。",
        "blankChoices": [
          "3",
          "4",
          "0"
        ],
        "blankCorrect": "3",
        "explanation": "三角形の辺は3本です。"
      }
    ]
  },
  {
    "id": "g1_10",
    "grade": 1,
    "unit": "数",
    "concept": "大きさくらべ",
    "title": "数の大きさを比べる",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "大きさくらべについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "大きさくらべの正しい説明を選びましょう。",
    "rubyText": "大きさくらべについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "数の大きさは、数直線では右にある数ほど大きくなります。",
    "distractors": [
      "数直線では左にある数ほど大きくなります。",
      "数の色で大きさが決まります。"
    ],
    "choices": [
      "数の大きさは、数直線では右にある数ほど大きくなります。",
      "数直線では左にある数ほど大きくなります。",
      "数の色で大きさが決まります。"
    ],
    "blankPhrase": "右にある数",
    "blankDistractors": [
      "左にある数",
      "上にある数"
    ],
    "clozeText": "数の大きさは、数直線では［　］ほど大きくなります。",
    "hint": "「大きさくらべ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "7と9では、どちらが大きいですか。",
        "choices": [
          "9",
          "7",
          "同じ"
        ],
        "correct": "9",
        "explanation": "9の方が数直線で右にあります。"
      },
      {
        "type": "choice",
        "prompt": "12と8では、どちらが小さいですか。",
        "choices": [
          "8",
          "12",
          "20"
        ],
        "correct": "8",
        "explanation": "8の方が小さいです。"
      },
      {
        "type": "cloze",
        "prompt": "数を比べます。",
        "clozeText": "数直線で右にある数ほど［　］です。",
        "blankChoices": [
          "大きい",
          "小さい",
          "同じ"
        ],
        "blankCorrect": "大きい",
        "explanation": "右に進むほど数は大きくなります。"
      }
    ]
  },
  {
    "id": "g2_01",
    "grade": 2,
    "unit": "数",
    "concept": "位",
    "title": "位取りのしくみ",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "位について、正しく説明している文を選びましょう。",
    "simpleQuestion": "位の正しい説明を選びましょう。",
    "rubyText": "位について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "数字の位置によって、一の位、十の位、百の位など表す大きさが決まります。",
    "distractors": [
      "数字はどの位置でも同じ大きさを表します。",
      "位は数字の色で決まります。"
    ],
    "choices": [
      "数字の位置によって、一の位、十の位、百の位など表す大きさが決まります。",
      "数字はどの位置でも同じ大きさを表します。",
      "位は数字の色で決まります。"
    ],
    "blankPhrase": "数字の位置",
    "blankDistractors": [
      "数字の形",
      "数字の色"
    ],
    "clozeText": "［　］によって、一の位、十の位、百の位など表す大きさが決まります。",
    "hint": "「位」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "352の十の位の数字は何ですか。",
        "choices": [
          "5",
          "3",
          "2"
        ],
        "correct": "5",
        "explanation": "352では5が十の位です。"
      },
      {
        "type": "cloze",
        "prompt": "数を完成させましょう。",
        "clozeText": "百が4、十が2、一が7で［　］",
        "blankChoices": [
          "427",
          "247",
          "47"
        ],
        "blankCorrect": "427",
        "explanation": "400＋20＋7＝427です。"
      },
      {
        "type": "choice",
        "prompt": "608の百の位の数字は何ですか。",
        "choices": [
          "6",
          "0",
          "8"
        ],
        "correct": "6",
        "explanation": "608の6は百の位です。"
      }
    ]
  },
  {
    "id": "g2_02",
    "grade": 2,
    "unit": "たし算とひき算",
    "concept": "たし算のひっ算",
    "title": "たし算のひっ算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "たし算のひっ算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "たし算のひっ算の正しい説明を選びましょう。",
    "rubyText": "たし算のひっ算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "たし算のひっ算は、同じ位の数字を縦にそろえて計算します。",
    "distractors": [
      "たし算のひっ算は、数字を左端にそろえます。",
      "違う位どうしを先に足します。"
    ],
    "choices": [
      "たし算のひっ算は、同じ位の数字を縦にそろえて計算します。",
      "たし算のひっ算は、数字を左端にそろえます。",
      "違う位どうしを先に足します。"
    ],
    "blankPhrase": "同じ位",
    "blankDistractors": [
      "違う位",
      "大きい数字"
    ],
    "clozeText": "たし算のひっ算は、［　］の数字を縦にそろえて計算します。",
    "hint": "「たし算のひっ算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "23＋45をひっ算するとき、一の位どうしはどれですか。",
        "choices": [
          "3と5",
          "2と4",
          "3と4"
        ],
        "correct": "3と5",
        "explanation": "同じ位の3と5を足します。"
      },
      {
        "type": "choice",
        "prompt": "27＋36はいくつですか。",
        "choices": [
          "63",
          "53",
          "513"
        ],
        "correct": "63",
        "explanation": "7＋6＝13で繰り上げ、2＋3＋1＝6です。"
      },
      {
        "type": "cloze",
        "prompt": "ひっ算のしかたです。",
        "clozeText": "一の位、十の位を縦に［　］ます。",
        "blankChoices": [
          "そろえ",
          "入れかえ",
          "離し"
        ],
        "blankCorrect": "そろえ",
        "explanation": "同じ位をそろえます。"
      }
    ]
  },
  {
    "id": "g2_03",
    "grade": 2,
    "unit": "たし算とひき算",
    "concept": "くり下がり",
    "title": "ひき算のくり下がり",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "くり下がりについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "くり下がりの正しい説明を選びましょう。",
    "rubyText": "くり下がりについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "一の位で引けないときは、十の位から1くり下げて10として使います。",
    "distractors": [
      "一の位で引けないときは答えを0にします。",
      "十の位から10くり下げます。"
    ],
    "choices": [
      "一の位で引けないときは、十の位から1くり下げて10として使います。",
      "一の位で引けないときは答えを0にします。",
      "十の位から10くり下げます。"
    ],
    "blankPhrase": "十の位から1",
    "blankDistractors": [
      "一の位から1",
      "百の位から10"
    ],
    "clozeText": "一の位で引けないときは、［　］くり下げて10として使います。",
    "hint": "「くり下がり」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "42－18はいくつですか。",
        "choices": [
          "24",
          "34",
          "60"
        ],
        "correct": "24",
        "explanation": "12－8＝4、3－1＝2で24です。"
      },
      {
        "type": "cloze",
        "prompt": "52－27を計算します。",
        "clozeText": "一の位で2－7ができないので、十の位から［　］くり下げます。",
        "blankChoices": [
          "1",
          "2",
          "10"
        ],
        "blankCorrect": "1",
        "explanation": "十の位の1は一の位の10になります。"
      },
      {
        "type": "choice",
        "prompt": "70－36はいくつですか。",
        "choices": [
          "34",
          "44",
          "106"
        ],
        "correct": "34",
        "explanation": "10－6＝4、6－3＝3です。"
      }
    ]
  },
  {
    "id": "g2_04",
    "grade": 2,
    "unit": "かけ算",
    "concept": "かけ算",
    "title": "かけ算の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "かけ算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "かけ算の正しい説明を選びましょう。",
    "rubyText": "かけ算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "かけ算は、同じ数ずつあるものがいくつ分かあるときの全部の数を求める計算です。",
    "distractors": [
      "かけ算は、違う数を一つずつ引く計算です。",
      "かけ算は、二つの数の差だけを求めます。"
    ],
    "choices": [
      "かけ算は、同じ数ずつあるものがいくつ分かあるときの全部の数を求める計算です。",
      "かけ算は、違う数を一つずつ引く計算です。",
      "かけ算は、二つの数の差だけを求めます。"
    ],
    "blankPhrase": "同じ数ずつ",
    "blankDistractors": [
      "違う数ずつ",
      "一つだけ"
    ],
    "clozeText": "かけ算は、［　］あるものがいくつ分かあるときの全部の数を求める計算です。",
    "hint": "「かけ算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "3こずつの皿が4皿あります。全部で何こですか。",
        "choices": [
          "12こ",
          "7こ",
          "1こ"
        ],
        "correct": "12こ",
        "explanation": "3×4＝12です。"
      },
      {
        "type": "cloze",
        "prompt": "式を完成させましょう。",
        "clozeText": "5こずつ2組は、5×2＝［　］こ",
        "blankChoices": [
          "10",
          "7",
          "3"
        ],
        "blankCorrect": "10",
        "explanation": "5が2つ分で10です。"
      },
      {
        "type": "choice",
        "prompt": "2×6をたし算で表したものはどれですか。",
        "choices": [
          "2＋2＋2＋2＋2＋2",
          "2＋6",
          "6－2"
        ],
        "correct": "2＋2＋2＋2＋2＋2",
        "explanation": "2が6つ分です。"
      }
    ]
  },
  {
    "id": "g2_05",
    "grade": 2,
    "unit": "かけ算",
    "concept": "九九",
    "title": "九九の使い方",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "九九について、正しく説明している文を選びましょう。",
    "simpleQuestion": "九九の正しい説明を選びましょう。",
    "rubyText": "九九について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "九九は、1から9までの数のかけ算の答えをすばやく求めるための表です。",
    "distractors": [
      "九九は、たし算だけを並べた表です。",
      "九九は、数の順番だけを覚える表です。"
    ],
    "choices": [
      "九九は、1から9までの数のかけ算の答えをすばやく求めるための表です。",
      "九九は、たし算だけを並べた表です。",
      "九九は、数の順番だけを覚える表です。"
    ],
    "blankPhrase": "かけ算の答え",
    "blankDistractors": [
      "ひき算の答え",
      "時刻"
    ],
    "clozeText": "九九は、1から9までの数の［　］をすばやく求めるための表です。",
    "hint": "「九九」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "6×7はいくつですか。",
        "choices": [
          "42",
          "13",
          "36"
        ],
        "correct": "42",
        "explanation": "六七42です。"
      },
      {
        "type": "choice",
        "prompt": "8×4はいくつですか。",
        "choices": [
          "32",
          "12",
          "84"
        ],
        "correct": "32",
        "explanation": "八四32です。"
      },
      {
        "type": "cloze",
        "prompt": "九九を完成させましょう。",
        "clozeText": "9×5＝［　］",
        "blankChoices": [
          "45",
          "14",
          "40"
        ],
        "blankCorrect": "45",
        "explanation": "九五45です。"
      }
    ]
  },
  {
    "id": "g2_06",
    "grade": 2,
    "unit": "数",
    "concept": "1000",
    "title": "1000までの数",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "1000について、正しく説明している文を選びましょう。",
    "simpleQuestion": "1000の正しい説明を選びましょう。",
    "rubyText": "1000について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "1000は、100が10こ集まった数です。",
    "distractors": [
      "1000は、10が10こ集まった数です。",
      "1000は、100が1こだけの数です。"
    ],
    "choices": [
      "1000は、100が10こ集まった数です。",
      "1000は、10が10こ集まった数です。",
      "1000は、100が1こだけの数です。"
    ],
    "blankPhrase": "100が10こ",
    "blankDistractors": [
      "10が10こ",
      "100が5こ"
    ],
    "clozeText": "1000は、［　］集まった数です。",
    "hint": "「1000」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "100が7こでいくつですか。",
        "choices": [
          "700",
          "70",
          "107"
        ],
        "correct": "700",
        "explanation": "100×7＝700です。"
      },
      {
        "type": "cloze",
        "prompt": "数を完成させましょう。",
        "clozeText": "900に100を足すと［　］",
        "blankChoices": [
          "1000",
          "910",
          "100"
        ],
        "blankCorrect": "1000",
        "explanation": "900＋100＝1000です。"
      },
      {
        "type": "choice",
        "prompt": "1000より1小さい数は何ですか。",
        "choices": [
          "999",
          "1001",
          "990"
        ],
        "correct": "999",
        "explanation": "1000－1＝999です。"
      }
    ]
  },
  {
    "id": "g2_07",
    "grade": 2,
    "unit": "長さ",
    "concept": "cmとm",
    "title": "長さの単位",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "cmとmについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "cmとmの正しい説明を選びましょう。",
    "rubyText": "cmとmについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "1mは100cmです。長いものはm、短いものはcmで表すと便利です。",
    "distractors": [
      "1mは10cmです。",
      "1cmは100mです。"
    ],
    "choices": [
      "1mは100cmです。長いものはm、短いものはcmで表すと便利です。",
      "1mは10cmです。",
      "1cmは100mです。"
    ],
    "blankPhrase": "100cm",
    "blankDistractors": [
      "10cm",
      "1000cm"
    ],
    "clozeText": "1mは［　］です。長いものはm、短いものはcmで表すと便利です。",
    "hint": "「cmとm」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2mは何cmですか。",
        "choices": [
          "200cm",
          "20cm",
          "102cm"
        ],
        "correct": "200cm",
        "explanation": "1m＝100cmなので200cmです。"
      },
      {
        "type": "cloze",
        "prompt": "単位をそろえます。",
        "clozeText": "1m30cm＝［　］cm",
        "blankChoices": [
          "130",
          "31",
          "1030"
        ],
        "blankCorrect": "130",
        "explanation": "100cm＋30cm＝130cmです。"
      },
      {
        "type": "choice",
        "prompt": "教室の横の長さを表すのに適した単位はどれですか。",
        "choices": [
          "m",
          "cm",
          "mL"
        ],
        "correct": "m",
        "explanation": "教室は長いのでmが適しています。"
      }
    ]
  },
  {
    "id": "g2_08",
    "grade": 2,
    "unit": "かさ",
    "concept": "LとdL",
    "title": "かさの単位",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "LとdLについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "LとdLの正しい説明を選びましょう。",
    "rubyText": "LとdLについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "1Lは10dLです。入れ物に入る水などのかさを表します。",
    "distractors": [
      "1Lは100dLです。",
      "Lは長さを表す単位です。"
    ],
    "choices": [
      "1Lは10dLです。入れ物に入る水などのかさを表します。",
      "1Lは100dLです。",
      "Lは長さを表す単位です。"
    ],
    "blankPhrase": "10dL",
    "blankDistractors": [
      "100dL",
      "1dL"
    ],
    "clozeText": "1Lは［　］です。入れ物に入る水などのかさを表します。",
    "hint": "「LとdL」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "3Lは何dLですか。",
        "choices": [
          "30dL",
          "3dL",
          "300dL"
        ],
        "correct": "30dL",
        "explanation": "1L＝10dLなので30dLです。"
      },
      {
        "type": "cloze",
        "prompt": "単位をそろえます。",
        "clozeText": "2L5dL＝［　］dL",
        "blankChoices": [
          "25",
          "7",
          "205"
        ],
        "blankCorrect": "25",
        "explanation": "20dL＋5dL＝25dLです。"
      },
      {
        "type": "choice",
        "prompt": "牛乳パックのかさを表すのに適した単位はどれですか。",
        "choices": [
          "L",
          "m",
          "cm"
        ],
        "correct": "L",
        "explanation": "かさはLなどで表します。"
      }
    ]
  },
  {
    "id": "g2_09",
    "grade": 2,
    "unit": "時間",
    "concept": "時刻と時間",
    "title": "時刻と時間の違い",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "時刻と時間について、正しく説明している文を選びましょう。",
    "simpleQuestion": "時刻と時間の正しい説明を選びましょう。",
    "rubyText": "時刻と時間について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "時刻はある瞬間を表し、時間は始まりから終わりまでの長さを表します。",
    "distractors": [
      "時刻と時間はいつも同じ意味です。",
      "時間は時計の数字だけを表します。"
    ],
    "choices": [
      "時刻はある瞬間を表し、時間は始まりから終わりまでの長さを表します。",
      "時刻と時間はいつも同じ意味です。",
      "時間は時計の数字だけを表します。"
    ],
    "blankPhrase": "始まりから終わりまでの長さ",
    "blankDistractors": [
      "場所",
      "人数"
    ],
    "clozeText": "時刻はある瞬間を表し、時間は［　］を表します。",
    "hint": "「時刻と時間」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "午前9時から午前10時30分までの時間はどれですか。",
        "choices": [
          "1時間30分",
          "10時間30分",
          "30分"
        ],
        "correct": "1時間30分",
        "explanation": "9時から10時で1時間、さらに30分です。"
      },
      {
        "type": "choice",
        "prompt": "『学校に着いたのは8時』は時刻と時間のどちらですか。",
        "choices": [
          "時刻",
          "時間",
          "長さ"
        ],
        "correct": "時刻",
        "explanation": "ある瞬間なので時刻です。"
      },
      {
        "type": "cloze",
        "prompt": "言葉を選びます。",
        "clozeText": "始まりから終わりまでの長さを［　］といいます。",
        "blankChoices": [
          "時間",
          "時刻",
          "長さ"
        ],
        "blankCorrect": "時間",
        "explanation": "時間を表しています。"
      }
    ]
  },
  {
    "id": "g2_10",
    "grade": 2,
    "unit": "図形",
    "concept": "直角",
    "title": "直角と長方形",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "直角について、正しく説明している文を選びましょう。",
    "simpleQuestion": "直角の正しい説明を選びましょう。",
    "rubyText": "直角について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "直角は、正方形や長方形の角と同じ形の角です。",
    "distractors": [
      "直角は、どんな角でも同じです。",
      "直角は、必ず丸い形です。"
    ],
    "choices": [
      "直角は、正方形や長方形の角と同じ形の角です。",
      "直角は、どんな角でも同じです。",
      "直角は、必ず丸い形です。"
    ],
    "blankPhrase": "正方形や長方形の角",
    "blankDistractors": [
      "円のまわり",
      "線の長さ"
    ],
    "clozeText": "直角は、［　］と同じ形の角です。",
    "hint": "「直角」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "長方形の角は全部何という角ですか。",
        "choices": [
          "直角",
          "鋭角",
          "円"
        ],
        "correct": "直角",
        "explanation": "長方形の4つの角は直角です。"
      },
      {
        "type": "choice",
        "prompt": "長方形の辺はどのようになっていますか。",
        "choices": [
          "向かい合う辺の長さが同じ",
          "4辺の長さが必ず全部同じ",
          "辺が3本"
        ],
        "correct": "向かい合う辺の長さが同じ",
        "explanation": "向かい合う辺が同じ長さです。"
      },
      {
        "type": "cloze",
        "prompt": "形の特徴です。",
        "clozeText": "正方形には直角が［　］こあります。",
        "blankChoices": [
          "4",
          "3",
          "2"
        ],
        "blankCorrect": "4",
        "explanation": "正方形の4つの角は直角です。"
      }
    ]
  },
  {
    "id": "g3_01",
    "grade": 3,
    "unit": "わり算",
    "concept": "わり算",
    "title": "わり算の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "わり算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "わり算の正しい説明を選びましょう。",
    "rubyText": "わり算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "わり算は、同じ数ずつ分けるときや、いくつ分あるかを求める計算です。",
    "distractors": [
      "わり算は、全部を合わせる計算です。",
      "わり算は、同じ数を何回も足すだけの計算です。"
    ],
    "choices": [
      "わり算は、同じ数ずつ分けるときや、いくつ分あるかを求める計算です。",
      "わり算は、全部を合わせる計算です。",
      "わり算は、同じ数を何回も足すだけの計算です。"
    ],
    "blankPhrase": "同じ数ずつ分ける",
    "blankDistractors": [
      "全部を合わせる",
      "大きい順に並べる"
    ],
    "clozeText": "わり算は、［　］ときや、いくつ分あるかを求める計算です。",
    "hint": "「わり算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "12このあめを3人に同じ数ずつ分けます。1人分は何こですか。",
        "choices": [
          "4こ",
          "9こ",
          "36こ"
        ],
        "correct": "4こ",
        "explanation": "12÷3＝4です。"
      },
      {
        "type": "choice",
        "prompt": "15の中に5はいくつ分ありますか。",
        "choices": [
          "3つ分",
          "10つ分",
          "75つ分"
        ],
        "correct": "3つ分",
        "explanation": "15÷5＝3です。"
      },
      {
        "type": "cloze",
        "prompt": "式を完成させましょう。",
        "clozeText": "18÷6＝［　］",
        "blankChoices": [
          "3",
          "12",
          "108"
        ],
        "blankCorrect": "3",
        "explanation": "6が3つ分で18です。"
      }
    ]
  },
  {
    "id": "g3_02",
    "grade": 3,
    "unit": "わり算",
    "concept": "あまり",
    "title": "あまりのあるわり算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "あまりについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "あまりの正しい説明を選びましょう。",
    "rubyText": "あまりについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "同じ数ずつ分けて残った数をあまりといい、あまりは割る数より小さくします。",
    "distractors": [
      "あまりは割る数より大きくします。",
      "あまりはいつも割る数と同じです。"
    ],
    "choices": [
      "同じ数ずつ分けて残った数をあまりといい、あまりは割る数より小さくします。",
      "あまりは割る数より大きくします。",
      "あまりはいつも割る数と同じです。"
    ],
    "blankPhrase": "割る数より小さく",
    "blankDistractors": [
      "割る数より大きく",
      "答えと同じに"
    ],
    "clozeText": "同じ数ずつ分けて残った数をあまりといい、あまりは［　］します。",
    "hint": "「あまり」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "17÷5の答えはどれですか。",
        "choices": [
          "3あまり2",
          "2あまり7",
          "4あまり3"
        ],
        "correct": "3あまり2",
        "explanation": "5×3＝15で2余ります。"
      },
      {
        "type": "cloze",
        "prompt": "あまりを確かめます。",
        "clozeText": "23÷4＝5あまり［　］",
        "blankChoices": [
          "3",
          "4",
          "5"
        ],
        "blankCorrect": "3",
        "explanation": "4×5＝20で3余ります。"
      },
      {
        "type": "choice",
        "prompt": "次のうち正しい答えはどれですか。",
        "choices": [
          "14÷4＝3あまり2",
          "14÷4＝2あまり6",
          "14÷4＝4あまり2"
        ],
        "correct": "14÷4＝3あまり2",
        "explanation": "あまりは4より小さい2です。"
      }
    ]
  },
  {
    "id": "g3_03",
    "grade": 3,
    "unit": "かけ算",
    "concept": "かけ算の筆算",
    "title": "かけ算の筆算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "かけ算の筆算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "かけ算の筆算の正しい説明を選びましょう。",
    "rubyText": "かけ算の筆算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "かけ算の筆算は、一の位から順にかけ、繰り上がりを次の位に加えます。",
    "distractors": [
      "十の位だけをかけます。",
      "位をそろえずに計算します。"
    ],
    "choices": [
      "かけ算の筆算は、一の位から順にかけ、繰り上がりを次の位に加えます。",
      "十の位だけをかけます。",
      "位をそろえずに計算します。"
    ],
    "blankPhrase": "一の位から順に",
    "blankDistractors": [
      "百の位だけ",
      "左から適当に"
    ],
    "clozeText": "かけ算の筆算は、［　］かけ、繰り上がりを次の位に加えます。",
    "hint": "「かけ算の筆算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "23×3はいくつですか。",
        "choices": [
          "69",
          "26",
          "609"
        ],
        "correct": "69",
        "explanation": "3×3＝9、20×3＝60で69です。"
      },
      {
        "type": "cloze",
        "prompt": "筆算を考えます。",
        "clozeText": "47×2＝［　］",
        "blankChoices": [
          "94",
          "49",
          "84"
        ],
        "blankCorrect": "94",
        "explanation": "7×2＝14、4×2＋1＝9です。"
      },
      {
        "type": "choice",
        "prompt": "105×4はいくつですか。",
        "choices": [
          "420",
          "109",
          "405"
        ],
        "correct": "420",
        "explanation": "100×4＋5×4＝420です。"
      }
    ]
  },
  {
    "id": "g3_04",
    "grade": 3,
    "unit": "分数",
    "concept": "分数",
    "title": "分数の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "分数について、正しく説明している文を選びましょう。",
    "simpleQuestion": "分数の正しい説明を選びましょう。",
    "rubyText": "分数について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "分数は、1を同じ大きさに分けたうちのいくつ分かを表します。",
    "distractors": [
      "分数は、いつも1より大きい数だけを表します。",
      "分数は、分け方が違っても同じです。"
    ],
    "choices": [
      "分数は、1を同じ大きさに分けたうちのいくつ分かを表します。",
      "分数は、いつも1より大きい数だけを表します。",
      "分数は、分け方が違っても同じです。"
    ],
    "blankPhrase": "同じ大きさに分けた",
    "blankDistractors": [
      "違う大きさに分けた",
      "二つ足した"
    ],
    "clozeText": "分数は、1を［　］うちのいくつ分かを表します。",
    "hint": "「分数」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "1を4等分した1つ分はどれですか。",
        "choices": [
          "4分の1",
          "1分の4",
          "4"
        ],
        "correct": "4分の1",
        "explanation": "4つに分けた1つなので4分の1です。"
      },
      {
        "type": "choice",
        "prompt": "4分の3は、4等分したいくつ分ですか。",
        "choices": [
          "3つ分",
          "4つ分",
          "1つ分"
        ],
        "correct": "3つ分",
        "explanation": "分子3がいくつ分かを表します。"
      },
      {
        "type": "cloze",
        "prompt": "分数を完成させます。",
        "clozeText": "1を8等分した5つ分は［　］",
        "blankChoices": [
          "8分の5",
          "5分の8",
          "8"
        ],
        "blankCorrect": "8分の5",
        "explanation": "8分の5です。"
      }
    ]
  },
  {
    "id": "g3_05",
    "grade": 3,
    "unit": "小数",
    "concept": "小数",
    "title": "小数の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "小数について、正しく説明している文を選びましょう。",
    "simpleQuestion": "小数の正しい説明を選びましょう。",
    "rubyText": "小数について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "小数は、1より小さいはしたの量を0.1などを使って表せる数です。",
    "distractors": [
      "小数は、整数だけを表します。",
      "0.1は10と同じ大きさです。"
    ],
    "choices": [
      "小数は、1より小さいはしたの量を0.1などを使って表せる数です。",
      "小数は、整数だけを表します。",
      "0.1は10と同じ大きさです。"
    ],
    "blankPhrase": "1より小さいはした",
    "blankDistractors": [
      "100より大きい数",
      "時刻"
    ],
    "clozeText": "小数は、［　］の量を0.1などを使って表せる数です。",
    "hint": "「小数」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "0.1が7こ集まった数はどれですか。",
        "choices": [
          "0.7",
          "7",
          "0.07"
        ],
        "correct": "0.7",
        "explanation": "0.1×7＝0.7です。"
      },
      {
        "type": "cloze",
        "prompt": "小数を完成させます。",
        "clozeText": "1.3は1と0.1が［　］こです。",
        "blankChoices": [
          "3",
          "13",
          "1"
        ],
        "blankCorrect": "3",
        "explanation": "0.3は0.1が3こです。"
      },
      {
        "type": "choice",
        "prompt": "2.5と2.3ではどちらが大きいですか。",
        "choices": [
          "2.5",
          "2.3",
          "同じ"
        ],
        "correct": "2.5",
        "explanation": "一の位は同じで、十分の位5の方が大きいです。"
      }
    ]
  },
  {
    "id": "g3_06",
    "grade": 3,
    "unit": "重さ",
    "concept": "gとkg",
    "title": "重さの単位",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "gとkgについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "gとkgの正しい説明を選びましょう。",
    "rubyText": "gとkgについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "1kgは1000gです。軽いものはg、重いものはkgで表すと便利です。",
    "distractors": [
      "1kgは100gです。",
      "gは長さを表す単位です。"
    ],
    "choices": [
      "1kgは1000gです。軽いものはg、重いものはkgで表すと便利です。",
      "1kgは100gです。",
      "gは長さを表す単位です。"
    ],
    "blankPhrase": "1000g",
    "blankDistractors": [
      "100g",
      "10g"
    ],
    "clozeText": "1kgは［　］です。軽いものはg、重いものはkgで表すと便利です。",
    "hint": "「gとkg」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2kgは何gですか。",
        "choices": [
          "2000g",
          "200g",
          "1020g"
        ],
        "correct": "2000g",
        "explanation": "1kg＝1000gなので2000gです。"
      },
      {
        "type": "cloze",
        "prompt": "単位をそろえます。",
        "clozeText": "1kg300g＝［　］g",
        "blankChoices": [
          "1300",
          "103",
          "1003"
        ],
        "blankCorrect": "1300",
        "explanation": "1000＋300＝1300gです。"
      },
      {
        "type": "choice",
        "prompt": "ランドセルの重さを表すのに適した単位はどれですか。",
        "choices": [
          "kg",
          "m",
          "L"
        ],
        "correct": "kg",
        "explanation": "重さなのでkgが適しています。"
      }
    ]
  },
  {
    "id": "g3_07",
    "grade": 3,
    "unit": "図形",
    "concept": "円",
    "title": "円の中心・半径・直径",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "円について、正しく説明している文を選びましょう。",
    "simpleQuestion": "円の正しい説明を選びましょう。",
    "rubyText": "円について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "円の中心から円周までの長さを半径といい、直径は半径の2倍です。",
    "distractors": [
      "直径は半径の半分です。",
      "半径は円周の長さです。"
    ],
    "choices": [
      "円の中心から円周までの長さを半径といい、直径は半径の2倍です。",
      "直径は半径の半分です。",
      "半径は円周の長さです。"
    ],
    "blankPhrase": "半径の2倍",
    "blankDistractors": [
      "半径の半分",
      "半径と同じ"
    ],
    "clozeText": "円の中心から円周までの長さを半径といい、直径は［　］です。",
    "hint": "「円」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "半径が4cmの円の直径は何cmですか。",
        "choices": [
          "8cm",
          "4cm",
          "2cm"
        ],
        "correct": "8cm",
        "explanation": "直径は半径の2倍です。"
      },
      {
        "type": "cloze",
        "prompt": "円の言葉です。",
        "clozeText": "中心から円周までの長さを［　］といいます。",
        "blankChoices": [
          "半径",
          "直径",
          "円周"
        ],
        "blankCorrect": "半径",
        "explanation": "半径です。"
      },
      {
        "type": "choice",
        "prompt": "直径が10cmの円の半径は何cmですか。",
        "choices": [
          "5cm",
          "20cm",
          "10cm"
        ],
        "correct": "5cm",
        "explanation": "直径の半分が半径です。"
      }
    ]
  },
  {
    "id": "g3_08",
    "grade": 3,
    "unit": "表とグラフ",
    "concept": "棒グラフ",
    "title": "棒グラフの読み方",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "棒グラフについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "棒グラフの正しい説明を選びましょう。",
    "rubyText": "棒グラフについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "棒グラフは、棒の長さで数量の大きさを比べるグラフです。",
    "distractors": [
      "棒グラフは、角の大きさを比べます。",
      "棒の色だけで数量を表します。"
    ],
    "choices": [
      "棒グラフは、棒の長さで数量の大きさを比べるグラフです。",
      "棒グラフは、角の大きさを比べます。",
      "棒の色だけで数量を表します。"
    ],
    "blankPhrase": "棒の長さ",
    "blankDistractors": [
      "棒の色",
      "文字の数"
    ],
    "clozeText": "棒グラフは、［　］で数量の大きさを比べるグラフです。",
    "hint": "「棒グラフ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "棒グラフで数量が最も多いのはどれですか。",
        "choices": [
          "いちばん長い棒",
          "いちばん短い棒",
          "色が濃い棒"
        ],
        "correct": "いちばん長い棒",
        "explanation": "棒の長さが数量を表します。"
      },
      {
        "type": "cloze",
        "prompt": "グラフを読みます。",
        "clozeText": "1目盛りが2人で、棒が4目盛りなら［　］人です。",
        "blankChoices": [
          "8",
          "6",
          "4"
        ],
        "blankCorrect": "8",
        "explanation": "2×4＝8人です。"
      },
      {
        "type": "choice",
        "prompt": "Aが10、Bが7のとき、AはBよりいくつ多いですか。",
        "choices": [
          "3",
          "17",
          "7"
        ],
        "correct": "3",
        "explanation": "10－7＝3です。"
      }
    ]
  },
  {
    "id": "g3_09",
    "grade": 3,
    "unit": "数量関係",
    "concept": "倍",
    "title": "倍の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "倍について、正しく説明している文を選びましょう。",
    "simpleQuestion": "倍の正しい説明を選びましょう。",
    "rubyText": "倍について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "倍は、ある量がもとにする量のいくつ分にあたるかを表します。",
    "distractors": [
      "倍は、二つの量の差だけを表します。",
      "倍は、全部を足した数です。"
    ],
    "choices": [
      "倍は、ある量がもとにする量のいくつ分にあたるかを表します。",
      "倍は、二つの量の差だけを表します。",
      "倍は、全部を足した数です。"
    ],
    "blankPhrase": "いくつ分",
    "blankDistractors": [
      "いくつ少ないか",
      "合計"
    ],
    "clozeText": "倍は、ある量がもとにする量の［　］にあたるかを表します。",
    "hint": "「倍」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "3cmの4倍は何cmですか。",
        "choices": [
          "12cm",
          "7cm",
          "1cm"
        ],
        "correct": "12cm",
        "explanation": "3×4＝12です。"
      },
      {
        "type": "choice",
        "prompt": "18は6の何倍ですか。",
        "choices": [
          "3倍",
          "12倍",
          "24倍"
        ],
        "correct": "3倍",
        "explanation": "18÷6＝3です。"
      },
      {
        "type": "cloze",
        "prompt": "倍を求めます。",
        "clozeText": "比べる量÷もとにする量＝［　］",
        "blankChoices": [
          "何倍",
          "合計",
          "差"
        ],
        "blankCorrect": "何倍",
        "explanation": "割り算で何倍かを求めます。"
      }
    ]
  },
  {
    "id": "g3_10",
    "grade": 3,
    "unit": "式",
    "concept": "等号",
    "title": "等号の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "等号について、正しく説明している文を選びましょう。",
    "simpleQuestion": "等号の正しい説明を選びましょう。",
    "rubyText": "等号について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "等号は、左側と右側の数量が同じであることを表します。",
    "distractors": [
      "等号は、左側の方が大きいことを表します。",
      "等号は、計算を終わらせるだけの記号です。"
    ],
    "choices": [
      "等号は、左側と右側の数量が同じであることを表します。",
      "等号は、左側の方が大きいことを表します。",
      "等号は、計算を終わらせるだけの記号です。"
    ],
    "blankPhrase": "同じである",
    "blankDistractors": [
      "左が大きい",
      "右が小さい"
    ],
    "clozeText": "等号は、左側と右側の数量が［　］ことを表します。",
    "hint": "「等号」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "□＋3＝8の□はいくつですか。",
        "choices": [
          "5",
          "11",
          "3"
        ],
        "correct": "5",
        "explanation": "5＋3＝8です。"
      },
      {
        "type": "choice",
        "prompt": "次のうち正しい式はどれですか。",
        "choices": [
          "4＋5＝6＋3",
          "4＋5＝10",
          "8－2＝8＋2"
        ],
        "correct": "4＋5＝6＋3",
        "explanation": "両辺とも9です。"
      },
      {
        "type": "cloze",
        "prompt": "等号の意味です。",
        "clozeText": "＝の左右は数量が［　］です。",
        "blankChoices": [
          "同じ",
          "必ず違う",
          "0"
        ],
        "blankCorrect": "同じ",
        "explanation": "等号は等しいことを表します。"
      }
    ]
  },
  {
    "id": "g4_01",
    "grade": 4,
    "unit": "大きな数",
    "concept": "億・兆",
    "title": "大きな数の位",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "億・兆について、正しく説明している文を選びましょう。",
    "simpleQuestion": "億・兆の正しい説明を選びましょう。",
    "rubyText": "億・兆について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "大きな数は、四けたごとに万、億、兆と区切ると読みやすくなります。",
    "distractors": [
      "大きな数は、三けたごとに万、億、兆と区切ります。",
      "億は万より小さい単位です。"
    ],
    "choices": [
      "大きな数は、四けたごとに万、億、兆と区切ると読みやすくなります。",
      "大きな数は、三けたごとに万、億、兆と区切ります。",
      "億は万より小さい単位です。"
    ],
    "blankPhrase": "四けたごと",
    "blankDistractors": [
      "二けたごと",
      "六けたごと"
    ],
    "clozeText": "大きな数は、［　］に万、億、兆と区切ると読みやすくなります。",
    "hint": "「億・兆」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "1億は1万の何倍ですか。",
        "choices": [
          "10000倍",
          "100倍",
          "10倍"
        ],
        "correct": "10000倍",
        "explanation": "1億＝10000万です。"
      },
      {
        "type": "cloze",
        "prompt": "数を読みます。",
        "clozeText": "300000000は［　］億です。",
        "blankChoices": [
          "3",
          "30",
          "300"
        ],
        "blankCorrect": "3",
        "explanation": "3億です。"
      },
      {
        "type": "choice",
        "prompt": "1兆は1億がいくつ集まった数ですか。",
        "choices": [
          "10000",
          "100",
          "10"
        ],
        "correct": "10000",
        "explanation": "1兆＝10000億です。"
      }
    ]
  },
  {
    "id": "g4_02",
    "grade": 4,
    "unit": "概数",
    "concept": "四捨五入",
    "title": "四捨五入の方法",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "四捨五入について、正しく説明している文を選びましょう。",
    "simpleQuestion": "四捨五入の正しい説明を選びましょう。",
    "rubyText": "四捨五入について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "四捨五入は、求める位の一つ下の位が0から4なら切り捨て、5から9なら切り上げます。",
    "distractors": [
      "0から4を切り上げ、5から9を切り捨てます。",
      "どの数字でも必ず切り捨てます。"
    ],
    "choices": [
      "四捨五入は、求める位の一つ下の位が0から4なら切り捨て、5から9なら切り上げます。",
      "0から4を切り上げ、5から9を切り捨てます。",
      "どの数字でも必ず切り捨てます。"
    ],
    "blankPhrase": "一つ下の位",
    "blankDistractors": [
      "同じ位",
      "二つ上の位"
    ],
    "clozeText": "四捨五入は、求める位の［　］が0から4なら切り捨て、5から9なら切り上げます。",
    "hint": "「四捨五入」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "347を十の位までの概数にするといくつですか。",
        "choices": [
          "350",
          "340",
          "300"
        ],
        "correct": "350",
        "explanation": "一の位7を切り上げます。"
      },
      {
        "type": "choice",
        "prompt": "623を十の位までの概数にするといくつですか。",
        "choices": [
          "620",
          "630",
          "600"
        ],
        "correct": "620",
        "explanation": "一の位3を切り捨てます。"
      },
      {
        "type": "cloze",
        "prompt": "四捨五入します。",
        "clozeText": "4850を千の位までの概数にすると［　］",
        "blankChoices": [
          "5000",
          "4000",
          "4800"
        ],
        "blankCorrect": "5000",
        "explanation": "百の位8なので切り上げます。"
      }
    ]
  },
  {
    "id": "g4_03",
    "grade": 4,
    "unit": "わり算",
    "concept": "わり算の筆算",
    "title": "わり算の筆算の手順",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "わり算の筆算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "わり算の筆算の正しい説明を選びましょう。",
    "rubyText": "わり算の筆算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "わり算の筆算は、たてる、かける、ひく、おろすの順で進めます。",
    "distractors": [
      "たす、たす、かけるだけで進めます。",
      "一の位だけを見て答えを決めます。"
    ],
    "choices": [
      "わり算の筆算は、たてる、かける、ひく、おろすの順で進めます。",
      "たす、たす、かけるだけで進めます。",
      "一の位だけを見て答えを決めます。"
    ],
    "blankPhrase": "たてる、かける、ひく、おろす",
    "blankDistractors": [
      "たす、ひく、たす",
      "おろすだけ"
    ],
    "clozeText": "わり算の筆算は、［　］の順で進めます。",
    "hint": "「わり算の筆算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "96÷3はいくつですか。",
        "choices": [
          "32",
          "93",
          "29"
        ],
        "correct": "32",
        "explanation": "9÷3＝3、6÷3＝2です。"
      },
      {
        "type": "choice",
        "prompt": "156÷12はいくつですか。",
        "choices": [
          "13",
          "12",
          "144"
        ],
        "correct": "13",
        "explanation": "12×13＝156です。"
      },
      {
        "type": "cloze",
        "prompt": "筆算の手順です。",
        "clozeText": "たてる、かける、［　］、おろす",
        "blankChoices": [
          "ひく",
          "たす",
          "わる"
        ],
        "blankCorrect": "ひく",
        "explanation": "かけた数を引きます。"
      }
    ]
  },
  {
    "id": "g4_04",
    "grade": 4,
    "unit": "小数",
    "concept": "小数のたし算・ひき算",
    "title": "小数計算の位",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "小数のたし算・ひき算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "小数のたし算・ひき算の正しい説明を選びましょう。",
    "rubyText": "小数のたし算・ひき算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "小数のたし算やひき算は、小数点をそろえて同じ位どうしを計算します。",
    "distractors": [
      "数字の左端だけをそろえます。",
      "小数点は消して計算します。"
    ],
    "choices": [
      "小数のたし算やひき算は、小数点をそろえて同じ位どうしを計算します。",
      "数字の左端だけをそろえます。",
      "小数点は消して計算します。"
    ],
    "blankPhrase": "小数点をそろえて",
    "blankDistractors": [
      "右端をそろえて",
      "数字を逆にして"
    ],
    "clozeText": "小数のたし算やひき算は、［　］同じ位どうしを計算します。",
    "hint": "「小数のたし算・ひき算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2.4＋1.35はいくつですか。",
        "choices": [
          "3.75",
          "3.39",
          "37.5"
        ],
        "correct": "3.75",
        "explanation": "2.40＋1.35＝3.75です。"
      },
      {
        "type": "cloze",
        "prompt": "計算します。",
        "clozeText": "5.2－1.8＝［　］",
        "blankChoices": [
          "3.4",
          "4.4",
          "34"
        ],
        "blankCorrect": "3.4",
        "explanation": "5.2－1.8＝3.4です。"
      },
      {
        "type": "choice",
        "prompt": "0.75＋0.6はいくつですか。",
        "choices": [
          "1.35",
          "0.81",
          "13.5"
        ],
        "correct": "1.35",
        "explanation": "0.75＋0.60＝1.35です。"
      }
    ]
  },
  {
    "id": "g4_05",
    "grade": 4,
    "unit": "分数",
    "concept": "同分母分数",
    "title": "同じ分母の分数の計算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "同分母分数について、正しく説明している文を選びましょう。",
    "simpleQuestion": "同分母分数の正しい説明を選びましょう。",
    "rubyText": "同分母分数について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "分母が同じ分数のたし算やひき算は、分母はそのままで分子を計算します。",
    "distractors": [
      "分母どうしだけを足します。",
      "分子と分母を両方足します。"
    ],
    "choices": [
      "分母が同じ分数のたし算やひき算は、分母はそのままで分子を計算します。",
      "分母どうしだけを足します。",
      "分子と分母を両方足します。"
    ],
    "blankPhrase": "分母はそのまま",
    "blankDistractors": [
      "分母も足す",
      "分母を0にする"
    ],
    "clozeText": "分母が同じ分数のたし算やひき算は、［　］で分子を計算します。",
    "hint": "「同分母分数」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "5分の2＋5分の1はいくつですか。",
        "choices": [
          "5分の3",
          "10分の3",
          "5分の2"
        ],
        "correct": "5分の3",
        "explanation": "分母5はそのまま、分子2＋1＝3です。"
      },
      {
        "type": "cloze",
        "prompt": "分数を計算します。",
        "clozeText": "7分の6－7分の2＝7分の［　］",
        "blankChoices": [
          "4",
          "8",
          "3"
        ],
        "blankCorrect": "4",
        "explanation": "6－2＝4です。"
      },
      {
        "type": "choice",
        "prompt": "8分の3＋8分の4はいくつですか。",
        "choices": [
          "8分の7",
          "16分の7",
          "8分の1"
        ],
        "correct": "8分の7",
        "explanation": "分母は8のままです。"
      }
    ]
  },
  {
    "id": "g4_06",
    "grade": 4,
    "unit": "面積",
    "concept": "面積",
    "title": "面積の意味",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "面積について、正しく説明している文を選びましょう。",
    "simpleQuestion": "面積の正しい説明を選びましょう。",
    "rubyText": "面積について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "面積は、平面の広さを1平方センチメートルなどの単位で表したものです。",
    "distractors": [
      "面積は、まわりの長さだけを表します。",
      "面積は、重さを表します。"
    ],
    "choices": [
      "面積は、平面の広さを1平方センチメートルなどの単位で表したものです。",
      "面積は、まわりの長さだけを表します。",
      "面積は、重さを表します。"
    ],
    "blankPhrase": "平面の広さ",
    "blankDistractors": [
      "まわりの長さ",
      "高さだけ"
    ],
    "clozeText": "面積は、［　］を1平方センチメートルなどの単位で表したものです。",
    "hint": "「面積」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "たて4cm、横6cmの長方形の面積は何平方cmですか。",
        "choices": [
          "24平方cm",
          "20平方cm",
          "10平方cm"
        ],
        "correct": "24平方cm",
        "explanation": "4×6＝24です。"
      },
      {
        "type": "cloze",
        "prompt": "正方形の面積です。",
        "clozeText": "一辺5cmの正方形の面積は［　］平方cm",
        "blankChoices": [
          "25",
          "20",
          "10"
        ],
        "blankCorrect": "25",
        "explanation": "5×5＝25です。"
      },
      {
        "type": "choice",
        "prompt": "長方形の面積を求める式はどれですか。",
        "choices": [
          "たて×横",
          "たて＋横",
          "たて×2＋横×2"
        ],
        "correct": "たて×横",
        "explanation": "たて×横です。"
      }
    ]
  },
  {
    "id": "g4_07",
    "grade": 4,
    "unit": "角",
    "concept": "角度",
    "title": "角度の測り方",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "角度について、正しく説明している文を選びましょう。",
    "simpleQuestion": "角度の正しい説明を選びましょう。",
    "rubyText": "角度について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "角度は、角の開き具合を度で表したものです。",
    "distractors": [
      "角度は、辺の長さを表します。",
      "角度は、形の面積を表します。"
    ],
    "choices": [
      "角度は、角の開き具合を度で表したものです。",
      "角度は、辺の長さを表します。",
      "角度は、形の面積を表します。"
    ],
    "blankPhrase": "角の開き具合",
    "blankDistractors": [
      "辺の長さ",
      "色の濃さ"
    ],
    "clozeText": "角度は、［　］を度で表したものです。",
    "hint": "「角度」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "直角は何度ですか。",
        "choices": [
          "90度",
          "45度",
          "180度"
        ],
        "correct": "90度",
        "explanation": "直角は90度です。"
      },
      {
        "type": "choice",
        "prompt": "一直線の角は何度ですか。",
        "choices": [
          "180度",
          "90度",
          "360度"
        ],
        "correct": "180度",
        "explanation": "半回転なので180度です。"
      },
      {
        "type": "cloze",
        "prompt": "角度を答えます。",
        "clozeText": "1回転の角は［　］度",
        "blankChoices": [
          "360",
          "180",
          "90"
        ],
        "blankCorrect": "360",
        "explanation": "1回転は360度です。"
      }
    ]
  },
  {
    "id": "g4_08",
    "grade": 4,
    "unit": "図形",
    "concept": "垂直と平行",
    "title": "垂直・平行の意味",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "垂直と平行について、正しく説明している文を選びましょう。",
    "simpleQuestion": "垂直と平行の正しい説明を選びましょう。",
    "rubyText": "垂直と平行について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "2本の直線が直角に交わるとき垂直、どこまでのばしても交わらないとき平行といいます。",
    "distractors": [
      "垂直は交わらない線、平行は直角に交わる線です。",
      "どちらも同じ意味です。"
    ],
    "choices": [
      "2本の直線が直角に交わるとき垂直、どこまでのばしても交わらないとき平行といいます。",
      "垂直は交わらない線、平行は直角に交わる線です。",
      "どちらも同じ意味です。"
    ],
    "blankPhrase": "直角に交わる",
    "blankDistractors": [
      "曲がっている",
      "同じ長さ"
    ],
    "clozeText": "2本の直線が［　］とき垂直、どこまでのばしても交わらないとき平行といいます。",
    "hint": "「垂直と平行」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2本の直線が90度で交わっています。この関係は何ですか。",
        "choices": [
          "垂直",
          "平行",
          "合同"
        ],
        "correct": "垂直",
        "explanation": "直角に交わるので垂直です。"
      },
      {
        "type": "choice",
        "prompt": "線路の2本のレールのような関係は何ですか。",
        "choices": [
          "平行",
          "垂直",
          "対称"
        ],
        "correct": "平行",
        "explanation": "どこまでのばしても交わらないので平行です。"
      },
      {
        "type": "cloze",
        "prompt": "言葉を完成させます。",
        "clozeText": "どこまでのばしても交わらない2直線を［　］といいます。",
        "blankChoices": [
          "平行",
          "垂直",
          "直角"
        ],
        "blankCorrect": "平行",
        "explanation": "平行です。"
      }
    ]
  },
  {
    "id": "g4_09",
    "grade": 4,
    "unit": "グラフ",
    "concept": "折れ線グラフ",
    "title": "折れ線グラフの特徴",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "折れ線グラフについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "折れ線グラフの正しい説明を選びましょう。",
    "rubyText": "折れ線グラフについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "折れ線グラフは、時間などにともなう数量の変化を表すのに適しています。",
    "distractors": [
      "折れ線グラフは、形の面積だけを表します。",
      "変化の様子は読み取れません。"
    ],
    "choices": [
      "折れ線グラフは、時間などにともなう数量の変化を表すのに適しています。",
      "折れ線グラフは、形の面積だけを表します。",
      "変化の様子は読み取れません。"
    ],
    "blankPhrase": "数量の変化",
    "blankDistractors": [
      "物の色",
      "角の数"
    ],
    "clozeText": "折れ線グラフは、時間などにともなう［　］を表すのに適しています。",
    "hint": "「折れ線グラフ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "気温の1日の変化を表すのに適したグラフはどれですか。",
        "choices": [
          "折れ線グラフ",
          "絵だけ",
          "図形"
        ],
        "correct": "折れ線グラフ",
        "explanation": "時間による変化を表せます。"
      },
      {
        "type": "choice",
        "prompt": "線が右上がりの部分では数量はどうなっていますか。",
        "choices": [
          "増えている",
          "減っている",
          "変わらない"
        ],
        "correct": "増えている",
        "explanation": "右上がりは増加です。"
      },
      {
        "type": "cloze",
        "prompt": "グラフを読みます。",
        "clozeText": "線が水平なら数量は［　］います。",
        "blankChoices": [
          "変わらずに",
          "増えて",
          "減って"
        ],
        "blankCorrect": "変わらずに",
        "explanation": "水平なら変化しません。"
      }
    ]
  },
  {
    "id": "g4_10",
    "grade": 4,
    "unit": "立体",
    "concept": "直方体と立方体",
    "title": "直方体・立方体の特徴",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "直方体と立方体について、正しく説明している文を選びましょう。",
    "simpleQuestion": "直方体と立方体の正しい説明を選びましょう。",
    "rubyText": "直方体と立方体について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "直方体は長方形の面で囲まれ、立方体は合同な正方形6枚で囲まれています。",
    "distractors": [
      "直方体は三角形だけで囲まれています。",
      "立方体の面は5枚です。"
    ],
    "choices": [
      "直方体は長方形の面で囲まれ、立方体は合同な正方形6枚で囲まれています。",
      "直方体は三角形だけで囲まれています。",
      "立方体の面は5枚です。"
    ],
    "blankPhrase": "合同な正方形6枚",
    "blankDistractors": [
      "三角形4枚",
      "円2枚"
    ],
    "clozeText": "直方体は長方形の面で囲まれ、立方体は［　］で囲まれています。",
    "hint": "「直方体と立方体」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "立方体の面はいくつありますか。",
        "choices": [
          "6面",
          "4面",
          "8面"
        ],
        "correct": "6面",
        "explanation": "立方体は6面です。"
      },
      {
        "type": "choice",
        "prompt": "直方体の頂点はいくつありますか。",
        "choices": [
          "8個",
          "6個",
          "12個"
        ],
        "correct": "8個",
        "explanation": "直方体の頂点は8個です。"
      },
      {
        "type": "cloze",
        "prompt": "立方体の特徴です。",
        "clozeText": "立方体は合同な［　］で囲まれています。",
        "blankChoices": [
          "正方形6枚",
          "長方形4枚",
          "三角形8枚"
        ],
        "blankCorrect": "正方形6枚",
        "explanation": "正方形6枚です。"
      }
    ]
  },
  {
    "id": "g5_01",
    "grade": 5,
    "unit": "平均",
    "concept": "平均",
    "title": "平均の意味",
    "difficulty": 2,
    "professor": "アルベルト教授",
    "question": "平均について、正しく説明している文を選びましょう。",
    "simpleQuestion": "平均の正しい説明を選びましょう。",
    "rubyText": "平均について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "平均は、いくつかの数量を同じ大きさにならしたときの一つ分の数量です。",
    "distractors": [
      "平均は、いちばん大きい数量です。",
      "平均は、全部を足した合計です。"
    ],
    "choices": [
      "平均は、いくつかの数量を同じ大きさにならしたときの一つ分の数量です。",
      "平均は、いちばん大きい数量です。",
      "平均は、全部を足した合計です。"
    ],
    "blankPhrase": "同じ大きさにならした",
    "blankDistractors": [
      "大きい順に並べた",
      "全部かけた"
    ],
    "clozeText": "平均は、いくつかの数量を［　］ときの一つ分の数量です。",
    "hint": "「平均」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "4、6、8の平均はいくつですか。",
        "choices": [
          "6",
          "18",
          "3"
        ],
        "correct": "6",
        "explanation": "合計18を3で割ります。"
      },
      {
        "type": "cloze",
        "prompt": "平均を求めます。",
        "clozeText": "10、15、20の平均は［　］",
        "blankChoices": [
          "15",
          "45",
          "3"
        ],
        "blankCorrect": "15",
        "explanation": "45÷3＝15です。"
      },
      {
        "type": "choice",
        "prompt": "12ページ、18ページ、15ページの1日平均は何ページですか。",
        "choices": [
          "15ページ",
          "45ページ",
          "3ページ"
        ],
        "correct": "15ページ",
        "explanation": "45÷3＝15ページです。"
      }
    ]
  },
  {
    "id": "g5_02",
    "grade": 5,
    "unit": "平均",
    "concept": "平均の求め方",
    "title": "平均の求め方",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "平均の求め方について、正しく説明している文を選びましょう。",
    "simpleQuestion": "平均の求め方の正しい説明を選びましょう。",
    "rubyText": "平均の求め方について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "平均は、数量の合計を数量の個数で割って求めます。",
    "distractors": [
      "数量の合計をいちばん大きい数で割ります。",
      "いちばん大きい数と小さい数を足します。"
    ],
    "choices": [
      "平均は、数量の合計を数量の個数で割って求めます。",
      "数量の合計をいちばん大きい数で割ります。",
      "いちばん大きい数と小さい数を足します。"
    ],
    "blankPhrase": "数量の個数",
    "blankDistractors": [
      "合計",
      "最大の数"
    ],
    "clozeText": "平均は、数量の合計を［　］で割って求めます。",
    "hint": "「平均の求め方」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "7、9、11、13の平均はいくつですか。",
        "choices": [
          "10",
          "40",
          "4"
        ],
        "correct": "10",
        "explanation": "合計40を4で割ります。"
      },
      {
        "type": "cloze",
        "prompt": "式を完成させます。",
        "clozeText": "6、8、10の平均は、24÷［　］＝8",
        "blankChoices": [
          "3",
          "8",
          "24"
        ],
        "blankCorrect": "3",
        "explanation": "数は3個です。"
      },
      {
        "type": "choice",
        "prompt": "5回の記録の合計が60mです。平均は何mですか。",
        "choices": [
          "12m",
          "55m",
          "300m"
        ],
        "correct": "12m",
        "explanation": "60÷5＝12です。"
      }
    ]
  },
  {
    "id": "g5_03",
    "grade": 5,
    "unit": "単位量あたり",
    "concept": "単位量あたりの大きさ",
    "title": "単位量あたりの大きさ",
    "difficulty": 2,
    "professor": "ヴェロ教授",
    "question": "単位量あたりの大きさについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "単位量あたりの大きさの正しい説明を選びましょう。",
    "rubyText": "単位量あたりの大きさについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "単位量あたりの大きさは、一方の量を1としたときのもう一方の量です。",
    "distractors": [
      "二つの量を足した合計です。",
      "一方の量を0にしたときの量です。"
    ],
    "choices": [
      "単位量あたりの大きさは、一方の量を1としたときのもう一方の量です。",
      "二つの量を足した合計です。",
      "一方の量を0にしたときの量です。"
    ],
    "blankPhrase": "一方の量を1",
    "blankDistractors": [
      "両方を10",
      "一方を0"
    ],
    "clozeText": "単位量あたりの大きさは、［　］としたときのもう一方の量です。",
    "hint": "「単位量あたりの大きさ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "12個で600円の品物は、1個何円ですか。",
        "choices": [
          "50円",
          "612円",
          "7200円"
        ],
        "correct": "50円",
        "explanation": "600÷12＝50です。"
      },
      {
        "type": "choice",
        "prompt": "4平方mに20人います。1平方mあたり何人ですか。",
        "choices": [
          "5人",
          "24人",
          "80人"
        ],
        "correct": "5人",
        "explanation": "20÷4＝5です。"
      },
      {
        "type": "cloze",
        "prompt": "1あたりを求めます。",
        "clozeText": "8Lで120km進む車は、1Lあたり［　］kmです。",
        "blankChoices": [
          "15",
          "112",
          "960"
        ],
        "blankCorrect": "15",
        "explanation": "120÷8＝15です。"
      }
    ]
  },
  {
    "id": "g5_04",
    "grade": 5,
    "unit": "速さ",
    "concept": "速さ",
    "title": "速さの意味",
    "difficulty": 2,
    "professor": "ヴェロ教授",
    "question": "速さについて、正しく説明している文を選びましょう。",
    "simpleQuestion": "速さの正しい説明を選びましょう。",
    "rubyText": "速さについて、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "速さは、単位時間あたりに進む道のりで表します。",
    "distractors": [
      "速さは、道のりと時間を足したものです。",
      "速さは、進んだ時間だけです。"
    ],
    "choices": [
      "速さは、単位時間あたりに進む道のりで表します。",
      "速さは、道のりと時間を足したものです。",
      "速さは、進んだ時間だけです。"
    ],
    "blankPhrase": "単位時間あたり",
    "blankDistractors": [
      "全部の時間",
      "道のりの差"
    ],
    "clozeText": "速さは、［　］に進む道のりで表します。",
    "hint": "「速さ」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "120kmを2時間で進む車の時速は何kmですか。",
        "choices": [
          "60km",
          "122km",
          "240km"
        ],
        "correct": "60km",
        "explanation": "120÷2＝60です。"
      },
      {
        "type": "cloze",
        "prompt": "速さを求めます。",
        "clozeText": "道のり÷時間＝［　］",
        "blankChoices": [
          "速さ",
          "時間",
          "道のり"
        ],
        "blankCorrect": "速さ",
        "explanation": "速さの公式です。"
      },
      {
        "type": "choice",
        "prompt": "300mを60秒で走る速さは秒速何mですか。",
        "choices": [
          "5m",
          "360m",
          "18000m"
        ],
        "correct": "5m",
        "explanation": "300÷60＝5です。"
      }
    ]
  },
  {
    "id": "g5_05",
    "grade": 5,
    "unit": "割合",
    "concept": "割合",
    "title": "割合の意味",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "割合について、正しく説明している文を選びましょう。",
    "simpleQuestion": "割合の正しい説明を選びましょう。",
    "rubyText": "割合について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "割合は、比べる量がもとにする量の何倍にあたるかを表す数です。",
    "distractors": [
      "二つの量の差だけを表す数です。",
      "二つの量の合計を表す数です。"
    ],
    "choices": [
      "割合は、比べる量がもとにする量の何倍にあたるかを表す数です。",
      "二つの量の差だけを表す数です。",
      "二つの量の合計を表す数です。"
    ],
    "blankPhrase": "もとにする量",
    "blankDistractors": [
      "答え",
      "大きい量"
    ],
    "clozeText": "割合は、比べる量が［　］の何倍にあたるかを表す数です。",
    "hint": "「割合」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "もとにする量100、比べる量40の割合はいくつですか。",
        "choices": [
          "0.4",
          "2.5",
          "60"
        ],
        "correct": "0.4",
        "explanation": "40÷100＝0.4です。"
      },
      {
        "type": "cloze",
        "prompt": "割合を求めます。",
        "clozeText": "比べる量÷［　］＝割合",
        "blankChoices": [
          "もとにする量",
          "割合",
          "差"
        ],
        "blankCorrect": "もとにする量",
        "explanation": "基準になる量で割ります。"
      },
      {
        "type": "choice",
        "prompt": "50人中20人の割合はいくつですか。",
        "choices": [
          "0.4",
          "2.5",
          "30"
        ],
        "correct": "0.4",
        "explanation": "20÷50＝0.4です。"
      }
    ]
  },
  {
    "id": "g5_06",
    "grade": 5,
    "unit": "割合",
    "concept": "百分率",
    "title": "百分率の意味",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "百分率について、正しく説明している文を選びましょう。",
    "simpleQuestion": "百分率の正しい説明を選びましょう。",
    "rubyText": "百分率について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "百分率は、割合を100を基準にして表し、記号％を使います。",
    "distractors": [
      "百分率は、割合を10だけで表します。",
      "％は長さの単位です。"
    ],
    "choices": [
      "百分率は、割合を100を基準にして表し、記号％を使います。",
      "百分率は、割合を10だけで表します。",
      "％は長さの単位です。"
    ],
    "blankPhrase": "100を基準",
    "blankDistractors": [
      "1を基準",
      "1000を基準"
    ],
    "clozeText": "百分率は、割合を［　］にして表し、記号％を使います。",
    "hint": "「百分率」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "割合0.4は何％ですか。",
        "choices": [
          "40％",
          "4％",
          "400％"
        ],
        "correct": "40％",
        "explanation": "0.4×100＝40％です。"
      },
      {
        "type": "cloze",
        "prompt": "百分率に直します。",
        "clozeText": "0.75＝［　］％",
        "blankChoices": [
          "75",
          "7.5",
          "750"
        ],
        "blankCorrect": "75",
        "explanation": "0.75×100＝75です。"
      },
      {
        "type": "choice",
        "prompt": "25％を小数で表すとどれですか。",
        "choices": [
          "0.25",
          "2.5",
          "25"
        ],
        "correct": "0.25",
        "explanation": "25÷100＝0.25です。"
      }
    ]
  },
  {
    "id": "g5_07",
    "grade": 5,
    "unit": "小数の計算",
    "concept": "小数のかけ算",
    "title": "小数をかける計算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "小数のかけ算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "小数のかけ算の正しい説明を選びましょう。",
    "rubyText": "小数のかけ算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "小数のかけ算は、整数として計算した後、もとの小数の桁数の合計だけ小数点を移します。",
    "distractors": [
      "小数点を必ず消したままにします。",
      "小数点を左端に置きます。"
    ],
    "choices": [
      "小数のかけ算は、整数として計算した後、もとの小数の桁数の合計だけ小数点を移します。",
      "小数点を必ず消したままにします。",
      "小数点を左端に置きます。"
    ],
    "blankPhrase": "小数の桁数の合計",
    "blankDistractors": [
      "整数部分の合計",
      "答えの数字の数"
    ],
    "clozeText": "小数のかけ算は、整数として計算した後、もとの［　］だけ小数点を移します。",
    "hint": "「小数のかけ算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2.4×3はいくつですか。",
        "choices": [
          "7.2",
          "72",
          "5.4"
        ],
        "correct": "7.2",
        "explanation": "24×3＝72で、小数1桁なので7.2です。"
      },
      {
        "type": "choice",
        "prompt": "1.2×0.5はいくつですか。",
        "choices": [
          "0.6",
          "6",
          "1.7"
        ],
        "correct": "0.6",
        "explanation": "12×5＝60で、小数2桁なので0.60です。"
      },
      {
        "type": "cloze",
        "prompt": "計算します。",
        "clozeText": "0.4×0.3＝［　］",
        "blankChoices": [
          "0.12",
          "1.2",
          "12"
        ],
        "blankCorrect": "0.12",
        "explanation": "4×3＝12で小数2桁です。"
      }
    ]
  },
  {
    "id": "g5_08",
    "grade": 5,
    "unit": "分数",
    "concept": "通分",
    "title": "通分の意味",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "通分について、正しく説明している文を選びましょう。",
    "simpleQuestion": "通分の正しい説明を選びましょう。",
    "rubyText": "通分について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "通分は、分数の大きさを変えずに分母を同じにすることです。",
    "distractors": [
      "通分は、分子だけを同じにすることです。",
      "分数の大きさを必ず変えることです。"
    ],
    "choices": [
      "通分は、分数の大きさを変えずに分母を同じにすることです。",
      "通分は、分子だけを同じにすることです。",
      "分数の大きさを必ず変えることです。"
    ],
    "blankPhrase": "分母を同じ",
    "blankDistractors": [
      "分子を0",
      "分母をなくす"
    ],
    "clozeText": "通分は、分数の大きさを変えずに［　］にすることです。",
    "hint": "「通分」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2分の1と3分の1を通分するとどれですか。",
        "choices": [
          "6分の3と6分の2",
          "5分の1と5分の1",
          "6分の1と6分の1"
        ],
        "correct": "6分の3と6分の2",
        "explanation": "最小公倍数6にそろえます。"
      },
      {
        "type": "cloze",
        "prompt": "分数を通分します。",
        "clozeText": "4分の1＝8分の［　］",
        "blankChoices": [
          "2",
          "1",
          "4"
        ],
        "blankCorrect": "2",
        "explanation": "分母を2倍したので分子も2倍です。"
      },
      {
        "type": "choice",
        "prompt": "3分の2＋6分の1はいくつですか。",
        "choices": [
          "6分の5",
          "9分の3",
          "6分の3"
        ],
        "correct": "6分の5",
        "explanation": "3分の2＝6分の4です。"
      }
    ]
  },
  {
    "id": "g5_09",
    "grade": 5,
    "unit": "体積",
    "concept": "体積",
    "title": "直方体の体積",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "体積について、正しく説明している文を選びましょう。",
    "simpleQuestion": "体積の正しい説明を選びましょう。",
    "rubyText": "体積について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "直方体の体積は、縦×横×高さで求めます。",
    "distractors": [
      "縦＋横＋高さで求めます。",
      "縦×横だけで求めます。"
    ],
    "choices": [
      "直方体の体積は、縦×横×高さで求めます。",
      "縦＋横＋高さで求めます。",
      "縦×横だけで求めます。"
    ],
    "blankPhrase": "縦×横×高さ",
    "blankDistractors": [
      "縦＋横＋高さ",
      "周りの長さ"
    ],
    "clozeText": "直方体の体積は、［　］で求めます。",
    "hint": "「体積」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "縦3cm、横4cm、高さ5cmの直方体の体積は何立方cmですか。",
        "choices": [
          "60立方cm",
          "12立方cm",
          "20立方cm"
        ],
        "correct": "60立方cm",
        "explanation": "3×4×5＝60です。"
      },
      {
        "type": "cloze",
        "prompt": "立方体の体積です。",
        "clozeText": "一辺4cmの立方体は［　］立方cm",
        "blankChoices": [
          "64",
          "16",
          "12"
        ],
        "blankCorrect": "64",
        "explanation": "4×4×4＝64です。"
      },
      {
        "type": "choice",
        "prompt": "縦2m、横3m、高さ2mの体積は何立方mですか。",
        "choices": [
          "12立方m",
          "7立方m",
          "6立方m"
        ],
        "correct": "12立方m",
        "explanation": "2×3×2＝12です。"
      }
    ]
  },
  {
    "id": "g5_10",
    "grade": 5,
    "unit": "図形",
    "concept": "合同",
    "title": "合同な図形",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "合同について、正しく説明している文を選びましょう。",
    "simpleQuestion": "合同の正しい説明を選びましょう。",
    "rubyText": "合同について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "合同な図形は、形も大きさも同じで、重ねるとぴったり重なる図形です。",
    "distractors": [
      "形だけ同じなら大きさが違っても合同です。",
      "面積だけ同じなら必ず合同です。"
    ],
    "choices": [
      "合同な図形は、形も大きさも同じで、重ねるとぴったり重なる図形です。",
      "形だけ同じなら大きさが違っても合同です。",
      "面積だけ同じなら必ず合同です。"
    ],
    "blankPhrase": "形も大きさも同じ",
    "blankDistractors": [
      "色だけ同じ",
      "角が一つ同じ"
    ],
    "clozeText": "合同な図形は、［　］で、重ねるとぴったり重なる図形です。",
    "hint": "「合同」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "合同な二つの三角形で、対応する辺の長さはどうなりますか。",
        "choices": [
          "同じ",
          "必ず2倍",
          "関係ない"
        ],
        "correct": "同じ",
        "explanation": "合同なら対応する辺は同じです。"
      },
      {
        "type": "choice",
        "prompt": "合同な図形を重ねるとどうなりますか。",
        "choices": [
          "ぴったり重なる",
          "半分だけ重なる",
          "必ず直角になる"
        ],
        "correct": "ぴったり重なる",
        "explanation": "形も大きさも同じです。"
      },
      {
        "type": "cloze",
        "prompt": "合同の意味です。",
        "clozeText": "合同な図形は、形と［　］が同じです。",
        "blankChoices": [
          "大きさ",
          "色",
          "向きだけ"
        ],
        "blankCorrect": "大きさ",
        "explanation": "大きさも同じです。"
      }
    ]
  },
  {
    "id": "g6_01",
    "grade": 6,
    "unit": "分数の計算",
    "concept": "分数のかけ算",
    "title": "分数をかける計算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "分数のかけ算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "分数のかけ算の正しい説明を選びましょう。",
    "rubyText": "分数のかけ算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "分数のかけ算は、分子どうし、分母どうしをかけ、必要なら約分します。",
    "distractors": [
      "分子どうしを足し、分母どうしを足します。",
      "分母だけをかけます。"
    ],
    "choices": [
      "分数のかけ算は、分子どうし、分母どうしをかけ、必要なら約分します。",
      "分子どうしを足し、分母どうしを足します。",
      "分母だけをかけます。"
    ],
    "blankPhrase": "分子どうし、分母どうし",
    "blankDistractors": [
      "分子と分母を交差して足す",
      "分母だけ"
    ],
    "clozeText": "分数のかけ算は、［　］をかけ、必要なら約分します。",
    "hint": "「分数のかけ算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "3分の2×5分の4はいくつですか。",
        "choices": [
          "15分の8",
          "8分の15",
          "15分の6"
        ],
        "correct": "15分の8",
        "explanation": "分子2×4、分母3×5です。"
      },
      {
        "type": "cloze",
        "prompt": "計算します。",
        "clozeText": "4分の3×2＝［　］",
        "blankChoices": [
          "2分の3",
          "8分の3",
          "6分の4"
        ],
        "blankCorrect": "2分の3",
        "explanation": "4分の6を約分して2分の3です。"
      },
      {
        "type": "choice",
        "prompt": "5分の2×4分の5はいくつですか。",
        "choices": [
          "2分の1",
          "20分の10",
          "1"
        ],
        "correct": "2分の1",
        "explanation": "20分の10を約分して2分の1です。"
      }
    ]
  },
  {
    "id": "g6_02",
    "grade": 6,
    "unit": "分数の計算",
    "concept": "分数のわり算",
    "title": "分数で割る計算",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "分数のわり算について、正しく説明している文を選びましょう。",
    "simpleQuestion": "分数のわり算の正しい説明を選びましょう。",
    "rubyText": "分数のわり算について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "分数のわり算は、割る数の分子と分母を入れ替えてかけ算に直します。",
    "distractors": [
      "割る数をそのまま足します。",
      "割られる数の分子と分母を入れ替えます。"
    ],
    "choices": [
      "分数のわり算は、割る数の分子と分母を入れ替えてかけ算に直します。",
      "割る数をそのまま足します。",
      "割られる数の分子と分母を入れ替えます。"
    ],
    "blankPhrase": "割る数の分子と分母を入れ替えて",
    "blankDistractors": [
      "両方を足して",
      "割られる数だけを逆にして"
    ],
    "clozeText": "分数のわり算は、［　］かけ算に直します。",
    "hint": "「分数のわり算」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "3分の2÷5分の4はいくつですか。",
        "choices": [
          "5分の6",
          "15分の8",
          "6分の5"
        ],
        "correct": "5分の6",
        "explanation": "割る数4/5を5/4にして、2/3×5/4＝10/12＝5/6です。"
      },
      {
        "type": "cloze",
        "prompt": "計算します。",
        "clozeText": "2分の1÷4分の3＝2分の1×［　］",
        "blankChoices": [
          "3分の4",
          "4分の3",
          "3分の2"
        ],
        "blankCorrect": "3分の4",
        "explanation": "割る数を逆数にします。"
      },
      {
        "type": "choice",
        "prompt": "5分の3÷2はいくつですか。",
        "choices": [
          "10分の3",
          "5分の6",
          "5分の1"
        ],
        "correct": "10分の3",
        "explanation": "5分の3×2分の1＝10分の3です。"
      }
    ]
  },
  {
    "id": "g6_03",
    "grade": 6,
    "unit": "比",
    "concept": "比",
    "title": "比の意味",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "比について、正しく説明している文を選びましょう。",
    "simpleQuestion": "比の正しい説明を選びましょう。",
    "rubyText": "比について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "比は、二つの数量の大きさの割合を、a対bの形で表したものです。",
    "distractors": [
      "比は、二つの数量の合計だけを表します。",
      "比は、数量を必ず引いて表します。"
    ],
    "choices": [
      "比は、二つの数量の大きさの割合を、a対bの形で表したものです。",
      "比は、二つの数量の合計だけを表します。",
      "比は、数量を必ず引いて表します。"
    ],
    "blankPhrase": "二つの数量の大きさの割合",
    "blankDistractors": [
      "一つの数量だけ",
      "差だけ"
    ],
    "clozeText": "比は、［　］を、a対bの形で表したものです。",
    "hint": "「比」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "赤3個、青5個の個数の比はどれですか。",
        "choices": [
          "3対5",
          "8対1",
          "5対3だけ"
        ],
        "correct": "3対5",
        "explanation": "赤対青なので3対5です。"
      },
      {
        "type": "cloze",
        "prompt": "比を簡単にします。",
        "clozeText": "6対9＝［　］対3",
        "blankChoices": [
          "2",
          "3",
          "6"
        ],
        "blankCorrect": "2",
        "explanation": "両方を3で割ります。"
      },
      {
        "type": "choice",
        "prompt": "4対10と等しい比はどれですか。",
        "choices": [
          "2対5",
          "4対5",
          "8対10"
        ],
        "correct": "2対5",
        "explanation": "4対10を2で割ると2対5です。"
      }
    ]
  },
  {
    "id": "g6_04",
    "grade": 6,
    "unit": "比例と反比例",
    "concept": "比例",
    "title": "比例の関係",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "比例について、正しく説明している文を選びましょう。",
    "simpleQuestion": "比例の正しい説明を選びましょう。",
    "rubyText": "比例について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "二つの数量が比例するとき、一方が2倍、3倍になると、もう一方も2倍、3倍になります。",
    "distractors": [
      "一方が増えるともう一方は必ず減ります。",
      "一方が2倍でももう一方は変わりません。"
    ],
    "choices": [
      "二つの数量が比例するとき、一方が2倍、3倍になると、もう一方も2倍、3倍になります。",
      "一方が増えるともう一方は必ず減ります。",
      "一方が2倍でももう一方は変わりません。"
    ],
    "blankPhrase": "もう一方も2倍、3倍",
    "blankDistractors": [
      "もう一方は半分",
      "もう一方は0"
    ],
    "clozeText": "二つの数量が比例するとき、一方が2倍、3倍になると、［　］になります。",
    "hint": "「比例」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "xが3のときyが12で比例しています。xが6ならyはいくつですか。",
        "choices": [
          "24",
          "15",
          "6"
        ],
        "correct": "24",
        "explanation": "xが2倍なのでyも2倍です。"
      },
      {
        "type": "cloze",
        "prompt": "比例の式です。",
        "clozeText": "y＝4×xで、x＝5ならy＝［　］",
        "blankChoices": [
          "20",
          "9",
          "1"
        ],
        "blankCorrect": "20",
        "explanation": "4×5＝20です。"
      },
      {
        "type": "choice",
        "prompt": "比例しているとき、xが4倍になるとyはどうなりますか。",
        "choices": [
          "4倍",
          "半分",
          "変わらない"
        ],
        "correct": "4倍",
        "explanation": "比例では同じ倍率です。"
      }
    ]
  },
  {
    "id": "g6_05",
    "grade": 6,
    "unit": "比例と反比例",
    "concept": "反比例",
    "title": "反比例の関係",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "反比例について、正しく説明している文を選びましょう。",
    "simpleQuestion": "反比例の正しい説明を選びましょう。",
    "rubyText": "反比例について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "二つの数量が反比例するとき、一方が2倍、3倍になると、もう一方は2分の1、3分の1になります。",
    "distractors": [
      "一方が2倍ならもう一方も2倍です。",
      "二つの数量はいつも同じです。"
    ],
    "choices": [
      "二つの数量が反比例するとき、一方が2倍、3倍になると、もう一方は2分の1、3分の1になります。",
      "一方が2倍ならもう一方も2倍です。",
      "二つの数量はいつも同じです。"
    ],
    "blankPhrase": "2分の1、3分の1",
    "blankDistractors": [
      "2倍、3倍",
      "0"
    ],
    "clozeText": "二つの数量が反比例するとき、一方が2倍、3倍になると、もう一方は［　］になります。",
    "hint": "「反比例」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "反比例でxが2倍になるとyはどうなりますか。",
        "choices": [
          "2分の1",
          "2倍",
          "変わらない"
        ],
        "correct": "2分の1",
        "explanation": "積が一定なので半分です。"
      },
      {
        "type": "cloze",
        "prompt": "反比例を考えます。",
        "clozeText": "x×y＝24で、x＝6ならy＝［　］",
        "blankChoices": [
          "4",
          "18",
          "30"
        ],
        "blankCorrect": "4",
        "explanation": "24÷6＝4です。"
      },
      {
        "type": "choice",
        "prompt": "面積24平方cmの長方形で横を3cmにすると縦は何cmですか。",
        "choices": [
          "8cm",
          "21cm",
          "72cm"
        ],
        "correct": "8cm",
        "explanation": "3×8＝24です。"
      }
    ]
  },
  {
    "id": "g6_06",
    "grade": 6,
    "unit": "図形",
    "concept": "線対称",
    "title": "線対称な図形",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "線対称について、正しく説明している文を選びましょう。",
    "simpleQuestion": "線対称の正しい説明を選びましょう。",
    "rubyText": "線対称について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "線対称な図形は、ある直線を折り目として折ると両側がぴったり重なります。",
    "distractors": [
      "回転させたときだけ重なる図形です。",
      "面積が同じなら必ず線対称です。"
    ],
    "choices": [
      "線対称な図形は、ある直線を折り目として折ると両側がぴったり重なります。",
      "回転させたときだけ重なる図形です。",
      "面積が同じなら必ず線対称です。"
    ],
    "blankPhrase": "両側がぴったり重なり",
    "blankDistractors": [
      "色が同じ",
      "一部だけ重なる"
    ],
    "clozeText": "線対称な図形は、ある直線を折り目として折ると［　］ます。",
    "hint": "「線対称」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "正方形の対称の軸は何本ありますか。",
        "choices": [
          "4本",
          "2本",
          "8本"
        ],
        "correct": "4本",
        "explanation": "縦・横・2本の対角線です。"
      },
      {
        "type": "choice",
        "prompt": "長方形の対称の軸は何本ありますか。",
        "choices": [
          "2本",
          "4本",
          "1本"
        ],
        "correct": "2本",
        "explanation": "縦と横の2本です。"
      },
      {
        "type": "cloze",
        "prompt": "線対称の意味です。",
        "clozeText": "対称の軸で折ると両側が［　］重なります。",
        "blankChoices": [
          "ぴったり",
          "少しだけ",
          "重ならず"
        ],
        "blankCorrect": "ぴったり",
        "explanation": "線対称の定義です。"
      }
    ]
  },
  {
    "id": "g6_07",
    "grade": 6,
    "unit": "図形",
    "concept": "点対称",
    "title": "点対称な図形",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "点対称について、正しく説明している文を選びましょう。",
    "simpleQuestion": "点対称の正しい説明を選びましょう。",
    "rubyText": "点対称について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "点対称な図形は、ある点を中心に180度回転させると元の図形に重なります。",
    "distractors": [
      "90度回転で必ず重なる図形です。",
      "線で折ったときだけ重なる図形です。"
    ],
    "choices": [
      "点対称な図形は、ある点を中心に180度回転させると元の図形に重なります。",
      "90度回転で必ず重なる図形です。",
      "線で折ったときだけ重なる図形です。"
    ],
    "blankPhrase": "180度回転",
    "blankDistractors": [
      "90度回転",
      "360度だけ"
    ],
    "clozeText": "点対称な図形は、ある点を中心に［　］させると元の図形に重なります。",
    "hint": "「点対称」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "平行四辺形は点対称ですか。",
        "choices": [
          "点対称である",
          "点対称でない",
          "線対称だけ"
        ],
        "correct": "点対称である",
        "explanation": "対角線の交点を中心に180度回転で重なります。"
      },
      {
        "type": "cloze",
        "prompt": "点対称の意味です。",
        "clozeText": "対称の中心のまわりに［　］度回転させます。",
        "blankChoices": [
          "180",
          "90",
          "360"
        ],
        "blankCorrect": "180",
        "explanation": "半回転です。"
      },
      {
        "type": "choice",
        "prompt": "点対称な図形で、対応する点と中心を結ぶと中心はどこにありますか。",
        "choices": [
          "線分の中点",
          "端",
          "図形の外だけ"
        ],
        "correct": "線分の中点",
        "explanation": "中心が対応点を結ぶ線分の中点です。"
      }
    ]
  },
  {
    "id": "g6_08",
    "grade": 6,
    "unit": "面積",
    "concept": "円の面積",
    "title": "円の面積の求め方",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "円の面積について、正しく説明している文を選びましょう。",
    "simpleQuestion": "円の面積の正しい説明を選びましょう。",
    "rubyText": "円の面積について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "円の面積は、半径×半径×円周率で求めます。",
    "distractors": [
      "直径×円周率だけで求めます。",
      "半径＋半径＋円周率で求めます。"
    ],
    "choices": [
      "円の面積は、半径×半径×円周率で求めます。",
      "直径×円周率だけで求めます。",
      "半径＋半径＋円周率で求めます。"
    ],
    "blankPhrase": "半径×半径×円周率",
    "blankDistractors": [
      "直径×円周率",
      "半径＋円周率"
    ],
    "clozeText": "円の面積は、［　］で求めます。",
    "hint": "「円の面積」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "半径3cmの円の面積を3.14で求めると何平方cmですか。",
        "choices": [
          "28.26平方cm",
          "18.84平方cm",
          "9.42平方cm"
        ],
        "correct": "28.26平方cm",
        "explanation": "3×3×3.14＝28.26です。"
      },
      {
        "type": "cloze",
        "prompt": "円の面積です。",
        "clozeText": "半径5cmなら5×5×3.14＝［　］平方cm",
        "blankChoices": [
          "78.5",
          "31.4",
          "15.7"
        ],
        "blankCorrect": "78.5",
        "explanation": "25×3.14＝78.5です。"
      },
      {
        "type": "choice",
        "prompt": "直径10cmの円の半径は何cmですか。",
        "choices": [
          "5cm",
          "10cm",
          "20cm"
        ],
        "correct": "5cm",
        "explanation": "半径は直径の半分です。"
      }
    ]
  },
  {
    "id": "g6_09",
    "grade": 6,
    "unit": "体積",
    "concept": "角柱・円柱の体積",
    "title": "柱体の体積",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "角柱・円柱の体積について、正しく説明している文を選びましょう。",
    "simpleQuestion": "角柱・円柱の体積の正しい説明を選びましょう。",
    "rubyText": "角柱・円柱の体積について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "角柱や円柱の体積は、底面積×高さで求めます。",
    "distractors": [
      "底面の周りの長さ×高さで求めます。",
      "底面積＋高さで求めます。"
    ],
    "choices": [
      "角柱や円柱の体積は、底面積×高さで求めます。",
      "底面の周りの長さ×高さで求めます。",
      "底面積＋高さで求めます。"
    ],
    "blankPhrase": "底面積×高さ",
    "blankDistractors": [
      "底面積＋高さ",
      "周りの長さ×高さ"
    ],
    "clozeText": "角柱や円柱の体積は、［　］で求めます。",
    "hint": "「角柱・円柱の体積」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "底面積12平方cm、高さ5cmの角柱の体積は何立方cmですか。",
        "choices": [
          "60立方cm",
          "17立方cm",
          "24立方cm"
        ],
        "correct": "60立方cm",
        "explanation": "12×5＝60です。"
      },
      {
        "type": "cloze",
        "prompt": "円柱の体積です。",
        "clozeText": "底面積20平方cm、高さ4cmなら［　］立方cm",
        "blankChoices": [
          "80",
          "24",
          "5"
        ],
        "blankCorrect": "80",
        "explanation": "20×4＝80です。"
      },
      {
        "type": "choice",
        "prompt": "三角柱の底面積が15平方cm、高さ8cmです。体積は何立方cmですか。",
        "choices": [
          "120立方cm",
          "23立方cm",
          "60立方cm"
        ],
        "correct": "120立方cm",
        "explanation": "15×8＝120です。"
      }
    ]
  },
  {
    "id": "g6_10",
    "grade": 6,
    "unit": "データ",
    "concept": "代表値",
    "title": "平均値・中央値・最頻値",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "代表値について、正しく説明している文を選びましょう。",
    "simpleQuestion": "代表値の正しい説明を選びましょう。",
    "rubyText": "代表値について、正しく説明している文を選びましょう。",
    "visual": "",
    "correctExplanation": "代表値には平均値、中央値、最頻値などがあり、データの特徴に応じて使い分けます。",
    "distractors": [
      "代表値は必ず最大値だけです。",
      "どんなデータでも三つの代表値は必ず同じです。"
    ],
    "choices": [
      "代表値には平均値、中央値、最頻値などがあり、データの特徴に応じて使い分けます。",
      "代表値は必ず最大値だけです。",
      "どんなデータでも三つの代表値は必ず同じです。"
    ],
    "blankPhrase": "データの特徴に応じて",
    "blankDistractors": [
      "いつも最大値だけ",
      "順番を見ずに"
    ],
    "clozeText": "代表値には平均値、中央値、最頻値などがあり、［　］使い分けます。",
    "hint": "「代表値」の意味や使い方を思い出しましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2、3、3、4、8の最頻値はどれですか。",
        "choices": [
          "3",
          "4",
          "8"
        ],
        "correct": "3",
        "explanation": "最も多く現れる3です。"
      },
      {
        "type": "choice",
        "prompt": "1、4、6、8、10の中央値はどれですか。",
        "choices": [
          "6",
          "5.8",
          "10"
        ],
        "correct": "6",
        "explanation": "中央にある6です。"
      },
      {
        "type": "cloze",
        "prompt": "平均値を求めます。",
        "clozeText": "2、4、6の平均値は［　］",
        "blankChoices": [
          "4",
          "12",
          "3"
        ],
        "blankCorrect": "4",
        "explanation": "合計12÷3＝4です。"
      }
    ]
  }
]
};
