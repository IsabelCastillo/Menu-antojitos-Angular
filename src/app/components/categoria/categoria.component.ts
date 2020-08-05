import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild  } from '@angular/core';
import { CategoriasModel } from '../../models/categorias.models';
import { NgForm} from '@angular/forms'
import { CategoriasService } from '../../services/categorias/categorias.service';
import { Route } from '@angular/compiler/src/core';
// import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import { ExcelService } from '../../services/Excel/excel.service';
import Swal from 'sweetalert2';


// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000
// });

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriasComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef

  public categoria: CategoriasModel;
  
  public categorias: CategoriasModel [];
  pageActual: number = 1;
  buscar:string;

  constructor(private categoriaService:CategoriasService, private excelService: ExcelService) {
    this.categoria = new CategoriasModel();
    
   }

  ngOnInit(): void {
  
   this.obtenerCategorias();
  }

  editarCategoria(value){
    this.categoria = value as CategoriasModel;
  }

  obtenerCategorias(){
    this.categoriaService.getCategoria().then(res  =>{
      this.categorias =  res ['categorias'] as CategoriasModel [];
    })
  }


  registrarCategoria(form: NgForm){
    this.categoriaService.postCategoria(form.value).then(res => {
      console.log(res);
      this.obtenerCategorias();
      Swal.fire({
        icon: 'success',
        text: `¡El platillo ${this.categoria.strNombre} se registró exitosamente!`
      });
      form.reset();
     
    }).catch(err => {

      Swal.fire({
        icon: 'error',
        text: err.error.err.message
    })
      
    });
  }

  modificarRegistro(form: NgForm, value){
    this.categoria = value as CategoriasModel; this.categoriaService.putCategoria(this.categoria).then(res => {
      this.obtenerCategorias();
      form.reset();
      this.categoria = new CategoriasModel();
    })
  }

  public downloadPDF():void {
    let Informacion = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(Informacion.innerHTML,15,15,{
      'width': 500,
      'elementHandlers': handleElement
    });

    doc.save('Categorias.pdf');
  }

  exportarExcel(){
    this.excelService.exportToExcel(this.categorias, 'Categorias');
  }
}
