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

	NodoBitac struct {
		hora      string
		siguiente *NodoBitac
	}
)
