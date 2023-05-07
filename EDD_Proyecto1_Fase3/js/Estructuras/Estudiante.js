class NodoEstudiante {
    constructor(nombre, Carnet, pass, Arbol_Carpetas){
        this.Nombre = nombre;
        this.Carnet = Carnet;
        this.Pass = pass;
        this.Arbol_Carpetas = new TreeDirigido();
    }
}
window.NodoEstudiante = NodoEstudiante;
