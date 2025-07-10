# 🎬 Movie & TV Explorer

Aplicación web que consume la API de [TMDB (The Movie Database)](https://www.themoviedb.org/) para explorar películas y series de TV. Permite listar contenido popular, buscar por nombre, ver detalles de cada título, y descubrir contenido similar.

## 🚀 Características principales

- 🔍 Buscador de películas y series de TV
- 🎞️ Listado de películas y programas de TV populares
- 📃 Detalle completo de cada título (título, descripción, fecha, puntuación, géneros, etc.)
- 🔁 Recomendaciones de contenido similar
- ✅ Filtrado por tipo: Película o Serie de TV
- 📱 Responsive: Funciona en móviles, tablets y desktops

## 🛠️ Tecnologías utilizadas

- **Frontend:** React / Angular / Vue *(modifica según tu stack)*
- **Consumo de API:** Fetch / Axios
- **Estilos:** CSS Modules / Tailwind / Bootstrap *(modifica según lo que uses)*
- **Routing:** React Router / Angular Router

## 🧩 API utilizada

Se utiliza la [TMDB API v3](https://developer.themoviedb.org/docs) para obtener datos de películas y series.

Para usarla necesitas una API Key gratuita, que puedes obtener creando una cuenta en TMDB.

## 🔧 Configuración del entorno

1. Clona el repositorio:

```bash
git clone https://github.com/Neira21/movies-app-tmdb.git
cd movies-app-tmdb
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tus variables de entorno:

```plaintext
VITE_API_URL = https://api.themoviedb.org/3
VITE_API_KEY = Tu API Key de TMDB que puedes obtener en https://www.themoviedb.org/settings/api
VITE_IMAGE_URL = ttps://image.tmdb.org/t/p/w200/
VITE_IMAGE_ORIGINAL = https://image.tmdb.org/t/p/original/
VITE_IMAGE_500 = https://image.tmdb.org/t/p/w500/

VITE_TOKEN=Tu Token que puedes obtener en https://www.themoviedb.org/settings/api
```

## 📷 Capturas de pantalla del proyecto