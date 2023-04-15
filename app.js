const FineTuningDataSet = require("./models/FineTuningDataSet");
const fs = require("fs");
const tests = require("./data/data");


const jsonPattern = "###"

const task = `we want to perform READ database operation based on the above user query, map the exact user action from the above user query and also follow following rules while giving response`;
const rules = [
  'response "should" be in the form of JSON only. don\'t add any additional information or explanation in the response.',
  'response JSON should contain only following fields "userAction" and "extraParams".',
  '"userAction" is a string, and "extraParams" is a nested JSON object inside response JSON.',
  '"userAction" field value should be extracted from the above user query, "userAction" can be SHOW_MENU, SEARCH_BY_FOOD_QUERY, UNKNOWN',
  'if "userAction" is not clear from the user query then keep "userAction" as UNKNOWN.',
  '"userAction" will be equal to SHOW_MENU when user requests a menu from a restaurant',
  '"userAction" will be equal to SEARCH_BY_FOOD_QUERY when user requests any specific food item or category',
  'add the "query" field inside nested "extraParams" JSON, "query" field should contain any food item name, category or description mention in the user query, if you are not able to find any specific food item, category or description in the user query, keep "query" field as null',
  'add the "item" field inside nested "extraParams", "item" field will contain specific food item mention in the user query, if there are no food item mention in the user query then keep the "item" field json value as null',
  'add the "category" field inside nested "extraParams", based on user query try to find the "category" of food item user is trying to request, if there are no specific food category is mention in the user query then keep "category" json field value as null',
  `add ${jsonPattern} at the beginning and end of the response JSON`,
];
var ruleString = "";
rules.forEach((rule) => {
  ruleString = ruleString + `\n${rule}`;
});

tests.forEach((test, index) => {
  const promptString = `User Query: ${test.query}\nTask: ${task}\nRules:${ruleString} ->`;
  const completionString = ` ${jsonPattern}${JSON.stringify(
    test.response
  )}${jsonPattern}`;

  const model = new FineTuningDataSet(promptString, completionString);
  const result = `${JSON.stringify(model)}\n`;

  fs.appendFile("dataset.jsonl", result, (err) => {
    if (err) {
      console.error(err);
    }

    // file written successfully
  });
});
