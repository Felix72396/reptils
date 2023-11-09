const $form = document.getElementById("frm");
$form.onsubmit = (e) => {
   
    e.preventDefault(); 
    

    console.log(JSON.stringify(new FormData($form)), "klk")
    console.log(new FormData($form))

    fetch("../backend/php/login.php",
    {
        mode: "cors",
        method: "POST",
        body: new FormData($form)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.status === 200)
        {
            sessionStorage.setItem("login", true);
            location.assign("crud-reptiles.html");
        }
        else{
            throw data;
        }
    })
    .catch(error => {
      console.error(error);
        let message = error.statusText;
        alert(`Error ${error.status} : ${message}`);
    })
    
}