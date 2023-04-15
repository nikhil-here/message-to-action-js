const tests = [
  {
    query: "bhai menu dikhavo",
    response: {
      operationType: "READ",
      userAction: "SHOW_MENU",
      extraParams: {
        item: null,
        query: "bhai menu dikhavo",
        category: null,
        languageCodes: ["en", "hi"],
      },
    },
  },
  {
    query: "bhai burger hein",
    response: {
      operationType: "READ",
      userAction: "SEARCH_BY_FOOD_QUERY",
      extraParams: {
        item: "burger",
        query: "bhai burger hein",
        category: "Fast Food",
        languageCodes: ["en", "hi"],
      },
    },
  },
];

module.exports = tests;
