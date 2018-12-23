const habitacionObj = {
  numero: 0,
  computadoras: 0,
  x: 0,
  y: 0,
  ancho: 0,
  alto: 0,
  habAnterior: 0
};

const cajaObj = {
  numero: 0,
  computadoras: 0,
  x: 0,
  y: 0
};

function getNewHabitacionObj() {
  let newHab = Object.assign({}, habitacionObj);
  let numeroAct = parseInt(habitaciones[habitaciones.length - 1].numero) + 1;
  newHab["numero"] = numeroAct;
  return newHab;
}

function getNewCajaObj() {
  let newCaja = Object.assign({}, cajaObj);
  let numeroAct = parseInt(cajas[cajas.length - 1].numero) + 1;
  newCaja["numero"] = numeroAct;
  return newCaja;
}

function getOpcionesHabitacion() {
  selectOptions = '<option value="0">Principal</option>';
  for (let i = 1; i < habitaciones.length; i++) {
    let index = parseInt(habitaciones[i].numero);
    selectOptions += `<option value="${index}">${
      habitaciones[i].numero
    }</option>`;
  }
  return selectOptions;
}

class Habitacion {
  constructor(numero, computadoras, x, y, ancho, alto, habAnterior) {
    this.numero = numero;
    this.computadoras = computadoras;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.habAnterior = habAnterior;
  }
}

function llenarHabitaciones() {
  let habs = [];
  for (let i = 0; i < tablaUi.rows.length; i++) {
    let row = tablaUi.rows[i].cells;
    let valores = [...row].map(function(x) {
      if (x.childElementCount > 0) {
        return x.children[0].value;
      } else {
        return x.innerHTML;
      }
    });
    let valoresInt = valores.map(function(x) {
      if (!isNaN(x)) {
        return parseInt(x);
      }
      return x;
    });
    habs.push(new Habitacion(...valoresInt));
  }
  return habs;
}

function llenarCajas() {
  let cajas = [];
  for (let i = 0; i < tablaUi.rows.length; i++) {
    let row = tablaUi.row[i].map(function(x) {
      
    });
  }
}
