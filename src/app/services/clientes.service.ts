import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url = 'https://herocrud-42dcf-default-rtdb.firebaseio.com' ;

  constructor( private http: HttpClient ) { }

  createClient(heroe: HeroeModel){
    return this.http.post (`${this.url}/heroes.json`, heroe)
                          .pipe(
                            map((resp:any)=>{
                              heroe.id = resp.name ;
                              return heroe ;
                            })
                          );
  }

  actualizarClient (heroe: HeroeModel){

    const heroeTemp = {
      ...heroe 
    };

    delete heroeTemp['id'];

    return this.http.put ( `${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  }


