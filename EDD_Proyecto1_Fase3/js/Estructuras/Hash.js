// CLASE NODO DE LA TABLA HASH
class HashNode{
    constructor(Estudiante){
        this.Estudiante = Estudiante;
        
    }
}

// CLASE TABLA HASH
class HashTable{

    constructor(){
        // ARRAY QUE ALMACENARÁ LOS VALORES
        this.table = new Array(7);
        // CAPACIDAD DEL ARRAY(IRÁ CAMBIANDO A MEDIDA QUE SE AGREGUEN ELEMENTOS)
        this.capacidad = 7;
        // CANTIDAD DE ELEMENTOS INGRESADOS
        this.espaciosUsados = 0;
    }

    // MÉTODO INSERTAR ELEMENTO
    insert(estudiante){
        // OBTENER EL ÍNDICE DE LA FÓRMULA 
        // FÓRMULA: (SUMA ASCII's DEL CARNET) % CAPACIDAD ACTUAL 
        let indice = this.calcularIndice(estudiante.Carnet);
        // CREAR NUEVO NODO
        let nodoNuevo = new HashNode(estudiante);
        // COMPROBAR QUE EL INDICE SEA MENOR QUE A CAPACIADAD
        if(indice < this.capacidad){
            // VERIFICAR SI EN EL LA POSICIÓN DEL ARRAY ES NULO
            if(this.table[indice] == null){
                // SE AGREGA EL VALOR EN LA POSICIÓN
                this.table[indice] = nodoNuevo;
                // AGREGAR A LOS ESPACIOS USADOS
                this.espaciosUsados++;
            }else{
                // OPERACIONES CUANDO EXISTE UNA COLISIÓN
                // NÚMERO DE INTENTOS PARA LA FÓRMULA DE COLISIÓNES
                let contador = 1;
                // REASIGNAR EL ÍNDICE 
                // FÓRMULA DE COLISIÓNES: 
                // [(SUM ASCII's CARNET) % CAPACIDAD ACTUAL] + INTENTOS ^ 2
                indice = this.recalcularIndice(estudiante.Carnet, contador);
                // RECALCULAR HASTA ENCONTRAR UN ÍNDICE QUE ESTÉ VACÍO EN EL ARRAY
                while(this.table[indice] != null){
                    // AUMENTAR EL CONTADOR 
                    contador++;
                    // BUSCAR OTRA POSICIÓN CON EL CONTADOR AUMENTADO
                    indice = this.recalcularIndice(estudiante.Carnet, contador);
                }
                // ASIGNAR ESPACIO AL ÍNDICE
                this.table[indice] =  nodoNuevo;
                // AGREGAR A LOS ESPACIOS USADOS
                this.espaciosUsados++;
            }

            // MÉTODO QUE AMPLÍA EL ARRAY SI LLEGA AL 75% DE SU CAPACIDAD
            this.checkCapacidad();
        }

    }

    // METODO PARA APLICAR LA FÓRMULA Y OBTENER EL ÍNDICE
    calcularIndice(carnet){
        // SUMAR CARACTERES ASCII DEL CARNET
        let strCarnet = carnet.toString();
        let sum = 0;
        for(let i = 0; i< strCarnet.length; i++){
            sum += strCarnet.charCodeAt(i);
        }
        // APLICAR EL MÓDULO CON LA CAPACIDAD ACTUAL
        let posicion = sum % this.capacidad;
        return posicion;
    }
    
    // MÉTODO PARA OBTENER ÍNDICES CUANDO EXISTE UNA COLISIÓN
    recalcularIndice(carnet, contador){
        // CALCULA EL ÍNDICE CON LA FÓRMULA Y SE LE AGREGA EL CONTADOR ^ 2
        let indice = this.calcularIndice(carnet) + (contador*contador);
        // SE LE RESTA LA CAPACIDAD SI ESTA ES SUPERADA
        let nuevo =  this.nuevoIndice(indice);
        // SE RETORNA EL VALOR DEL INDICE
        return nuevo;
    }

    // FÓRMULA PARA RESTAR LA CAPACIADAD HASTA QUE SEA MENOR 
    // A LA CAPACIDAD ACTUAL
    nuevoIndice(indice){
        let pos = 0;
        if(indice < this.capacidad){
            pos = indice;
        }else{
            pos = indice - this.capacidad;
            pos = this.nuevoIndice(pos);
        }
        return pos;
    }

    // MÉTODO PARA REORGANIZAR LOS ELEMENTOS DEL ARRAY
    checkCapacidad(){
        // SE ESTABLECE EL PORCENTAJE DE UTILIZACIÓN
        const utilizacion = this.capacidad * 0.75;
        // SE VERIFICA CON LOS ESPACIOS UTIIZADOS
        if(this.espaciosUsados > utilizacion){
            // SE OBTIENE EL SIGUIENTE NÚMERO PRIMO
            this.capacidad = this.generarNuevaCapacidad();
            // SE REINICIA EL CONTEO DE ESPACIOS
            this.espaciosUsados = 0;
            // ARRAY ANTERIOR
            const temp = this.table;
            // LIMPIAR ARRAY ANTERIOR
            this.table = new Array(this.capacidad);
            // INGRESAR LOS VALORES DEL ARRAY ANTERIOR AL NUEVO ARRAY
            temp.forEach(std => {
                this.insert(std.Estudiante);
            });
        }

    }

    // SE OBTIENE EL SIGUIENTE NÚMERO PRIMO
    generarNuevaCapacidad(){
        let num = this.capacidad + 1; // SE LE SUMA UNO SÓLO PARA QUE NO DEVUELVA LA MISMA CAPACIDAD
        while(!this.#esPrimo(num)){
            num++;
        }
        return num;
    }

    // SE VERIFICA QUE EL NÚMERO SEA PRIMO
    #esPrimo(num){
        if (num <= 1) {return false}
        if (num === 2) {return true}
        if (num % 2 === 0) {return false}
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) {return false};
        }
        return true;
    }

    // BUSCAR EN LA TABLA HASH
    search(carnet){
        // OBTENER EL ÍNDICE 
        let indice = this.calcularIndice(carnet);
        // VERIFICAR QUE EL ÍNDICE ESTÉ DENTRO DE LA CAPACIDAD
        if(indice < this.capacidad){
            try{ // TRY CATCH POR SI ACASO
                // VERIFICAR SI LA POSICIÓN NO ES NULLA Y QUE SI EL CARNET ES EL MISMO
                if(this.table[indice] != null && this.table[indice].Estudiante.Carnet === carnet){
                    return this.table[indice];
                }else{
                    // MISMA ITERACIÓN DE LA INSERCIÓN HASTA LLEGAR AL VALOR
                    let contador = 1;
                    indice = this.recalcularIndice(carnet, contador);
                    while(this.table[indice] != null){
                        contador ++;
                        indice = this.recalcularIndice(carnet, contador);
                        // SE VERIFICA EL CARNET Y SE RETORNA
                        if(this.table[indice].Estudiante.Carnet === carnet){
                            return this.table[indice].Estudiante.Carnet;
                        }
                    }
                }
            }catch(err){
                console.log("Error ", err);
            }
        }
        return null;
    }


    inOrderHash(){
        
        let html = this.#inOrderRecursiveHash(this.table);

        return html;
    }
 

    #inOrderRecursiveHash(table){
        
        let row = "";
        const key = 'EncriptacionModoDiosXD';
        let i = 0;
       for (const clave in table){
            if (table[clave] != null){

                row +=`
                <tr>
                    <th>${table[clave].Estudiante.Carnet}</th>
                    <td>${table[clave].Estudiante.Nombre}</td>
                    
                    <td>${table[clave].Estudiante.Pass}</td>
                </tr>
                
                `;
            }else{
                console.log("no hay nada crack")
            }
           
       }
              
        return row;
    }

   

}