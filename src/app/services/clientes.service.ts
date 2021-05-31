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

  getClients() {

    return this.http.get (`${this.url}/heroes.json`)
                      .pipe(
                        map(resp=>this.crearArray(resp)) 
                      );
  }

  private crearArray(heroesObj:any){

    const heroes: HeroeModel[] = [] ;

    if ( heroesObj === null ) { return []; }

    Object.keys(heroesObj).forEach (key=>{

      const heroe: HeroeModel = heroesObj[key] ;
      heroe.id = key ;

      heroes.push (heroe) ;

    });

    return heroes;
  }

  getClient (id: string){
    return this.http.get (`${this.url}/heroes/${id}.json`);
  }

  deleteClient (id: string){
    return this.http.delete (`${this.url}/heroes/${id}.json`)
  }

  }


