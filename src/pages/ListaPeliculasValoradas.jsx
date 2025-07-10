import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "50px",
    flexDirection: "column",

  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid black",
  },
  header: {
    backgroundColor: "#1976d2",
    color: "white",
  },
};



const ListaPeliculasValoradas = () => {
  const [movies, setMovies] = useState([]);
  const [isMovie, setIsMovie] = useState(true);

  const rows = isMovie
    ? movies.map((movie, index) => ({
        id: index + 1,
        idTruth: movie.id,
        colImage: movie.poster_path,
        col1: movie.title,
        col2: movie.rating,
      }))
    : movies.map((movie, index) => ({
        id: index + 1,
        idTruth: movie.id,
        colImage: movie.poster_path,
        col1: movie.name,
        col2: movie.rating,
      }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        return <strong>{params.value}</strong>;
      },
    },
    {
      field: "colImage",
      headerName: "Imagen",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            src={`${import.meta.env.VITE_IMAGE_500}${params.value}`}
            alt="poster"
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
    },
    {
      field: "col1",
      headerName: "Pelicula",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "col2",
      headerName: "Valoración",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "accion",
      headerName: "Acción",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={()=>handleDelete(params)}
        >
          Borrar
        </button>
        )
      },
      align: "center",
    },
  ];

  const handleDelete = async (params) => {
    const id = params.row.idTruth;
    try {
      const type = isMovie ? "movie" : "tv";
      const response = await fetch(`${import.meta.env.VITE_API_URL}${type}/${id}/rating?api_key=${import.meta.env.VITE_API_KEY}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });

      if (response.ok) {
        // Si el borrado es exitoso, actualiza el estado
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      } else {
        console.error("Error al borrar la película");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };


  const ObtenerPeliculasRated = async () => {
    const type = isMovie ? "movies" : "tv";
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }account/13007389/rated/${type}?api_key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );

      console.log(response);

      if (response.status !== 200) {
        return console.log("Error del servidor");
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeToPelicula = () => {
    setIsMovie(true);
  };

  const ChangeToSerie = () => {
    setIsMovie(false);
  };

  useEffect(() => {
    ObtenerPeliculasRated();
  }, [isMovie]);

  return (
    <div style={{...style.container, paddingTop: "100px"}}>
      <Link to="/" style={{ textAlign: "center", textDecoration: "none" }}>
        <button style={{ color: "white", cursor: "pointer" }}>
          Ir al inicio
        </button>
      </Link>
      <div className="center">
        {isMovie ? <h1>Peliculas</h1> : <h1>Series</h1>}
        <button
          style={{ backgroundColor: isMovie ? "blue" : "red" }}
          onClick={ChangeToPelicula}
        >
          Peliculas
        </button>
        <button
          style={{ backgroundColor: isMovie ? "red" : "blue" }}
          onClick={ChangeToSerie}
        >
          Series
        </button>
      </div>

      <Paper sx={{ height: 500, width: "95%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              pageSize: 8,
              page: 1,
            },
          }}
          
          pagination
          rowHeight={120}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: style.header.backgroundColor, // Estilo para el encabezado
              color: style.header.color, // Color del texto del encabezado
            },
          }}
        />
      </Paper>
    </div>
  );
};

//npm install @mui/icons-material

export default ListaPeliculasValoradas;
