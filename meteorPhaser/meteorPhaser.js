if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.game.helpers({
    game: function () {
      var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
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
