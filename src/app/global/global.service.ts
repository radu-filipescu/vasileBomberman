import {EventEmitter, Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  ROWSNUMBER = 20;
  COLNUMBER = 40;
  REFRESHTIME = 100;

  playerRow = 10;
  playerCol = 10;

  currentDirection = 2;  // 1 - up, 2 - right, 3 - down, 4 - left

  table: number[][] = [];
  // -1 - player
  //  0 - nothing
  //  1 - wall

  keyPressEvent: EventEmitter<string> = new EventEmitter<string>();

  initialize() {
    for(let i = 0; i < this.ROWSNUMBER; i++) {
      this.table.push([]);
      for (let j = 0; j < this.COLNUMBER; j++) {
        if (i == 0 || i == this.ROWSNUMBER - 1 || j == 0 || j == this.COLNUMBER - 1)
          this.table[i].push(1);
        else
          this.table[i].push(0);
      }
    }

    this.playerHandler();

    console.log(this.table);
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

  constructor() {
    this.initialize();
  }
}
