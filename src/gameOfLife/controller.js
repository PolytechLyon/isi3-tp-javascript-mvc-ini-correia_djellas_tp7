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

}
