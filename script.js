


const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
const barContainer = document.querySelector('.bar-code');


const generateBtnBar = document.getElementById('generateBtnBar');
showElement(".bar-code", 'none');


let size = sizes.value;

generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
    showElement(".bar-code", 'none');
    //document.querySelector(".bar-code").style.display='none';
});

generateBtnBar.addEventListener('click',(e)=>{
    e.preventDefault();
    if( qrText.value.length > 0){
        
        document.querySelector(".bar-code").style.display='block';
        generateBar(); 
    }
    else{
        alert("Enter the text or URL to generate your QR code");
    }
});

function showElement(element,none){
    document.querySelector(element).style.display=none;
}


sizes.addEventListener('change',(e)=>{
    size = e.target.value;
   
    isEmptyInput();
});

downloadBtn.addEventListener('click', ()=>{
    let img = document.querySelector('.qr-body img');
    
    if(img !== null){
        
        
        let imgAtrr = img.getAttribute('src');
        downloadBtn.setAttribute("href", imgAtrr);
    }
    else{
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    }
});

function isEmptyInput(){
     if(qrText.value.length > 0){
         generateQRCode();
         showElement(".downloadBtn", 'block');
     }
     else{
         alert("Enter the text or URL to generate your QR code");
     }
}

function generateQRCode(){
    
    qrContainer.innerHTML = "";
    barContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width:size,
        colorLight:"#fff",
        colorDark:"#000",
    });
    
}

document.querySelector(".theme-btn").addEventListener("click", () => {
    let mode = theme();
    console.log(mode)
    mode === "dark" ? light() : dark(); 
});

//activate color theme
mode();
function mode( ){
    let mode = theme();
    if (mode === "dark") 
        dark();
    else 
        light(); 
}

function theme(){
    return localStorage.getItem("mode");
}

function light(){
    document.body.classList.add("light-mode");
    localStorage.setItem("mode", "light");
}

function dark (){
    document.body.classList.remove("light-mode");
    localStorage.setItem("mode", "dark");
}


function generateBar(){
    showElement(".downloadBtn", 'none');

    qrContainer.innerHTML = "";

    new JsBarcode(barContainer, qrText.value, {
        format: "code128",
        displayValue: true,
        lineColor: "#24292e",
        width:2,
        height:size,	 
        fontSize: 20					
    });	
}