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
    "title": "たし算って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「たし算」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「たし算」の せつめいを 1つ えらびましょう。",
    "rubyText": "「たし算」の せつめいを 1つ えらびましょう。",
    "visual": "●●● ＋ ●● ＝ ●●●●●",
    "correctExplanation": "たし算は、数を合わせて、ぜんぶでいくつかを出す計算です。",
    "distractors": [
      "数をへらす計算です。",
      "同じ数ずつ分ける計算です。"
    ],
    "choices": [
      "たし算は、数を合わせて、ぜんぶでいくつかを出す計算です。",
      "数をへらす計算です。",
      "同じ数ずつ分ける計算です。"
    ],
    "blankPhrase": "数を合わせて",
    "blankDistractors": [
      "数をへらす計算",
      "同じ数ずつ分ける計算"
    ],
    "clozeText": "たし算は、［　］、ぜんぶでいくつかを出す計算です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "式を［　］に入る答えをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n赤い花が5本、白い花が4本あります。全部で何本ですか。",
      "choices": [
        "9本",
        "1本",
        "20本"
      ],
      "correct": "9本",
      "explanation": "5＋4＝9です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g1_02",
    "grade": 1,
    "unit": "ひき算",
    "concept": "ひき算",
    "title": "ひき算って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「ひき算」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「ひき算」の せつめいを 1つ えらびましょう。",
    "rubyText": "「ひき算」の せつめいを 1つ えらびましょう。",
    "visual": "●●●●●●●● → 3こ取る",
    "correctExplanation": "ひき算は、数をへらしたあとの残りや、どれだけちがうかを出す計算です。",
    "distractors": [
      "数を合わせる計算です。",
      "同じ数を何回も足す計算です。"
    ],
    "choices": [
      "ひき算は、数をへらしたあとの残りや、どれだけちがうかを出す計算です。",
      "数を合わせる計算です。",
      "同じ数を何回も足す計算です。"
    ],
    "blankPhrase": "残り",
    "blankDistractors": [
      "数を合わせる計算",
      "同じ数を何回も足す計算"
    ],
    "clozeText": "ひき算は、数をへらしたあとの［　］や、どれだけちがうかを出す計算です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "式を［　］に入る答えをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n7人と4人では、何人ちがいますか。",
      "choices": [
        "3人",
        "11人",
        "4人"
      ],
      "correct": "3人",
      "explanation": "7－4＝3です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g1_03",
    "grade": 1,
    "unit": "数",
    "concept": "0",
    "title": "0って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「0」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「0」の せつめいを 1つ えらびましょう。",
    "rubyText": "「0」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "0は、一つもないことをあらわす数です。",
    "distractors": [
      "いちばん大きい数です。",
      "10と同じ数です。"
    ],
    "choices": [
      "0は、一つもないことをあらわす数です。",
      "いちばん大きい数です。",
      "10と同じ数です。"
    ],
    "blankPhrase": "一つもない",
    "blankDistractors": [
      "いちばん大きい数",
      "10と同じ数"
    ],
    "clozeText": "0は、［　］ことをあらわす数です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "式を［　］に入る答えをえらびましょう。",
        "clozeText": "6－6＝［　］",
        "blankChoices": [
          "0",
          "6",
          "12"
        ],
        "blankCorrect": "0",
        "explanation": "同じ数を全部引くと0です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n式を［　］に入る答えをえらびましょう。",
      "clozeText": "6－6＝［　］",
      "blankChoices": [
        "0",
        "6",
        "12"
      ],
      "blankCorrect": "0",
      "explanation": "同じ数を全部引くと0です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g1_04",
    "grade": 1,
    "unit": "数",
    "concept": "10のまとまり",
    "title": "10のまとまりって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「10のまとまり」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「10のまとまり」の せつめいを 1つ えらびましょう。",
    "rubyText": "「10のまとまり」の せつめいを 1つ えらびましょう。",
    "visual": "10のまとまり｜10のまとまり｜ばら3こ",
    "correctExplanation": "大きな数は、10のまとまりと、ばらに分けると数えやすくなります。",
    "distractors": [
      "5のまとまりだけで数えます。",
      "ばらだけで数えます。"
    ],
    "choices": [
      "大きな数は、10のまとまりと、ばらに分けると数えやすくなります。",
      "5のまとまりだけで数えます。",
      "ばらだけで数えます。"
    ],
    "blankPhrase": "10のまとまり",
    "blankDistractors": [
      "5のまとまりだけで数え",
      "ばらだけで数え"
    ],
    "clozeText": "大きな数は、［　］と、ばらに分けると数えやすくなります。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "数を［　］に入る答えをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n47は、10のまとまりがいくつありますか。",
      "choices": [
        "4こ",
        "7こ",
        "47こ"
      ],
      "correct": "4こ",
      "explanation": "47は40と7なので、10のまとまりは4こです。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g1_05",
    "grade": 1,
    "unit": "順序",
    "concept": "何番目",
    "title": "何番目って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「何番目」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「何番目」の せつめいを 1つ えらびましょう。",
    "rubyText": "「何番目」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "何番目は、はしからじゅんに数えたばしょです。",
    "distractors": [
      "まんなかから数えたばしょです。",
      "ぜんぶの人数です。"
    ],
    "choices": [
      "何番目は、はしからじゅんに数えたばしょです。",
      "まんなかから数えたばしょです。",
      "ぜんぶの人数です。"
    ],
    "blankPhrase": "はしからじゅんに",
    "blankDistractors": [
      "まんなかから数えたばしょ",
      "ぜんぶの人数"
    ],
    "clozeText": "何番目は、［　］数えたばしょです。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "左から4番目をあらわします。",
        "clozeText": "左の端から［　］数えます。",
        "blankChoices": [
          "4人",
          "3人",
          "5人"
        ],
        "blankCorrect": "4人",
        "explanation": "端から順に4人目を見ます。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n左から4番目をあらわします。",
      "clozeText": "左の端から［　］数えます。",
      "blankChoices": [
        "4人",
        "3人",
        "5人"
      ],
      "blankCorrect": "4人",
      "explanation": "端から順に4人目を見ます。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g1_06",
    "grade": 1,
    "unit": "量",
    "concept": "長さくらべ",
    "title": "長さくらべって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「長さくらべ」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「長さくらべ」の せつめいを 1つ えらびましょう。",
    "rubyText": "「長さくらべ」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "長さをくらべるときは、はしをそろえます。",
    "distractors": [
      "まんなかをそろえます。",
      "色だけを見ます。"
    ],
    "choices": [
      "長さをくらべるときは、はしをそろえます。",
      "まんなかをそろえます。",
      "色だけを見ます。"
    ],
    "blankPhrase": "はしをそろえます",
    "blankDistractors": [
      "まんなかをそろえ",
      "色だけを見"
    ],
    "clozeText": "長さをくらべるときは、［　］。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2本の鉛筆の長さをくらべるとき、どこをそろえますか。",
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
        "prompt": "長さをくらべます。",
        "clozeText": "片方の［　］をそろえます。",
        "blankChoices": [
          "端",
          "色",
          "太さ"
        ],
        "blankCorrect": "端",
        "explanation": "端をそろえてくらべます。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n長さをくらべます。",
      "clozeText": "片方の［　］をそろえます。",
      "blankChoices": [
        "端",
        "色",
        "太さ"
      ],
      "blankCorrect": "端",
      "explanation": "端をそろえてくらべます。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g1_07",
    "grade": 1,
    "unit": "量",
    "concept": "かさくらべ",
    "title": "かさくらべって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「かさくらべ」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「かさくらべ」の せつめいを 1つ えらびましょう。",
    "rubyText": "「かさくらべ」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "かさは、同じコップで何はい分かを調べるとくらべられます。",
    "distractors": [
      "ちがう大きさのコップを使います。",
      "色だけを見ます。"
    ],
    "choices": [
      "かさは、同じコップで何はい分かを調べるとくらべられます。",
      "ちがう大きさのコップを使います。",
      "色だけを見ます。"
    ],
    "blankPhrase": "同じコップ",
    "blankDistractors": [
      "ちがう大きさのコップを使い",
      "色だけを見"
    ],
    "clozeText": "かさは、［　］で何はい分かを調べるとくらべられます。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "かさを正しいくらべるには、どんなコップを使いますか。",
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
        "prompt": "かさをくらべます。",
        "clozeText": "［　］が何杯分かを調べます。",
        "blankChoices": [
          "同じコップ",
          "違うコップ",
          "大きい箱"
        ],
        "blankCorrect": "同じコップ",
        "explanation": "同じコップを使います。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\nかさをくらべます。",
      "clozeText": "［　］が何杯分かを調べます。",
      "blankChoices": [
        "同じコップ",
        "違うコップ",
        "大きい箱"
      ],
      "blankCorrect": "同じコップ",
      "explanation": "同じコップを使います。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g1_08",
    "grade": 1,
    "unit": "時刻",
    "concept": "時計",
    "title": "時計って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「時計」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「時計」の せつめいを 1つ えらびましょう。",
    "rubyText": "「時計」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "時計は、短いはりで時を見て、長いはりで分を見ます。",
    "distractors": [
      "長いはりだけで時を見ます。",
      "短いはりで分だけを見ます。"
    ],
    "choices": [
      "時計は、短いはりで時を見て、長いはりで分を見ます。",
      "長いはりだけで時を見ます。",
      "短いはりで分だけを見ます。"
    ],
    "blankPhrase": "短いはりで時",
    "blankDistractors": [
      "長いはりだけで時を見",
      "短いはりで分だけを見"
    ],
    "clozeText": "時計は、［　］を見て、長いはりで分を見ます。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n2時30分です。",
      "clozeText": "短い針は2と3の間、長い針は［　］を指します。",
      "blankChoices": [
        "6",
        "3",
        "12"
      ],
      "blankCorrect": "6",
      "explanation": "30分は長い針が6です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g1_09",
    "grade": 1,
    "unit": "図形",
    "concept": "三角形・四角形",
    "title": "三角形・四角形って なに？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「三角形・四角形」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「三角形・四角形」の せつめいを 1つ えらびましょう。",
    "rubyText": "「三角形・四角形」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "三角形はへんが3本、四角形はへんが4本ある形です。",
    "distractors": [
      "三角形はへんが4本です。",
      "四角形はへんが3本です。"
    ],
    "choices": [
      "三角形はへんが3本、四角形はへんが4本ある形です。",
      "三角形はへんが4本です。",
      "四角形はへんが3本です。"
    ],
    "blankPhrase": "へんが3本",
    "blankDistractors": [
      "三角形はへんが4本",
      "四角形はへんが3本"
    ],
    "clozeText": "三角形は［　］、四角形はへんが4本ある形です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "形の名前をこたえます。",
        "clozeText": "辺が［　］本ある形を三角形といいます。",
        "blankChoices": [
          "3",
          "4",
          "0"
        ],
        "blankCorrect": "3",
        "explanation": "三角形の辺は3本です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n形の名前をこたえます。",
      "clozeText": "辺が［　］本ある形を三角形といいます。",
      "blankChoices": [
        "3",
        "4",
        "0"
      ],
      "blankCorrect": "3",
      "explanation": "三角形の辺は3本です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g1_10",
    "grade": 1,
    "unit": "数",
    "concept": "大きさくらべ",
    "title": "大きさくらべって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「大きさくらべ」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「大きさくらべ」の せつめいを 1つ えらびましょう。",
    "rubyText": "「大きさくらべ」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "数直線では、右にある数ほど大きいです。",
    "distractors": [
      "左にある数ほど大きいです。",
      "色で大きさが決まります。"
    ],
    "choices": [
      "数直線では、右にある数ほど大きいです。",
      "左にある数ほど大きいです。",
      "色で大きさが決まります。"
    ],
    "blankPhrase": "右にある数",
    "blankDistractors": [
      "左にある数ほど大きい",
      "色で大きさが決まり"
    ],
    "clozeText": "数直線では、［　］ほど大きいです。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "数をくらべます。",
        "clozeText": "数直線で右にある数ほど［　］です。",
        "blankChoices": [
          "大きい",
          "小さい",
          "同じ"
        ],
        "blankCorrect": "大きい",
        "explanation": "右に進むほど数は大きくなります。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n数をくらべます。",
      "clozeText": "数直線で右にある数ほど［　］です。",
      "blankChoices": [
        "大きい",
        "小さい",
        "同じ"
      ],
      "blankCorrect": "大きい",
      "explanation": "右に進むほど数は大きくなります。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g2_01",
    "grade": 2,
    "unit": "数",
    "concept": "位",
    "title": "位って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「位」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「位」の せつめいを 1つ えらびましょう。",
    "rubyText": "「位」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "数字は、あるばしょによって、あらわす大きさがかわります。",
    "distractors": [
      "どのばしょでも同じ大きさです。",
      "色で大きさがかわります。"
    ],
    "choices": [
      "数字は、あるばしょによって、あらわす大きさがかわります。",
      "どのばしょでも同じ大きさです。",
      "色で大きさがかわります。"
    ],
    "blankPhrase": "ばしょ",
    "blankDistractors": [
      "どのばしょでも同じ大きさ",
      "色で大きさがかわり"
    ],
    "clozeText": "数字は、ある［　］によって、あらわす大きさがかわります。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "数を［　］に入る答えをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n608の百の位の数字は何ですか。",
      "choices": [
        "6",
        "0",
        "8"
      ],
      "correct": "6",
      "explanation": "608の6は百の位です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g2_02",
    "grade": 2,
    "unit": "たし算とひき算",
    "concept": "たし算のひっ算",
    "title": "たし算のひっ算って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「たし算のひっ算」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「たし算のひっ算」の せつめいを 1つ えらびましょう。",
    "rubyText": "「たし算のひっ算」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "たし算のひっ算は、同じ位をたてにそろえて計算します。",
    "distractors": [
      "左のはしだけをそろえます。",
      "ちがう位どうしを足します。"
    ],
    "choices": [
      "たし算のひっ算は、同じ位をたてにそろえて計算します。",
      "左のはしだけをそろえます。",
      "ちがう位どうしを足します。"
    ],
    "blankPhrase": "同じ位",
    "blankDistractors": [
      "左のはしだけをそろえ",
      "ちがう位どうしを足し"
    ],
    "clozeText": "たし算のひっ算は、［　］をたてにそろえて計算します。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\nひっ算のしかたです。",
      "clozeText": "一の位、十の位を縦に［　］ます。",
      "blankChoices": [
        "そろえ",
        "入れかえ",
        "離し"
      ],
      "blankCorrect": "そろえ",
      "explanation": "同じ位をそろえます。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g2_03",
    "grade": 2,
    "unit": "たし算とひき算",
    "concept": "くり下がり",
    "title": "くり下がりって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「くり下がり」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「くり下がり」の せつめいを 1つ えらびましょう。",
    "rubyText": "「くり下がり」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "一の位でひけないときは、十の位から1をかりて10にします。",
    "distractors": [
      "一の位から1をかります。",
      "答えを0にします。"
    ],
    "choices": [
      "一の位でひけないときは、十の位から1をかりて10にします。",
      "一の位から1をかります。",
      "答えを0にします。"
    ],
    "blankPhrase": "十の位から1",
    "blankDistractors": [
      "一の位から1をかり",
      "答えを0にし"
    ],
    "clozeText": "一の位でひけないときは、［　］をかりて10にします。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n70－36はいくつですか。",
      "choices": [
        "34",
        "44",
        "106"
      ],
      "correct": "34",
      "explanation": "10－6＝4、6－3＝3です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g2_04",
    "grade": 2,
    "unit": "かけ算",
    "concept": "かけ算",
    "title": "かけ算って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「かけ算」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「かけ算」の せつめいを 1つ えらびましょう。",
    "rubyText": "「かけ算」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "かけ算は、同じ数ずつのまとまりが、いくつ分あるかを出す計算です。",
    "distractors": [
      "ちがう数をひく計算です。",
      "二つの数のちがいを出す計算です。"
    ],
    "choices": [
      "かけ算は、同じ数ずつのまとまりが、いくつ分あるかを出す計算です。",
      "ちがう数をひく計算です。",
      "二つの数のちがいを出す計算です。"
    ],
    "blankPhrase": "同じ数ずつ",
    "blankDistractors": [
      "ちがう数をひく計算",
      "二つの数のちがいを出す計算"
    ],
    "clozeText": "かけ算は、［　］のまとまりが、いくつ分あるかを出す計算です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "式を［　］に入る答えをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n2×6をたし算で表したものはどれですか。",
      "choices": [
        "2＋2＋2＋2＋2＋2",
        "2＋6",
        "6－2"
      ],
      "correct": "2＋2＋2＋2＋2＋2",
      "explanation": "2が6つ分です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g2_05",
    "grade": 2,
    "unit": "かけ算",
    "concept": "九九",
    "title": "九九って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「九九」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「九九」の せつめいを 1つ えらびましょう。",
    "rubyText": "「九九」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "九九は、かけ算の答えを早く出すために使います。",
    "distractors": [
      "ひき算の答えを出します。",
      "時計の時こくを出します。"
    ],
    "choices": [
      "九九は、かけ算の答えを早く出すために使います。",
      "ひき算の答えを出します。",
      "時計の時こくを出します。"
    ],
    "blankPhrase": "かけ算の答え",
    "blankDistractors": [
      "ひき算の答えを出し",
      "時計の時こくを出し"
    ],
    "clozeText": "九九は、［　］を早く出すために使います。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "九九を［　］に入る答えをえらびましょう。",
        "clozeText": "9×5＝［　］",
        "blankChoices": [
          "45",
          "14",
          "40"
        ],
        "blankCorrect": "45",
        "explanation": "九五45です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n九九を［　］に入る答えをえらびましょう。",
      "clozeText": "9×5＝［　］",
      "blankChoices": [
        "45",
        "14",
        "40"
      ],
      "blankCorrect": "45",
      "explanation": "九五45です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g2_06",
    "grade": 2,
    "unit": "数",
    "concept": "1000",
    "title": "1000って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「1000」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「1000」の せつめいを 1つ えらびましょう。",
    "rubyText": "「1000」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "1000は、100が10こ集まった数です。",
    "distractors": [
      "10が10こ集まった数です。",
      "100が1こだけの数です。"
    ],
    "choices": [
      "1000は、100が10こ集まった数です。",
      "10が10こ集まった数です。",
      "100が1こだけの数です。"
    ],
    "blankPhrase": "100が10こ",
    "blankDistractors": [
      "10が10こ集まった数",
      "100が1こだけの数"
    ],
    "clozeText": "1000は、［　］集まった数です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "数を［　］に入る答えをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n1000より1小さい数は何ですか。",
      "choices": [
        "999",
        "1001",
        "990"
      ],
      "correct": "999",
      "explanation": "1000－1＝999です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g2_07",
    "grade": 2,
    "unit": "長さ",
    "concept": "cmとm",
    "title": "cmとmって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「cmとm」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「cmとm」の せつめいを 1つ えらびましょう。",
    "rubyText": "「cmとm」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "1mは100cmです。長いものはm、短いものはcmであらわします。",
    "distractors": [
      "10cmです。",
      "1000cmです。"
    ],
    "choices": [
      "1mは100cmです。長いものはm、短いものはcmであらわします。",
      "10cmです。",
      "1000cmです。"
    ],
    "blankPhrase": "100cm",
    "blankDistractors": [
      "10cm",
      "1000cm"
    ],
    "clozeText": "1mは［　］です。長いものはm、短いものはcmであらわします。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "同じたんいになおします。",
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
        "prompt": "教室の横の長さをあらわすのによい単位はどれですか。",
        "choices": [
          "m",
          "cm",
          "mL"
        ],
        "correct": "m",
        "explanation": "教室は長いのでmが適しています。"
      }
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n教室の横の長さをあらわすのによい単位はどれですか。",
      "choices": [
        "m",
        "cm",
        "mL"
      ],
      "correct": "m",
      "explanation": "教室は長いのでmが適しています。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g2_08",
    "grade": 2,
    "unit": "かさ",
    "concept": "LとdL",
    "title": "LとdLって なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「LとdL」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「LとdL」の せつめいを 1つ えらびましょう。",
    "rubyText": "「LとdL」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "1Lは10dLです。水などのかさをあらわすときに使います。",
    "distractors": [
      "100dLです。",
      "長さをあらわすたんいです。"
    ],
    "choices": [
      "1Lは10dLです。水などのかさをあらわすときに使います。",
      "100dLです。",
      "長さをあらわすたんいです。"
    ],
    "blankPhrase": "10dL",
    "blankDistractors": [
      "100dL",
      "長さをあらわすたんい"
    ],
    "clozeText": "1Lは［　］です。水などのかさをあらわすときに使います。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "同じたんいになおします。",
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
        "prompt": "牛乳パックのかさをあらわすのによい単位はどれですか。",
        "choices": [
          "L",
          "m",
          "cm"
        ],
        "correct": "L",
        "explanation": "かさはLなどであらわします。"
      }
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n牛乳パックのかさをあらわすのによい単位はどれですか。",
      "choices": [
        "L",
        "m",
        "cm"
      ],
      "correct": "L",
      "explanation": "かさはLなどであらわします。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g2_09",
    "grade": 2,
    "unit": "時間",
    "concept": "時刻と時間",
    "title": "時刻と時間って なに？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「時刻と時間」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「時刻と時間」の せつめいを 1つ えらびましょう。",
    "rubyText": "「時刻と時間」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "時こくは『いつ』をあらわし、時間は『どれだけ長いか』をあらわします。",
    "distractors": [
      "時こくと時間はいつも同じです。",
      "時間は時計の数字だけです。"
    ],
    "choices": [
      "時こくは『いつ』をあらわし、時間は『どれだけ長いか』をあらわします。",
      "時こくと時間はいつも同じです。",
      "時間は時計の数字だけです。"
    ],
    "blankPhrase": "どれだけ長いか",
    "blankDistractors": [
      "時こくと時間はいつも同じ",
      "時間は時計の数字だけ"
    ],
    "clozeText": "時こくは『いつ』をあらわし、時間は『［　］』をあらわします。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "合う言葉をえらびます。",
        "clozeText": "始まりから終わりまでの長さを［　］といいます。",
        "blankChoices": [
          "時間",
          "時刻",
          "長さ"
        ],
        "blankCorrect": "時間",
        "explanation": "時間を表しています。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n合う言葉をえらびます。",
      "clozeText": "始まりから終わりまでの長さを［　］といいます。",
      "blankChoices": [
        "時間",
        "時刻",
        "長さ"
      ],
      "blankCorrect": "時間",
      "explanation": "時間を表しています。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g2_10",
    "grade": 2,
    "unit": "図形",
    "concept": "直角",
    "title": "直角って なに？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「直角」の せつめいを 1つ えらびましょう。",
    "simpleQuestion": "「直角」の せつめいを 1つ えらびましょう。",
    "rubyText": "「直角」の せつめいを 1つ えらびましょう。",
    "visual": "",
    "correctExplanation": "直角は、長方形や正方形のかどと同じ形の角です。",
    "distractors": [
      "どんな角も直角です。",
      "丸い形の角です。"
    ],
    "choices": [
      "直角は、長方形や正方形のかどと同じ形の角です。",
      "どんな角も直角です。",
      "丸い形の角です。"
    ],
    "blankPhrase": "長方形や正方形のかど",
    "blankDistractors": [
      "どんな角も直角",
      "丸い形の角"
    ],
    "clozeText": "直角は、［　］と同じ形の角です。",
    "hint": "三つの文を、はじめからゆっくり読みましょう。",
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
        "prompt": "形のとくちょうです。",
        "clozeText": "正方形には直角が［　］こあります。",
        "blankChoices": [
          "4",
          "3",
          "2"
        ],
        "blankCorrect": "4",
        "explanation": "正方形の4つの角は直角です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n形のとくちょうです。",
      "clozeText": "正方形には直角が［　］こあります。",
      "blankChoices": [
        "4",
        "3",
        "2"
      ],
      "blankCorrect": "4",
      "explanation": "正方形の4つの角は直角です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g3_01",
    "grade": 3,
    "unit": "わり算",
    "concept": "わり算",
    "title": "わり算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「わり算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「わり算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「わり算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "わり算は、同じ数ずつ分けたり、いくつ分あるかを出したりする計算です。",
    "distractors": [
      "ぜんぶを合わせる計算です。",
      "同じ数を何回も足す計算です。"
    ],
    "choices": [
      "わり算は、同じ数ずつ分けたり、いくつ分あるかを出したりする計算です。",
      "ぜんぶを合わせる計算です。",
      "同じ数を何回も足す計算です。"
    ],
    "blankPhrase": "同じ数ずつ分け",
    "blankDistractors": [
      "ぜんぶを合わせる計算",
      "同じ数を何回も足す計算"
    ],
    "clozeText": "わり算は、［　］たり、いくつ分あるかを出したりする計算です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "式を［　］に入る答えをえらびましょう。",
        "clozeText": "18÷6＝［　］",
        "blankChoices": [
          "3",
          "12",
          "108"
        ],
        "blankCorrect": "3",
        "explanation": "6が3つ分で18です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n式を［　］に入る答えをえらびましょう。",
      "clozeText": "18÷6＝［　］",
      "blankChoices": [
        "3",
        "12",
        "108"
      ],
      "blankCorrect": "3",
      "explanation": "6が3つ分で18です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g3_02",
    "grade": 3,
    "unit": "わり算",
    "concept": "あまり",
    "title": "あまりとは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「あまり」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「あまり」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「あまり」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "分けたあとに残った数を、あまりといいます。あまりは、わる数より小さくします。",
    "distractors": [
      "わる数より大きくします。",
      "いつもわる数と同じにします。"
    ],
    "choices": [
      "分けたあとに残った数を、あまりといいます。あまりは、わる数より小さくします。",
      "わる数より大きくします。",
      "いつもわる数と同じにします。"
    ],
    "blankPhrase": "わる数より小さく",
    "blankDistractors": [
      "わる数より大きくし",
      "いつもわる数と同じにし"
    ],
    "clozeText": "分けたあとに残った数を、あまりといいます。あまりは、［　］します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "この中で正しい答えはどれですか。",
        "choices": [
          "14÷4＝3あまり2",
          "14÷4＝2あまり6",
          "14÷4＝4あまり2"
        ],
        "correct": "14÷4＝3あまり2",
        "explanation": "あまりは4より小さい2です。"
      }
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\nこの中で正しい答えはどれですか。",
      "choices": [
        "14÷4＝3あまり2",
        "14÷4＝2あまり6",
        "14÷4＝4あまり2"
      ],
      "correct": "14÷4＝3あまり2",
      "explanation": "あまりは4より小さい2です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g3_03",
    "grade": 3,
    "unit": "かけ算",
    "concept": "かけ算の筆算",
    "title": "かけ算の筆算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「かけ算の筆算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「かけ算の筆算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「かけ算の筆算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "かけ算のひっ算は、一の位からじゅんにかけます。",
    "distractors": [
      "十の位だけをかけます。",
      "位をそろえずに計算します。"
    ],
    "choices": [
      "かけ算のひっ算は、一の位からじゅんにかけます。",
      "十の位だけをかけます。",
      "位をそろえずに計算します。"
    ],
    "blankPhrase": "一の位から",
    "blankDistractors": [
      "十の位だけをかけ",
      "位をそろえずに計算し"
    ],
    "clozeText": "かけ算のひっ算は、［　］じゅんにかけます。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n105×4はいくつですか。",
      "choices": [
        "420",
        "109",
        "405"
      ],
      "correct": "420",
      "explanation": "100×4＋5×4＝420です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g3_04",
    "grade": 3,
    "unit": "分数",
    "concept": "分数",
    "title": "分数とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「分数」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「分数」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「分数」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "分数は、1を同じ大きさに分けたうちの、いくつ分かをあらわします。",
    "distractors": [
      "ちがう大きさに分けます。",
      "いつも1より大きい数です。"
    ],
    "choices": [
      "分数は、1を同じ大きさに分けたうちの、いくつ分かをあらわします。",
      "ちがう大きさに分けます。",
      "いつも1より大きい数です。"
    ],
    "blankPhrase": "同じ大きさ",
    "blankDistractors": [
      "ちがう大きさに分け",
      "いつも1より大きい数"
    ],
    "clozeText": "分数は、1を［　］に分けたうちの、いくつ分かをあらわします。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "explanation": "分子3がいくつ分かをあらわします。"
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n分数を完成させます。",
      "clozeText": "1を8等分した5つ分は［　］",
      "blankChoices": [
        "8分の5",
        "5分の8",
        "8"
      ],
      "blankCorrect": "8分の5",
      "explanation": "8分の5です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g3_05",
    "grade": 3,
    "unit": "小数",
    "concept": "小数",
    "title": "小数とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「小数」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「小数」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「小数」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "小数は、1より小さいはしたの大きさもあらわせる数です。",
    "distractors": [
      "整数だけをあらわします。",
      "0.1は10と同じです。"
    ],
    "choices": [
      "小数は、1より小さいはしたの大きさもあらわせる数です。",
      "整数だけをあらわします。",
      "0.1は10と同じです。"
    ],
    "blankPhrase": "1より小さい",
    "blankDistractors": [
      "整数だけをあらわし",
      "0.1は10と同じ"
    ],
    "clozeText": "小数は、［　］はしたの大きさもあらわせる数です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n2.5と2.3ではどちらが大きいですか。",
      "choices": [
        "2.5",
        "2.3",
        "同じ"
      ],
      "correct": "2.5",
      "explanation": "一の位は同じで、十分の位5の方が大きいです。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g3_06",
    "grade": 3,
    "unit": "重さ",
    "concept": "gとkg",
    "title": "gとkgとは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「gとkg」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「gとkg」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「gとkg」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "1kgは1000gです。重いものはkg、軽いものはgであらわします。",
    "distractors": [
      "100gです。",
      "長さをあらわすたんいです。"
    ],
    "choices": [
      "1kgは1000gです。重いものはkg、軽いものはgであらわします。",
      "100gです。",
      "長さをあらわすたんいです。"
    ],
    "blankPhrase": "1000g",
    "blankDistractors": [
      "100g",
      "長さをあらわすたんい"
    ],
    "clozeText": "1kgは［　］です。重いものはkg、軽いものはgであらわします。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "同じたんいになおします。",
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
        "prompt": "ランドセルの重さをあらわすのによい単位はどれですか。",
        "choices": [
          "kg",
          "m",
          "L"
        ],
        "correct": "kg",
        "explanation": "重さなのでkgが適しています。"
      }
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\nランドセルの重さをあらわすのによい単位はどれですか。",
      "choices": [
        "kg",
        "m",
        "L"
      ],
      "correct": "kg",
      "explanation": "重さなのでkgが適しています。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g3_07",
    "grade": 3,
    "unit": "図形",
    "concept": "円",
    "title": "円とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「円」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「円」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「円」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "円の中心からまわりまでの長さを半径といいます。直径は半径の2倍です。",
    "distractors": [
      "半径の半分です。",
      "半径と同じです。"
    ],
    "choices": [
      "円の中心からまわりまでの長さを半径といいます。直径は半径の2倍です。",
      "半径の半分です。",
      "半径と同じです。"
    ],
    "blankPhrase": "半径の2倍",
    "blankDistractors": [
      "半径の半分",
      "半径と同じ"
    ],
    "clozeText": "円の中心からまわりまでの長さを半径といいます。直径は［　］です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n直径が10cmの円の半径は何cmですか。",
      "choices": [
        "5cm",
        "20cm",
        "10cm"
      ],
      "correct": "5cm",
      "explanation": "直径の半分が半径です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g3_08",
    "grade": 3,
    "unit": "表とグラフ",
    "concept": "棒グラフ",
    "title": "棒グラフとは？",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "「棒グラフ」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「棒グラフ」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「棒グラフ」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "棒グラフは、棒の長さで数の大きさをくらべるグラフです。",
    "distractors": [
      "棒の色だけでくらべます。",
      "角の大きさをくらべます。"
    ],
    "choices": [
      "棒グラフは、棒の長さで数の大きさをくらべるグラフです。",
      "棒の色だけでくらべます。",
      "角の大きさをくらべます。"
    ],
    "blankPhrase": "棒の長さ",
    "blankDistractors": [
      "棒の色だけでくらべ",
      "角の大きさをくらべ"
    ],
    "clozeText": "棒グラフは、［　］で数の大きさをくらべるグラフです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "棒グラフで数が最も多いのはどれですか。",
        "choices": [
          "いちばん長い棒",
          "いちばん短い棒",
          "色が濃い棒"
        ],
        "correct": "いちばん長い棒",
        "explanation": "棒の長さが数をあらわします。"
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\nAが10、Bが7のとき、AはBよりいくつ多いですか。",
      "choices": [
        "3",
        "17",
        "7"
      ],
      "correct": "3",
      "explanation": "10－7＝3です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g3_09",
    "grade": 3,
    "unit": "数量関係",
    "concept": "倍",
    "title": "倍とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「倍」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「倍」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「倍」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "倍は、もとの数のいくつ分かをあらわします。",
    "distractors": [
      "二つの数のちがいだけです。",
      "二つの数を足した答えです。"
    ],
    "choices": [
      "倍は、もとの数のいくつ分かをあらわします。",
      "二つの数のちがいだけです。",
      "二つの数を足した答えです。"
    ],
    "blankPhrase": "いくつ分",
    "blankDistractors": [
      "二つの数のちがいだけ",
      "二つの数を足した答え"
    ],
    "clozeText": "倍は、もとの数の［　］かをあらわします。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "倍を出します。",
        "clozeText": "くらべる量÷もとにする量＝［　］",
        "blankChoices": [
          "何倍",
          "合計",
          "差"
        ],
        "blankCorrect": "何倍",
        "explanation": "割り算で何倍かを出します。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n倍を出します。",
      "clozeText": "くらべる量÷もとにする量＝［　］",
      "blankChoices": [
        "何倍",
        "合計",
        "差"
      ],
      "blankCorrect": "何倍",
      "explanation": "割り算で何倍かを出します。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g3_10",
    "grade": 3,
    "unit": "式",
    "concept": "等号",
    "title": "等号とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「等号」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「等号」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「等号」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "＝は、左と右の大きさが同じというしるしです。",
    "distractors": [
      "左のほうが大きいしるしです。",
      "計算を終わらせるだけのしるしです。"
    ],
    "choices": [
      "＝は、左と右の大きさが同じというしるしです。",
      "左のほうが大きいしるしです。",
      "計算を終わらせるだけのしるしです。"
    ],
    "blankPhrase": "同じ",
    "blankDistractors": [
      "左のほうが大きいしるし",
      "計算を終わらせるだけのしるし"
    ],
    "clozeText": "＝は、左と右の大きさが［　］というしるしです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "この中で正しい式はどれですか。",
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
        "clozeText": "＝の左右は数が［　］です。",
        "blankChoices": [
          "同じ",
          "必ず違う",
          "0"
        ],
        "blankCorrect": "同じ",
        "explanation": "等号は等しいことをあらわします。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n等号の意味です。",
      "clozeText": "＝の左右は数が［　］です。",
      "blankChoices": [
        "同じ",
        "必ず違う",
        "0"
      ],
      "blankCorrect": "同じ",
      "explanation": "等号は等しいことをあらわします。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g4_01",
    "grade": 4,
    "unit": "大きな数",
    "concept": "億・兆",
    "title": "億・兆とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「億・兆」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「億・兆」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「億・兆」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "大きな数は、右から4けたずつ区切ると読みやすくなります。万、億、兆のじゅんです。",
    "distractors": [
      "3けたずつ区切ります。",
      "億は万より小さいです。"
    ],
    "choices": [
      "大きな数は、右から4けたずつ区切ると読みやすくなります。万、億、兆のじゅんです。",
      "3けたずつ区切ります。",
      "億は万より小さいです。"
    ],
    "blankPhrase": "4けたずつ",
    "blankDistractors": [
      "3けたずつ区切り",
      "億は万より小さい"
    ],
    "clozeText": "大きな数は、右から［　］区切ると読みやすくなります。万、億、兆のじゅんです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n1兆は1億がいくつ集まった数ですか。",
      "choices": [
        "10000",
        "100",
        "10"
      ],
      "correct": "10000",
      "explanation": "1兆＝10000億です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g4_02",
    "grade": 4,
    "unit": "概数",
    "concept": "四捨五入",
    "title": "四捨五入とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「四捨五入」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「四捨五入」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「四捨五入」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "四捨五入は、次の位が0から4なら下げ、5から9なら上げます。",
    "distractors": [
      "0から4なら上げます。",
      "いつも下げます。"
    ],
    "choices": [
      "四捨五入は、次の位が0から4なら下げ、5から9なら上げます。",
      "0から4なら上げます。",
      "いつも下げます。"
    ],
    "blankPhrase": "0から4なら下げ",
    "blankDistractors": [
      "0から4なら上げ",
      "いつも下げ"
    ],
    "clozeText": "四捨五入は、次の位が［　］、5から9なら上げます。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n四捨五入します。",
      "clozeText": "4850を千の位までの概数にすると［　］",
      "blankChoices": [
        "5000",
        "4000",
        "4800"
      ],
      "blankCorrect": "5000",
      "explanation": "百の位8なので切り上げます。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g4_03",
    "grade": 4,
    "unit": "わり算",
    "concept": "わり算の筆算",
    "title": "わり算の筆算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「わり算の筆算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「わり算の筆算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「わり算の筆算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "わり算のひっ算は、たてる、かける、ひく、おろす、のじゅんです。",
    "distractors": [
      "足すだけで計算します。",
      "一の位だけを見ます。"
    ],
    "choices": [
      "わり算のひっ算は、たてる、かける、ひく、おろす、のじゅんです。",
      "足すだけで計算します。",
      "一の位だけを見ます。"
    ],
    "blankPhrase": "たてる、かける、ひく、おろす",
    "blankDistractors": [
      "足すだけで計算し",
      "一の位だけを見"
    ],
    "clozeText": "わり算のひっ算は、［　］、のじゅんです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n筆算の手順です。",
      "clozeText": "たてる、かける、［　］、おろす",
      "blankChoices": [
        "ひく",
        "たす",
        "わる"
      ],
      "blankCorrect": "ひく",
      "explanation": "かけた数を引きます。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g4_04",
    "grade": 4,
    "unit": "小数",
    "concept": "小数のたし算・ひき算",
    "title": "小数のたし算・ひき算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「小数のたし算・ひき算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「小数のたし算・ひき算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「小数のたし算・ひき算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "小数のたし算とひき算は、小数点をたてにそろえて計算します。",
    "distractors": [
      "数字の左だけをそろえます。",
      "小数点を消します。"
    ],
    "choices": [
      "小数のたし算とひき算は、小数点をたてにそろえて計算します。",
      "数字の左だけをそろえます。",
      "小数点を消します。"
    ],
    "blankPhrase": "小数点をたてにそろえて",
    "blankDistractors": [
      "数字の左だけをそろえ",
      "小数点を消し"
    ],
    "clozeText": "小数のたし算とひき算は、［　］計算します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n0.75＋0.6はいくつですか。",
      "choices": [
        "1.35",
        "0.81",
        "13.5"
      ],
      "correct": "1.35",
      "explanation": "0.75＋0.60＝1.35です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g4_05",
    "grade": 4,
    "unit": "分数",
    "concept": "同分母分数",
    "title": "同分母分数とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「同分母分数」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「同分母分数」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「同分母分数」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "分母が同じ分数は、分母はそのままにして、分子を計算します。",
    "distractors": [
      "分母どうしを足します。",
      "分子と分母をどちらも足します。"
    ],
    "choices": [
      "分母が同じ分数は、分母はそのままにして、分子を計算します。",
      "分母どうしを足します。",
      "分子と分母をどちらも足します。"
    ],
    "blankPhrase": "分母はそのまま",
    "blankDistractors": [
      "分母どうしを足し",
      "分子と分母をどちらも足し"
    ],
    "clozeText": "分母が同じ分数は、［　］にして、分子を計算します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n8分の3＋8分の4はいくつですか。",
      "choices": [
        "8分の7",
        "16分の7",
        "8分の1"
      ],
      "correct": "8分の7",
      "explanation": "分母は8のままです。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g4_06",
    "grade": 4,
    "unit": "面積",
    "concept": "面積",
    "title": "面積とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「面積」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「面積」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「面積」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "面積は、平らなところの広さです。",
    "distractors": [
      "まわりの長さです。",
      "ものの重さです。"
    ],
    "choices": [
      "面積は、平らなところの広さです。",
      "まわりの長さです。",
      "ものの重さです。"
    ],
    "blankPhrase": "平らなところの広さ",
    "blankDistractors": [
      "まわりの長さ",
      "ものの重さ"
    ],
    "clozeText": "面積は、［　］です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n長方形の面積を求める式はどれですか。",
      "choices": [
        "たて×横",
        "たて＋横",
        "たて×2＋横×2"
      ],
      "correct": "たて×横",
      "explanation": "たて×横です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g4_07",
    "grade": 4,
    "unit": "角",
    "concept": "角度",
    "title": "角度とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「角度」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「角度」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「角度」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "角度は、角がどれだけ開いているかをあらわす数です。",
    "distractors": [
      "辺の長さをあらわします。",
      "面積をあらわします。"
    ],
    "choices": [
      "角度は、角がどれだけ開いているかをあらわす数です。",
      "辺の長さをあらわします。",
      "面積をあらわします。"
    ],
    "blankPhrase": "どれだけ開いているか",
    "blankDistractors": [
      "辺の長さをあらわし",
      "面積をあらわし"
    ],
    "clozeText": "角度は、角が［　］をあらわす数です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n角度を答えます。",
      "clozeText": "1回転の角は［　］度",
      "blankChoices": [
        "360",
        "180",
        "90"
      ],
      "blankCorrect": "360",
      "explanation": "1回転は360度です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g4_08",
    "grade": 4,
    "unit": "図形",
    "concept": "垂直と平行",
    "title": "垂直と平行とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「垂直と平行」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「垂直と平行」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「垂直と平行」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "2本の線が直角にまじわると垂直です。どこまでのばしてもまじわらないと平行です。",
    "distractors": [
      "まじわらない線が垂直です。",
      "垂直と平行は同じです。"
    ],
    "choices": [
      "2本の線が直角にまじわると垂直です。どこまでのばしてもまじわらないと平行です。",
      "まじわらない線が垂直です。",
      "垂直と平行は同じです。"
    ],
    "blankPhrase": "直角にまじわる",
    "blankDistractors": [
      "まじわらない線が垂直",
      "垂直と平行は同じ"
    ],
    "clozeText": "2本の線が［　］と垂直です。どこまでのばしてもまじわらないと平行です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "2本の直線が90度で交わっています。このつながりは何ですか。",
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
        "prompt": "線路の2本のレールのようなつながりは何ですか。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n言葉を完成させます。",
      "clozeText": "どこまでのばしても交わらない2直線を［　］といいます。",
      "blankChoices": [
        "平行",
        "垂直",
        "直角"
      ],
      "blankCorrect": "平行",
      "explanation": "平行です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g4_09",
    "grade": 4,
    "unit": "グラフ",
    "concept": "折れ線グラフ",
    "title": "折れ線グラフとは？",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "「折れ線グラフ」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「折れ線グラフ」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「折れ線グラフ」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "折れ線グラフは、時間とともに数がどうかわったかを見るグラフです。",
    "distractors": [
      "形の広さを見るグラフです。",
      "数のかわり方は見られません。"
    ],
    "choices": [
      "折れ線グラフは、時間とともに数がどうかわったかを見るグラフです。",
      "形の広さを見るグラフです。",
      "数のかわり方は見られません。"
    ],
    "blankPhrase": "どうかわったか",
    "blankDistractors": [
      "形の広さを見るグラフ",
      "数のかわり方は見られません。"
    ],
    "clozeText": "折れ線グラフは、時間とともに数が［　］を見るグラフです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "気温の1日の変化をあらわすのによいグラフはどれですか。",
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
        "prompt": "線が右上がりの部分では数はどうなっていますか。",
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
        "clozeText": "線が水平なら数は［　］います。",
        "blankChoices": [
          "変わらずに",
          "増えて",
          "減って"
        ],
        "blankCorrect": "変わらずに",
        "explanation": "水平なら変化しません。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\nグラフを読みます。",
      "clozeText": "線が水平なら数は［　］います。",
      "blankChoices": [
        "変わらずに",
        "増えて",
        "減って"
      ],
      "blankCorrect": "変わらずに",
      "explanation": "水平なら変化しません。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g4_10",
    "grade": 4,
    "unit": "立体",
    "concept": "直方体と立方体",
    "title": "直方体と立方体とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「直方体と立方体」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「直方体と立方体」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「直方体と立方体」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "直方体は長方形の面でできています。立方体は同じ大きさの正方形6まいでできています。",
    "distractors": [
      "三角形4まいです。",
      "面は5まいです。"
    ],
    "choices": [
      "直方体は長方形の面でできています。立方体は同じ大きさの正方形6まいでできています。",
      "三角形4まいです。",
      "面は5まいです。"
    ],
    "blankPhrase": "正方形6まい",
    "blankDistractors": [
      "三角形4まい",
      "面は5まい"
    ],
    "clozeText": "直方体は長方形の面でできています。立方体は同じ大きさの［　］でできています。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "立方体のとくちょうです。",
        "clozeText": "立方体は合同な［　］で囲まれています。",
        "blankChoices": [
          "正方形6枚",
          "長方形4枚",
          "三角形8枚"
        ],
        "blankCorrect": "正方形6枚",
        "explanation": "正方形6枚です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n立方体のとくちょうです。",
      "clozeText": "立方体は合同な［　］で囲まれています。",
      "blankChoices": [
        "正方形6枚",
        "長方形4枚",
        "三角形8枚"
      ],
      "blankCorrect": "正方形6枚",
      "explanation": "正方形6枚です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g5_01",
    "grade": 5,
    "unit": "平均",
    "concept": "平均",
    "title": "平均とは？",
    "difficulty": 2,
    "professor": "アルベルト教授",
    "question": "「平均」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「平均」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「平均」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "平均は、いくつかの数を同じ大きさにならしたときの、1つ分の数です。",
    "distractors": [
      "いちばん大きい数です。",
      "ぜんぶを足した数です。"
    ],
    "choices": [
      "平均は、いくつかの数を同じ大きさにならしたときの、1つ分の数です。",
      "いちばん大きい数です。",
      "ぜんぶを足した数です。"
    ],
    "blankPhrase": "同じ大きさにならした",
    "blankDistractors": [
      "いちばん大きい数",
      "ぜんぶを足した数"
    ],
    "clozeText": "平均は、いくつかの数を［　］ときの、1つ分の数です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "平均を出します。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n12ページ、18ページ、15ページの1日平均は何ページですか。",
      "choices": [
        "15ページ",
        "45ページ",
        "3ページ"
      ],
      "correct": "15ページ",
      "explanation": "45÷3＝15ページです。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_02",
    "grade": 5,
    "unit": "平均",
    "concept": "平均の求め方",
    "title": "平均の求め方とは？",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "「平均の求め方」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「平均の求め方」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「平均の求め方」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "平均は、ぜんぶの数を足して、数のこ数でわって出します。",
    "distractors": [
      "いちばん大きい数でわります。",
      "いちばん大きい数と小さい数を足します。"
    ],
    "choices": [
      "平均は、ぜんぶの数を足して、数のこ数でわって出します。",
      "いちばん大きい数でわります。",
      "いちばん大きい数と小さい数を足します。"
    ],
    "blankPhrase": "数のこ数",
    "blankDistractors": [
      "いちばん大きい数でわり",
      "いちばん大きい数と小さい数を足し"
    ],
    "clozeText": "平均は、ぜんぶの数を足して、［　］でわって出します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "［　］に入る数をえらびます。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n5回の記録の合計が60mです。平均は何mですか。",
      "choices": [
        "12m",
        "55m",
        "300m"
      ],
      "correct": "12m",
      "explanation": "60÷5＝12です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_03",
    "grade": 5,
    "unit": "単位量あたり",
    "concept": "単位量あたりの大きさ",
    "title": "単位量あたりの大きさとは？",
    "difficulty": 2,
    "professor": "ヴェロ教授",
    "question": "「単位量あたりの大きさ」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「単位量あたりの大きさ」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「単位量あたりの大きさ」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "単位量あたりの大きさは、どちらか一方を1にしたときの、もう一方の大きさです。",
    "distractors": [
      "二つの数を足した答えです。",
      "一方を0にした大きさです。"
    ],
    "choices": [
      "単位量あたりの大きさは、どちらか一方を1にしたときの、もう一方の大きさです。",
      "二つの数を足した答えです。",
      "一方を0にした大きさです。"
    ],
    "blankPhrase": "一方を1",
    "blankDistractors": [
      "二つの数を足した答え",
      "一方を0にした大きさ"
    ],
    "clozeText": "単位量あたりの大きさは、どちらか［　］にしたときの、もう一方の大きさです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "1あたりを出します。",
        "clozeText": "8Lで120km進む車は、1Lあたり［　］kmです。",
        "blankChoices": [
          "15",
          "112",
          "960"
        ],
        "blankCorrect": "15",
        "explanation": "120÷8＝15です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n1あたりを出します。",
      "clozeText": "8Lで120km進む車は、1Lあたり［　］kmです。",
      "blankChoices": [
        "15",
        "112",
        "960"
      ],
      "blankCorrect": "15",
      "explanation": "120÷8＝15です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g5_04",
    "grade": 5,
    "unit": "速さ",
    "concept": "速さ",
    "title": "速さとは？",
    "difficulty": 2,
    "professor": "ヴェロ教授",
    "question": "「速さ」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「速さ」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「速さ」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "速さは、1時間や1分などに、どれだけ進むかをあらわします。",
    "distractors": [
      "道のりと時間を足した数です。",
      "進んだ時間だけです。"
    ],
    "choices": [
      "速さは、1時間や1分などに、どれだけ進むかをあらわします。",
      "道のりと時間を足した数です。",
      "進んだ時間だけです。"
    ],
    "blankPhrase": "どれだけ進むか",
    "blankDistractors": [
      "道のりと時間を足した数",
      "進んだ時間だけ"
    ],
    "clozeText": "速さは、1時間や1分などに、［　］をあらわします。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "速さを出します。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n300mを60秒で走る速さは秒速何mですか。",
      "choices": [
        "5m",
        "360m",
        "18000m"
      ],
      "correct": "5m",
      "explanation": "300÷60＝5です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_05",
    "grade": 5,
    "unit": "割合",
    "concept": "割合",
    "title": "割合とは？",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "「割合」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「割合」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「割合」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "割合は、くらべる数が、もとにする数の何倍かをあらわします。",
    "distractors": [
      "二つの数のちがいです。",
      "二つの数を足した答えです。"
    ],
    "choices": [
      "割合は、くらべる数が、もとにする数の何倍かをあらわします。",
      "二つの数のちがいです。",
      "二つの数を足した答えです。"
    ],
    "blankPhrase": "何倍か",
    "blankDistractors": [
      "二つの数のちがい",
      "二つの数を足した答え"
    ],
    "clozeText": "割合は、くらべる数が、もとにする数の［　］をあらわします。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
    "practiceKind": "manual",
    "practiceItems": [
      {
        "type": "choice",
        "prompt": "もとにする量100、くらべる量40の割合はいくつですか。",
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
        "prompt": "割合を出します。",
        "clozeText": "くらべる量÷［　］＝割合",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n50人中20人の割合はいくつですか。",
      "choices": [
        "0.4",
        "2.5",
        "30"
      ],
      "correct": "0.4",
      "explanation": "20÷50＝0.4です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_06",
    "grade": 5,
    "unit": "割合",
    "concept": "百分率",
    "title": "百分率とは？",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "「百分率」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「百分率」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「百分率」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "百分率は、100をもとにして割合をあらわす方法です。％を使います。",
    "distractors": [
      "10だけをもとにします。",
      "長さをあらわします。"
    ],
    "choices": [
      "百分率は、100をもとにして割合をあらわす方法です。％を使います。",
      "10だけをもとにします。",
      "長さをあらわします。"
    ],
    "blankPhrase": "100をもと",
    "blankDistractors": [
      "10だけをもとにし",
      "長さをあらわし"
    ],
    "clozeText": "百分率は、［　］にして割合をあらわす方法です。％を使います。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "25％を小数であらわすとどれですか。",
        "choices": [
          "0.25",
          "2.5",
          "25"
        ],
        "correct": "0.25",
        "explanation": "25÷100＝0.25です。"
      }
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n25％を小数であらわすとどれですか。",
      "choices": [
        "0.25",
        "2.5",
        "25"
      ],
      "correct": "0.25",
      "explanation": "25÷100＝0.25です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_07",
    "grade": 5,
    "unit": "小数の計算",
    "concept": "小数のかけ算",
    "title": "小数のかけ算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「小数のかけ算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「小数のかけ算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「小数のかけ算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "小数のかけ算は、まず整数のように計算して、あとで小数点をつけます。",
    "distractors": [
      "小数点をつけません。",
      "小数点をいちばん左につけます。"
    ],
    "choices": [
      "小数のかけ算は、まず整数のように計算して、あとで小数点をつけます。",
      "小数点をつけません。",
      "小数点をいちばん左につけます。"
    ],
    "blankPhrase": "あとで小数点",
    "blankDistractors": [
      "小数点をつけません。",
      "小数点をいちばん左につけ"
    ],
    "clozeText": "小数のかけ算は、まず整数のように計算して、［　］をつけます。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n計算します。",
      "clozeText": "0.4×0.3＝［　］",
      "blankChoices": [
        "0.12",
        "1.2",
        "12"
      ],
      "blankCorrect": "0.12",
      "explanation": "4×3＝12で小数2桁です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g5_08",
    "grade": 5,
    "unit": "分数",
    "concept": "通分",
    "title": "通分とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「通分」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「通分」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「通分」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "通分は、分数の大きさをかえずに、分母を同じにすることです。",
    "distractors": [
      "分子だけを同じにします。",
      "分数の大きさをかえます。"
    ],
    "choices": [
      "通分は、分数の大きさをかえずに、分母を同じにすることです。",
      "分子だけを同じにします。",
      "分数の大きさをかえます。"
    ],
    "blankPhrase": "分母を同じ",
    "blankDistractors": [
      "分子だけを同じにし",
      "分数の大きさをかえ"
    ],
    "clozeText": "通分は、分数の大きさをかえずに、［　］にすることです。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n3分の2＋6分の1はいくつですか。",
      "choices": [
        "6分の5",
        "9分の3",
        "6分の3"
      ],
      "correct": "6分の5",
      "explanation": "3分の2＝6分の4です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_09",
    "grade": 5,
    "unit": "体積",
    "concept": "体積",
    "title": "体積とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「体積」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「体積」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「体積」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "直方体の体積は、たて×横×高さで出します。",
    "distractors": [
      "たて＋横＋高さで出します。",
      "たて×横だけで出します。"
    ],
    "choices": [
      "直方体の体積は、たて×横×高さで出します。",
      "たて＋横＋高さで出します。",
      "たて×横だけで出します。"
    ],
    "blankPhrase": "たて×横×高さ",
    "blankDistractors": [
      "たて＋横＋高さで出し",
      "たて×横だけで出し"
    ],
    "clozeText": "直方体の体積は、［　］で出します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n縦2m、横3m、高さ2mの体積は何立方mですか。",
      "choices": [
        "12立方m",
        "7立方m",
        "6立方m"
      ],
      "correct": "12立方m",
      "explanation": "2×3×2＝12です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g5_10",
    "grade": 5,
    "unit": "図形",
    "concept": "合同",
    "title": "合同とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「合同」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「合同」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「合同」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "合同な図形は、形も大きさも同じで、重ねるとぴったり合います。",
    "distractors": [
      "形だけ同じなら合同です。",
      "面積だけ同じなら合同です。"
    ],
    "choices": [
      "合同な図形は、形も大きさも同じで、重ねるとぴったり合います。",
      "形だけ同じなら合同です。",
      "面積だけ同じなら合同です。"
    ],
    "blankPhrase": "形も大きさも同じ",
    "blankDistractors": [
      "形だけ同じなら合同",
      "面積だけ同じなら合同"
    ],
    "clozeText": "合同な図形は、［　］で、重ねるとぴったり合います。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n合同の意味です。",
      "clozeText": "合同な図形は、形と［　］が同じです。",
      "blankChoices": [
        "大きさ",
        "色",
        "向きだけ"
      ],
      "blankCorrect": "大きさ",
      "explanation": "大きさも同じです。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g6_01",
    "grade": 6,
    "unit": "分数の計算",
    "concept": "分数のかけ算",
    "title": "分数のかけ算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「分数のかけ算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「分数のかけ算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「分数のかけ算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "分数のかけ算は、分子どうし、分母どうしをかけます。できるときは約分します。",
    "distractors": [
      "分子と分母をそれぞれ足します。",
      "分母だけをかけます。"
    ],
    "choices": [
      "分数のかけ算は、分子どうし、分母どうしをかけます。できるときは約分します。",
      "分子と分母をそれぞれ足します。",
      "分母だけをかけます。"
    ],
    "blankPhrase": "分子どうし、分母どうし",
    "blankDistractors": [
      "分子と分母をそれぞれ足し",
      "分母だけをかけ"
    ],
    "clozeText": "分数のかけ算は、［　］をかけます。できるときは約分します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n5分の2×4分の5はいくつですか。",
      "choices": [
        "2分の1",
        "20分の10",
        "1"
      ],
      "correct": "2分の1",
      "explanation": "20分の10を約分して2分の1です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_02",
    "grade": 6,
    "unit": "分数の計算",
    "concept": "分数のわり算",
    "title": "分数のわり算とは？",
    "difficulty": 2,
    "professor": "ニュメロ教授",
    "question": "「分数のわり算」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「分数のわり算」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「分数のわり算」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "分数のわり算は、わる数をひっくり返して、かけ算にします。",
    "distractors": [
      "わる数をそのまま足します。",
      "わられる数をひっくり返します。"
    ],
    "choices": [
      "分数のわり算は、わる数をひっくり返して、かけ算にします。",
      "わる数をそのまま足します。",
      "わられる数をひっくり返します。"
    ],
    "blankPhrase": "わる数をひっくり返して",
    "blankDistractors": [
      "わる数をそのまま足し",
      "わられる数をひっくり返し"
    ],
    "clozeText": "分数のわり算は、［　］、かけ算にします。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n5分の3÷2はいくつですか。",
      "choices": [
        "10分の3",
        "5分の6",
        "5分の1"
      ],
      "correct": "10分の3",
      "explanation": "5分の3×2分の1＝10分の3です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_03",
    "grade": 6,
    "unit": "比",
    "concept": "比",
    "title": "比とは？",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "「比」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「比」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「比」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "比は、二つの数の大きさを、3対5のようにくらべてあらわす方法です。",
    "distractors": [
      "二つの数を足した答えです。",
      "二つの数のちがいだけです。"
    ],
    "choices": [
      "比は、二つの数の大きさを、3対5のようにくらべてあらわす方法です。",
      "二つの数を足した答えです。",
      "二つの数のちがいだけです。"
    ],
    "blankPhrase": "二つの数の大きさ",
    "blankDistractors": [
      "二つの数を足した答え",
      "二つの数のちがいだけ"
    ],
    "clozeText": "比は、［　］を、3対5のようにくらべてあらわす方法です。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n4対10と等しい比はどれですか。",
      "choices": [
        "2対5",
        "4対5",
        "8対10"
      ],
      "correct": "2対5",
      "explanation": "4対10を2で割ると2対5です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_04",
    "grade": 6,
    "unit": "比例と反比例",
    "concept": "比例",
    "title": "比例とは？",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "「比例」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「比例」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「比例」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "比例では、一方が2倍、3倍になると、もう一方も2倍、3倍になります。",
    "distractors": [
      "もう一方は半分になります。",
      "もう一方はかわりません。"
    ],
    "choices": [
      "比例では、一方が2倍、3倍になると、もう一方も2倍、3倍になります。",
      "もう一方は半分になります。",
      "もう一方はかわりません。"
    ],
    "blankPhrase": "もう一方も2倍、3倍",
    "blankDistractors": [
      "もう一方は半分になり",
      "もう一方はかわりません。"
    ],
    "clozeText": "比例では、一方が2倍、3倍になると、［　］になります。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n比例しているとき、xが4倍になるとyはどうなりますか。",
      "choices": [
        "4倍",
        "半分",
        "変わらない"
      ],
      "correct": "4倍",
      "explanation": "比例では同じ倍率です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_05",
    "grade": 6,
    "unit": "比例と反比例",
    "concept": "反比例",
    "title": "反比例とは？",
    "difficulty": 2,
    "professor": "レシオ教授",
    "question": "「反比例」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「反比例」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「反比例」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "反比例では、一方が2倍になると、もう一方は半分になります。",
    "distractors": [
      "もう一方も2倍になります。",
      "二つの数はいつも同じです。"
    ],
    "choices": [
      "反比例では、一方が2倍になると、もう一方は半分になります。",
      "もう一方も2倍になります。",
      "二つの数はいつも同じです。"
    ],
    "blankPhrase": "もう一方は半分",
    "blankDistractors": [
      "もう一方も2倍になり",
      "二つの数はいつも同じ"
    ],
    "clozeText": "反比例では、一方が2倍になると、［　］になります。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n面積24平方cmの長方形で横を3cmにすると縦は何cmですか。",
      "choices": [
        "8cm",
        "21cm",
        "72cm"
      ],
      "correct": "8cm",
      "explanation": "3×8＝24です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_06",
    "grade": 6,
    "unit": "図形",
    "concept": "線対称",
    "title": "線対称とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「線対称」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「線対称」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「線対称」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "線対称な図形は、ある線でおると、左右がぴったり重なります。",
    "distractors": [
      "回すときだけ重なります。",
      "面積が同じなら線対称です。"
    ],
    "choices": [
      "線対称な図形は、ある線でおると、左右がぴったり重なります。",
      "回すときだけ重なります。",
      "面積が同じなら線対称です。"
    ],
    "blankPhrase": "左右がぴったり重なります",
    "blankDistractors": [
      "回すときだけ重なり",
      "面積が同じなら線対称"
    ],
    "clozeText": "線対称な図形は、ある線でおると、［　］。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n線対称の意味です。",
      "clozeText": "対称の軸で折ると両側が［　］重なります。",
      "blankChoices": [
        "ぴったり",
        "少しだけ",
        "重ならず"
      ],
      "blankCorrect": "ぴったり",
      "explanation": "線対称の定義です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  },
  {
    "id": "g6_07",
    "grade": 6,
    "unit": "図形",
    "concept": "点対称",
    "title": "点対称とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「点対称」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「点対称」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「点対称」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "点対称な図形は、ある点を中心に半回転すると、もとの形に重なります。",
    "distractors": [
      "90度だけ回します。",
      "線でおると重なります。"
    ],
    "choices": [
      "点対称な図形は、ある点を中心に半回転すると、もとの形に重なります。",
      "90度だけ回します。",
      "線でおると重なります。"
    ],
    "blankPhrase": "半回転",
    "blankDistractors": [
      "90度だけ回し",
      "線でおると重なり"
    ],
    "clozeText": "点対称な図形は、ある点を中心に［　］すると、もとの形に重なります。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n点対称な図形で、対応する点と中心を結ぶと中心はどこにありますか。",
      "choices": [
        "線分の中点",
        "端",
        "図形の外だけ"
      ],
      "correct": "線分の中点",
      "explanation": "中心が対応点を結ぶ線分の中点です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_08",
    "grade": 6,
    "unit": "面積",
    "concept": "円の面積",
    "title": "円の面積とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「円の面積」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「円の面積」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「円の面積」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "円の面積は、半径×半径×3.14で出します。",
    "distractors": [
      "直径×3.14だけで出します。",
      "半径＋半径＋3.14で出します。"
    ],
    "choices": [
      "円の面積は、半径×半径×3.14で出します。",
      "直径×3.14だけで出します。",
      "半径＋半径＋3.14で出します。"
    ],
    "blankPhrase": "半径×半径×3.14",
    "blankDistractors": [
      "直径×3.14だけで出し",
      "半径＋半径＋3.14で出し"
    ],
    "clozeText": "円の面積は、［　］で出します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n直径10cmの円の半径は何cmですか。",
      "choices": [
        "5cm",
        "10cm",
        "20cm"
      ],
      "correct": "5cm",
      "explanation": "半径は直径の半分です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_09",
    "grade": 6,
    "unit": "体積",
    "concept": "角柱・円柱の体積",
    "title": "角柱・円柱の体積とは？",
    "difficulty": 2,
    "professor": "ジオメト教授",
    "question": "「角柱・円柱の体積」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「角柱・円柱の体積」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「角柱・円柱の体積」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "角柱や円柱の体積は、底面積×高さで出します。",
    "distractors": [
      "底面積＋高さで出します。",
      "まわりの長さ×高さで出します。"
    ],
    "choices": [
      "角柱や円柱の体積は、底面積×高さで出します。",
      "底面積＋高さで出します。",
      "まわりの長さ×高さで出します。"
    ],
    "blankPhrase": "底面積×高さ",
    "blankDistractors": [
      "底面積＋高さで出し",
      "まわりの長さ×高さで出し"
    ],
    "clozeText": "角柱や円柱の体積は、［　］で出します。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
    ],
    "finalTest": {
      "type": "choice",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n三角柱の底面積が15平方cm、高さ8cmです。体積は何立方cmですか。",
      "choices": [
        "120立方cm",
        "23立方cm",
        "60立方cm"
      ],
      "correct": "120立方cm",
      "explanation": "15×8＝120です。",
      "teacherNote": "答えだけでなく、問題に合う考え方ができているかを見てください。"
    }
  },
  {
    "id": "g6_10",
    "grade": 6,
    "unit": "データ",
    "concept": "代表値",
    "title": "代表値とは？",
    "difficulty": 2,
    "professor": "メディアン教授",
    "question": "「代表値」の正しいせつめいを1つえらびましょう。",
    "simpleQuestion": "「代表値」の正しいせつめいを1つえらびましょう。",
    "rubyText": "「代表値」の正しいせつめいを1つえらびましょう。",
    "visual": "",
    "correctExplanation": "データのようすを見る数には、平均値、中央値、最頻値などがあります。",
    "distractors": [
      "いちばん大きい数だけを使います。",
      "三つの数はいつも同じになります。"
    ],
    "choices": [
      "データのようすを見る数には、平均値、中央値、最頻値などがあります。",
      "いちばん大きい数だけを使います。",
      "三つの数はいつも同じになります。"
    ],
    "blankPhrase": "平均値、中央値、最頻値",
    "blankDistractors": [
      "いちばん大きい数だけを使い",
      "三つの数はいつも同じになり"
    ],
    "clozeText": "データのようすを見る数には、［　］などがあります。",
    "hint": "三つの文をゆっくり読み、意味が合うものをえらびましょう。",
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
        "prompt": "平均値を出します。",
        "clozeText": "2、4、6の平均値は［　］",
        "blankChoices": [
          "4",
          "12",
          "3"
        ],
        "blankCorrect": "4",
        "explanation": "合計12÷3＝4です。"
      }
    ],
    "finalTest": {
      "type": "cloze",
      "prompt": "さいごの かくにんテストです。自分の力で こたえましょう。\n平均値を出します。",
      "clozeText": "2、4、6の平均値は［　］",
      "blankChoices": [
        "4",
        "12",
        "3"
      ],
      "blankCorrect": "4",
      "explanation": "合計12÷3＝4です。",
      "teacherNote": "答えと、問題に合う計算が選べているかを見てください。"
    }
  }
]
};
