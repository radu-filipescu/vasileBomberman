import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {foodItem} from "./foodItem/foodItem";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  ROWSNUMBER = 20;
  COLNUMBER = 40;
  REFRESHTIME = 100;
  FOODDIRECTIONCHANCE = 0.15;

  playerRow = 10;
  playerCol = 10;

  food: foodItem[] = [];
  startingFoodCount = 5;

  currentDirection = 2;  // 1 - up, 2 - right, 3 - down, 4 - left

  table: number[][] = [];
  // -1 - player
  //  0 - nothing
  //  1 - wall
  //  2 - food (traienel)

  keyPressEvent: EventEmitter<string> = new EventEmitter<string>();

  initialize() {
    // table
    for(let i = 0; i < this.ROWSNUMBER; i++) {
      this.table.push([]);
      for (let j = 0; j < this.COLNUMBER; j++) {
        if (i == 0 || i == this.ROWSNUMBER - 1 || j == 0 || j == this.COLNUMBER - 1)
          this.table[i].push(1);
        else
          this.table[i].push(0);
      }
    }

    // food
    for(let i = 0; i < this.startingFoodCount; i++)
      this.food.push(this.generateRandomFoodItem());

    this.playerHandler();

    this.foodHandler();

    console.log(this.table);
  }

  generateRandomFoodItem() {
    let newFood = new foodItem();

    while(!this.validPosition(newFood.row, newFood.column)) {

      let newRow = Math.floor(Math.random() * this.ROWSNUMBER);
      let newCol = Math.floor(Math.random() * this.COLNUMBER);

      newFood.row = newRow;
      newFood.column = newCol;
    }

    return newFood;
  }

  validPosition(row: number, column: number) {
    if(row < 0 || row >= this.ROWSNUMBER) return false;
    if(column < 0 || column >= this.COLNUMBER) return false;

    if(this.table[row][column] == 1)
      return false;

    return true;
  }

  playerHandler() {
    this.keyPressEvent.subscribe((key) => {
      if(key.toLowerCase() == 'w')
        this.currentDirection = 1;
      if(key.toLowerCase() == 'd')
        this.currentDirection = 2;
      if(key.toLowerCase() == 's')
        this.currentDirection = 3;
      if(key.toLowerCase() == 'a')
        this.currentDirection = 4;
    })
    setInterval(() => {
      this.table[this.playerRow][this.playerCol] = 0;

      if(this.currentDirection == 1) {
        if(this.validPosition(this.playerRow - 1, this.playerCol))
          this.playerRow -= 1;
      }
      if(this.currentDirection == 2) {
        if(this.validPosition(this.playerRow, this.playerCol + 1))
          this.playerCol += 1;
      }
      if(this.currentDirection == 3) {
        if(this.validPosition(this.playerRow + 1, this.playerCol))
          this.playerRow += 1;
      }
      if(this.currentDirection == 4) {
        if(this.validPosition(this.playerRow, this.playerCol - 1))
          this.playerCol -= 1;
      }

      this.table[this.playerRow][this.playerCol] = -1;
    }, this.REFRESHTIME);
  }

  foodHandler() {
    setInterval(() => {
      for(let i = 0; i < this.startingFoodCount; i++) {
        let food = this.food[i];
        this.table[food.row][food.column] = 0;

        if(food.direction == 1) {
          if (this.validPosition(food.row - 1, food.column))
            food.row -= 1;
          else
            food.direction = 0;
        }
        if(food.direction == 2) {
          if (this.validPosition(food.row, food.column + 1))
            food.column += 1;
          else
            food.direction = 0;
        }
        if(food.direction == 3) {
          if (this.validPosition(food.row + 1, food.column))
            food.row += 1;
          else
            food.direction = 0;
        }
        if(food.direction == 4) {
          if (this.validPosition(food.row, food.column - 1))
            food.column -= 1;
          else
            food.direction = 0;
        }


        if(food.direction == 0) {
          food.direction = 1 + Math.floor(Math.random() * 4);
        }
        else {
          // change of 25% of changing direction

          let diceRoll = Math.random();
          if(diceRoll < this.FOODDIRECTIONCHANCE) {
            food.direction = 1 + Math.floor(Math.random() * 4);
          }
        }

        this.table[food.row][food.column] = 2;
      }
    }, this.REFRESHTIME);
  }

  constructor() {
    this.initialize();
  }
}
