#                              Manual Tecnico
#### PRIMER SEMESTRE 2023 EDD
#### Ivan Alessandro Hilario Chacon - 201902888
## Directorios
Se hizo uso de directorios para llevar un orden en la programación implementada para 
EDD GoDrive.
- Carpeta estructuras: posee las estructuras implementadas en el programa.

Dichas clases tienen una mayor explicación mas adelante.

## Clases
### nodoArbol
Representa los atributos para cada nodo en le arbol AVL tanto como su matriz para cada estudiante y arbol de carpetas

### ArbolAVL
Tiene la implementacion de de los metodos de inserrcion de cada nodo, tanto como el equilibrio del arbol,rotaciones, insertar valores, graficar arbol ya sea mostrado en Ghaphiz, de la misma manera el metodo de agregar matriz y arbol del las carpetas

### Tnode
clase implementada para la estructura del arbol de carpeta y sus archivos

### Tree
Clase con su respectico constructor, para poder implementar cada metodo tanto como la inserccion de carpetas mostrandolas en la inferfaz.

### nodoMatriz
Representa los atributos para cada nodo en la matriz 

### Matriz
Clase con su respectico constructor, para poder implementar cada metodo tanto como la inserccion de archivos y permisos para cada estudiantes mostrandolas en la inferfaz.


## METODOS Y FUNCIONES
### login
Funcion que realiza las validaciones de los  usuarios y contraseñas 

### refrescarArbol
Realiza el grafico del arbol AVL con los estudiantes

### refresAlumos
Realiza la representacion de los estudiantes mediante una tabla 

### entrarCarpeta
Metodo que realiza la representacion del directorio de la carpeta

### retornarInicio
Regresa a la carpeta raiz 

### showTreeGraph
Realiza graficamente el arbol de carpetas cargadas

### showMatrixGraph
Funcion que realiza el grafico de la matriz con sus permisos

### subirArchivo
Metodo que se encarga de subir archivos y convertirlos a formato Base64

### asignarPermisos
Funcion que da permisos a los archivos a estudiantes cargados al sistema

#                              Manual de Usuario

## Ingresando al login
Podremos ingresar en la parte de administrador y en la parte de estudiante

![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/login.png  "Login")

### Ingresando al administrador
Parte donde se podra cargar con archivo JSON, asi mismo mostrar el arbol y mostrar en una tabla los estudiantes cargados al sistema

![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/tabla.png  "Tabla")

![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/arbol.png  "Arbol")


### Ingresando al administrador
Mostrando las opciones de poder crear carpeta, subir archivos , de la misma manera poder mostrar graficamente las carpeta mediante un arbol, con la misma situacion con la matriz con los permisos

![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/estudiante.png "Interfaz estudiante")

Parte donde se muestra los archivos y carpetas creadas
![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/carpetas.png "Interfaz carpetas")

Parte donde se muestra los arbol carpetas creadas
![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/arbolc.png "Interfaz carpetas")

Podremos seleccionar al carnet que podes aplicar los permisos necesarios a los archivos cargados de la misma manera nos motrara graficamente
![Descripción de la imagen](/EDD_Proyecto1_Fase2/img/permiso.png "Interfaz carpetas")