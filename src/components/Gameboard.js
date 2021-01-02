const boardSize = 10;

class Gameboard {
  constructor() {
    let arr = [];
    for (let i = 0; i < boardSize; i++) {
      arr.push(new Array(boardSize));
    }
    this.gameBoard = arr;
    this.ships = [];
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  getBoard() {
    // for (var i = 0; i < this.gameBoard.length; i++) {
    //   let row = '';
    //   for (var j = 0; j < this.gameBoard[0].length; j++) {
    //     row += this.gameBoard[i][j] + ' ';
    //   }
    //   console.log(row);
    // }

    return this.gameBoard;
  }

  //try boolean to know if turn is over
  receiveAttack(row, col) {
    const gameboardPosition = this.gameBoard[row][col];
    if (gameboardPosition === 'MISS' || gameboardPosition === 'HIT') {
      return false;
    }
    if (typeof this.gameBoard[row][col] === 'object') {
      const ship = this.gameBoard[row][col].hit();
      this.gameBoard[row][col] = 'HIT';
    } else {
      //should be undefined
      this.gameBoard[row][col] = 'MISS';
    }
    return true;
  }

  setShip(startingRow, startingCol, orientation, ship) {
    const { length } = ship;
    if (orientation === 'vertical') {
      for (let i = startingRow; i < startingRow + length; i++) {
        this.gameBoard[i][startingCol] = ship;
      }
    } else {
      //horizontal
      for (let i = startingCol; i < startingCol + length; i++) {
        this.gameBoard[startingRow][i] = ship;
      }
    }
  }

  placeShip(startingRow, startingCol, orientation, ship) {
    if (this.isValidShipPosition(startingRow, startingCol, orientation, ship)) {
      this.setShip(startingRow, startingCol, orientation, ship);
      this.ships.push(ship);
    }
  }

  isValidShipPosition(startingRow, startingCol, orientation, ship) {
    const { length } = ship;

    if (orientation === 'vertical') {
      if (startingRow + length > boardSize) {
        return false;
      }

      for (let i = startingRow; i < startingRow + length; i++) {
        if (this.gameBoard[i][startingCol] !== undefined) {
          return false;
        }
      }
    } else {
      //horizontal
      if (startingCol + length > boardSize) {
        return false;
      }

      for (let i = startingCol; i < startingCol + length; i++) {
        if (this.gameBoard[startingRow][i] !== undefined) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Gameboard;
