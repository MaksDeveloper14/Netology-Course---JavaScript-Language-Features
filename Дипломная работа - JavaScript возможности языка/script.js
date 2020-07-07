'use strict';

class Vector {
  constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
  }
  plus(vector) {
    if(vector instanceof Vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    } else {
      throw new Error('Можно прибавлять к вектору, только вектор типа Vector');
    }
  }
  times(n) {
    return new Vector(this.x * n, this.y * n);
  }
}

// Статус: сделал

class Actor {
  constructor(
    pos = new Vector(0, 0),
    size = new Vector(1, 1),
    speed = new Vector(0, 0)
  ) {
    if (
      (pos && !(pos instanceof Vector)) ||
      (size && !(size instanceof Vector)) ||
      (speed && !(speed instanceof Vector))
    ) {
      throw new Error('В качестве аргумента можно передавать только вектор типа Vector');
    }
    this.pos = pos;
    this.size = size;
    this.speed = speed;
  }

  act() {}

  get left() {
    return this.pos.x;
  }

  get top() {
    return this.pos.y;
  }

  get right() {
    return this.pos.x + this.size.x;
  }

  get bottom() {
    return this.pos.y + this.size.y;
  }

  get type() {
    return 'actor';
  }

  isIntersect(actor) {
    if (!(actor instanceof Actor) || !actor) {
      throw new Error('В качестве аргумента необходимо передать объект типа Actor');
    }

    if (actor === this) {
      return false;
    }

    return (
      this.left < actor.right &&
      this.right > actor.left &&
      this.top < actor.bottom &&
      this.bottom > actor.top
    );
  }
}

// Статус: сделал

class Level {
  constructor(grid = [], actors = []) {
    this.grid = grid;
    this.actors = actors;
    if(this.grid.length === 0) {
      this.height = 0;
      this.width = 0;
    } else {
        this.height = this.grid.length;
        this.width = this.grid.reduce((a, b) => {
          if(b.length > a) {
            return b.length;
          } else {
            return a; 
          }
        }, 0);
      }
    this.status = null;   
    this.finishDelay = 1;
    if(typeof actors === 'object') {
      this.player = actors.find(actor => actor.type === 'player');
    }
  }
  isFinished() {
    if(this.status !== null && this.finishDelay < 0) {
      return true;
    } else if(this.status !== null && this.finishDelay > 0) {
      return false;
    }
    return false;
  }
  actorAt(actor) { 
    if(arguments[0] instanceof Actor === false) {
      throw new Error('Должен быть передан аргумент типа Actor');
    } 

    if (!this.actors) {
      return undefined;
    } else {
      return this.actors.find(currentActor => currentActor.isIntersect(actor));
    }
  }
  obstacleAt(pos, size) {
    if(pos instanceof Vector === false || size instanceof Vector === false) {
      throw new Error('Необходимо передать аргументы объекты типа Vector');
    } else {
      const topEnd = Math.floor(pos.y);
      const bottomEnd = Math.ceil(pos.y + size.y);
      const leftEnd = Math.floor(pos.x);
      const rightEnd = Math.ceil(pos.x + size.x);

      if(bottomEnd > this.height) {
        return 'lava';
      } 
      if(topEnd < 0  || leftEnd < 0 || rightEnd > this.width) {
        return 'wall';
      }

      // всю заданную область через pos и size проходим циклом и проверяем в каждой ячейке наличие или отсутствие объекта
      for (let i = topEnd; i < bottomEnd; i++) {
        for (let z = leftEnd; z < rightEnd; z++) {
          let obstacle = this.grid[i][z];
          if (obstacle !== undefined) {
            return obstacle;
          } 
        }
      }
    }
  }
  removeActor(actor) {
    this.actors = this.actors.filter((elem) => {return elem !== actor});
  }
  noMoreActors(type) {
    // есть
    for(let actor of this.actors) {
      if(actor.type === type) {
        return false;
      }
    }
    // не осталось
    return true;
  }
  playerTouched(typeObstacle, obstacle) {
    if(this.status !== null) {
      return;
    } 
      if(typeObstacle === 'lava' || typeObstacle === 'fireball') {
        this.status = 'lost';
      } else if(typeObstacle === 'coin') {
        this.removeActor(obstacle);
        if(this.noMoreActors(typeObstacle)) {
          this.status = 'won';
        };
      }
  }
}

// Статус: сделал

class LevelParser {
  constructor(gameDic) {
    this.gameDic = gameDic;
  }

  actorFromSymbol(symbol) {
    if (!symbol) {
      return undefined;
    }
    return this.gameDic[symbol];
  }

  obstacleFromSymbol(symbol) {
    switch (symbol) {
      case 'x':
        return 'wall';
      case '!':
        return 'lava';
      default:
        return undefined;
    }
  }

  createGrid(stringsArr = []) {
    return stringsArr.map(item => {
      return item.split('').map(i => {
        return this.obstacleFromSymbol(i);
      });
    });
  }

  createActors(stringsArr = []) {
    const actors = [];
    const arr = stringsArr.map(string => string.split(''));
    
    arr.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (this.gameDic && this.gameDic[cell] && typeof this.gameDic[cell] === 'function') {
          const actor = new this.gameDic[cell](new Vector(x, y));
          if (actor instanceof Actor) {
            actors.push(actor);
          }
        }
      });
    });
    return actors;
  }

  parse(stringsArr = []) {
    const grid = this.createGrid(stringsArr);
    const actors = this.createActors(stringsArr);
    return new Level(grid, actors);
  }
}


class Fireball extends Actor {
  constructor(pos = new Vector(0, 0), speed = new Vector(0, 0)) {
    super(pos, new Vector(1,1), speed);
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return 'fireball';
  }
  getNextPosition(time = 1) {
    return new Vector(this.pos.x + this.speed.x * time, this.pos.y + this.speed.y * time);
  }

  handleObstacle() {
    this.speed = new Vector(-this.speed.x, -this.speed.y);
  }

  act(time, level) {
    if(level.obstacleAt(this.getNextPosition(time), this.size) === undefined) {
      this.pos = this.getNextPosition(time);
    } else {
      this.handleObstacle();
    }
  }
}


class HorizontalFireball extends Fireball {
  constructor(pos) {
    super(pos);
    this.size = new Vector(1,1);
    this.speed = new Vector(2,0);
  }
}

class VerticalFireball extends Fireball {
  constructor(pos) {
    super(pos);
    this.size = new Vector(1,1);
    this.speed = new Vector(0,2);
  }
}

class FireRain extends Fireball {
  constructor(pos) {
    super(pos);
    this.speed = new Vector(0,3);
    this.size = new Vector(1,1);
    this.posInitial = this.pos;
  }
  // переопределение наследуемого метода
  handleObstacle () {
    this.pos = this.posInitial;
  }
}

class Coin extends Actor {
  constructor(pos) {
    super(pos, new Vector(0.6,0.6));
    this.pos = this.pos.plus(new Vector(0.2, 0.1));
    this.springSpeed = 8;
    this.springDist = 0.07;
    this.spring = Math.random() * Math.PI * 2;
    this.startPosition = new Vector(this.pos.x, this.pos.y);
  }

  get type() {
    return 'coin';
  }

  updateSpring(time = 1) {
    this.spring += this.springSpeed * time;
  }

  getSpringVector() {
    return new Vector(0, Math.sin(this.spring) * this.springDist);
  }

  getNextPosition(time = 1) {
    // используем две ранее функции
    this.updateSpring(time);
    return this.startPosition.plus(this.getSpringVector());
  }

 act(time) {
    this.pos = this.getNextPosition(time);
  }
}


class Player extends Actor {
  constructor(pos,size, speed) {
    super(pos);
    this.pos = this.pos.plus(new Vector(0, -0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0,0);
  }
  get type() {
    return 'player'; 
  }
}

// пример использования

const schemas = [
  [
    '         ',
    '         ',
    '    =    ',
    '       o ',
    '     !xxx',
    ' @       ',
    'xxx!     ',
    '         '
  ],
  [
    '      v  ',
    '    v    ',
    '  v      ',
    '        o',
    '        x',
    '@   x    ',
    'x        ',
    '         '
  ]
];

const actorDict = {
  '@': Player,
  'v': FireRain,
  '=': HorizontalFireball,
  '|': VerticalFireball,
  'o': Coin
};

const parser = new LevelParser(actorDict);
runGame(schemas, parser, DOMDisplay)
  .then(() => console.log('Вы выиграли приз!'));