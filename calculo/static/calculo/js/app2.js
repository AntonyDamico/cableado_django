const margenErrorUi = document.querySelector("#margen-error");
const tablaUi = document.querySelector(".tabla-cajas");
const resultadosDiv = document.querySelector(".resultados-div");

let margenError = 12;
margenErrorUi.value = "12";
let cajas = [cajaObj];

function rangeValue(val) {
  document.querySelector(".margen-error-label").textContent = `${val}%`;
  margenError = parseInt(margenErrorUi.value);
}

// AGREGANDO CAJA
document.querySelector(".agregar-caja").addEventListener("click", function() {
  let indexAcutal = parseInt(cajas[cajas.length - 1].numero) + 1;
  let tableRow = `
        <tr>
            <th class="align-middle">${indexAcutal}</th>
            <td><input type="number" class="computadoras form-control" value='0' min='0'/></td>
            <td><input type="number" class="xpos form-control" value='0' min='0' /></td>
            <td><input type="number" class="ypos form-control" value='0' min='0'/></td>
        </tr>
    `;
  tablaUi.insertAdjacentHTML("beforeend", tableRow);
  cajas.push(getNewCajaObj());
});

//   Eliminar cajas en tabla
document.querySelector(".borrar-cajas").addEventListener("click", function(e) {
  for (let i = 1; i < tablaUi.children.length; i++) {
    let child = tablaUi.children[i];
    tablaUi.removeChild(child);
    i--;
  }

  cajas = [cajaObj];
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

  cajas = llenarHabitaciones();
  const margenError = parseInt(margenErrorUi.value);
  const constAereo = parseInt(
    document.querySelector("#cable-computadora").value
  );
  const precio = parseInt(document.querySelector("#precio-cable").value);
  const pisos = parseInt(document.querySelector("#pisos").value);
  // const posCajaPrincipal = selectPosCajaP.value;

  data = {
    cajas,
    margenError,
    constAereo,
    precio,
    pisos
    // posCajaPrincipal
  };

  const url = "http://localhost:8000/calculo2";

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
          tablaPisoUiCells[count].innerHTML = Math.round(res[key] * 100) / 100;
        } else if (count - 5 < tablaTotalUiCells.length) {
          tablaTotalUiCells[count - 5].innerHTML =
            Math.round(res[key] * 100) / 100;
        }
        count++;
      }
    })
    .catch(err => console.log(err));
});
