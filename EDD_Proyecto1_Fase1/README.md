#                              Manual Tecnico
#### PRIMER SEMESTRE 2023 EDD
#### Ivan Alessandro Hilario Chacon - 201902888
## Directorios
Se hizo uso de directorios para llevar un orden en la programación implementada para 
EDD GoDrive.
- Carpeta estructuras: posee las estructuras implementadas en el programa.

Dichas clases tienen una mayor explicación mas adelante.

## Clases
### main
Es donde inicia el programa, se inicializan las estucturas a utilizar para la manipulacion de datos, entiendase como pila administrador, lista doble enlazada y por ultimo cola de alumnos.
Consta de varios metodos y funciones.
El metodo main es por donde inicia la compilacion del programa y solo se encarga de llamar al metodo Login().

#### log1
Tambien se cuentan con las funciones formato_Hora y formato_Fecha las cuales retornan un texto indicando la hora y la fecha en el que fueron llamadas las funciones, las cuales nos sirven para 
el inicio de sesion de los usuarios que no sean administradores.

#### login
El metodo Login es el encargado de interactuar con el usuario que esta utilizando el programa,
Muestra una pequeña bienvenida y procede a preguntar que se desea hacer, iniciar sesion o salir del programa. Sí el usuario selecciona la opcion 2 se termina la ejecucion del programa.
Pero si se selecciona la primer opcion, se le solicitan las credenciales para poder iniciar sesion, si el usuario que esta utilizando el programa es el administrador, basta con ingresar en usuario ("admin"), al igual que la contraseña 
debe ser ("admin").

Si el administrador ingresa al sistema se despliega el menu administrador ubicado en el directorio Usuario, la clase es Admin. 

#### dashAdmin
Parte del administrador donde tiene las funcionalidades que puede realizar cada operaciones

#### addAlumno
Dicha funcion se se encarga de poder crear usario , ingresando cada una de sus atributos

#### LecturaCSV
Esta funcion solicita el nombre del archivo .CSV el cual debe estar dentro de la misma carpeta del programa, debido a que hace uso de rutas relativas y una vez que verifica que todo esta bien retorna un arreglo de 
2 dimensiones las cuales son filas, columnas, esto se hace con el fin de poder crear los usuarios en MenuAdmin.

#### addListAlum
Esta funcion recibe una cola, una lista y una pila administrador para proceder a realizar la debida aceptacion de un usuario alojado en cola a una lista doble y tambien se almacena dicha accion en la pila administrador,
Si se acepta el usuario se ingresa a la lista doble y se ordena en forma descendiente y se elimina de la cola, si se rechaza el usuaario solo se elimina de cola y se agrega dicha accion en la pila administrador.

### Pila/NodoPila
Es donde se crea el nodo junto con sus atributos, en este caso posee la fecha, hora, accion que aplica solo para el administrador y por ultimo un apuntador hacia el nodo siguiente.

#### MostrarBitacora
No es mas que mostrar el inico de sesion del usuario, esto incluye fecha y hora.

#### MostrarBitacora
Muesta la accion realizada por el admin tales como aceptar o rechazar usuarios junto con la fecha y la hora.

### Pila/Pila
Se crea el nodo Pila el cual estara compuesto de nodos NodoPila, cuenta con un head el cual sera el primer nodo ingresado en la pila y tambien le agregamos un contador para saber cuantas bitacoras posee.

#### Push
Recibe una fecha, hoira y una accion y se encarga de la creacion de la bitacora, ya sea de un usuario común o del administrador.

#### MostarBitas
Se encarca en recorrer la pila completa y mostrar las bitacoras creadas de un usuario común.

#### MostarBitasAdmin
Se encarga en mostrar todas las bitacoras del administrador.

#### GraficarBitacora
Recibe el carnet del usuario a graficar para nombrar los cuadros que se mostraran por medio de Graphviz, se encarga en crear un texto que luego se retornará
para poder graficarlo por medio de graphviz.

### Listas/NodoLDE
Se crea el objeto con los atributos de estudiante, debido a que es una lista doble enlazada debemos tener 2 apuntadores los cuales apuntaran al siguiente objeto o al objeto anterior.

#### MostarLDE
Funcion que se encarga de llamar a otra funcion alojada en los estudiantes para mostrar la informacion.

### Listas/LDE
Los atributos de LDE seran un primero, un ultimo los cuales son objetos del NodoLDE y un cantador para poder manipular la informacion de manera ideal.

#### Insertar
Esta funcion recibe un objeto de tipo estudiante y se hacen todas las validaciones correspondientes para la creacion de los objetos LDE.

#### Mostar
Se encarga de mostrar los datos de los estudiantes almacenados en la LDE.

#### Search
Esta funcion recibe un carnet y una contraseña para hacer un recorrido en la lista LDE para saber si concuerda con alguno de los objetos creados
con anterioridad. Si concuerda con alguno de los objetos retorna el estudiante, si no encuentra una similitud renurta null.

#### GraficarBita
Esta funcion es la encargada en crear un texto el cual se convertira en un archivo con extension dot que posteriormente transformaremos en una imagen.

### Estudiante/NodoEstudiante
Esta clase es la mas importante, es la base de todo, aquí se crea el estudiante en sí. El cual posee un carnet, nombre, apellido, contraseña y un objeto bitacora que almacenara 
los inicios de sesion que tenga durante el periodo de ejecucion. Tambien cuenta con un apuntador que posteriormente indica al siguiente estudiante y un apuntador que apunta hacía el 
estudiante anterior.

### Cola/NodoCola
Se encuentran los atributos que poseera el nodo cola tales como un estudiante y el nodocola siguiente.

#### MostrarCola
Es la funcion encargada de mostrar los objetos de la cola, el fue usado para la realizacion de pruebas.

### Cola/Cola
Posee varios metodos y tambien la estructura de la cola el cual cuenta con un primero o una cabeza junto con un contador para saber cuantos objetos hay en la cola.

#### Encolar
Recibe un nombre, carnet, apellido y una contraseña y se encarga de crear al usuario con estos datos, una vez creado el usuario se le manda a la cola el estudiante,
la cual procede a hacer la insercion.
#### Desencolar
Nos sirve para eliminar el primer objeto de la cola.

#### Repear
Recibi un carnet y retornará falso si no hay estudiantes con ese carnet en la cola y true si encuentra un carnet en la cola.

#### GraficarCola
Es la encargada en retornar el texto para posteriormente graficar la cola.
### Archivos/ManejoArchivos
Esta clase es fundamental para la creacion de los archivos con extension dot.
#### WriteDotFile
La funcion WriteDotFile recibe un texto que debe escribir, el nombre del archivo que creará y la direccion en donde se ubica la carpeta del archivo
debe realizar una verificacion para ver si ya existe el archivo, si este es el caso lo elimina y lo crea de nuevo.

#### GeneratePNG
Esta funcion se encarga en realizar la conversion haciendo uso del simbolo del sistema.
##### ArchivoJSON
Creal el archivo Json con los estudiantes agregados al sistema