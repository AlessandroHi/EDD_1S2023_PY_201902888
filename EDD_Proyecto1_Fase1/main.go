package main

import (
	"EDD_Proyecto1_Fase1/estructuras"
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"
)

var ColaAlumnos = estructuras.New_Cola() // COLA DE ALUMNOS SIN ACEPTAR AL SISTEMA
var ListAlumnos = estructuras.NewLista() //LISTA DOBLE PARA ACEPTAR AL SISTEMA
var PilaAdmin = estructuras.New_Pila()   //PILA DE ADMIN

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
	var user string
	var pass string
	fmt.Println("-------------------------")
	fmt.Println("* Ingrese el usuario:    ")
	fmt.Scanln(&user)
	carnet, _ := strconv.Atoi(user)
	fmt.Println("* Ingrese contraseña:    ")
	fmt.Scanln(&pass)
	if user == "admin" && pass == "admin" {
		dashAdmin()
	} else if ListAlumnos.Search(carnet, pass, log1()) {
		fmt.Print("Inicio sesion correctamente \n\n")
		ListAlumnos.Graficar()

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
			ListAlumnos.MostrarConsola()
		case 3:
			addAlumno()
		case 4:
			LecturaCSV()
			ColaAlumnos.Graficar()

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
	ColaAlumnos.Graficar()

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
			fmt.Println("* -----------  Pendientes: ", ColaAlumnos.Len(), " ---------- *")
			fmt.Println("*  Estudiante Actual: ", aux.GetNombre(), " ", aux.GetApellido(), "  *") //OBTENER
			fmt.Println("*  1. Aceptar al Estudiante               *")
			fmt.Println("*  2. Rechazr al Estudiante               *")
			fmt.Println("*  3. Volver al Menu                      *")
			fmt.Print(" Elige una opcion: ")
			fmt.Scanln(&option)
			switch option {
			case 1:
				ListAlumnos.Insertar(aux.GetNombre(), aux.GetApellido(), aux.GetCarnet(), aux.GetPass())
				fecha := log1()
				log := "Acepto estudiante: " + aux.GetNombre() + " " + aux.GetApellido() + " \n"
				log += fecha
				PilaAdmin.Push(log)
				ColaAlumnos.Descolar()
				PilaAdmin.Graficar()
				ColaAlumnos.Graficar()
				ListAlumnos.Graficar()
				ListAlumnos.ArchivoJSON()
			case 2:
				fecha := log1()
				log := "Rechazo estudiante: " + aux.GetNombre() + " " + aux.GetApellido() + " \n"
				log += fecha
				PilaAdmin.Push(log)
				ColaAlumnos.Descolar()
				PilaAdmin.Graficar()
				ColaAlumnos.Graficar()
			case 3:
				exit = true

			}
		}

	}
}

func LecturaCSV() {
	var ruta string
	fmt.Print("Ingrese el nombre del archivo a abrir: ")
	fmt.Scanln(&ruta)

	archivo, err := os.Open(ruta)
	if err != nil {
		log.Fatal("Archivo no existe "+ruta, err)
	}
	defer archivo.Close()

	csvReader := csv.NewReader(archivo)
	users, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Error en la lectura del archivo"+ruta, err)
	}

	var (
		nombre   string
		apellido string
	)
	for index, row := range users {
		if index > 0 {

			Completo := strings.Split(row[1], " ")
			nombre = Completo[0]
			apellido = Completo[1]
			//fmt.Println(nombre, apellido)

			carnet, _ := strconv.Atoi(row[0])
			ColaAlumnos.Encolar(nombre, apellido, carnet, row[2])
		}
	}

}

func log1() string {
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
