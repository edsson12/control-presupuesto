import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto, setpresupuesto,isValidPresupuesto,setisValidPresupuesto, gastos,setGastos}) => {
    return (
        <header>
        <h1>Planificador de gastos</h1>

        {isValidPresupuesto ? (<ControlPresupuesto
        gastos={gastos}
        presupuesto={presupuesto}
        setGastos={setGastos}
        setpresupuesto={setpresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
        
        />) :
        (<NuevoPresupuesto
        presupuesto={presupuesto}
        setpresupuesto={setpresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
        
        />)
        }
        
        </header>

    )
}

export default Header
