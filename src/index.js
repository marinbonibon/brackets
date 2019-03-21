module.exports = function check (str, bracketsConfig) {
  "use strict";

  const bracketsStack = [],
    openBrackets = [],
    closeBrackets = [],
    bracketsMap = new Map();

  //push opening brackets to the array
  //push closing brackets to the array
  //push brackets to the map
  for (let i = 0; i < bracketsConfig.length; i++) {
    openBrackets[i] = bracketsConfig[i][0];
    closeBrackets[i] = bracketsConfig[i][1];
    bracketsMap.set(bracketsConfig[i][1], bracketsConfig[i][0]);
  }

  for (let i = 0; i < str.length; i++) {
    const charInStr = str.charAt(i),
      lastInStack = bracketsStack[bracketsStack.length - 1],
      expectedBracket = bracketsMap.get(charInStr);

    //check if bracket is opening, than push it to the stack
    if (openBrackets.includes(charInStr)) {
      bracketsStack.push(charInStr);

      // check if opening bracket is the same as closing one
      if (closeBrackets.includes(lastInStack) && bracketsStack[bracketsStack.length - 2] === expectedBracket) {
        bracketsStack.splice(-2, 2);
      }

     //check if bracket is closing and matches the last one in the stack, if there are some elements
    } else if (closeBrackets.includes(charInStr)) {
      if (bracketsStack.length === 0 || lastInStack !== expectedBracket) {
        return false;
      } else {
        bracketsStack.pop();
      }
    }
  }

  return bracketsStack.length === 0;
};
