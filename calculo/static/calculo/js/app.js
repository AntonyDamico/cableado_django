const margenErrorUi = document.querySelector("#margen-error");
const tablaUi = document.querySelector(".tabla-habitaciones");
const resultadosDiv = document.querySelector(".resultados-div");

// let margenError = 15;
margenErrorUi.value = "15";
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
    let indexAcutal =
      parseInt(habitaciones[habitaciones.length - 1].numero) + 1;
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

/* Calculando
 * en tabla
 * y guardando
 */

document.querySelector(".calcular").addEventListener("click", function() {
  resultadosDiv.style.display = "block";
  const tablaPisoUiCells = document.querySelector(".tabla-resultados-piso")
    .rows[0].cells;
  const tablaTotalUiCells = document.querySelector(".tabla-resultados-total")
    .rows[0].cells;

  resultadosDiv.scrollIntoView({
    behavior: "smooth"
  });

  habitaciones = llenarHabitaciones();
  const margenError = margenErrorUi.value;
  const constAereo = document.querySelector("#cable-computadora").value;
  const precio = document.querySelector("#precio-cable").value;
  const pisos = document.querySelector("#pisos").value;

  data = {
    habitaciones,
    margenError,
    constAereo,
    precio,
    pisos
  };

  const url = "http://localhost:8000/calculo";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      let count = 0;
      for (var key in res) {
        if (count < tablaPisoUiCells.length) {
          tablaPisoUiCells[count].innerHTML = res[key];
        } else if (count - 5 < tablaTotalUiCells.length) {
          tablaTotalUiCells[count - 5].innerHTML = res[key];
        } else {
          console.log("fjkldsjflsajlkdfjl");
        }
        count++;
      }
    })
    .catch(err => console.log(err));
});
