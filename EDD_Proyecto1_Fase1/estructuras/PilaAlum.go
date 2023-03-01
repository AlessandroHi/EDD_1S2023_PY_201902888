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

func (p *PilaAlumn) Push(data string) {
	if p.estaVacia() {
		nuevoNodo := &NodoPilaAlum{data, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodoPilaAlum{data, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *PilaAlumn) GraficarBita(nombre string) string {

	if p.Longitud == 0 {
		texto := nombre + "[style=filled, fillcolor=\"#CFEF41\",color=\"#6349F0\",shape=record label=\"{}\"];"
		return texto
	} else {
		texto := nombre + "[style=filled, fillcolor=\"#CFEF41\",color=\"#6349F0\",shape=record "
		aux := p.Primero
		texto += "label=\"{|"
		for i := 0; i < p.Longitud; i++ {
			if aux == p.Primero {
				texto = texto + aux.hora
			} else {
				texto = texto + "|" + aux.hora
			}

			aux = aux.siguiente
		}
		texto += "}\"];"
		return texto
	}

}

func (p *PilaAlumn) MostrarBita() {
	aux := p.Primero
	for i := 0; i < p.Longitud; i++ {
		fmt.Println(aux.hora)
		aux = aux.siguiente
	}
}
