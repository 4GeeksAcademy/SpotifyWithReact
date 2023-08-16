  import React, { useState, useEffect, useRef } from "react";

  const Home = () => {
    const [canciones, setCanciones] = useState([]);
    const [cancionActual, setCancionActual] = useState(null);
    const audioRef = useRef(null);
    const [indiceCancionActual, setIndiceCancionActual] = useState(0);

    async function getApiData() {
      try {
        const response = await fetch("https://playground.4geeks.com/apis/fake/sound/songs");
        const data = await response.json();
        return data; 
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    useEffect(() => {
      getApiData()
        .then((data) => {
          setCanciones(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    const reproducirMusicaMario = (urlCancion) => {
      const url = "https://assets.breatheco.de/apis/sound/" + urlCancion;
      setCancionActual({ nombre: "Musica Mario", url: url });
      audioRef.current.src = url;
      audioRef.current.play();
    }

    const reproducirSiguienteCancion = () => {
      const nuevoIndice = (indiceCancionActual + 1) % canciones.length;
      reproducirMusicaMario(canciones[nuevoIndice].url);
      setIndiceCancionActual(nuevoIndice);
      console.log(reproducirSiguienteCancion)
    };

    const reproducirAnteriorCancion = () => {
      const nuevoIndice = (indiceCancionActual - 1) % canciones.length;
      reproducirMusicaMario(canciones[nuevoIndice].url);
      setIndiceCancionActual(nuevoIndice);
    };

    const reproducirOpausarMusica = () => {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    };

    const reproducirCancionAleatoria = () => {
      const randomIndex = Math.floor(Math.random() * canciones.length);
      reproducirMusicaMario(canciones[randomIndex].url);
      setIndiceCancionActual(randomIndex);
      console.log(reproducirCancionAleatoria)
    };
    
  
    return (
      <div className="container-sm rounded m-4 text-bg-dark p-3 border-5-success" style={{ width: "500px" }}>
        <div className="container-sm rounded text-bg-success p-1;" style={{ width: "450px", textShadow: "1px 2px 2px black" }}>
        <h1><strong><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-collection-play-" viewBox="0 0 16 16" >
    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z"/>
  </svg> PLAYLIST MUSIC</strong></h1>
        </div>
        <div className="container-flex p-5" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <h3> TOP 19 MUSIC UY </h3>
        <ol>
          {canciones.map((cancion, indice) => (
            <li key={indice} onClick={() => reproducirMusicaMario(cancion.url)}>
              {cancion.name}
            </li>
          ))}
        </ol>
        </div>

          <div className="text-center">

          <button className="bg-dark rounded-circle m-1" onClick={reproducirCancionAleatoria}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-shuffle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>
</button>


          <button className="bg-dark rounded-circle" onClick={reproducirAnteriorCancion}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
  </svg>
  </button>

  <button className="bg-dark rounded-circle" onClick={reproducirOpausarMusica}><svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="white" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
  </svg>  
   </button>


          <button className="bg-dark rounded-circle" onClick={reproducirSiguienteCancion}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
  </svg>
  </button>

  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={audioRef.current ? audioRef.current.volume : 0}
    onChange={(e) => (audioRef.current.volume = e.target.value)}
    style={{ width: "15%", marginTop: "10px", color: "green" }}
  />

          <audio ref={audioRef} /> 
          </div>
          </div>
    );
  };

  export default Home;
