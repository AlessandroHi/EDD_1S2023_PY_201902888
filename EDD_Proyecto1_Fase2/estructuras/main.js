class estudiante{
    constructor(nombre, carnet, password){
       this.nombre = nombre
       this.carnet = carnet
       this.password = password
    }
}

class nodoArbol {
    constructor(estudiante){
        this.izquierdo = null;
        this.derecho = null;
        this.estudiante = estudiante;
        this.altura = 1;
        this.factor_equilibrio = 0;
    }
}

class ArbolAVL {
    constructor(){
        this.raiz = null;
    }

    Altura(raiz){
        return raiz === null ? 0: raiz.altura
    }

    Equilibrio(raiz){
        return raiz === null ? 0: (this.Altura(raiz.derecho)-this.Altura(raiz.izquierdo))
    }

    RotacionI(raiz){ // 2
        let raiz_derecho = raiz.derecho // 4
        let hijo_izquierdo = raiz_derecho.izquierdo // 3
        raiz_derecho.izquierdo = raiz // 2
        raiz.derecho = hijo_izquierdo // 3
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        raiz_derecho.altura = 1 + Math.max(this.Altura(raiz_derecho.izquierdo),this.Altura(raiz_derecho.derecho))
        raiz.factor_equilibrio = this.Equilibrio(raiz)
        raiz_derecho.factor_equilibrio = this.Equilibrio(raiz_derecho)
        return raiz_derecho
    }
    //this.raiz = 2
    RotacionD(raiz){
        let raiz_izquierdo = raiz.izquierdo
        let hijo_derecho = raiz_izquierdo.derecho
        raiz_izquierdo.derecho = raiz
        raiz.izquierdo = hijo_derecho
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        raiz_izquierdo.altura = 1 + Math.max(this.Altura(raiz_izquierdo.izquierdo),this.Altura(raiz_izquierdo.derecho))
        raiz.factor_equilibrio =  this.Equilibrio(raiz)
        raiz_izquierdo.factor_equilibrio = this.Equilibrio(raiz_izquierdo)
        return raiz_izquierdo
    }

    insertarValorHijo(nodo, raiz){
        if (raiz === null){
            raiz = nodo
        }else{
            if (raiz.estudiante.carnet === nodo.estudiante.carnet){
                raiz.estudiante.carnet = nodo.estudiante.carnet
            }else if (raiz.estudiante.carnet < nodo.estudiante.carnet) {
                raiz.derecho = this.insertarValorHijo(nodo, raiz.derecho);
            }else{
                raiz.izquierdo = this.insertarValorHijo(nodo, raiz.izquierdo);
            }
        }
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        let balanceo = this.Equilibrio(raiz) //(-2)
        raiz.factor_equilibrio = balanceo
        //Rotacion Simple a la Izquierda
        if(balanceo > 1 && nodo.estudiante.carnet > raiz.derecho.estudiante.carnet){
            return this.RotacionI(raiz)
        }
        //Rotacion Simple a la Derecha
        if(balanceo < -1 && nodo.estudiante.carnet < raiz.izquierdo.estudiante.carnet){
            return this.RotacionD(raiz)
        }
        //Rotacion Doble a la Izquierda
        if(balanceo > 1 && nodo.estudiante.carnet < raiz.derecho.estudiante.carnet){
            raiz.derecho = this.RotacionD(raiz.derecho)
            return this.RotacionI(raiz)
        }
        //Rotacion Doble a la Derecha
        if(balanceo < -1 && nodo.estudiante.carnet > raiz.izquierdo.estudiante.carnet){
            raiz.izquierdo = this.RotacionI(raiz.izquierdo)
            return this.RotacionD(raiz)
        }
        return raiz
    }


    insertaValor(estudiante){
        const nuevoEstudiante = new nodoArbol(estudiante);
        this.raiz = this.insertarValorHijo(nuevoEstudiante,this.raiz);
    }

    /**
     * Estas Funciones son de la grafica de un Arbol Binario (Clase 7)
     * No cambia nada de la clase anterior
     * grafica_Arbol()
     * retornarValoresArbol()
     * 
     * y para reiniciar todo el arbol (Clase 7)
     * eliminarTodo()
     * 
     */
    grafica_arbol(){
        var cadena = "";
        if(!(this.raiz === null)){
            cadena = "digraph arbol{ ";
            cadena = cadena + this.retornarValoresArbol(this.raiz, 0);
            cadena = cadena + "}";
        }else{
            cadena = "No hay valores en el arbol";
        }
        return cadena;
    }

    retornarValoresArbol(raiz, id){
        var cadena = "";

        var numero = id + 1;
        if(!(raiz === null)){
            cadena += "\"";
            cadena += raiz.estudiante.carnet + " "+ raiz.estudiante.nombre;
            cadena += "\" ;";
            if(!(raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.estudiante.carnet +" "+raiz.estudiante.nombre;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.estudiante.carnet + " "+ raiz.estudiante.nombre;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + "\"" + raiz.izquierdo.estudiante.carnet+" "+raiz.izquierdo.estudiante.nombre +  "\"" + " -> " + "\"" + raiz.derecho.estudiante.carnet +" "+raiz.derecho.estudiante.nombre+ "\""  + " [style=invis]}; "
            }else if(!(raiz.izquierdo === null) && (raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.estudiante.carnet + " "+ raiz.estudiante.nombre;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.estudiante.carnet + " "+ raiz.estudiante.nombre;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "{rank=same" + "\"" + raiz.izquierdo.estudiante.carnet +" " +raiz.izquierdo.estudiante.nombre + "\"" + " -> " + "x" + numero + " [style=invis]}; "
            }else if((raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.estudiante.carnet +" "+raiz.estudiante.nombre;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.estudiante.carnet+" "+raiz.estudiante.nombre;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.estudiante.carnet + " "+raiz.derecho.estudiante.nombre + "\"" +  " [style=invis]}; "
            }
        }
        return cadena;
    }

    eliminarTodo(){
        this.raiz = null;
    }

}

const arbolBinarioAVL = new ArbolAVL();


function login(){
    var user, pass;

    user  = document.getElementById("user").value;
    pass = document.getElementById("pass").value;

    if(user == "admin" && pass == "admin"){
      window.location = "admin.html"
     
    }

}

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    localStorage.setItem("alumnos",JSON.stringify(obj))
    alumnos = JSON.parse(localStorage.getItem("alumnos"));
    for(var i = 0; i < alumnos.alumnos.length; i++){
        let nuevoEstudiante = new  estudiante(obj.alumnos[i].nombre,obj.alumnos[i].carnet,obj.alumnos[i].password)
        arbolBinarioAVL.insertaValor(nuevoEstudiante)
        let divtable = document.getElementById("data-table1")
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>"+alumnos.alumnos[i].carnet+"</td>"+ "<td>"+alumnos.alumnos[i].nombre+"</td>";
        divtable.appendChild(tr);
    }
    console.log("HOLAAAAAAAAA")
}

function refrescarArbol(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolBinarioAVL.grafica_arbol();
    $("#image").attr("src", url + body);
    console.log(body)
}


function refresAlumos(){
    alumnos = JSON.parse(localStorage.getItem("alumnos"));
    for(var i = 0; i < alumnos.alumnos.length; i++){
        let divtable = document.getElementById("data-table1")
        let tr = document.createElement("tr");
        tr.innerHTML = "<td>"+alumnos.alumnos[i].carnet+"</td>"+ "<td>"+alumnos.alumnos[i].nombre+"</td>";
        divtable.appendChild(tr);
    }
}


