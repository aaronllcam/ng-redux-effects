import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL : string = 'https://reqres.in/api' 
  constructor(private http: HttpClient) { }

  getUsers(){
    
    return this.http.get(`${this.URL}/users?delay=3`)
                .pipe( 
                  map( res => res['data'] )
                );
  }

  getUser(id: string){
    
    return this.http.get(`${this.URL}/users/${id}`)
                .pipe( 
                  map( res => res['data'] )
                );
  }
}
