window.onload = function(){

    const colors = ["red", "yellow", "blue"];
    var i = 0;

    var div1 = document.createElement("div");
    var div2 = document.createElement("div")
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    document.body.style.backgroundImage = "url('Background.jpg')";

    var b = document.createElement("button"); 
    b.onclick = () => {
        createCircle(i);
        i++;
    }
    var text = document.createTextNode("Criar circulo");
    b.appendChild(text);
    div1.appendChild(b);

    var b2 = document.createElement("button");
    b2.style.marginLeft = "20px";
    b2.onclick = () => {
        var child = div2.lastElementChild;
        while (child) {
            div2.removeChild(child);
            child = div2.lastElementChild;       
        }
    }
    var text2 = document.createTextNode("Deletar todos os Circulos");
    b2.appendChild(text2);
    div1.appendChild(b2)

    function createCircle(i){
    var circle = document.createElement("div")
    circle.style.width = "130px";
    circle.style.height = "130px";
    circle.style.backgroundColor = colors[i%3];
    circle.style.borderRadius = "50%";
    circle.style.float = "left";
    circle.style.marginRight = "50px";
    circle.style.marginTop = "30px"
    circle.onclick = () => {
        circle.remove();
    }
    div2.appendChild(circle);
    }

};