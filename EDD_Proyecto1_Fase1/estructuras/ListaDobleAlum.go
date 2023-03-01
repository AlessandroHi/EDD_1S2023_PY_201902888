package estructuras

import (
	"fmt"
	"strconv"
)

type ListaDoble struct {
	inicio    *NodoDE
	ultimo    *NodoDE
	Longuitud int
}

func (l *ListaDoble) estaVacia() bool {
	if l.Longuitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) newNodo(alumno *Alumno) *NodoDE {
	return &NodoDE{alumno, nil, nil}
}

func (l *ListaDoble) Insertar(nombre string, apellido string, carnet int, pass string) {
	nuevoAlumno := &Alumno{nombre, apellido, carnet, pass, &PilaAlumn{Primero: nil, Longitud: 0}}
	nodoAlum := l.newNodo(nuevoAlumno)
	if l.estaVacia() { // VACIA
		l.inicio = nodoAlum
		l.ultimo = nodoAlum
		l.Longuitud++
	} else {
		if carnet < l.inicio.GetCarnet() { //INICIO
			l.inicio.anterior = nodoAlum
			nodoAlum.siguiente = l.inicio
			l.inicio = nodoAlum
			l.Longuitud++
		} else if carnet > l.ultimo.GetCarnet() { //FINAL
			l.ultimo.siguiente = nodoAlum
			nodoAlum.anterior = l.ultimo
			l.ultimo = nodoAlum
			l.Longuitud++
		} else { //ENTRE NODOS
			aux := l.inicio
			for aux != nil && aux.GetCarnet() < carnet {
				aux = aux.siguiente
			}
			aux.anterior.siguiente = nodoAlum
			nodoAlum.siguiente = aux
			nodoAlum.anterior = aux.anterior
			aux.anterior = nodoAlum
			l.Longuitud++
		}

	}

}

func (l *ListaDoble) MostrarConsola() {
	aux := l.inicio
	fmt.Println("** \n----------     lISTA DE ESTUDIANTES    -------- \n**")
	for aux != nil {
		fmt.Println(" Nombre: "+aux.alumno.nombre+" "+aux.alumno.apellido+", Carnet: ", aux.alumno.carnet)
		fmt.Println("--------------------------------------------------------")
		aux = aux.siguiente
	}
}

func (l *ListaDoble) Search(carnet int, pass string, fecha string) bool {
	aux := l.inicio
	for aux != nil {
		if aux.alumno.carnet == carnet && aux.alumno.password == pass {
			aux.alumno.bitacora.Push("Se inicio sesion \n" + fecha)
			return true
		} else {
			aux = aux.siguiente
		}

	}
	return false
}

func (l *ListaDoble) Graficar() {
	nombre_archivo := "./ListaAlum.dot"
	nombre_imagen := "ListaAlum.png"
	texto := `digraph ListaAlum{
	         	{rank=same;` + "\n"
	aux := l.inicio
	for i := 0; i < l.Longuitud; i++ {
		texto += strconv.Itoa(aux.alumno.carnet) + `[style=filled, shape=box, fillcolor="#8AECDC", label="` + aux.alumno.nombre + "  " + aux.alumno.apellido + ` \n ` + strconv.Itoa(aux.alumno.carnet) + "\"]\n"
		aux = aux.siguiente
	}
	texto += `  }
	           `
	aux1 := l.inicio
	for i := 0; i < l.Longuitud; i++ {

		if i < l.Longuitud-1 {
			texto += strconv.Itoa(aux1.alumno.carnet) + " -> "
			aux1 = aux1.siguiente
		} else {
			texto += strconv.Itoa(aux1.alumno.carnet)
		}
	}
	texto += "\n"
	aux2 := l.inicio
	for i := 0; i < l.Longuitud; i++ {

		if i < l.Longuitud-1 {
			texto += strconv.Itoa(aux2.siguiente.alumno.carnet) + " -> " + strconv.Itoa(aux2.alumno.carnet) + " \n"
			aux2 = aux2.siguiente
		}
	}

	texto += " {rank=same \n rankdir=LR;\n"

	aux3 := l.inicio
	for i := 0; i < l.Longuitud; i++ {
		texto += aux3.alumno.bitacora.GraficarBita(aux3.alumno.nombre)
		texto += "\n"
		aux3 = aux3.siguiente
	}
	texto += "}\n"
	aux4 := l.inicio
	for i := 0; i < l.Longuitud; i++ {
		texto += strconv.Itoa(aux4.alumno.carnet) + " -> " + aux4.alumno.nombre
		texto += "\n"
		aux4 = aux4.siguiente
	}

	texto += "\n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func NewLista() *ListaDoble {
	lista := new(ListaDoble)
	lista.inicio = nil
	lista.Longuitud = 0
	return lista
}
