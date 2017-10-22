// http://chancejs.com/



var stocks = {};
var stockExchanges = {
  "FastFunds": {
    "numStocks" : 20,
    "stocks" : []
  },
  "CorpXchg": {
    "numStocks" : 30,
    "stocks" : []
  }
};

function initializeStocks () {
  for (var exch in stockExchanges) {
    //console.log(exch);
    for (var i = 0; i <= stockExchanges[exch]["numStocks"]; i++) {
      var stock = {
        "symbol" : chance.string({
          length: 3,
          pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }),
        "price": chance.floating({min: 0, max: 1000, fixed: 2})
      };
      stockExchanges[exch]["stocks"].push(stock);
    }

  }

}

function initializeState() {
  var gameState = {
    "date" : Date.now(), // current timestamp in milliseconds
    "exchange": chance.pickone(Object.keys(stockExchanges))
  };
}

function initialize () {
  var mySeed;
  var chance;
  $.get("https://www.random.org/integers/",
    {
      num: "1",
      col: "1",
      min: "1",
      max: "1000000000",
      base: "10",
      format: "plain",
      rnd: "new"
    },
    function (randNum) {
      mySeed = randNum;

      // Instantiate Chance with this truly random number as the seed
      chance = new Chance(mySeed);

      initializeStocks();
      initializeState();

    }
  );
}

function updatePrices () {

}


// Boot
initialize();
console.log(stockExchanges);


