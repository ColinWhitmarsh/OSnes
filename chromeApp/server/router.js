var url = require('url');
var numberOfPlayersJoined = 0;
var controllerAction;

function router(req, res) {

  var httpVerb = req.method;
  var httpPath = req.url;
  var pathArr = req.url.split('/');

  if ( // app.get('/pair-controller', cb)
    httpVerb === 'GET' &&
    httpPath === '/pair-controller'
  ) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    var sendData = {ipAddress: ip4, port: port};
    if (numberOfPlayersJoined === 0) {
      console.log('player 1 just joined');
      numberOfPlayersJoined++;
      sendData.player = 1;
      res.end(JSON.stringify(sendData));
    } else if (numberOfPlayersJoined === 1) {
      console.log('player 2 just joined');
      numberOfPlayersJoined++;
      sendData.player = 2;
      res.end(JSON.stringify(sendData));
    } else {
      console.log('no more players allowed');
      res.end(JSON.stringify({player: 'no more players allowed'}));
    }
  } else if ( // app.get('/player/:player-num/press/:button', cb)   like: /player/1/press/a
    httpVerb === 'GET' &&
    pathArr[1] === 'player' &&
    pathArr[3] === 'press' &&
    pathArr[5] === undefined
  ) {
    var playerNum = parseInt(pathArr[2]);
    var button = pathArr[4];
    var asciiNum = getAsciiKey(button);
    var keyBoardEvent = makeEvent('keydown', asciiNum);
    document.querySelector('body').dispatchEvent(keyBoardEvent);
    console.log('player ' + playerNum + ' just pressed "' + button + '"');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Player ' + playerNum + ' just pressed ' + button}));
  } else if ( // app.get('/player/:player-num/release/:button', cb)
    httpVerb === 'GET' &&
    pathArr[1] === 'player' &&
    pathArr[3] === 'release' &&
    pathArr[5] === undefined
  ) {
    var playerNum = pathArr[2];
    var button = pathArr[4];
    console.log('player ' + playerNum + ' just released "' + button + '"');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Player ' + playerNum + ' just released ' + button}));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end();
  }
};

function getAsciiKey(button) {
  switch (button) {
    case 'a':
      return 65;
    case 'b':
      return 66;
    case 'x':
      return 88;
    case 'y':
      return 89
    case 'start':
      return 13;
    case 'select':
      return
    case 'up':
      return 38;
    case 'down':
      return 40;
    case 'left':
      return 37;
    case 'right':
      return 39;
    case 'l-shoulder':
      return 76;
    case 'r-shoulder':
      return 82;
    default:
      break;
  }
}

try {
  module.exports = router;
} catch (err) {}

// Helper function to create keyboard events:
function makeEvent(type, asciiNum) {

  console.log('triggered');

  var evt = new KeyboardEvent(type, {
    'bubbles': true,
    'keyCode': asciiNum,
    'charCode': 0,
    // 'key': 'ArrowDown',
    'view': window
  });

  Object.defineProperty(evt, 'keyCode', {value: asciiNum, enumerable: true});
  Object.defineProperty(evt, 'charCode', {value: 0, enumerable: true});
  Object.defineProperty(evt, 'which', {value: asciiNum, enumerable: true});
  Object.defineProperty(evt, 'view', {value: window, enumerable: true});
  return evt;

}