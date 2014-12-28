if (Meteor.isClient) {

  var preload = function () {
    //Here we load from the public folder the assets the game will need
    game.load.image('star','images/star.png');

    game.load.image('foret','sprites/foret.jpg');

    game.load.image('magician','sprites/monstre1.png');

    game.load.spritesheet('king', 'sprites/king_sprite_full_small.png', 265, 529);
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
    monsters = game.add.group();

    //Enable physics for everything in this group
    monsters.enableBody = true;

    //we add our first monster
    var magician = monsters.create(100, 100, 'magician');
    magician.scale.setTo(0.6, 0.6);

    //Physics settings
    game.physics.arcade.enable(magician);
    magician.body.bounce.y = 1.0;
    magician.body.bounce.x = 0.6;
    magician.body.gravity.y = 150;
    magician.body.gravity.x = 20;

    magician.body.collideWorldBounds = true;

    //Player, THE KING !
    player = game.add.sprite(160, 0, 'king');
    // player.scale.setTo(0.5, 0.5);

    //Physics settings
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //Two animations for left and right
    player.animations.add('left', [3, 2, 1, 0], 5, true);
    player.animations.add('right', [5, 6, 7, 8], 5, true);

    //Here we define our platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 60, 'foret');
    ground.visible = false;
    ground.body.immovable = true; //this will not fall on contact

    //We define our keyboard
    cursors = game.input.keyboard.createCursorKeys();
  };

  var update = function () {
    //Collide the player with the platforms
    game.physics.arcade.collide(player, platforms);

    //collide the player with the monsters
    game.physics.arcade.collide(player, monsters);
    game.physics.arcade.collide(monsters, platforms);

    //reset the player velocity
    player.body.velocity.x = 0;

    if (cursors.left.isDown){
      player.body.velocity.x = -150;
      player.animations.play('left');
    }
    else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
      player.animations.play('right');
    }
    else {
      //Stand stilll
      player.animations.stop();

      player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -350;
    }
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
