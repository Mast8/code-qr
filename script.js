


const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
const barContainer = document.querySelector('.bar-code');


const generateBtnBar = document.getElementById('generateBtnBar');
showElement(".bar-code", 'none');
showElement(".downloadBtnBar", 'none');


let size = sizes.value;

generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
    showElement(".bar-code", 'none');
    showElement(".downloadBtnBar", 'none');
});

generateBtnBar.addEventListener('click',(e)=>{
    e.preventDefault();
    if( qrText.value.length > 0){
        showElement(".bar-code", 'bloack');
        generateBar(); 
    }
    else{
        alert("Enter the text or URL to generate Bar code");
    }
});

function showElement(element, none){
    document.querySelector(element).style.display=none;
}


sizes.addEventListener('change',(e)=>{
    size = e.target.value;
   
    isEmptyInput();
});

downloadBtn.addEventListener('click', ()=>{
    let img = document.querySelector('.qr-body img');
    console.log(img);
    
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
         alert("Enter the text or URL to generate QR code");
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


    showElement(".downloadBtnBar", 'block');

    check();

}
function check(){
    const downloadBtnBar = document.getElementById('downloadBtnBar');
    //downloadBtnBar.addEventListener('click', ()=>{
        const svg = document.getElementById('svg');
        const { x, y, width, height} = svg.viewBox.baseVal;
        const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const image = document.createElement('img');
        image.src = url;
        console.log(svg);
        image.addEventListener('load', ()=>{
        
    
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height= height;
            const context = canvas.getContext('2d');
            context.drawImage(image, x, y ,width, height);
            const link = document.getElementById('link');
            link.href = canvas.toDataURL();
            console.log(link);
            URL.revokeObjectURL(url);
    
        });
    //});
    
}




