let RatioSlider = document.getElementById("ratioSlider");
let Nslider = document.getElementById("NSlider");
let Ratioslitevalue = document.getElementById("ratioValue");
let Nslidervalue = document.getElementById("NValue");
Ratioslitevalue.innerHTML = RatioSlider.value;
Nslidervalue.innerHTML = Nslider.value;
document.body.style.backgroundImage = "url('Background.jpg')";

let desenhoDiv = d3.select("#divDesenho");
desenhoDiv.style.backgroundColor = "white";

let update = () => {
    desenhoDiv.html("");
    const colors = ["red", "yellow", "blue", "green", "purple", "cyan"];
    const angle = +RatioSlider.value * Math.PI / 2;
    let count = 1;
    desenhoDiv.append("svg")
           .attr("id", "desenho")
           .attr("width", 800)
           .attr("height", 600)
           .attr("style", "border:1px solid gray");

    let desenho = d3.select("#desenho");

    desenho.append("g")
           .attr("id", "g1")
           .attr("transform", "translate(400, 300)");
    for (let i = 0; i < +Nslider.value; i++) {
        let gAtualId = `#g${count++}`;
        let gAtual = d3.select(gAtualId);
        let translateX = 0;
        let translateY = 0;

        if(document.getElementById("radio1").checked){
            translateX = 80;
        }
        else if(document.getElementById("radio2").checked){
            translateX = 80;
            translateY = 80;
        }
        else if(document.getElementById("radio3").checked){
            translateY = 80;
        }
        

        gAtual.append("rect")
              .attr("fill", colors[i % colors.length])
              .attr("x", "0")
              .attr("y", "0")
              .attr("width", "80")
              .attr("height", "80")
              .attr("opacity", "0.7");
        
        gAtual.append("g")
              .attr("id", `g${count}`)
              .attr("transform", `translate(${translateX},${translateY}) rotate(${90 * +RatioSlider.value}) scale(${1/(+RatioSlider.value <= 0.5 ? Math.cos(angle) : Math.sin(angle))})`);
    }
};

update();

RatioSlider.oninput = () => {
    Ratioslitevalue.innerHTML = RatioSlider.value;
    localStorage.setItem("RatioSlider", (RatioSlider.value));
    update();
};

Nslider.oninput = () => {
    Nslidervalue.innerHTML = Nslider.value;
    localStorage.setItem("Nslider", (Nslider.value));
    update();
};

for (let rad of document.getElementsByName("varRadio")) {
    rad.onchange = (e) => {
        localStorage.setItem("Variation",e.target.id);
        update();
    }
}

let savePos = (top, left, id) => {
    var posObject = {
        top: top,
        left: left
    };
    localStorage.setItem(`position ${id}`, JSON.stringify(posObject));
};

let loadPos = () => {
    const posDes = JSON.parse(localStorage.getItem("position divDesenho") || "{}");
    const posVar = JSON.parse(localStorage.getItem("position divVars") || "{}");
    let posN = localStorage.getItem("Nslider");
    let posRatio = localStorage.getItem("RatioSlider");
    let posVariation = document.getElementById(localStorage.getItem("Variation"));
    posVariation.checked = true;
    Nslidervalue.innerHTML = posN;
    Nslider.value = posN;
    Ratioslitevalue.innerHTML = posRatio
    RatioSlider.value = posRatio
    $("#divDesenho").offset(posDes);
    $("#divVars").offset(posVar);
    update();
};

$(".draggable").css("display", "inline-block");
$(".draggable").draggable({
    stop: (e, ui) => {
        const {top, left} = ui.offset;
        savePos(top, left, e.target.id);
    }
});

loadPos();