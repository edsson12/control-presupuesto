import React, { useState } from 'react'
import { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


const ControlPresupuesto = ({presupuesto,setpresupuesto, gastos, setGastos, setisValidPresupuesto}) => {

    
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)


    useEffect(() => {
       const totalGastado = gastos.reduce( (total, gasto)=>gasto.cantidad + total, 0)
       const totalDisponoble = presupuesto-totalGastado;
       const nuevoPorcentaje = (((presupuesto-totalDisponoble)/presupuesto)*100).toFixed(2);
       
       
       setGastado(totalGastado)       
       setDisponible(totalDisponoble)

       setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
       }, 700);
    }, [gastos, presupuesto])

    const formatearCantidad= (cantidad)=>{
        return cantidad.toLocaleString('en-US',{
            style:'currency',
            currency:'USD'

        })
    }

    const handleResetApp= ()=>{
        const resultado = window.confirm('¿Desear reiniciar?')
        if (resultado) {
            setGastos([])
            setpresupuesto(0)
            setisValidPresupuesto(false)
        }
    }



    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626': '#3B82F6',
                    textColor: porcentaje > 100 ? '#DC2626': '#3B82F6',
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear app
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo': null}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
            
        </div>
    )
}

export default ControlPresupuesto
