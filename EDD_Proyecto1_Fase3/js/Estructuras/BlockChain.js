// CLASE DEL BLOCQUE DEL BLOCK-CHAIN
class Block{
    constructor(index, transmitter, receiver, message, Hashanterior, hash){
        this.index = index;
        this.timestamp = new Date();
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.Hashanterior = Hashanterior; // HASH DEL BLOQUE ANTERIOR
        this.hash = hash; // HASH DEL BLOQUE ACTUAL
        
        // APUNTADORES DEL NODO
        this.siguiente = null;
        this.anterior = null;
    }
    // RETORNAR FECHA EN FORMATO DEL ENUNCIADO
    getFormatDate(){
        // FORMATO DE FECHA DD-MM-YYYY :: HH:MM:SS
        let day = this.timestamp.getDate();
        let month = this.timestamp.getMonth();
        let year = this.timestamp.getFullYear();
        let hours = this.timestamp.getHours();
        let min = this.timestamp.getMinutes();
        let sec = this.timestamp.getSeconds();
        return `${day}-${month}-${year} :: ${hours}:${min}:${sec}`;
    }
}

class BlockChain{
    // CONSTRUCTOR PARA LA LISTA DOBLE
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }

    // INSERCIÓN SÓLO AL FINAL **FUNCIÓN ASÍNCRONA**
    async insert(transmitter, receiver, message){
        let newNode = new Block(this.size, transmitter, receiver, message, "","");
        if(this.primero == null){
            // HASH ANTERIOR DEL PRIMER BLOQUE
            newNode.Hashanterior = "00000";
            // ASIGNAR EL HASH AL BLOQUE ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO
            this.primero = newNode;
            this.ultimo = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }else{
            // ASIGNAR PRIMERO EL HASH ANTERIOR
            newNode.Hashanterior = this.ultimo.hash;
            // CREAR EL HASH ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO AL FINAL
            this.ultimo.siguiente = newNode;
            newNode.anterior = this.ultimo;
            this.ultimo = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }
    }

    // MÉTODO PARA OBTENER SHA256 DE UN BLOQUE
    // REF: https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
    async getSha256(block){
        // PASAR EL OBJETO A STRING
        let str = JSON.stringify(block).toString();
        // OBTENER LOS BYTES DEL STRING 
        let bytes = new TextEncoder().encode(str);
        // OBTENER BYTES DEL HASH
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        // PASAR EL HASH A STRING 
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        // RETORNAR EL HASH
        return hash;
    }

    // METODO PARA IMPRIMIR EN CONSOLA
    print(){        
        if(this.primero !== null){
            let temp = this.primero;
            while(temp !== null){
                console.log(temp);
                temp = temp.siguiente;
            }
        }
    }

    // NÚMEROS DE CARNET DEL CHAT
    getMessages(transmitter, receiver){
        //inicio de sesion , receptor
        if(this.primero !== null){
            let msgs = "";
            let temp = this.primero;
            while(temp !== null){
                console.log(temp.receiver,transmitter)
                if(String(temp.receiver) === String(transmitter)){
                    //console.log(temp.receiver,transmitter)
                    if(String(temp.transmitter) === String(receiver)){
                        msgs += `<li class="list-group-item">${temp.message}</li>`;
                    }

                }else if(String(temp.transmitter) === String(transmitter)){
                    //console.log(temp.transmitter,transmitter)
                    if(String(temp.receiver) === String(receiver)){
                        msgs += `<li class="list-group-item bg-primary text-light" style="text-align: right">${temp.message}</li>`;
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

    blockReport(index = 0){
        if(this.primero){
            let temp = this.primero;
            while(temp !== null){
                if(temp.index === index){
                    // EL NOMBRE DE LA TABLA TIENE EL INDEX DEL BLOQUE, PARA PODER OBTENER EL SIGUIENTE O EL ANTERIOR
                    return `
                        <table class="table table-bordered" id="block-table" name="${temp.index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-8">${temp.index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${temp.getFormatDate()}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmitter</th>
                                    <td>${temp.transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${temp.receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td>${temp.message}</td>
                                </tr>
                                <tr>
                                    <th scope="row">anteriorius Hash</th>
                                    <td>${temp.Hashanterior}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash del Bloque</th>
                                    <td>${temp.hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }else{
                    temp = temp.siguiente;
                }

            }
        }
        return "";
    }


}