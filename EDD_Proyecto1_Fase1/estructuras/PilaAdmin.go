package estructuras

import (
	"fmt"
)

type PilaAdmin struct {
	Primero  *NodoPilaAdmin
	Longitud int
}

func (p *PilaAdmin) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *PilaAdmin) Push(datos string) {

	if p.estaVacia() {
		nuevoNodo := &NodoPilaAdmin{datos, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodoPilaAdmin{datos, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *PilaAdmin) MostrarBita() {
	aux := p.Primero
	for i := 0; i < p.Longitud; i++ {
		fmt.Println(aux.acciones)
		aux = aux.siguiente
	}
}

func New_Pila() *PilaAdmin {
	return &PilaAdmin{nil, 0}
}
