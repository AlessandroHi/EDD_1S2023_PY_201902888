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
		fmt.Println("--- Hora de inicio de sesion")
		aux.alumno.bitacora.MostrarBita()
		aux = aux.siguiente
	}
}

func New_Cola() *Cola {
	return &Cola{nil, 0}
}
