const habitacionObj = {
  numero: 0,
  computadoras: 0,
  x: 0,
  y: 0,
  ancho: 0,
  alto: 0,
  habAnterior: 0
};

function getNewHabitacionObj() {
  let newHab = Object.assign({}, habitacionObj);
  let numeroAct =  parseInt(habitaciones[habitaciones.length - 1].numero) + 1
  newHab["numero"] = numeroAct;
  return newHab;
}

function getOpcionesHabitacion() {
  selectOptions = '<option value="0">Principal</option>';
  for (let i = 1; i < habitaciones.length; i++) {
      let index = parseInt(habitaciones[i].numero)
    selectOptions += `<option value="${index}">${
      habitaciones[i].numero
    }</option>`;
  }
  return selectOptions;
}

class Habitacion {
    constructor(numero, computadoras, x, y, ancho, alto, habAnterior){
        this.numero = numero
        this.computadoras = computadoras
        this.x = x
        this.y = y
        this.ancho = ancho
        this.alto = alto
        this.habAnterior = habAnterior
    }
}