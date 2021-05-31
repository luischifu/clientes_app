import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel() ;

  constructor( private clientesService: ClientesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id') ;

    if (id !== 'nuevo'){
      this.clientesService.getClient (id).subscribe ((resp:any) =>{
        this.heroe = resp ;
        this.heroe.id = id ;
      });
    }
  }

  guardar ( form:NgForm ) {

    if (form.invalid){
      console.log('Invalid form');
      return;
    }

    Swal.fire({
      title: 'Please wait',
      text: 'Saving info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;
    
    if(this.heroe.id){
      petition = this.clientesService.actualizarClient (this.heroe);
    }else{
      petition = this.clientesService.createClient (this.heroe);
    }

    petition.subscribe(resp=>{
      Swal.fire({
        title: this.heroe.name,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });
    
  }



}
