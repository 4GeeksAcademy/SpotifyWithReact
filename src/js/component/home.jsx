import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const [canciones, setCanciones] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);
  const audioRef = useRef(null);
  const [indiceCancionActual, setIndiceCancionActual] = useState(0);


  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/sound/songs")
      .then((response) => response.json())
      .then((data) => setCanciones(data));
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
  };

  const reproducirAnteriorCancion = () => {
    const nuevoIndice = (indiceCancionActual - 1) % canciones.length;
    reproducirMusicaMario(canciones[nuevoIndice].url);
    setIndiceCancionActual(nuevoIndice);
  };

 
  return (
    <div className="container-sm rounded m-4 text-bg-dark p-3 border-4" style={{ width: "500px", boxShadow: "10px 10px 10px gray" }}>
      <div className="container-sm rounded text-bg-success p-1;" style={{ width: "450px", textShadow: "1px 2px 2px black" }}>
      <h1><strong><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-collection-play-" viewBox="0 0 16 16" >
  <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z"/>
</svg> PLAYLIST MUSIC</strong></h1>
      </div>
      <div className="container m-1 " style={{ maxHeight: "400px", overflowY: "auto" }}>
      <p>
        {canciones.map((cancion, indice) => (
          <li key={indice} onClick={() => reproducirMusicaMario(cancion.url)}>
            {cancion.name}
          </li>
        ))}
      </p></div>
        <div className="text-center">
        <button className="bg-dark rounded-circle" onClick={reproducirAnteriorCancion}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></button>
        <audio ref={audioRef} controls />
        <button className="bg-dark rounded-circle" onClick={reproducirSiguienteCancion}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></button>
        </div>
    </div>
  );
};

export default Home;
