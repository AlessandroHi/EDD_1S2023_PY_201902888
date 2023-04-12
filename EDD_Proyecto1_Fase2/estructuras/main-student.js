
/* ------------ PARTE DE ESTUDIANTE  ----------*/
const matriz = new Matriz()
let tree =  new Tree();
let nombreArchivo = ""
function crearCarpeta(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    tree.insert(folderName, path);
    $('#carpetas').html(tree.getHTML(path))
    user = JSON.parse(localStorage.getItem("user"))
    carnet = parseInt(user)
    let arbol = new ArbolAVL()
    let temp = localStorage.getItem("avl")
    arbol.raiz = JSON.parse(temp).raiz
    arbol.addTree(carnet,tree)
    localStorage.setItem('avl',JSON.stringify(arbol))
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}

function showTreeGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
}

function showMatrixGraph(){
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(tree.matrixGrpah(path))
    let body = `digraph G { ${tree.matrixGrpah(path)} }`
    $("#graph").attr("src", url + body);
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo =  async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    nombreArchivo = form.file.name; //name file
    console.log(nombreArchivo)
    let path = $('#path').val();
    if(form.file.type === 'text/plain'){
        // ARCHIVO DE TEXTO
       
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => { 
            // CARGAR ARCHIVO A LA MATRIZ
            tree.getFolder(path).files.push({
                name: nombreArchivo, 
                content: fr.result, 
                type: form.file.type
            })
            $('#carpetas').html(tree.getHTML(path));
        };
    }else{
        // IMÁGENES O PDF 
        let parseBase64 = await toBase64(form.file);
        
        tree.getFolder(path).files.push({
            name: nombreArchivo, 
            content: parseBase64, 
            type: form.file.type
        })
        $('#carpetas').html(tree.getHTML(path));
    
    }

    matriz.insertarArchivo(nombreArchivo,1)
    reporteMatriz();
}

function reporteMatriz(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = matriz.reporte();
    $("#image").attr("src",url+body)
}

function asignarPermisos(){
    let permiso = document.getElementById("permiso").value
    let file = document.getElementById("nameFile").value
    let carnet = document.getElementById("traversal").value
    matriz.colocarPermiso(file,carnet,permiso)
    let arbol = new ArbolAVL()
    let temp = localStorage.getItem("avl")
    arbol.raiz = JSON.parse(temp).raiz
    arbol.addMatrix(carnet,matriz)
  
    reporteMatriz()
}