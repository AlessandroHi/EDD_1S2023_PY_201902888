
class NodoAVL{
    constructor(Estudiante){
        this.Estudiante = Estudiante;//Objeto estudiante

        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;

    }
}

//--------------------------------------------------------------------------
//                   VARIABLES GLOBALES
//--------------------------------------------------------------------------
let = nodes = "";
let = connections = "";



class AvlTree{
    constructor(){
        this.raiz = null;
    }

  


    getaltura(node){
       if(node === null){
            return 0;
       }
       return node.altura;
    }

    getMaxaltura(izquierdaNode, derechaNode){
        return izquierdaNode.altura > derechaNode.altura ? izquierdaNode.altura : derechaNode.altura;
    }


           // Función para obtener la altura de un nodo
    altura(nodo) {
        if (nodo === null) {
            return -1;
        }
        return nodo.altura;
    }

    // Función para obtener el máximo entre dos números
    maximo(a, b) {
        return Math.max(a, b);
    }

    // Función para insertar un nuevo nodo en el árbol AVL basándose en el carnet del estudiante
    insert(nombre, carnet, pass, carpetas) {
        let est = new window.NodoEstudiante(nombre,carnet,pass,carpetas);
        this.raiz = this._insertar(this.raiz, est);
    }
    

    // Función auxiliar para insertar un nuevo nodo en el árbol AVL basándose en el carnet del estudiante
    _insertar(nodo, estudiante) {
        if (nodo === null) {
            return new NodoAVL(estudiante);
        }

        if (estudiante.Carnet < nodo.Estudiante.Carnet) {
            //console.log(nodo.Estudiante.Carnet);
            nodo.izquierda = this._insertar(nodo.izquierda, estudiante);
        } else if (estudiante.Carnet > nodo.Estudiante.Carnet) {
            nodo.derecha = this._insertar(nodo.derecha, estudiante);
        } else {
            // El nodo ya existe, no se permite duplicados en el árbol
            return nodo;
        }

        // Actualizar la altura del nodo
        nodo.altura = 1 + this.maximo(this.altura(nodo.izquierda), this.altura(nodo.derecha));

        // Obtener el factor de balance del nodo
        let balance = this._factorDeBalance(nodo);

        // Caso 1 - Rotación a la derecha
        if (balance > 1 && estudiante.Carnet < nodo.izquierda.Estudiante.Carnet) {
            return this._rotacionDerecha(nodo);
        }

        // Caso 2 - Rotación a la izquierda
        if (balance < -1 && estudiante.Carnet > nodo.derecha.Estudiante.Carnet) {
            return this._rotacionIzquierda(nodo);
        }

        // Caso 3 - Rotación doble a la derecha
        if (balance > 1 && estudiante.Carnet > nodo.izquierda.Estudiante.Carnet) {
            nodo.izquierda = this._rotacionIzquierda(nodo.izquierda);
            return this._rotacionDerecha(nodo);
        }

        // Caso 4 - Rotación doble a la izquierda
        if (balance < -1 && estudiante.Carnet < nodo.derecha.Estudiante.Carnet) {
            nodo.derecha = this._rotacionDerecha(nodo.derecha);
            return this._rotacionIzquierda(nodo);
        }

        return nodo;
    }

    // Función auxiliar para obtener el factor de balance de un nodo
    _factorDeBalance(nodo) {
        if (nodo === null) {
            return 0;
        }
        return this.altura(nodo.izquierda) - this.altura(nodo.derecha);
    }

    // Función auxiliar para realizar una rotación a la derecha en un nodo
    _rotacionDerecha(z) {
        let y = z.izquierda;
        let T3 = y.derecha;

        y.derecha = z;
        z.izquierda = T3;

        // Actualizar alturas
        z.altura = this.maximo(this.altura(z.izquierda), this.altura(z.derecha)) + 1;
        y.altura = this.maximo(this.altura(y.izquierda), this.altura(y.derecha)) + 1;

        return y;
    }

    // Función auxiliar para realizar una rotación a la izquierda en un nodo
    _rotacionIzquierda(y) {
        let x = y.derecha;
        let T2 = x.izquierda;

        x.izquierda = y;
        y.derecha = T2;

        // Actualizar alturas
        y.altura = this.maximo(this.altura(y.izquierda), this.altura(y.derecha)) + 1;
        x.altura = this.maximo(this.altura(x.izquierda), this.altura(x.derecha)) + 1;

        return x;
    }

  




    treeGraph(){
        nodes ="";       
        
        connections = "";

        this.#treeGraphRecursive(this.raiz);
        //console.log(nodes,connections);
        return nodes + connections;
    }
    #treeGraphRecursive(current){
        if (current!==null){
            if(current.izquierda != null){
                this.#treeGraphRecursive(current.izquierda);
                connections += `S_${current.Estudiante.Carnet} -> S_${current.izquierda.Estudiante.Carnet};\n`;
            }
            nodes += `S_${current.Estudiante.Carnet}[label="${current.Estudiante.Nombre} \\n ${current.Estudiante.Carnet} \\n Altura:  ${current.altura}"];\n`
            if(current.derecha != null){
                this.#treeGraphRecursive(current.derecha);
                connections += `S_${current.Estudiante.Carnet} -> S_${current.derecha.Estudiante.Carnet};\n`;
            }
        }
        
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO IN ORDER
    //--------------------------------------------------------------------------
    inOrder(){
        let html = this.#inOrderRecursive(this.raiz);
        return html;
    }

    
    

    #inOrderRecursive(nodo){
        let row = "";
        const key = 'EncriptacionModoDiosXD';
        if(nodo.izquierda != null){
            row += this.#inOrderRecursive(nodo.izquierda);
        }
        row +=`
            <tr>
                <th>${nodo.Estudiante.Carnet}</th>
                <td>${nodo.Estudiante.Nombre}</td>
            </tr>
        `;
        if(nodo.derecha != null){
            row += this.#inOrderRecursive(nodo.derecha);
        }
        return row;
    }

    encrypt(text, key) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
      }
      
    decrypt(text, key) {
          const textParts = text.split(':');
          const iv = Buffer.from(textParts.shift(), 'hex');
          const encryptedText = Buffer.from(textParts.join(':'), 'hex');
          const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
          let decrypted = decipher.update(encryptedText);
          decrypted = Buffer.concat([decrypted, decipher.final()]);
          return decrypted.toString();
        }

  
    //--------------------------------------------------------------------------
    //                  RECORRIDO PRE ORDER
    //--------------------------------------------------------------------------
    preOrder(){
        let html = this.#preOrderRecursive(this.raiz);
        return html;
    }
    #preOrderRecursive(nodo){
        let row = "";
        row +=`
            <tr>
                <th>${nodo.Estudiante.Carnet}</th>
                <td>${nodo.Estudiante.Nombre}</td>
               
            </tr>
        `;
        if(nodo.izquierda != null){
            row += this.#preOrderRecursive(nodo.izquierda);
        }
        if(nodo.derecha != null){
            row += this.#preOrderRecursive(nodo.derecha);
        }
        return row;
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO POST ORDER
    //--------------------------------------------------------------------------
    postOrder(){
        let html = this.#postOrderRecursive(this.raiz);
        return html;
    }
    #postOrderRecursive(nodo){
        let row = "";
        if(nodo.izquierda != null){
            row += this.#postOrderRecursive(nodo.izquierda);
        }
        if(nodo.derecha != null){
            row += this.#postOrderRecursive(nodo.derecha);
        }
        row +=`
            <tr>
                <th>${nodo.Estudiante.Carnet}</th>
                <td>${nodo.Estudiante.Nombre}</td>
                
            </tr>
        `;
        return row;
    }



}




//module.exports = AvlTree;