package estructuras

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

func NewLista() *ListaDoble {
	lista := new(ListaDoble)
	lista.inicio = nil
	lista.Longuitud = 0
	return lista
}
