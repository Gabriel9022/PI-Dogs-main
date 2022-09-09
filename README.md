# Individual Project - Dogs

<img height="200" src="./dog.png" />

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.


El proyecto tuvo una duración máxima de tres semanas. 

Versiones de las dependencias:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3


## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` (back-end) y `client` (front-end).

## El proyecto

La idea general fue crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

- Buscar perros
- Filtrarlos / Ordenarlos
- Agregar nuevos perros

Toda la estética de la aplicación está hecho con CSS puro.

## Tecnologías

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Frontend

__Pagina inicial__: landing page con

- [ ] Imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: contiene

- [ ] Input de búsqueda para encontrar razas de perros por nombre
- [ ] Área donde se visualiza el listado de razas de perros mostrando:
  - Imagen
  - Nombre
  - Temperamento
  - Peso
- [ ] Botones/Opciones para filtrar por:
  - Temperamento
  - Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  - Orden alfabético
  - Peso
- [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

Se muestran tanto las razas traidas desde la api como las creadas mediante el form. En la base de datos solo se guardan las creadas en el form, era requisito explícito del proyecto.

__Ruta de detalle de raza de perro__: contiene

- [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
- [ ] Altura
- [ ] Peso
- [ ] Años de vida

__Ruta de creación de raza de perro__: contiene

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Altura (Diferenciado entre altura mínima y máxima)
  - Peso (Diferenciado entre peso mínimo y máximo)
  - Años de vida (Difreneciado entre mínimo y máximo para generar un rango)
- [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
- [ ] Botón para crear la nueva raza de perro

## Base de datos

El modelo de la base de datos tiene las siguientes entidades (Las propiedades marcadas con asterísco son obligatorias):

- [ ] Raza con las siguientes propiedades:
  - ID *
  - Nombre *
  - Altura *
  - Peso *
  - Años de vida
- [ ] Temperamento con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos. 

## Backend

Servidor en Node/Express con las siguientes rutas:

- [ ] __/dogs__:
  - Devuelve un listado de las razas de perro
  - Solo los datos necesarios para la ruta principal
- [ ] __/dogs?name="..."__:
  - Devuelve un listado de las razas de perro que contengan la palabra ingresada como query parameter
- [ ] __/dogs/{idRaza}__:
  - Devuelve el detalle de una raza de perro en particular
  - Trae solo los datos pedidos en la ruta de detalle de raza de perro
  - Incluye los temperamentos asociados
- [ ] __POST /dogs__:
  - Recibe los datos recolectados desde el formulario de la ruta de creación de raza de perro
  - Crea una raza de perro en la base de datos relacionada con sus temperamentos
- [ ] __/temperaments__:
  - Devuelve todos los temperamentos posibles
