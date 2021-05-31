import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [] ;

  constructor( private clientesService: ClientesService ) { }

  ngOnInit(): void {
    this.clientesService.getClients().subscribe((resp)=>{
      this.heroes = resp ;
    });
  }

  deleteClient(heroe: any, i:number){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.heroes.splice(i, 1) ;
        this.clientesService.deleteClient(heroe.id).subscribe() ;

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

}
