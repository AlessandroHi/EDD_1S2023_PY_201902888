package estructuras

import (
	"fmt"
	"strconv"
)

type Cola struct {
	Primero  *NodoCola
	Longitud int
}

func (c *Cola) estaVacia() bool {
	if c.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Len() int {
	return c.Longitud
}

func (c *Cola) newNodo(alumno *Alumno) *NodoCola {
	return &NodoCola{alumno, nil}
}

func (c *Cola) Encolar(nombre string, apellido string, carnet int, pass string) {
	nuevoAlumno := &Alumno{nombre, apellido, carnet, pass, nil}
	if c.estaVacia() {
		c.Primero = c.newNodo(nuevoAlumno)
		c.Longitud++
		fmt.Print("**Se encola correctamente el alumno\n\n")

	} else if c.repeat(nombre, carnet) {
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = c.newNodo(nuevoAlumno)
		c.Longitud++
		fmt.Print("**Se encola correctamente el alumno\n\n")
	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola de alumnos esta vacia")
	} else {
		c.Primero = c.Primero.siguiente
		c.Longitud--
	}
}

func (c *Cola) MostrarCola() {
	aux := c.Primero
	for aux != nil {
		fmt.Print(aux.alumno.carnet)
		fmt.Println(" ---> ", aux.alumno.nombre)
		aux = aux.siguiente
	}
}

func (c *Cola) repeat(nombre string, carnet int) bool {
	aux := c.Primero
	for aux != nil {
		if aux.alumno.nombre == nombre && aux.alumno.carnet == carnet {
			fmt.Println("Ya existe el estudiante en la cola: ", carnet, " ", nombre)
			return false
		} else {
			aux = aux.siguiente
		}

	}
	return true
}

func (c *Cola) Graficar() {
	nombre_archivo := "./colaAlum.dot"
	nombre_imagen := "colaAlum.png"
	texto := `digraph colaAlum{
	         	{rank=same;` + "\n"
	aux := c.Primero
	for i := 0; i < c.Longitud; i++ {
		texto += strconv.Itoa(aux.alumno.carnet) + `[style=filled, shape=box, fillcolor="#8AECDC", label="` + aux.alumno.nombre + "  " + aux.alumno.apellido + ` \n ` + strconv.Itoa(aux.alumno.carnet) + "\"]\n"
		aux = aux.siguiente
	}
	texto += `  }
	           `
	aux1 := c.Primero
	for i := 0; i < c.Longitud; i++ {

		if i < c.Longitud-1 {
			texto += strconv.Itoa(aux1.alumno.carnet) + " -> "
			aux1 = aux1.siguiente
		} else {
			texto += strconv.Itoa(aux1.alumno.carnet)
		}
	}
	texto += "\n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
func New_Cola() *Cola {
	return &Cola{nil, 0}
}
