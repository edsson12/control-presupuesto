import {React} from 'react'

const Filtros = ({filtro, setFiltro}) => {
    return (
        <div className='filtros sombra contenedor'>
            <form >

                <div className='campo'>
                    <label htmlFor="">Filtrar gastos</label>
                    <select value={filtro}
                    onChange={e=> setFiltro(e.target.value)}>
                        <option value=""> Todos</option>
                        <option value="Ahorro">Ahorro</option>
                        <option value="Comida">Comida</option>
                        <option value="Casa">Casa</option>
                        <option value="Ocio">Ocio</option>
                        <option value="Salud">Salud</option>
                        <option value="Subscripciones">Subscripciones</option>
                    </select>
                </div>
            </form>
            
        </div>
    )
}

export default Filtros
