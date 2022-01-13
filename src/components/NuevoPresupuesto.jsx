import {useState} from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setpresupuesto,setisValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e)=>{
        e.preventDefault();
        if (!presupuesto || presupuesto < 0 ) {
            setMensaje('No es un presupuesto válido')
            return
        }
        setMensaje('')
        setisValidPresupuesto(true)

    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={e => setpresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

      </form>
    </div>
  );
};

export default NuevoPresupuesto;
