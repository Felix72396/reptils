window.addEventListener("DOMContentLoaded", () => {
    const $form = document.querySelector("form"),
        $lblFile = document.querySelector("label.file");
    // console.log($form)

    const $btnCallFrmAdd = document.getElementById("btn-call-frm-add");

    $btnCallFrmAdd.onclick = () => {
        $form.style.display = "block";
        const img = document.querySelector("#img-container img");
            img.setAttribute("src", ``);

    }

    window.onclick = (e) => {
        if (e.target.matches(".close")) {


            $form.send.dataset.btn = "add";
            $form.querySelector("legend").textContent = "Añade un reptíl";
            $form.send.textContent = "AGREGAR";
            $form.style.display = "none";
            $form.noValidate = true;
            $form.reset();

            const img = document.querySelector("#img-container img");
            img.setAttribute("src", ``);

            setTimeout(() => $form.noValidate = false, 100);

        }


        if (e.target.matches(".update") || e.target.matches(".update img")) {

            const $txtHidden = document.getElementById("txt-hidden");
            $txtHidden.style.display = "block";
            $txtHidden.value = e.target.dataset.id;
            $form.style.display = "block";
            $form.send.dataset.btn = "update";
            $form.querySelector("legend").textContent = "Actualiza el reptíl";
            $form.send.textContent = "ACTUALIZAR";

            const $tr = e.target.closest("tr");

            $form.id.value = $tr.children[0].textContent;
            $form.nombre_cientifico.value = $tr.children[1].textContent;
            $form.nombre_comun.value = $tr.children[2].textContent;
            $form.pais_de_origen.value = $tr.children[3].textContent;

            if ($tr.children[4].textContent === "Si") {
                $form.extinto.checked = true;
            }

            if ($tr.children[5].textContent)
            {
                $lblFile.style.backgroundColor = "green";
                const img = document.querySelector("#img-container img");
                img.setAttribute("src", `../backend/pictures/${$tr.children[5].textContent}`);
            
            //    alert(`../backend/pictures/${$tr.children[5].textContent}`)
            }

            
        }

        if (e.target.matches(".delete") || e.target.matches(".delete img")) {
            let ok = confirm("Desea eliminar este reptíl?");

            let id = e.target.closest(".delete").dataset.id;

            if (!ok)
                return;

            const $tr = e.target.closest("tr");
            let foto_url = `../pictures/${$tr.children[5].textContent}`;
            fetch("../backend/php/eliminar_reptil.php", {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    foto_url
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 404)
                    throw data;



                alert(data.statusText);
                obtenerReptiles();

            })
            .catch(error => {
                console.error(error);
                let message = `Error ${error.status} : ${error.statusText}`;
                alert(message);
            });



        }

        // seleccionarArchivoPorUrl($tr.children[5].textContent);
    }






    // function seleccionarArchivoPorUrl(name) 
    // {
    //     let url = `../backend/pictures/${name}`;
    //     // Create an anchor element to use as a link to the file URL
    //     const linkElement = document.createElement('a');
    //     linkElement.href = url;

    //     // Create a click event on the link element to simulate a click on the file input
    //     const clickEvent = new MouseEvent('click', {
    //       view: window,
    //       bubbles: true,
    //       cancelable: true
    //     });

    //     // Attach the link element to the document and trigger the click event

    //     linkElement.dispatchEvent(clickEvent);

    //     // Remove the link element from the document after the click event
    //     document.body.removeChild(linkElement);
    //   }


});