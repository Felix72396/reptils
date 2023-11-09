(() => {
    const $form = document.querySelector("form");
    const $btn = document.querySelector("[data-btn]"),
        $lblFile = document.querySelector("label.file");



    $form.onsubmit = (e) => {
        e.preventDefault();
        let reptilInfo = {};

        console.log($form.foto.name)

        let url = "";
        if ($btn.dataset.btn === "add") {
            url = "../backend/php/insertar_reptil.php";
        }
        else {
            url = "../backend/php/actualizar_reptil.php";
        }

        reptilInfo = new FormData($form);

        fetch(url, {
            method: 'POST',
            mode: "cors",
            body: reptilInfo
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === 404)
                throw data;

            obtenerReptiles();


            $form.reset();
            $form.style.display = "none";

            $lblFile.style.backgroundColor = "#fff";
            alert(data.statusText);

        })
        .catch(error => {
            console.error(error);
            let message = `Error ${error.status} : ${error.statusText}`;
            alert(message);
        });
    }

    $form.foto.onchange = (e) => {

        const selectedFile = e.target.files[0];
        const img = document.querySelector("#img-container img");

        if (selectedFile) {
            // Create a FileReader to read the file
            const reader = new FileReader();
            $lblFile.style.backgroundColor = "green";

            // Set up the FileReader's onload event
            reader.onload = function (e) {
                // Use the e's target result (data URL) as the image src
                img.src = event.target.result;
            };

            // Read the file as a data URL (this will trigger the onload event)
            reader.readAsDataURL(selectedFile);
        } else {
            // If no file is selected, reset the image src
            img.src = '#';
        }
       
    }


})();