import { set_size } from "./constants.js";  
import { drawGame, initView } from "./view.js";
import { Model } from "./model.js";
export const controller = model => {

  document.getElementById('start').addEventListener('click', event => {
    model.run();
  })
  document.getElementById('stop').addEventListener('click', event => {
    model.stop();
  })
  document.getElementById('reset').addEventListener('click', event => {
    model.reset();
  })

  var sizeInput = document.getElementById('game_size');
  sizeInput.addEventListener("keyup",function(){
    set_size(sizeInput.value);
    model.updated();
  })
}
