const questions = [
  {
    itemNumber: 1,
    text: "Do I feel that I am the life of the party?",
    domain: "E",
    facetCode: "E2",
    facetName: "Gregariousness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 2,
    text: "Do I feel little concern for others?",
    domain: "A",
    facetCode: "A6",
    facetName: "Sympathy",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 3,
    text: "Do I usually start tasks right away?",
    domain: "C",
    facetCode: "C5",
    facetName: "Self-Discipline",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 4,
    text: "Do I get stressed out easily?",
    domain: "N",
    facetCode: "N1",
    facetName: "Anxiety",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 5,
    text: "Do I have a rich vocabulary?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 6,
    text: "Do I usually avoid talking a lot?",
    domain: "E",
    facetCode: "E2",
    facetName: "Gregariousness",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 7,
    text: "Do I sympathize with the feelings of others?",
    domain: "A",
    facetCode: "A6",
    facetName: "Sympathy",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 8,
    text: "Do I pay close attention to details?",
    domain: "C",
    facetCode: "C2",
    facetName: "Orderliness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 9,
    text: "Do I often feel blue or down?",
    domain: "N",
    facetCode: "N3",
    facetName: "Depression",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 10,
    text: "Am I quick to understand new things?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 11,
    text: "Do I often start conversations with others?",
    domain: "E",
    facetCode: "E3",
    facetName: "Assertiveness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 12,
    text: "Am I not interested in other people’s problems?",
    domain: "A",
    facetCode: "A3",
    facetName: "Altruism",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 13,
    text: "Do I usually follow a schedule?",
    domain: "C",
    facetCode: "C2",
    facetName: "Orderliness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 14,
    text: "Do I often worry about things?",
    domain: "N",
    facetCode: "N1",
    facetName: "Anxiety",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 15,
    text: "Do I come up with excellent ideas?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 16,
    text: "Do I tend to invite attention to myself?",
    domain: "E",
    facetCode: "E5",
    facetName: "Excitement-Seeking",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 17,
    text: "Do I insult people?",
    domain: "A",
    facetCode: "A4",
    facetName: "Cooperation",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 18,
    text: "Do I get chores done right away?",
    domain: "C",
    facetCode: "C5",
    facetName: "Self-Discipline",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 19,
    text: "Am I easily disturbed by things?",
    domain: "N",
    facetCode: "N4",
    facetName: "Self-Consciousness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 20,
    text: "Do I feel that I am full of ideas?",
    domain: "O",
    facetCode: "O1",
    facetName: "Imagination",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 21,
    text: "Do I talk to a lot of different people at parties?",
    domain: "E",
    facetCode: "E2",
    facetName: "Gregariousness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 22,
    text: "Am I not really interested in others?",
    domain: "A",
    facetCode: "A1",
    facetName: "Trust",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 23,
    text: "Do I like to have things in order?",
    domain: "C",
    facetCode: "C2",
    facetName: "Orderliness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 24,
    text: "Do I change my mood a lot?",
    domain: "N",
    facetCode: "N3",
    facetName: "Depression",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 25,
    text: "Do I enjoy thinking about abstract ideas?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 26,
    text: "Do I feel comfortable being around other people?",
    domain: "E",
    facetCode: "E1",
    facetName: "Friendliness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 27,
    text: "Am I not interested in abstract ideas?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 28,
    text: "Do I lose my temper easily?",
    domain: "N",
    facetCode: "N2",
    facetName: "Anger",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 29,
    text: "Do I keep my promises to others?",
    domain: "A",
    facetCode: "A2",
    facetName: "Morality",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 30,
    text: "Am I exacting and precise in my work?",
    domain: "C",
    facetCode: "C1",
    facetName: "Self-Efficacy",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 31,
    text: "Am I usually quiet around strangers?",
    domain: "E",
    facetCode: "E1",
    facetName: "Friendliness",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 32,
    text: "Do I take time out for others?",
    domain: "A",
    facetCode: "A3",
    facetName: "Altruism",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 33,
    text: "Am I temperamental?",
    domain: "N",
    facetCode: "N3",
    facetName: "Depression",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 34,
    text: "Do I have a vivid imagination?",
    domain: "O",
    facetCode: "O1",
    facetName: "Imagination",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 35,
    text: "Do I dislike drawing attention to myself?",
    domain: "E",
    facetCode: "E5",
    facetName: "Excitement-Seeking",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 36,
    text: "Do I feel other people’s emotions?",
    domain: "A",
    facetCode: "A6",
    facetName: "Sympathy",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 37,
    text: "Do I tend to be disorganized?",
    domain: "C",
    facetCode: "C2",
    facetName: "Orderliness",
    keyedDirection: "-",
    reverse: true
  },
  {
    itemNumber: 38,
    text: "Do I get nervous easily?",
    domain: "N",
    facetCode: "N1",
    facetName: "Anxiety",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 39,
    text: "Am I not intrigued by complex problems?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "-",
    reverse: true
  },

  // Additional 11 items to reach 50 total

  {
    itemNumber: 40,
    text: "Do I make friends easily?",
    domain: "E",
    facetCode: "E1",
    facetName: "Friendliness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 41,
    text: "Do I tend to trust other people?",
    domain: "A",
    facetCode: "A1",
    facetName: "Trust",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 42,
    text: "Do I usually complete tasks successfully?",
    domain: "C",
    facetCode: "C1",
    facetName: "Self-Efficacy",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 43,
    text: "Do I get angry easily?",
    domain: "N",
    facetCode: "N2",
    facetName: "Anger",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 44,
    text: "Do I enjoy going to large parties?",
    domain: "E",
    facetCode: "E2",
    facetName: "Gregariousness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 45,
    text: "Do I believe that art is important?",
    domain: "O",
    facetCode: "O2",
    facetName: "Artistic Interests",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 46,
    text: "Would I never cheat on my taxes?",
    domain: "A",
    facetCode: "A2",
    facetName: "Morality",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 47,
    text: "Do I like things to be orderly?",
    domain: "C",
    facetCode: "C2",
    facetName: "Orderliness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 48,
    text: "Do I often feel sad or down?",
    domain: "N",
    facetCode: "N3",
    facetName: "Depression",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 49,
    text: "Do I like to take charge of situations?",
    domain: "E",
    facetCode: "E3",
    facetName: "Assertiveness",
    keyedDirection: "+",
    reverse: false
  },
  {
    itemNumber: 50,
    text: "Do I enjoy solving complex problems?",
    domain: "O",
    facetCode: "O5",
    facetName: "Intellect",
    keyedDirection: "+",
    reverse: false
  }
];

module.exports = questions;
