package estructuras

import "fmt"

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

func (c *Cola) newNodo(alumno *Alumno) *NodoCola {
	return &NodoCola{alumno, nil}
}

func (c *Cola) Encolar(nombre string, apellido string, carnet int, pass string) {
	nuevoAlumno := &Alumno{nombre, apellido, carnet, pass}
	if c.estaVacia() {
		c.Primero = c.newNodo(nuevoAlumno)
		c.Longitud++
		fmt.Print("**Se encola correctamente el alumno\n\n")

	} else {
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = c.newNodo(nuevoAlumno)
		c.Longitud++
		fmt.Print("**Se encola correctamente el alumno\n\n")
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

func New_Cola() *Cola {
	return &Cola{nil, 0}
}
