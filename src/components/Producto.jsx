import React from 'react';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory(); // Habilitar para redireccion 

    // Confirmar si desea eliminar
    const confirmarEliminarProducto = id => {

        // Preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Eliminaras este producto de tu inventario!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
          }).then((result) => {
            if (result.isConfirmed) {
                // Pasarlo al action
                dispatch(borrarProductoAction(id));
              
            }
          })
    }

    // Funcion que redirige de forma programada
    const redireccionarEdicion = producto => { 
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`)
    }
    
    return (
        <tr>
            <td> {nombre} </td>
            <td> <span className="font-weight-bold">$ {precio} </span>  </td>
            <td className="acciones"> 
                <button type="button" className="btn btn-primary mr-2" onClick={() => redireccionarEdicion(producto)}>Editar</button>
                <button 
                    className="btn btn-danger" 
                    type="button" 
                    onClick={() => confirmarEliminarProducto(id)}>
                        Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto
