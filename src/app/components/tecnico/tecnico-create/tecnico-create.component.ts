import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/model/tecnico';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {
  
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  
  constructor(
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router) { 
  }


  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.tecnico).subscribe(() => {
      this.toastr.success('Técnico cadastrado com sucesso!', 'Cadastro de técnico');
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

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    }else{
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos() : boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid &&
      this.senha.valid;
  }

}
