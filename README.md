# PRÁCTICA 10: APLICACIÓN CLIENTE-SERVIDOR PARA COLECCIONISTAS DE CARTAS MAGIC
## DESARROLLO DE SISTEMAS INFORMÁTICOS
### Gabriel Ángel Canals Salleras
### alu0101460468
---
## Objetivo de la práctica

En el transcurso de esta práctica seguiremos trabajando con TypeScript, ampliamos nuestro gestor de cartas Magic y lo convertimos en una aplicación cliente-servidor. Para ello, utilizaremos la librería YARGS para gestionar las entradas de la línea de comandos y la librería Chalk para dar color a la salida de la consola.

## Tareas previas
Tras aceptar debidamente la tarea en GitHub Classroom, habilitamos GitHub Pages para la elaboración de este informe. Posteriormente, clonamos el repositorio en nuestro equipo local y creamos una rama `code` para el desarrollo de la práctica.

Seguidamente, creamos la estructura de trabajo adecuada para los proyectos escrito en TypeScript, concretamente, un directorio `src` para los ficheros fuente y un directorio `dist` para los ficheros compilados. 

Adicionalmente complementamos nuestro proyecto con Typedoc para la documentación, Mocha y Chai para realizar las pruebas unitarias del **TDD** e C8, Coveralls y SonarCloud para comprobar el cubrimiento del código.

## Desarrollo
Hemos creado la gestión de nuestro dsrvidor utilizando el módulo `net` de Node.js. Hemos creado un servidor que escucha en el puerto 60300 y que recibe las peticiones de los clientes. Hemos creado un cliente que se conecta al servidor y que envía las peticiones al servidor, un protocolo de comunicación entre el cliente y el servidor lo configuramos con el gestor de cartas que se encarga de gestionar las cartas de los usuarios. 

Para la gestión de las cartas, hemos utilizado la librería `YARGS` para gestionar las entradas de la línea de comandos y la librería `Chalk` para dar color a la salida de la consola.

La gestión de la comunicación entre el cliente y el servidor se ha realizado mediante la refactorización de las funciones para convertirlas en funciones asíncronas que siguen el patrón `callback`.

A modo de ejemplo, se presenta la función `addCard` que añade una carta a la colección de un usuario antes de la refactorización:

```typescript
export function newCard(
  ID: unknown,
  Name: unknown,
  User: unknown,
  Mana: unknown,
  Color: unknown,
  Type: unknown,
  Rarity: unknown,
  Strres: unknown[],
  Loyalty: unknown,
  Text: unknown,
  Value: unknown,
  userCollection: unknown,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
  if (
    !checker.checkLoyalty(Type, Loyalty) ||
    !checker.checkStrRes(Type, Strres[0], Strres[1])
  ) {
    console.log(chalk.red(`Card not added to ${User} collection!`));
    callback(chalk.red(`Card not added to ${User} collection!`), undefined);
    return;
  }
  if (
    checker.checkIfCardExistsForThisUser(Name, userCollection as string, ID)
  ) {
    console.log(chalk.red(`Card already exists at ${User} collection!`));
    callback(`Card already exists at ${User} collection!`, undefined);
    return;
  }
  
  fs.stat(`${userCollection}/${Name}.json`, (err) => {
    if (
      err ||
      !(
        checker.checkId(ID, userCollection) &&
        checker.checkMana(Mana) &&
        checker.checkColor(Color) &&
        checker.checkType(Type) &&
        checker.checkRarity(Rarity)
      )
    ) {
      fs.writeFile(
        `${userCollection}/${Name}.json`,
        JSON.stringify(
          {
            ID,
            Name,
            Mana,
            Color,
            Type,
            Rarity,
            Strength: Strres[0],
            Resistance: Strres[1],
            Loyalty,
            Text,
            Value,
          },
          null,
          2,
        ),
        (err) => {
          if (err) {
            callback(chalk.red(err.message), undefined);
          } else {
            callback(
              undefined,
              chalk.green(`Card added to ${User} collection!`),
            );
          }
        },
      );
    } else {
      callback(chalk.red(`Card not added to ${User} collection!`), undefined);
    }
  });
}
```
Y después de la refactorización:

```typescript
export function newCard(
  ID: unknown,
  Name: unknown,
  User: unknown,
  Mana: unknown,
  Color: unknown,
  Type: unknown,
  Rarity: unknown,
  Strres: unknown[],
  Loyalty: unknown,
  Text: unknown,
  Value: unknown,
  userCollection: unknown,
  callback: (error: string | undefined, result: string | undefined) => void,
): void {
  if (
    !checker.checkLoyalty(Type, Loyalty) ||
    !checker.checkStrRes(Type, Strres[0], Strres[1])
  ) {
    console.log(chalk.red(`Card not added to ${User} collection!`));
    callback(chalk.red(`Card not added to ${User} collection!`), undefined);
    return;
  }
  if (
    checker.checkIfCardExistsForThisUser(Name, userCollection as string, ID)
  ) {
    console.log(chalk.red(`Card already exists at ${User} collection!`));
    callback(`Card already exists at ${User} collection!`, undefined);
    return;
  }
  
  fs.stat(`${userCollection}/${Name}.json`, (err) => {
    if (
      err ||
      !(
        checker.checkId(ID, userCollection) &&
        checker.checkMana(Mana) &&
        checker.checkColor(Color) &&
        checker.checkType(Type) &&
        checker.checkRarity(Rarity)
      )
    ) {
      fs.writeFile(
        `${userCollection}/${Name}.json`,
        JSON.stringify(
          {
            ID,
            Name,
            Mana,
            Color,
            Type,
            Rarity,
            Strength: Strres[0],
            Resistance: Strres[1],
            Loyalty,
            Text,
            Value,
          },
          null,
          2,
        ),
        (err) => {
          if (err) {
            callback(chalk.red(err.message), undefined);
          } else {
            callback(
              undefined,
              chalk.green(`Card added to ${User} collection!`),
            );
          }
        },
      );
    } else {
      callback(chalk.red(`Card not added to ${User} collection!`), undefined);
    }
  });
}
```

### Desarrollo Dirigido por Pruebas (TDD)

Para el desarrollo de la práctica, hemos seguido la metodología **TDD**. Hemos creado los test unitarios antes de implementar las clases y métodos. Para ello, hemos utilizado las librerías `Mocha` y `Chai`.

### Documentación

Para la documentación de la práctica, hemos utilizado la librería `Typedoc`. Hemos generado la documentación de la práctica y la hemos subido a la rama `gh-pages` para que esté disponible en GitHub Pages.

### Cubrimiento del código

Para comprobar el cubrimiento del código, hemos utilizado las librerías `C8`, `Coveralls` y `SonarCloud`. Hemos comprobado que el cubrimiento del código es superior al 75%.

## Conclusión
Los ejercicios elaborados han expandido nuestros conocimientos sobre TypeScript, YARGS y Chalk. Hemos aprendido a gestionar las entradas de la línea de comandos de forma sencilla y eficiente y a dar color a la salida de la consola. Además, hemos aprendido a documentar un proyecto en TypeScript y a comprobar el cubrimiento del código.