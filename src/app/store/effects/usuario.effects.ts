import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, take } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuarioActions from "../actions/usuario.action";

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$ : Actions,  //Observable que escucha las acciones
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$
                    .pipe(  // Ponemos en marcha el escuchador de acciones!!
                        ofType( usuarioActions.cargarUsuario ), // Le indicamos la accion que queremos escuchar
                        mergeMap(                                               //Llamamos al metodo del servicio que queremos ejecutar
                            ( action ) => this.usuarioService.getUser( action.id )
                                        .pipe(
                                            map( user => usuarioActions.cargarUsuarioSuccess({usuario: user})),
                                            catchError( (err) => of(usuarioActions.cargarUsuarioError({payload: err})))
                                        )
                        )
                    )
    );

}