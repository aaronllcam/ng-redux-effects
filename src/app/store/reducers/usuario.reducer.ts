import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions/index';

export interface UsuarioState {
    id      : string,
    user    : Usuario,
    loaded  : boolean,
    loading : boolean,
    error   : any
}

export const usuarioInitialState: UsuarioState = {
   id       : null,
   user     : null,
   loaded   : false,
   loading  : false,
   error    : null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuario, (state, { id }) => ({ 
        ...state, 
        loading: true,
        id: id
    })),
    on(cargarUsuarioSuccess, (state, { usuario }) => ({
         ...state,
         loading : false,
         loaded  : true,
         error   : null,
         user    : { ...usuario }
        })),
    on(cargarUsuarioError, (state, { payload }) => ({
         ...state, 
         user: null,
         loading : false,
         loaded  : false,
         error   : {
             url: payload.url,
             name: payload.name,
             message: payload.message
         }
        })),

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}
