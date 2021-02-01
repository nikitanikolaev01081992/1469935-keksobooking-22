const getRandomFloat = (min, max, precision = 2) => {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  let randNum = Math.random() * (max - min) + min;
  randNum = randNum > max ? max : randNum;

  return parseFloat(randNum.toFixed(precision));
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return getRandomFloat(min, max, 0);
};

getRandomInt();
