document.body.addEventListener("mousemove", (e)=>{
    
    const span = document.createElement("span");
    span.style.left = `${e.offsetX}px`;
    span.style.top = `${e.clientY}px`;
    // document.title = `${e.clientX}px; ${e.clientY}px`;
    span.style.setProperty("--x", getRandomNumber());
    span.style.setProperty("--y", getRandomNumber() - 25);

    let size = Math.floor(Math.random() * 10);
    span.style.setProperty("--size", size);
    span.className = "animate";

    document.body.appendChild(span);
    
    setTimeout(() => {
        document.body.removeChild(span);
    }, 5000);
}); 

function getRandomNumber()
{
    let n = Math.floor(Math.random() * 50);
    if(Math.floor(Math.random() * 2) === 0)
        n*=(-1);
    return n;
}