import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions/usuarios.actions";

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$ : Actions,  //Observable que escucha las acciones
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$
                    .pipe(  // Ponemos en marcha el escuchador de acciones!!
                        ofType( usuariosActions.cargarUsuarios ), // Le indicamos la accion que queremos escuchar
                        mergeMap(                                               //Llamamos al metodo del servicio que queremos ejecutar
                            () => this.usuarioService.getUsers()
                                        .pipe(
                                            map( users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
                                            catchError( (err) => of(usuariosActions.cargarUsuariosError({payload: err})))
                                        )
                        )
                    )
    );

}