window.addEventListener("DOMContentLoaded", e => {
    const $li = document.getElementById("sesion");

    if (sessionStorage.getItem("login")) {
        $li.querySelector("a").textContent = "Cerrar Session";
        $li.style.backgroundColor = "rgb(244, 213, 58)";

        const $a = document.createElement("a");
        
        if(document.body.dataset.page === "index")
        {
            $a.href = "html/crud-reptiles.html";
        }
        else{
            $a.href = "../html/crud-reptiles.html";
        }

        $a.textContent = "Mantenimiento Reptiles";
        $a.id = "mantenimiento-reptiles";
        const $main = document.querySelector("main");
        // $main.appendChild($a);
        
        if(document.body.dataset.page !== "crud-reptiles")
        {
            document.body.appendChild($a);
        }

    }

    $li.onclick = () => {
        sessionStorage.clear();
    }
})


