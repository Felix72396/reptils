

function obtenerReptiles() {
    const $tbody = document.querySelector("table tbody");

    let html = "";
    fetch("../backend/php/obtener_reptiles.php")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(item => {
                let extintoClass = item.extinto === "1" ? "extinto" : "no-extinto";
                html += `
            <tr class="${extintoClass}">
                <td>${item.id}</td>
                <td>${item.nombre_cientifico}</td>
                <td>${item.nombre_comun}</td>
                <td>${item.pais_de_origen}</td>
                <td>${item.extinto === "1" ? "Si" : "No"}</td>
                <td>${item.foto}</td>
                <td>
                    <button class="update" data-btn="update" data-id="${item.id}" title="Editar">
                        <img src="../img/update.png">
                    </button>
                </td>
              
                <td>
                    <button class="delete" data-id="${item.id}" title="Eliminar">
                        <img src="../img/delete.png">
                    </button>
                </td>
            </tr>
            `;
            })

            $tbody.innerHTML = html;
        })
        .catch(error => alert(error));
}

obtenerReptiles();