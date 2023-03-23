import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/model/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute) { 
  }


  ngOnInit(): void {
    this.tecnico.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta =>{
      resposta.perfis=[];
      this.tecnico = resposta;
    })
  }

  delete(): void{
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toastr.success('Técnico excluído com sucesso!', 'Exclusão de técnico');
      this.router.navigate(['tecnicos']);      
    }, ex => {
      if (ex.error.errors){
        ex.error.errors.forEach(e => {
          this.toastr.error(e.message)
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    })
  }

}