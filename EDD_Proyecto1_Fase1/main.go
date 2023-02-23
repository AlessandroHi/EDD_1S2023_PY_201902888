package main

import (
	"EDD_Proyecto1_Fase1/estructuras"
	"fmt"
)

var ColaAlumnos = estructuras.New_Cola() // COLA DE ALUMNOS SIN ACEPTAR AL SISTEMA

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
		fmt.Println("-------- Dashboard Administrador EDD GoDrive -------")
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
			viewAlumnosPendientes()
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

func viewAlumnosPendientes() {
	ColaAlumnos.MostrarCola()
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
	fmt.Println("Ingrese la contrseña: ")
	fmt.Scanln(&pass)
	ColaAlumnos.Encolar(nombre, apellido, carnet, pass)
}

func dashAlum() {

}
