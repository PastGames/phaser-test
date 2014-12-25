if (Meteor.isClient) {

  var preload = function () {
    //Here we load from the public folder the assets the game will need
    game.load.image('star','images/star.png');

    game.load.image('foret','sprites/foret.jpg');

    game.load.image('magician','sprites/monstre1.png');
  };

  var create = function () {

    //Add the physics to the game
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //How to add a simple sprite to the corner of the world, as a background
    //and scale it
    var background = game.add.sprite(0, 0, 'foret');
    background.scale.x = 0.5;
    background.scale.y = 0.4;

    //We add a first monster to it
    var monsters = game.add.group();

    //Enable physics for everything in this group
    monsters.enableBody = true;

    //we add our first monster
    var magician = monsters.create(100, 100, 'magician');
    magician.scale.setTo(0.6, 0.6);
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
