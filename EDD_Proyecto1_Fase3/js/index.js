
//let tree = new Tree_N_ario();
let tree = new TreeDirigido();
let avlTree = new AvlTree();
let avlTree2 = new AvlTree();
let TablaHash = new HashTable();
let permisos = [];//propietario,destino,Ubicacion,archivo, permisos
let blockChain = new BlockChain();
let  encontradoGlobal = null;

let listademensajes = [];


//Administrador
function ComprobarUser(evento){
    evento.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //console.log(username,password);
    if(username == 'admin'&& password =='admin'){
        alert("Bienvenido admin");
        window.location.href = "Admin.html";

    }else {
        var estudiante = localStorage.getItem("avlTree");
        var temp = localStorage.getItem("HashTable");
        if(temp!= null){
            let encryptedText = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

            avlTree.raiz = JSON.parse(estudiante).raiz;
            let   encontrado = buscarEnAVL(avlTree.raiz, username, encryptedText);
            encontradoGlobal = encontrado;
             localStorage.setItem("encontradoGlobal", JSON.stringify(encontradoGlobal));

            TablaHash.table =JSON.parse(temp).table
            TablaHash.capacidad =JSON.parse(temp).capacidad
            TablaHash.espaciosUsados =JSON.parse(temp).espaciosUsados
            //console.log(avlTree.raiz);

            let carnet = TablaHash.search(username);
            console.log(carnet)
            
            
            //encontrado = null;
            for (const clave in TablaHash.table){
                if (TablaHash.table[clave] != null){
    
                    if (TablaHash.table[clave].Estudiante.Carnet!= null && TablaHash.table[clave].Estudiante.Nombre != null) {

                    if(encryptedText === TablaHash.table[clave].Estudiante.Pass  && username == TablaHash.table[clave].Estudiante.Carnet){
                        alert("Bienvenido " + TablaHash.table[clave].Estudiante.Nombre +' '+ TablaHash.table[clave].Estudiante.Carnet);
                        window.location.href = "Users.html";
                        break;
                    }else{
                        console.log("No son iguales")
                    }
                       
                }
               
           } 
         
            
        }

            // Para obtener el valor de localStorage al cargar la nueva página
            
            //console.log(encontradoGlobal)
//
        }
    
        
    }
}

function buscarEnAVL(nodo, user,pass) {
   
    //console.log(nodo);
    if (nodo === null) {
      return null; // No se encontró el atributo
    }
    //console.log(nodo)

    
    if (nodo.Estudiante.Carnet == user && nodo.Estudiante.Pass == pass) {
        //console.log(nodo.Estudiante.Carnet);
        return nodo; // Se encontró el atributo
    }
  
    if (user < nodo.Estudiante.Carnet) {
        // Atributo buscado es menor, buscar en el subárbol izquierdo
        return buscarEnAVL(nodo.izquierda, user, pass);
    } else {
        // Atributo buscado es mayor, buscar en el subárbol derecho
        return buscarEnAVL(nodo.derecha, user, pass);
    }
  }
  

function goBack() {
    window.location.href = "Login.html";
  }

//carnet, nombre, password
function inorderTraversal(node) {
    if (node !== null) {
   
     
      inorderTraversal(node.izquierda);
      TablaHash.insert(node.Estudiante);
      inorderTraversal(node.derecha);
    }
  }

function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];//Arreglo para manejar a el avl
    
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            const key = 'EncriptacionModoDiosXD';
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr>
                        
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                
                

                // Encriptar el texto
                let encryptedText = CryptoJS.SHA256(studentsArray[i].password).toString(CryptoJS.enc.Hex);
                
                
                avlTree.insert(studentsArray[i].nombre,studentsArray[i].carnet,encryptedText,studentsArray[i].Carpeta_Raiz);
                avlTree2.insert(studentsArray[i].nombre,studentsArray[i].carnet,encryptedText,studentsArray[i].Carpeta_Raiz);
                //console.log(studentsArray[i])
                //console.log("Nombre: " +studentsArray[i].nombre ,"Carpeta:",studentsArray[i].Carpeta_Raiz)
            }
            
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            localStorage.setItem("avlTree2", JSON.stringify(avlTree2))
            console.log(avlTree);

            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

function showLocalStudents(e){
    let temp = localStorage.getItem("avlTree")
    if(temp != null){
        avlTree.raiz = JSON.parse(temp).raiz;
        $('#studentsTable tbody').html(
        avlTree.inOrder()
        )
    }else{
        console.log("No hay nada que mostrar")
    }

   
}

//--------------------------------------------------------------------------
//                          Encriptado/desencriptado
//--------------------------------------------------------------------------


// Encriptar el texto
//const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
//console.log('Texto cifrado:', encryptedText);

// Descifrar el texto
//const decryptedText = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
//console.log('Texto descifrado:', decryptedText);


function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text, key) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
/*
/////////////////////////// Tabla hash ///////////////////////////////////////
*/

function crearTablaHash(){
    
    var estudiante = localStorage.getItem("avlTree2");
    if(estudiante!= null){
        avlTree2.raiz = JSON.parse(estudiante).raiz;
        inorderTraversal(avlTree2.raiz)
        localStorage.setItem("HashTable", JSON.stringify(TablaHash))
        console.log(TablaHash)
  
//
    }  
}




function ShowHashTable(e){
    let temp = localStorage.getItem("HashTable");
    
    if(temp != null){

        TablaHash.table =JSON.parse(temp).table
        TablaHash.capacidad =JSON.parse(temp).capacidad
        TablaHash.espaciosUsados =JSON.parse(temp).espaciosUsados
        //console.log(TablaHash.table);
        //console.log(TablaHash.inOrderHash());
       
        $('#TablaHash tbody').html(
        TablaHash.inOrderHash()
        )
    }else{
        console.log("No hay nada que mostrar")
    }

   
}


//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}


//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showAvlGraph(){
    if(avlTree.raiz !=null){
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G { ${avlTree.treeGraph()} }`
        //console.log(body);
        $("#graphAVL").attr("src", url + body);
    }
   
}



$( document ).ready(showLocalStudents);
$( document ).ready(ShowHashTable);
$( document ).ready(ShowCarpetas);
$( document ).ready(showTreeGraph);
$( document ).ready(ShowPermisosTable);


//Modificacion

/* METODOS DEL ARBOL NARIO*/


function crearCarpeta(e){
    e.preventDefault();
    encontradoGlobal = JSON.parse(localStorage.getItem("encontradoGlobal"));
    
    let temp = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    if(temp!=null){
        tree= TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    }
    //console.log(encontradoGlobal);

    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    
    //encontradoGlobal.Estudiante.Arbol_Carpetas.Insertar(folderName, path);

    //console.log(encontradoGlobal.Estudiante.Arbol_Carpetas);
    tree.Insertar(folderName, path);
    alert("Carpeta creada")
    $('#carpetas').html(tree.getHTML(path))

    //localStorage.setItem("miGrafo", JSON.stringify(miGrafo.toJSON()));
    
    //onst grafoRecuperado = Grafo.fromJSON(JSON.parse(localStorage.getItem("miGrafo")));
    
    guardarenLocalStorage(tree)

    console.log(tree)
    $('#carpetas').html(tree.getHTML(path))
        

    
}
function guardarenLocalStorage(tree){
    //let carpetas = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido"))) 
    //console.log(carpetas)
    
    localStorage.setItem("noDirigido",JSON.stringify(tree.toJSON()))
    
    
}
function ShowCarpetas(e){
    let temp= TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    if(temp!=null){
        tree = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
        let path =  $('#path').val();
        $('#carpetas').html(tree.getHTML(path))
    }
   
        
    

}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    tree = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    //console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}

function showTreeGraph(){
    let temp = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    if(temp!=null){
        tree = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    }
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    //console.log(body)
    $("#graph").attr("src", url + body);
    
}



const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo =  async (e) => {
    let temp = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    if(temp!=null){
        tree = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));
    }

    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    // console.log(form.file.type);
    let path = $('#path').val();
    if(form.file.type === 'text/plain'){
        // ARCHIVO DE TEXTO
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => { 
            // CARGAR ARCHIVO A LA MATRIZ
            tree.getFolder(path).node.files.push({
                name: form.fileName, 
                content: fr.result, 
                type: form.file.type
            })
            $('#carpetas').html(tree.getHTML(path));
        };
    }else{
        // IMÁGENES O PDF 
        let parseBase64 = await toBase64(form.file);
        tree.getFolder(path).node.files.push({
            name: form.fileName, 
            content: parseBase64, 
            type: form.file.type
        })
        $('#carpetas').html(tree.getHTML(path));
        // console.log(parseBase64)
        // $("#imagenSubida").attr("src", imgBase64); 
        // console.log(await toBase64(form.file));
    }
    guardarenLocalStorage(tree)
    alert('Archivo Subido!')

}

//Permisos de los archivos
function ShowPermisosTable(){
    let listaRecuperada = localStorage.getItem("listaPermisos");
    if(listaRecuperada!=null){
        permisos = JSON.parse(listaRecuperada);
    }
    let htmlPermisos = inOrderHash(permisos)

    $('#TablaPermisos tbody').html(
        htmlPermisos
        )
}
function inOrderHash(permisos){
        
    let html = inOrderRecursivePermisos(permisos);

    return html;
    
}




function inOrderRecursivePermisos(table){
    console.log(table)
    let row = "";
    let i = 0;
   for (const clave in table){
        if (table[clave] != null){
            row +=`
                <tr>
                   
                
                `;
            console.log(table[clave])
            for(const index in table[clave]){
                //console.log(table[clave][index])
                
                if(table[clave][index]==table[clave][3]){

                    row+=`<td><a href="${table[clave][index]}" download>${table[clave][4]}</a></td>`;

                }else if(table[clave][index]==table[clave][4]){

                }else{
                    row +=`
               
                    <td>${table[clave][index]}</td>
             
                `;

                }
                
            }
            row+="</tr>";
            
        }else{
            console.log("no hay nada crack")
        }
       
   }
   console.log(row)
    return row;
}

//propietario,destino,Ubicacion,archivo, permisos
function DarPermisos(e){
    e.preventDefault();
    let temp = localStorage.getItem("HashTable");
    let archivo =$('#archivo').val();//archivo ingresado
    let carnet =  $('#traversal').val();//carnet a dar permiso
    let path =  $('#path').val();//ruta del archivo
    let permiso = $("#permiso").val();

    encontradoGlobal = localStorage.getItem("encontradoGlobal");
    let encontrado = JSON.parse(encontradoGlobal);





    
    console.log("Carnet ingresado:",encontrado.Estudiante.Carnet);
    let archivos = TreeDirigido.fromJSON(JSON.parse(localStorage.getItem("noDirigido")));

    let lista =[]

    if(temp != null){

        TablaHash.table =JSON.parse(temp).table
        TablaHash.capacidad =JSON.parse(temp).capacidad
        TablaHash.espaciosUsados =JSON.parse(temp).espaciosUsados
        //console.log(TablaHash.table);
        //console.log(TablaHash.inOrderHash());
        console.log(carnet, path)
        let listaRecuperada = localStorage.getItem("listaPermisos");
        if(listaRecuperada!=null){
            permisos = JSON.parse(listaRecuperada);
        }
        
        console.log(permisos)
        for(const clave in TablaHash.table){
            if (TablaHash.table[clave] != null){
                //console.log(TablaHash.table[clave].Estudiante.Carnet)
                if(TablaHash.table[clave].Estudiante.Carnet == carnet){
                    if (archivos!=null){
                        for(const index in archivos){
                            //console.log("ESTO HAY EN EL GRAFO NO DIRIGIDO",archivos[index].files[0].name)
                            for(const indef in archivos[index].files)
                            if(archivos[index].files[indef].name == archivo){
                                lista = [encontrado.Estudiante.Carnet,TablaHash.table[clave].Estudiante.Carnet,path,archivos[index].files[indef].content,archivos[index].files[indef].name,permiso];
                                console.log(lista);
                                permisos.push(lista);
                                localStorage.setItem("listaPermisos",JSON.stringify(permisos));
                                console.log(permisos);

                            }
                        }
                    }
                    //console.log(archivo, carnet,archivo,permiso);
                    //alert("Carnet encontrado");
                    
                    

                }
            }
            
        }
        
    }else{
        console.log("No hay nada que mostrar")
    }
}






// Block Chain
// MOSTRAR LOS USAURIOS EN LOS SELECTS
$(document).ready(() => {

    let temp = localStorage.getItem("HashTable");
  
     

    if (temp != null) {
        TablaHash.table =JSON.parse(temp).table
        TablaHash.capacidad =JSON.parse(temp).capacidad
        TablaHash.espaciosUsados =JSON.parse(temp).espaciosUsados

        let optionsForSelect1 = "";
        let optionsForSelect2 = "";
        let optionsForSelect3 = "";
        
        
        console.log("Esta es la tabla hash del insert",TablaHash.table);
        
        for (const clave in TablaHash.table){
            if (TablaHash.table[clave] != null){

                if (TablaHash.table[clave].Estudiante.Carnet!= null && TablaHash.table[clave].Estudiante.Nombre != null) {

                    //console.log(TablaHash.table[clave].Estudiante.Nombre);
                    optionsForSelect1 += `
                    <option value="${TablaHash.table[clave].Estudiante.Carnet}">${TablaHash.table[clave].Estudiante.Nombre}</option>
                    
                    `;

                    
                    
                    optionsForSelect2 += `
                        <option value="${TablaHash.table[clave].Estudiante.Carnet}">${TablaHash.table[clave].Estudiante.Nombre}</option>
                    `;

                    optionsForSelect3 += `
                        <option value="${TablaHash.table[clave].Estudiante.Carnet}">${TablaHash.table[clave].Estudiante.Carnet}</option>
                    `;

                  
            }
           
       } 



        
        
    }
        //console.log(optionsForSelect1);
        //console.log(optionsForSelect2);
        
        $('#traversal').append(optionsForSelect3);
        $('#transmitter').append(optionsForSelect1);
        $('#receiver').append(optionsForSelect2);
        

}});


// ACTUALIZAR AMBOS CHATS 
function updateChats(){
    let chat = localStorage.getItem("blockChain");
    
    let blockChain2 = new BlockChain()
    
    console.log("ESTO TIENE EL BLOCKCHAIN2 VACIO",blockChain2)
    //transmitter, receiver, message
   

    blockChain2 = JSON.retrocycle(JSON.parse(chat));
    

    
    console.log("ESTO TIENE AL OBTENER EL VALOR EN EL LOCALSTORAGE",blockChain2)
    console.log("ESTO TIENE el BLOCKCHAIN ORIGINAl",blockChain)

    //let transmitter = $('#transmitter').val();
    //console.log("Esto imprime el transmiter",transmitter)
    encontradoGlobal = localStorage.getItem("encontradoGlobal");
    let encontrado = JSON.parse(encontradoGlobal);
    console.log("Carnet ingresado:",encontrado.Estudiante.Carnet)
    //encontrado.Estudiante.Nombre = transmitter


    let receiver = $('#receiver').val();


   
    $('#receiver-chat').html(acualizarChats(blockChain2,encontrado.Estudiante.Carnet, receiver));

}
function acualizarChats(blockChain,transmitter,receiver){
    if(blockChain.primero !== null){
        let msgs = "";
        let temp = blockChain.primero;
        while(temp !== null){
            console.log(temp.receiver,transmitter)
            if(String(temp.receiver) === String(transmitter)){
                console.log(temp.receiver,transmitter)
                if(String(temp.transmitter) === String(receiver)){
                    msgs += `<li class="list-group-item">${temp.message}</li>`;
                }

            }else if(String(temp.transmitter) === String(transmitter)){
                console.log(temp.transmitter,transmitter)
                if(String(temp.receiver) === String(receiver)){
                    msgs += `<li class="list-group-item bg-primary text-light" style="text-align: left">${temp.message}</li>`;
                }
            }
            temp = temp.siguiente;
        }
        if(msgs){
            return `
                <ul class="list-group">
                    ${msgs}
                </ul>
            `;
        }
    }
    return "No hay mensajes";
}


async function sendMessage(whoSend){
    // OBTENER VALORES DEL SELECT 
    encontradoGlobal = localStorage.getItem("encontradoGlobal");
    //////////////////////// BlockChain
    chat = localStorage.getItem("blockChain")
    let blockChain2 = new BlockChain()
    blockChain2 = JSON.retrocycle(JSON.parse(chat));
    if (blockChain2 != null){
        listademensajes.push(blockChain2);
        localStorage.setItem("listademensajes",JSON.stringify(JSON.decycle(blockChain)));
        console.log("Lista de mensajes",listademensajes);
    }
    
        ////////////////////////////////////////
    let encontrado = JSON.parse(encontradoGlobal);

    let transmitter = encontrado.Estudiante.Carnet;


    let receiver = $('#receiver').val();


    
    //console.log("Carnet ingresado:",encontrado.Estudiante.Carnet)
    
    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO

    if(transmitter && receiver){

        switch(whoSend){
            case 'receiver':
                // OBTENER MENSAJE A ENVIAR
                let msgt = $('#msg-transmitter').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                
                await blockChain.insert(encontrado.Estudiante.Carnet, receiver, msgt);

                $('#msg-transmitter').val("");
            break;
            //Nuevo transmitter
            case 'transmitter':
                // OBTENER MENSAJE A ENVIAR
                let msgr = $('#msg-receiver').val();
                console.log(encontrado.Estudiante.Carnet, receiver, msgr);
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(encontrado.Estudiante.Carnet, receiver, msgr);
                $('#msg-receiver').val("");
            break;
        }
        
        
        localStorage.setItem("blockChain",JSON.stringify(JSON.decycle(blockChain)));//Convertir lista circular a JSON
        blockChain.print();
        alert("Mensaje enviado");
        // ACTUALIZAR CHATS
        updateChats();
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }
}


function getBlock(index){
    
    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));
        
        if(index < 0){ // MOSTRAR EL ANTERIOR
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){ // MOSTRAR EL SIGUIENTE
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }


}
function goBack2() {
    window.location.href = "Users.html";
  }


function blockgraf(){
    let chat = localStorage.getItem("blockChain");
    blockChain2 = JSON.retrocycle(JSON.parse(chat));

    blockChain2.blockReport();
}
