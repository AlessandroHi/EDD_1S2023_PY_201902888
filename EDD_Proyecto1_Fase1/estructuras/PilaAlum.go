package estructuras

import "fmt"

type PilaAlumn struct {
	Primero  *NodoPilaAlum
	Longitud int
}

func (p *PilaAlumn) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *PilaAlumn) Push(hora string) {
	if p.estaVacia() {
		nuevoNodo := &NodoPilaAlum{hora, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodoPilaAlum{hora, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *PilaAlumn) MostrarBita() {
	aux := p.Primero
	for i := 0; i < p.Longitud; i++ {
		fmt.Println(aux.hora)
		aux = aux.siguiente
	}
}
