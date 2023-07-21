# Prueba CentralFile BackEnd

## Breve descripción o introducción.

### Instalación

Clona este repositorio utilizando el siguiente comando:

```bash
git clone https://github.com/ronny-minda/PruebaServer
```

Instala las dependencias del proyecto ejecutando el siguiente comando:

```bash
npm i
```

Crea un archivo .env en el directorio raíz del proyecto y agrega las siguientes variables de entorno:

```bash
DATABASE_URL=file:./dev.db
SECRETORPRIVATEKEY=palabracecretA
```

### Uso

Para ejecutar la aplicación en entorno de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Para ejecutar la aplicación en producción, utiliza el siguiente comando:

```bash
npm run start
```
