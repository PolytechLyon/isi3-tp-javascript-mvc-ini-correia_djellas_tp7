
import { GAME_SIZE, CELL_SIZE } from "./constants.js";  
  
// export class view{
//   constructor(controller){
//     controller.model.AddObserver(this);
//   }

//   // export Update(model){
//   //   console.log(model);
//   //   drawGame(model);
//   // }
// }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const drawCell = (x, y, value) => {
    context.fillStyle = value;
    context.fillRect(x + CELL_SIZE * x, y + CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
  };

  export const initView = model => {
    document.getElementById("game").appendChild(canvas);
    canvas.setAttribute("height", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
    canvas.setAttribute("width", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
    model.AddObserver(this);
  };

  export const drawGame = model => {  //équivalent de la fonction update
    model.state.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        drawCell(rowIndex, columnIndex, value);
      });
    });
  };

  export const Update = model =>{
    console.log(model);
    drawGame(model);
  }
