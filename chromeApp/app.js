var app = angular.module('app', ['app.filters']);
app.controller('inputSelection', function($scope) {
  $scope.ipAddress = 'filler';
  $scope.ipFound = false;
  $scope.inputSelection = { hidden: false}
  $scope.toggleInputSelectionScreen = function() {
    window.retro.start();
    $scope.inputSelection.hidden = true;
    $scope.$apply();
  }

  window.toggleInputSelectionScreen = $scope.toggleInputSelectionScreen;

  document.querySelector('body').addEventListener('keydown', function (e) {
    console.log('da event triggurd: ', e);
  });

  document.getElementById('keyboardIcon').addEventListener('click', window.toggleInputSelectionScreen);

  chrome.system.network.getNetworkInterfaces(function (ipAddresses) {
    ipAddresses.forEach(function (ipAddress) {
      console.log(ipAddress);
      if (ipAddress.prefixLength < 64 && ipAddress.name === "en0") {
        $scope.title = 'IP FOUND'

        $scope.ipAddress = ip4 = ipAddress.address;
        var toQ = $scope.ipAddress + ':' + port;

        if($scope.ipFound === false) {

          $("#qrTitle").text("Play on Mobile");
          $("#qrCode").css("border-color", "white");
          $("#qrInstructions").text("Scan QR");

          $("#keyboardTitle").text("Play on Desktop");
          $("#keyboardIcon").css("border-color", "white");
          $("#keyboardInstructions").text("Click keyboard");
          $("#keyboardIcon").css("background-color", 'black');
          $("#keyboardIcon").css("background-image", 'url(' + '../images/keyboard.png' + ')');
          new QRCode(document.getElementById('qrCode'), toQ);
        }

        $scope.ipFound = true;

        // force scope to update
        $scope.$apply()
      }
    });

  });

});

app.controller('gameSelection', function($scope) {
  $scope.gameSelection = { hidden: false}
  $scope.toggleGameSelectionScreen = function() {
    $scope.gameSelection.hidden = true;
    $scope.$apply();
  }
  window.toggleGameSelectionScreen = $scope.toggleGameSelectionScreen;

  $scope.selectedConsole = [];
  $scope.consoleList = [{
    id: 1,
    name: 'NES'
  }, {
    id: 2,
    name: 'SNES'
  }, {
    id: 3,
    name: 'GB'
  }, {
    id: 4,
    name: 'GBA'
  }];

  $scope.setSelectedConsole = function () {
    var id = this.console.id;
    if (_.contains($scope.selectedConsole, id)) {
      $scope.selectedConsole = _.without($scope.selectedConsole, id);
    } else {
      $scope.selectedConsole.push(id);
    }
    return false;
  };

  $scope.isChecked = function (id) {
    if (_.contains($scope.selectedConsole, id)) {
      return 'icon-ok pull-right';
    }
    return false;
  };


  $scope.games = [{
    title: 'blah',
    description: 'Hysteria is a space shooter clone that, while really easy, has something about it that will get you hooked and keep you playing. The music is great, and the graphics and control aren\'t bad either. Try it out.', 
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'Airwolf \'92', 
    description: 'A timed Space Invaders type shooter. Whatever you do, don\'t shoot the yellow balloons.',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'Astrohawk', 
    description: 'A great Asteroids type game.. if you miss flying around and shooting big rocks before they smash into you, this is a game you NEED.',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'Bioworm', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'pokemon', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',   
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 2,
      name: 'SNES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 1,
      name: 'NES'
    }
  }, {
    title: 'blah2222222', 
    description: '',
    console: {
      id: 3,
      name: 'GB'
    }
  }, {
    title: 'ZZZZZZZZZZ', 
    description: 'zzzzzzz description',
    console: {
      id: 4,
      name: 'GBA'
    }
  }];

});

angular.module('app.filters', []).filter('consoleFilter', [function () {
  return function (games, selectedConsole) {
    if (!angular.isUndefined(games) && !angular.isUndefined(selectedConsole) && selectedConsole.length > 0) {
      var tempGames = [];
      angular.forEach(selectedConsole, function (id) {
        angular.forEach(games, function (game) {
          if (angular.equals(game.console.id, id)) {
            tempGames.push(game);
          }
        });
      });
      return tempGames;
    } else {
      return games;
    }
  };
}]);

