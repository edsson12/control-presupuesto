import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, setpresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')) : []
    );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setgastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos)?? []);
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setgastosFiltrados(gastosFiltrados)
    }
  }, [filtro, gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'))?? 0;
      if (presupuestoLS>0) {
        setisValidPresupuesto(true)
        
      }
  }, [])



  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActializados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActializados);
      setGastoEditar({})
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
      setAnimarModal(false);
    }

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActializados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActializados)
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setpresupuesto={setpresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
      />

     

      {isValidPresupuesto && (
        <>
          <main>
          <Filtros
          filtro={filtro}
          setFiltro={setFiltro}
          />
            <ListadoGastos
              setGastoEditar={setGastoEditar}
              gastos={gastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
