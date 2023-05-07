class NodoNario {
    constructor(nombreCarpeta,weight){
        this.nombreCarpeta = nombreCarpeta;
        this.hijos = [];
        this.id = 0;
        this.files = [];
        this.weight = weight;
    
    }

}

class TreeDirigido{
    constructor(){
        this.raiz = new NodoNario('/',1);
        this.id = 0;
        this.size = 1;
        
    }
    toJSON() {
        
        return {
            raiz: this.raiz,
            id: this.id,
            size: this.size,

        };
    }
    static fromJSON(json) {
        if (json!=null){
            const tree = new TreeDirigido();
            tree.raiz = json.raiz;
            tree.id = json.id;
            tree.size= json.size;
            return tree;
        }
        
    }

    Insertar(nombreCarpeta, fatherPath){ 
        
        let {node:fatherNode, weight} = this.getFolder(fatherPath);
        let newNode =  new NodoNario(nombreCarpeta,weight);
        if(fatherNode){
            this.size += 1;
            newNode.id = this.size;
            fatherNode.hijos.push(newNode);

        }else{
            console.log("Ruta no existe");
        }
    }


    getFolder(path){
        // Padre sea una '/'
        // console.log(path)
        let weight = 2;
        if(path == this.raiz.nombreCarpeta){
            return {node: this.raiz, weight: weight};
        }else{
            let temp = this.raiz;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.hijos.find(child => child.nombreCarpeta == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
                weight++;
            }
            return {node: temp, weight: weight};
        }
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.raiz;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.nombreCarpeta}"];\n`;
                node.hijos.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id} [label="${node.weight}"];\n`
                    queue.push(item);
                });
            }
        }

        return  '\nlayout=neato;\noverlap=false; \nedge[dir=none];\n' + nodes +'\n'+ connections;
    }

    getHTML(path){
        let { node } = this.getFolder(path);
        let code = "";
        node.hijos.map(child => {
            code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.nombreCarpeta}')">
                        <img src="./imgs/folder.png"/>
                        <p class="h6 text-center">${child.nombreCarpeta}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if(file.type === 'text/plain'){
                let archivo = new Blob([new TextEncoder().encode(file.content)], { type: file.type });
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="./imgs/txt.png"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            }else if(file.type === 'application/pdf'){
                code += ` <div class="col-2 folder">
                        <img src="./imgs/pdf.png" />
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            }else{
                code += `
                <div class="col-2 folder">
                <img src="./imgs/img.png" width=/>
                <p class="h6 text-center">
                    <a href="${file.content}" download>
                        ${file.name}
                    </a>
                </p>
            </div>
        `

            }
        }
        )
        return code;
    }

   



}



//module.exports = Tree_N_ario;



/* N*/ 