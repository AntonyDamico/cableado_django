const margenErrorUi = document.querySelector("#margen-error");
const tablaUi = document.querySelector(".tabla-habitaciones");
const resultadosDiv = document.querySelector(".resultados-div");

let margenError = 15;
let habitaciones = [habitacionObj];

// RANGE DEL MARGEN DE ERROR

margenErrorUi.addEventListener("change", function() {
  document.querySelector(".margen-error-label").textContent = `${this.value}%`;
  margenError = parseInt(margenErrorUi.value);
});

// AGREGANDO HABITACION
document
  .querySelector(".agregar-habitacion")
  .addEventListener("click", function() {
    selectOptions = getOpcionesHabitacion();
    let indexAcutal = parseInt(habitaciones[habitaciones.length - 1].numero) + 1
    console.log(habitaciones)
    let tableRow = `
        <tr>
            <th class="align-middle">${indexAcutal}</th>
            <td><input type="number" class="computadoras form-control" value='0' min='0'/></td>
            <td><input type="number" class="xpos form-control" value='0' min='0' /></td>
            <td><input type="number" class="ypos form-control" value='0' min='0'/></td>
            <td><input type="number" class="ancho form-control" value='0' min='0'/></td>
            <td><input type="number" class="alto form-control" value='0' min='0'/></td>
            <td><select class="select-habitaciones hab-anterior custom-select">
                ${selectOptions}
            </select></td>
        </tr>
    `;
    tablaUi.insertAdjacentHTML("beforeend", tableRow);
    habitaciones.push(getNewHabitacionObj());
  });

//   Eliminar habitaciones en tabla
document
  .querySelector(".borrar-habitaciones")
  .addEventListener("click", function(e) {
    for (let i = 1; i < tablaUi.children.length; i++) {
      let child = tablaUi.children[i];
      tablaUi.removeChild(child);
      i--;
    }

    habitaciones = [habitacionObj];
    resultadosDiv.style.display = "none";
  });

function llenarHabitaciones() {
  let habs = []
  for (let i = 0; i < tablaUi.rows.length; i++) {
    let row = tablaUi.rows[i].cells;
    let valores = [...row].map(function(x) {
      if (x.childElementCount > 0) {
        return x.children[0].value;
      } else {
        return x.innerHTML;
      }
    });
    habs.push(new Habitacion(...valores))
  }
  return habs
}

document.querySelector(".calcular").addEventListener("click", function() {
  resultadosDiv.style.display = "block";
  const tablaResultadosPisoUi = document.querySelector(
    ".tabla-resultados-piso"
  );
  const tablaResultadosTotalUi = document.querySelector(
    ".tabla-resultados-total"
  );

  tablaResultadosTotalUi.scrollIntoView({
    behavior: "smooth"
  });

  habitaciones = llenarHabitaciones();
});
