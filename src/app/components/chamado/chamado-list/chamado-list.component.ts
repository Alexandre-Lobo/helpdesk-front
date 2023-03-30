import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/model/chamado';
import { Cliente } from 'src/app/model/cliente';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];
  
  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll() : void{
    this.service.findaAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator; 
    })
  }

  retornaStatus(status: any): string {
    switch(status) {
      case 0:
        return 'ABERTO';
      case 1:
        return 'EM ANDAMENTO';
      case 2:
        return 'ENCERRADO';
      default:
        return 'ERRO';
    }
  }

  retornaPrioridade(prioridade: any): string {
    switch(prioridade) {
      case 0:
        return 'BAIXA';
      case 1:
        return 'MÉDIA';
      case 2:
        return 'ALTA';
      default:
        return 'ERRO';
    }
  }

  orderByStatus(status: any): void{
    let lista: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status){
        lista.push(element);
      }
    });
    this.FILTERED_DATA = lista;
    this.dataSource = new MatTableDataSource<Chamado>(lista);
    this.dataSource.paginator = this.paginator; 
  }

}
