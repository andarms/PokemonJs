import {PKMN} from '../main';
import DATA from '../Data';
import Player from '../GameObjects/Player';

class Intro extends Phaser.State{
  create(){
    this.game.add.sprite(0, 0, 'introbg');
    
    this.professor = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-30, 'introOak');
    this.professor.anchor.set(.5, .5);

    PKMN.start(this);
    PKMN.msgbox("Hello, there![/n]Glad to meet you![/p]Welcome to the world of Pokémon!");
    PKMN.msgbox("My name is Oak.[/p]People affectionately refer to me as the Pokémon Professor.");
    PKMN.msgbox("This world…", this.intro1);
    PKMN.end();

  }

  intro1(){
    this.pokepet =  this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-30, 'pikachu')
    this.pokepet.scale.set(1.5);
    this.pokepet.anchor.set(.5, 0)
    let frames = [];
    for(var i = 0; i < 33; i++){
      frames.push(i);
    }
    this.pokepet.animations.add('idle', frames, 30, true);
    this.pokepet.animations.play('idle');
    this.pokepet.alpha = 0;   
    
    let tween1 = this.game.add.tween(this.professor).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true); 
    let tween2 = this.game.add.tween(this.pokepet).to( {alpha: 1 }, 500, Phaser.Easing.Linear.None);
    tween1.chain(tween2);
    tween2.onComplete.add(()=>{
      PKMN.msgbox("…is inhabited far and wide by creatures called Pokémon!");
      PKMN.msgbox("For some people, Pokémon are pets. Other use them for battling.");
      PKMN.msgbox("As for myself…[/p]I study Pokémon as a profession.", this.intro2);
      PKMN.continue();
    });    
  }

  intro2(){
    let tween1 = this.game.add.tween(this.pokepet).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true); 
    let tween2 = this.game.add.tween(this.professor).to( {alpha: 1 }, 500, Phaser.Easing.Linear.None);
    tween1.chain(tween2);
    tween2.onComplete.add(()=>{
      let text = "But first, tell me a little about yourself.[/p] Now tell me. Are you a boy? Or are you a girl?";
      let options = [
        {text: "BOY", action: this.genderSelected, value: 0},
        {text: "GIRL", action: this.genderSelected, value: 1}
      ];
      PKMN.choice(text, 'gender', options, 0)
      PKMN.continue();
    });
  }

  genderSelected(){
    let gender = DATA.FLAGS['gender'];
    DATA.player = new Player(this.game, gender);
    this.game.world.remove(this.professor);
    this.playerSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-30, DATA.player.frontSprite);
    this.playerSprite.anchor.set(.5, .5);
    PKMN.msgbox("First, what is your name?");
  }

}

export default Intro;
