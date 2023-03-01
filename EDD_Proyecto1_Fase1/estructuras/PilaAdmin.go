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

func (p *PilaAdmin) Graficar() {
	nombre_archivo := "./pilaAdmin.dot"
	nombre_imagen := "pilaAdmin.png"
	texto := "digraph pilaAdmin{\n"
	texto += " {rank=same \n rankdir=LR;\n"
	texto += "nodoP0[style=filled, fillcolor=\"#CFEF41\",color=\"#6349F0\",shape=record "
	aux := p.Primero
	texto += "label=\"{"
	for i := 0; i < p.Longitud; i++ {
		if aux == p.Primero {
			texto = texto + aux.acciones
		} else {
			texto = texto + "|" + aux.acciones
		}

		aux = aux.siguiente
	}
	texto += "}\"];   \n} \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
