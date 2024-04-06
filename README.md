# PRÁCTICA 10: APLICACIÓN CLIENTE-SERVIDOR PARA COLECCIONISTAS DE CARTAS MAGIC
## DESARROLLO DE SISTEMAS INFORMÁTICOS
### Gabriel Ángel Canals Salleras
### alu0101460468
---
## Objetivo de la práctica

En el transcurso de esta práctica seguiremos trabajando con TypeScript, desarrollando un sistema de gestión de colecciones de cartas Magic. Este sistema será interactuable mediante comandos y opciones, destacando el uso de YARGS para la gestión de argumentos y opciones de la línea de comandos y Chalk para la mejora de la presentación de la información.

## Tareas previas
Tras aceptar debidamente la tarea en GitHub Classroom, habilitamos GitHub Pages para la elaboración de este informe. Posteriormente, clonamos el repositorio en nuestro equipo local y creamos una rama `code` para el desarrollo de la práctica.

Seguidamente, creamos la estructura de trabajo adecuada para los proyectos escrito en TypeScript, concretamente, un directorio `src` para los ficheros fuente y un directorio `dist` para los ficheros compilados. 

Adicionalmente complementamos nuestro proyecto con Typedoc para la documentación, Mocha y Chai para realizar las pruebas unitarias del **TDD** e C8, Coveralls y SonarCloud para comprobar el cubrimiento del código.

## Desarrollo
Para gestionar las entradas de la línea de comandos, utilizamos la librería YARGS. Esta librería nos permite definir comandos y opciones de forma sencilla y eficiente. Para mejorar la presentación de la información, utilizamos la librería Chalk, que nos permite dar color a la salida de la consola.

Los comandos que se pueden utilizar son:

- `add`: Añade una carta a la colección.
- `list`: Muestra la colección de cartas de un usuario.
- `read`: Muestra la información de una carta.
- `remove`: Elimina una carta de la colección.
- `update`: Actualiza la información de una carta.

Para todas estas funciones el principal atributo será el ID de la carta, que será el identificador único de la misma. Para añadir una carta, se deberá especificar el nombre, el mana, el tipo, el color, el valor de mercado y la rareza de la carta. Para actualizar una carta, se deberá especificar el ID de la carta y los campos que se quieren actualizar.

Si una carta es de tipo `Criatura`, se deberá especificar la fuerza y la resistencia de la misma. Si una carta es de tipo `Planeswalker`, se deberá especificar el número de lealtad del planeswalker.

La comprobación de que los datos introducidos son correctos se realizará mediante el uso de la clase `Checker`, que implementará una serie de métodos para comprobar que los datos introducidos son correctos.

De la misma manera utilizaremos la librería `Chalk` para dar color a la salida de la consola. Todos los mensajes informativos serán de color verde y los mensajes de error serán de color rojo.

### Desarrollo Dirigido por Pruebas (TDD)

Para el desarrollo de la práctica, hemos seguido la metodología **TDD**. Hemos creado los test unitarios antes de implementar las clases y métodos. Para ello, hemos utilizado las librerías `Mocha` y `Chai`.

### Documentación

Para la documentación de la práctica, hemos utilizado la librería `Typedoc`. Hemos generado la documentación de la práctica y la hemos subido a la rama `gh-pages` para que esté disponible en GitHub Pages.

### Cubrimiento del código

Para comprobar el cubrimiento del código, hemos utilizado las librerías `C8`, `Coveralls` y `SonarCloud`. Hemos comprobado que el cubrimiento del código es superior al 75%.

## Conclusión
Los ejercicios elaborados han expandido nuestros conocimientos sobre TypeScript, YARGS y Chalk. Hemos aprendido a gestionar las entradas de la línea de comandos de forma sencilla y eficiente y a dar color a la salida de la consola. Además, hemos aprendido a documentar un proyecto en TypeScript y a comprobar el cubrimiento del código.