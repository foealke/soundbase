function showWarning(message) {
    if ( !document.querySelector('#body1') ) {
        console.log('There is no body1 element !')
        return
    }
    document.querySelector('#body1').innerHTML += `<div class="animated fadeInLeft unselectable" id="warning" style="box-shadow: 10px 10px 8px #d3d3d3;; width:25vw; height: 15vh; background-color: rgb(255, 255, 255); position: absolute; top: 80vh; left: 0vh; margin: 15px; " id="warning">
    <div style="color: white; font-size: 1.5vh; height: 1.5rn; width: 25vw; background-color: rgb(160, 8, 206);"> Warning</div>
    <div style="text-align: left; padding: 10px;"> `+message+` </div>
</div>`;
    setTimeout(() => {
        animateCss('#warning', "fadeOutLeft")
        setTimeout(() => {
            document.getElementById("warning").outerHTML = "";
        }, 1000)
    }, 5000);
}



