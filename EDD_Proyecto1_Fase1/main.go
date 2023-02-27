package main

import (
	"EDD_Proyecto1_Fase1/estructuras"
	"fmt"
	"strconv"
	"time"
)

var ColaAlumnos = estructuras.New_Cola() // COLA DE ALUMNOS SIN ACEPTAR AL SISTEMA
var ListAlumnos = estructuras.NewLista() //LISTA DOBLE PARA ACEPTAR AL SISTEMA
var PilaAdmin = estructuras.New_Pila()

func main() {

	option := 0
	exit := false

	for !exit {
		fmt.Println("------- BIENVENIDO a  GoDrive --------")
		fmt.Println("* 1. Iniciar sesion                  *")
		fmt.Println("* 2. Salir                           *")
		fmt.Println("--------------------------------------")
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&option)
		switch option {
		case 1:
			login()
		case 2:
			fmt.Println("Saliendo...")
			exit = true
		}
	}
}

func login() {
	user := ""
	pass := ""
	fmt.Println("-------------------------")
	fmt.Println("* Ingrese el usuario:    ")
	fmt.Scanln(&user)
	fmt.Println("* Ingrese contraseña:    ")
	fmt.Scanln(&pass)
	if user == "admin" && pass == "admin" {
		dashAdmin()
	} else {
		fmt.Println("* Usuario o Contraseña incorrecta, vuelva a intentarlo...")
		fmt.Println("")
	}

}

func dashAdmin() {

	option := 0
	exit := false

	for !exit {
		fmt.Println("\n-------- Dashboard Administrador EDD GoDrive -------")
		fmt.Println("*          1. Ver estudiantes Pendientes           *")
		fmt.Println("*          2. Ver estudiantes del Sistema          *")
		fmt.Println("*          3. Registrar nuevo estudiante           *")
		fmt.Println("*          4. Carga masiva de estudiantes          *")
		fmt.Println("*          5. Cerrar Sesion                        *")
		fmt.Println("----------------------------------------------------")
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&option)
		switch option {
		case 1:
			addListAlum()
		case 2:

		case 3:
			addAlumno()
		case 4:

		case 5:
			fmt.Println("Cerrando sesion...")
			exit = true
		}
	}
}

func addAlumno() {
	var nombre string
	var apellido string
	var carnet int
	var pass string
	fmt.Println("Ingrese el nombre: ")
	fmt.Scanln(&nombre)
	fmt.Println("Ingrese el apellido: ")
	fmt.Scanln(&apellido)
	fmt.Println("Ingrese el carnet: ")
	fmt.Scanln(&carnet)
	fmt.Println("Ingrese  contraseña: ")
	fmt.Scanln(&pass)
	ColaAlumnos.Encolar(nombre, apellido, carnet, pass)

}

func addListAlum() {
	option := 0
	exit := false

	for !exit {
		aux := ColaAlumnos.Primero
		fmt.Println("----------- Estudiantes Pendientes  ------")

		if ColaAlumnos.Len() == 0 {
			fmt.Println("*  La cola de estudiantes esta vacia     \n*")
			exit = true
		}
		if ColaAlumnos.Len() > 0 {
			fmt.Println("*  Estudiante Actual: ", aux.GetNombre(), " ", aux.GetApellido(), "  *") //OBTENER
			fmt.Println("*  1. Aceptar al Estudiante               *")
			fmt.Println("*  2. Rechazr al Estudiante               *")
			fmt.Println("*  3. Volver al Menu                      *")
			fmt.Print(" Elige una opcion: ")
			fmt.Scanln(&option)
			switch option {
			case 1:
				ListAlumnos.Insertar(aux.GetNombre(), aux.GetApellido(), aux.GetCarnet(), aux.GetPass())
				ColaAlumnos.Descolar()
			case 2:
				ColaAlumnos.Descolar()
			case 3:
				exit = true

			}
		}

	}
}

func log() string {
	tiempo := time.Now()
	Texto_Hora := ""
	Texto_Fecha := ""
	log := ""

	Texto_Fecha = tiempo.Format(time.DateOnly)

	if tiempo.Hour() < 10 {
		Texto_Hora = Texto_Hora + "0" + strconv.Itoa(tiempo.Hour()) + ":"
	} else {
		Texto_Hora = Texto_Hora + strconv.Itoa(tiempo.Hour()) + ":"
	}
	if tiempo.Minute() < 10 {
		Texto_Hora = Texto_Hora + "0" + strconv.Itoa(tiempo.Minute()) + ":"
	} else {
		Texto_Hora = Texto_Hora + strconv.Itoa(tiempo.Minute()) + ":"
	}
	if tiempo.Second() < 10 {
		Texto_Hora = Texto_Hora + "0" + strconv.Itoa(tiempo.Second())
	} else {
		Texto_Hora = Texto_Hora + strconv.Itoa(tiempo.Second())
	}
	log += Texto_Fecha + " " + Texto_Hora

	return log
}
