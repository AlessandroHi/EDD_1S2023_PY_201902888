package estructuras

type (
	NodoDE struct {
		alumno    *Alumno
		anterior  *NodoDE
		siguiente *NodoDE
	}

	NodoCola struct {
		alumno    *Alumno
		siguiente *NodoCola
	}

	NodoPilaAlum struct {
		hora      string
		siguiente *NodoPilaAlum
	}

	NodoPilaAdmin struct {
		acciones  string
		siguiente *NodoPilaAdmin
	}
)

// ------------- RETORNAR VALOS DE ALUMNOS COLA
func (n *NodoCola) GetAlumno() *NodoCola {

	return n
}

func (n *NodoCola) GetNombre() string {

	return n.alumno.nombre
}

func (n *NodoCola) GetApellido() string {

	return n.alumno.apellido
}

func (n *NodoCola) GetCarnet() int {

	return n.alumno.carnet
}

func (n *NodoCola) GetPass() string {

	return n.alumno.password
}

// *-----------------------------------------------**
// ------------- RETORNAR VALOS DE ALUMNOS LISTA DOBLE
func (n *NodoDE) GetNombre() string {

	return n.alumno.nombre
}

func (n *NodoDE) GetApellido() string {

	return n.alumno.apellido
}

func (n *NodoDE) GetCarnet() int {

	return n.alumno.carnet
}

func (n *NodoDE) GetPass() string {

	return n.alumno.password
}

// *-----------------------------------------------**
