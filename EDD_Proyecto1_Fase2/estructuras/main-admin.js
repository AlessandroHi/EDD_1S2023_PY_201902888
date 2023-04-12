function login(){
    var user, pass;

    user  = document.getElementById("user").value;
    pass = document.getElementById("pass").value;

    if(user == "admin" && pass == "admin"){
      window.location = "admin.html"
     
    }else{
        alumnos = JSON.parse(localStorage.getItem("alumnos"));
        for(var i = 0; i < alumnos.alumnos.length; i++){
            
            if(alumnos.alumnos[i].carnet == user && alumnos.alumnos[i].password == pass){
                localStorage.setItem("name",JSON.stringify(alumnos.alumnos[i].nombre))
                localStorage.setItem("user",JSON.stringify(user))
                window.location = "estudiante.html"
                alert("Bienvenido")
               
            }
        }
            
        }

    }

class nodoArbol {
    constructor(nombre, carnet,password,carpeta_raiz,tree,matriz){
        this.izquierdo = null;
        this.derecho = null;
        this.nombre = nombre;
        this.carnet = carnet;
        this.password = password;
        this.carpeta_raiz = carpeta_raiz;
        this.tree = tree
        this.matriz = matriz
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
            raiz= nodo
        }else{
            if (raiz.carnet === nodo.carnet){
                raiz.carnet = nodo.carnet
            }else if (raiz.carnet < nodo.carnet) {
                raiz.derecho = this.insertarValorHijo(nodo, raiz.derecho);
            }else{
                raiz.izquierdo = this.insertarValorHijo(nodo, raiz.izquierdo);
            }
        }
        raiz.altura = 1 + Math.max(this.Altura(raiz.izquierdo),this.Altura(raiz.derecho))
        let balanceo = this.Equilibrio(raiz) //(-2)
        raiz.factor_equilibrio = balanceo
        //Rotacion Simple a la Izquierda
        if(balanceo > 1 && nodo.carnet > raiz.derecho.carnet){
            return this.RotacionI(raiz)
        }
        //Rotacion Simple a la Derecha
        if(balanceo < -1 && nodo.carnet < raiz.izquierdo.carnet){
            return this.RotacionD(raiz)
        }
        //Rotacion Doble a la Izquierda
        if(balanceo > 1 && nodo.carnet < raiz.derecho.carnet){
            raiz.derecho = this.RotacionD(raiz.derecho)
            return this.RotacionI(raiz)
        }
        //Rotacion Doble a la Derecha
        if(balanceo < -1 && nodo.carnet > raiz.izquierdo.carnet){
            raiz.izquierdo = this.RotacionI(raiz.izquierdo)
            return this.RotacionD(raiz)
        }
        return raiz
    }


    insertaValor(nombre, carnet,password,carpeta_raiz,tree,matriz){
        const nuevoNodo = new nodoArbol(nombre, carnet,password,carpeta_raiz,tree,matriz);
        this.raiz = this.insertarValorHijo(nuevoNodo,this.raiz);
    }

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
            cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
            cadena += "\" ;";
            if(!(raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + "\"" + raiz.izquierdo.carnet + "\\n" + raiz.izquierdo.nombre +"\\n Altura: " + raiz.izquierdo.altura + "\"" + " -> " + "\"" + raiz.derecho.carnet + "\\n" + raiz.derecho.nombre + "\\n Altura: " + raiz.derecho.altura + "\""  + " [style=invis]}; "
            }else if(!(raiz.izquierdo === null) && (raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.izquierdo, numero)
                cadena += "\"";
                cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "{rank=same" + "\"" + raiz.izquierdo.carnet + "\\n" + raiz.izquierdo.nombre + "\\n Altura: " + raiz.izquierdo.altura + "\"" + " -> " + "x" + numero + " [style=invis]}; "
            }else if((raiz.izquierdo === null) && !(raiz.derecho === null)){
                cadena += " x" + numero + " [label=\"\",width=.1,style=invis];"
                cadena += "\"";
                cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += "x" + numero + "[style=invis]";
                cadena += "; \"";
                cadena += raiz.carnet + "\\n" + raiz.nombre + "\\n Altura: " + raiz.altura;
                cadena += "\" -> ";
                cadena += this.retornarValoresArbol(raiz.derecho, numero)
                cadena += "{rank=same" + " x" + numero + " -> \"" + raiz.derecho.carnet + "\\n" + raiz.derecho.nombre + "\\n Altura: " + raiz.derecho.altura + "\"" +  " [style=invis]}; "
            }
        }
        return cadena;
    }

    addTree(user,tree){
      this._addTREE(this.raiz,user,tree)
    }

    _addTREE(raiz,user,tree){
      if(raiz != null){
        if(raiz.carnet == user){
            raiz.tree = tree
          }else{
            if(user < raiz.carnet){
               this._addTREE(raiz.izquierdo,user,tree)
            }else{
                this._addTREE(raiz.derecho,user,tree)
            }
          }
      }
    }

    addMatrix(user,matriz){
        this._addTREE(this.raiz,user,matriz)
      }
  
    _addMatrix(raiz,user,matriz){
        if(raiz != null){
          if(raiz.carnet == user){
              raiz.matriz = matriz
            }else{
              if(user < raiz.carnet){
                 this._addMatrix(raiz.izquierdo,user,tree)
              }else{
                  this._addMatrix(raiz.derecho,user,tree)
              }
            }
        }
      }

    
    eliminarTodo(){
        this.raiz = null;
    }

}

let arbolAVL = new ArbolAVL();

const inputElement = document.getElementById("input1");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    localStorage.setItem("alumnos",JSON.stringify(obj))

    for(var i = 0; i < obj.alumnos.length; i++){
        console.log(typeof(obj.alumnos[i].carnet))
        arbolAVL.insertaValor(obj.alumnos[i].nombre,obj.alumnos[i].carnet,obj.alumnos[i].password,obj.alumnos[i].Carpeta_Raiz) 
    }
    localStorage.setItem("avl",JSON.stringify(arbolAVL))
    alert('Alumnos cargados con éxito!')
}


function refrescarArbol(){
    let temp = localStorage.getItem("avl")
    arbolAVL.raiz = JSON.parse(temp).raiz
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolAVL.grafica_arbol();
   $("#image").attr("src", url + body);
    
   
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


