const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this.field = field;
    this.x = 0;
    this.y = 0;
    //set player position to be in the upper left of the field
    this.playerPosition = this.field[this.x][this.y];
  }

  print(){
     return this.field.map(row =>
            row.join('')
        ).join('\n');

    }

  
  gameStatus(){
    let gameIsOn = true;
    switch(this.playerPosition){
      case hat:
         console.log('Congrats, you found your hat!');
         gameIsOn = false;
         break;
      
      case hole:
          console.log('Sorry, you fell down into a hole');
          gameIsOn = false;
          break;
      
      case 'undefined':
          console.log('Out of boundaries instructions!');
          gameIsOn = false;
          break;
      
      default:
        gameIsOn = true;
        this.field[this.x][this.y] = pathCharacter;
        break;
    }
    return gameIsOn;
  }

  userInput(way){
    switch(way){
      case 'u':
        try{
         this.playerPosition = this.field[--this.x]
    [this.y];
        }
        catch(e){
          this.playerPosition = 'undefined';
        }
        break;

      case 'd':
       try{
         this.playerPosition = this.field[++this.x]
  [this.y];
       }
       catch(e){
         this.playerPosition = 'undefined';
       }
       break;

      case 'l':
        try{
          this.playerPosition = this.field[this.x]
    [--this.y];
        }
        catch(e){
          this.playerPosition = 'undefined';
        }
        break;
        
        case 'r':
         try{
          this.playerPosition = this.field[this.x]
    [++this.y];
         }
         catch(e){
          this.playerPosition = 'undefined';
         }
         break;

       default:
        console.log('Invalid input! Please enter one of the following: u,d,l,r.');
        break;
    }
  }

  static generateField(height, width, percentage){
    const field = new Array(height).fill(0).map(element => new Array(width))
    for (let i=0; i < field.length; i++) {
            for (let j=0; j < field[i].length; j++) {
            field[i][j] = fieldCharacter;
            }
        }
        const fieldSize = height*width;
        const numOfHoles = Math.floor(fieldSize*(percentage/100));
        let countHoles = 0;
        while (countHoles <= numOfHoles) {
          const randomRow = Math.floor(Math.random()*height);
          const randomColumn = Math.floor(Math.random()*width);
          if (field[randomRow][randomColumn] === fieldCharacter) {
            field[randomRow][randomColumn] = hole;
            countHoles++;
          }
        }
        field[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = hat;
        field[0][0] = pathCharacter;
        return field;   
  }
  static gamePlay(field){
    let gameStatus = true;
    console.log('u - move up \n d - move down \n l - move left \n r - move right');
    console.log(field.print());
    while(gameStatus){
      const way = prompt('Which way?');
      field.userInput(way);
      gameStatus = field.gameStatus();
      console.log(field.print());
    }
  }
}


const myField = new Field(Field.generateField(10, 10, 10));
Field.gamePlay(myField);
