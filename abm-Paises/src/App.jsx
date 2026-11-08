import { useState, useEffect } from "react";
import AltaPais from "./components/AltaPais";
import ModificarPais from "./components/ModificarPais";
import BajaPais from "./components/BajaPais";
import "./App.css";

function App() {
  const [paises, setPaises] = useState(() => {
    const saved = localStorage.getItem("abm_paises");
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, nombre: "Chile" },
      { id: 2, nombre: "Perú" },
      { id: 3, nombre: "Uruguay" }
    ];
  });

  const [modal, setModal] = useState({ tipo: null, pais: null });
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("abm_paises", JSON.stringify(paises));
  }, [paises]);

  const abrirModal = (tipo, pais = null) => {
    setModal({ tipo, pais });
    setInputValue(pais ? pais.nombre : "");
  };

  const cerrarModal = () => {
    setModal({ tipo: null, pais: null });
    setInputValue("");
  };

  const handleAceptar = () => {
    if (modal.tipo === "alta" && inputValue.trim() !== "") {
      const nuevoId = paises.length > 0 ? Math.max(...paises.map((p) => p.id)) + 1 : 1;
      setPaises([...paises, { id: nuevoId, nombre: inputValue }]);
    } else if (modal.tipo === "modificar" && inputValue.trim() !== "") {
      setPaises(
        paises.map((p) => (p.id === modal.pais.id ? { ...p, nombre: inputValue } : p))
      );
    } else if (modal.tipo === "baja") {
      setPaises(paises.filter((p) => p.id !== modal.pais.id));
    }
    cerrarModal();
  };

  const paisesFiltrados = paises.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="layout">
      <div className="container">
        <h3 className="app-title">Mi Consorcio</h3>
        
        <button className="btn-alta" onClick={() => abrirModal("alta")}>
          Alta
        </button>

        <table className="tabla-paises">
          <thead>
            <tr>
              <th>Modificar</th>
              <th>Baja</th>
              <th>Nombre ↑</th>
            </tr>
          </thead>
          <tbody>
            {paisesFiltrados.map((pais) => (
              <tr key={pais.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    onClick={() => abrirModal("modificar", pais)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    onClick={() => abrirModal("baja", pais)}
                  />
                </td>
                <td>{pais.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renderizado de los modales separados por componentes */}
      {modal.tipo === "alta" && (
        <AltaPais
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAceptar={handleAceptar}
          onCancelar={cerrarModal}
        />
      )}

      {modal.tipo === "modificar" && (
        <ModificarPais
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAceptar={handleAceptar}
          onCancelar={cerrarModal}
        />
      )}

      {modal.tipo === "baja" && (
        <BajaPais
          pais={modal.pais}
          onAceptar={handleAceptar}
          onCancelar={cerrarModal}
        />
      )}
    </div>
  );
}

export default App;