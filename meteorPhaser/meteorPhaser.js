if (Meteor.isClient) {

  var preload = function () {
    game.load.image('star','images/star.png');
  };

  var create = function () {
    game.add.sprite(0, 0, 'star');
  };

  var update = function () {

  };

  Template.game.helpers({
    game: function () {
      game = new Phaser.Game(
        800,
        600,
        Phaser.AUTO,
        "game",
        {
          preload: preload,
          create: create,
          update: update
        });
      console.log(game);
      return;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
