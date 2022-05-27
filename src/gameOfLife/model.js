import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL,
  SQUARE
} from "./constants.js";
import { Update } from "./view.js";

export class Model{
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
    this.observers = [];
  }

  AddObserver(_observer){
    this.observers.push(_observer);
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    console.log(GAME_SIZE);
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      const map = {};
      

      if (currentTime - date > RENDER_INTERVAL) {
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.height; j++) {
            const nbAlive = this.aliveNeighbours(i,j);

            if( (nbAlive < 2 || nbAlive >3) && this.state[j][i] !== CELL_STATES.NONE){
              if(map[CELL_STATES.DEAD] == undefined){
                map[CELL_STATES.DEAD] = []
              }
              
              map[CELL_STATES.DEAD].push([i,j]);
            
            }
            if (nbAlive == 3){
              if(map[CELL_STATES.ALIVE] == undefined){
                map[CELL_STATES.ALIVE] = []
              }             
              map[CELL_STATES.ALIVE].push([i,j]);
            }
          }
        }
        Object.entries(map).forEach(([state, coords]) => { //retourne liste de clé valeur
          coords.forEach(([x, y]) => { //on parcourt la liste de coordonnées (valeur de map)
            this.state[y][x] = state;
          })
        })

        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.stop();
    this.init();

  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.width &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    for (let i = x-1; i<x+2 ; i++){
      for (let j = y-1; j<y+2; j++){
        if (i === x && j === y) continue;
        number += this.isCellAlive(i,j);
      }
    }
    return number;
  }

  updated() { //équivalent de la fonction NotifyAll() du pattern Observer
    var mod = this;
    
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.observers.forEach(function(model){
      Update(mod);
    }
    );
  }
}
