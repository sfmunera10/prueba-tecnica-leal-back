# Prueba-Tecnica-Leal-Desarrollador-Backend (Full-stack)

## Autor:
**Santiago Felipe Múnera Dávila**: https://sfmunera10.github.io/

## Contenido
- [Enunciado](#enunciado)
- [BD-MySQL](#bd-mysql)
- [Ejecutar](#ejecutar)
- [Pruebas](#pruebas)
- [JWT](#jwt)
- [Licencia](#licencia)

## Enunciado
Esta es una prueba para desarrollador backend que requiere construir una solución orientada a microservicios en NodeJS, que permita manejar datos de transacciones y usuarios a una empresa (ABC). Los microservicios desarrollados son:

- Registro de usuario
- Inicio de sesión del usuario
- Historial de transacciones
- Búsqueda de puntos totales
- Exportar Excel
- Crear transacción
- Inactivar transacción

## BD-MySQL
Como base de datos local se utilizó mySQL https://www.mysql.com/downloads/, por lo que debe instalarse y configurarse en su máquina para poder ejecutar este ejercicio. Luego de la instalación y configuración, puede utilizar el archivo estructura.sql (ubicado en la carpeta database de este repositorio) para crear la base de datos que necesita el proyecto, ya sea usando MySQL Workbench o una terminal. Una vez creada, debe tomar sus credenciales y cambiarlas en el archivo config.json de la ruta database/config:

![config.json](https://user-images.githubusercontent.com/20799440/73149848-44631080-4091-11ea-90d9-8a6adb5321b3.png)

Debe cambiar en cada tipo de ejecución (development, test y production) el nombre de usuario (puede dejarlo root), su contraseña y el puerto, ya que el nombre de la base de datos se define en el archivo sql. Teniendo esto en cuenta puede proceder a ejecutar cada uno de los microservicios.

## Ejecutar

Con el fin de mantener la independencia de los microservicios, ejecute cada uno en una terminal aparte (7 terminales para microservicios y una para pruebas). El orden de comandos que debe utilizar son:
- ```npm install``` instala las dependencias de node (ubíquese en la carpeta general del proyecto).
- ```node microservices/userRegister.js 8000``` para desplegar el microservicio que permite registrar usuarios en el puerto 8000 de su máquina local (puede ser cualquier puerto que desee pasar).
- ```node microservices/userLogin.js 8001``` para desplegar el microservicio que iniciar la sesión de un usuario en el puerto 8001 de su máquina local (puede ser cualquier puerto que desee pasar).
- ```node microservices/transactionHistory.js 8002``` para desplegar el microservicio que permite obtener las transacciones en el puerto 8002 de su máquina local (puede ser cualquier puerto que desee pasar) para un usuario (recuerde que debe estar autenticado para usar este servicio, pasando una cabecera de autorización con el token jwt del usuario que inicia la sesión).
- ```node microservices/createTransaction.js 8003``` para desplegar el microservicio que permite crear transacciones en el puerto 8003 de su máquina local (puede ser cualquier puerto que desee pasar) para un usuario (recuerde que debe estar autenticado para usar este servicio, pasando una cabecera de autorización con el token jwt del usuario que inicia la sesión).
- ```node microservices/deactivateTransaction.js 8004``` para desplegar el microservicio que permite desactivar transacciones en el puerto 8004 de su máquina local (puede ser cualquier puerto que desee pasar) para un usuario (recuerde que debe estar autenticado para usar este servicio, pasando una cabecera de autorización con el token jwt del usuario que inicia la sesión).
- ```node microservices/excelExport.js 8005``` para desplegar el microservicio que permite crear un reporte de excel en el puerto 8005 de su máquina local (puede ser cualquier puerto que desee pasar) para un usuario (recuerde que debe estar autenticado para usar este servicio, pasando una cabecera de autorización con el token jwt del usuario que inicia la sesión).
- ```node microservices/totalPointsSearch.js 8006``` para desplegar el microservicio que permite obtener la suma de puntos de las transacciones activas para un usuario en el puerto 8006 de su máquina local (puede ser cualquier puerto que desee pasar) (recuerde que debe estar autenticado para usar este servicio, pasando una cabecera de autorización con el token jwt del usuario que inicia la sesión).

**Importante:** Si desea ejecutar todos los microservicios al tiempo, establezca distintos puertos para cada uno.

## Pruebas
Puede ejecutar pruebas con Mocha y chai ubicadas en el archivo pruebas.spec.js de la carpeta test, si ejecuta el siguiente comando en una terminal aparte de los microservicios:
- ```npm test```

**Importante:** en las pruebas que requieren autenticación, debe cambiar el tomen jwt en la línea 'set' de la prueba, ya que el token por defecto puede expirar y resultar en prueba fallida.

Adicionalmente, se adjunta una colección de pruebas en postman para guiarlo sobre como realizar las peticiones a cada uno de los microservicios. **Cabe resaltar que cada prueba de postman se realiza sobre el mismo puerto, ya que se ejecutaba un sólo microservicio a la vez.**

## JWT
Para los microservicios que requieren un token jwt, a continuación se muestra una imagen de como poner esa cadena como cabecera en la petición:

![token](https://user-images.githubusercontent.com/20799440/73150412-411d5400-4094-11ea-9768-26a34c355901.png)

Al iniciar sesión, se entrega el token el la respuesta. Este token debe copiarse y pegarse de la siguiente manera (con Bearer) para hacer las peticiones que requieran token:

![header](https://user-images.githubusercontent.com/20799440/73150471-7e81e180-4094-11ea-96c3-cc19472d2f5e.png)

Además, para el microservicio de Excel, la petición en postman debe ser Send and Download para descargar el archivo de Excel:

![download](https://user-images.githubusercontent.com/20799440/73150512-b1c47080-4094-11ea-90e0-4ec790cdbf83.png)

## Licencia
Código entregado bajo la licencia MIT.
