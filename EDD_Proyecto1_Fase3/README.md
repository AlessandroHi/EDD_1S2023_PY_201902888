#                              Manual Tecnico
#### PRIMER SEMESTRE 2023 EDD
#### Ivan Alessandro Hilario Chacon - 201902888
## Directorios
Se hizo uso de directorios para llevar un orden en la programación implementada para 
EDD GoDrive.
- Carpeta estructuras: posee las estructuras implementadas en el programa.

Dichas clases tienen una mayor explicación mas adelante.

## Clases
### Estudiante
Representa los atributos nencesario para estudiantes.


### HashNode
Representa los atributos para cada nodo en la tabla hash como estudiante tanto como su TreeDirigido para cada estudiante.

### Hash
Tiene la implementacion de de los metodos de inserrcion de cada nodo, tanto como la capacidad de la tabla ,calcular Indice, nuevo Indice, generar nueva capacidad, search.

### NodoNario
clase implementada para la estructura del grafo de carpeta y sus archivos

### TreeDirigido
Clase con su respectico constructor, para poder implementar cada metodo tanto como la inserccion de carpetas mostrandolas en la inferfaz.

### Block
Clase implementada para el constructor de los mensajes enviados y encriptados

### BlockChain
Seccion de implementacion de inserccion,metodo de incriptacion , obtener mensajes enviados, reporte por tabla


## METODOS Y FUNCIONES
### ComprobarUser
Funcion que realiza las validaciones de los  usuarios y contraseñas encriptadas.

### getBlock
Metodo que reporta la tabla de BlochChain


### sendMessage
Realiza el envio de mensajes entre usuarios

### acualizarChats
Mantiene actualizada el area de mensajeria

### DarPermisos
Crea el arreglo en general para la visualizacion de los permidos 

### showTreeGraph
Realiza graficamente el arbol de carpetas cargadas


### subirArchivo
Metodo que se encarga de subir archivos y convertirlos a formato Base64

### entrarCarpeta
Metodo para seleccionar ruta en  la carpetas.

#                              Manual de Usuario

## Ingresando al login
Podremos ingresar en la parte de administrador y en la parte de estudiante

![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/login.png  "Login")

### Ingresando al administrador
Parte donde se podra cargar con archivo JSON, asi mismo mostrar en una tabla los estudiantes cargados al sistema, y la opcion de generar la tabla hash 

![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/admin.png  "Tabla")

![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/hash.png  "Tabla")


### Ingresando al estudiante
Mostrando las opciones de poder crear carpeta, subir archivos , de la misma manera poder mostrar graficamente las carpeta mediante un grafo

![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/user.png "Interfaz estudiante")

Parte donde se muestra los archivos y carpetas creadas
![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/folders.png "Interfaz carpetas")

Grafo de carpetas
![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/grafo.png" Interfaz grafo")

Podremos seleccionar al carnet que podes aplicar los permisos necesarios a los archivos cargados
![Descripción de la imagen](/EDD_Proyecto1_Fase3/Home/imgs/report/permisos.png "Interfaz carpetas")