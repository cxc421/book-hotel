const trans = {
  'Single Bed': '單人床',
  'Small Double Bed': '小型雙人床',
  'Double Bed': '雙人床',
  'Queen Bed': '大型雙人床'
};

export default function(sentence) {
  if (trans.hasOwnProperty(sentence)) {
    return trans[sentence];
  }
  return sentence;
}
