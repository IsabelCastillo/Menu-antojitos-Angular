import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlatillosModel } from 'src/app/models/platillos.model';
import { PlatillosService } from '../../services/platillos/platillos.service';
import { CategoriasModel } from 'src/app/models/categorias.models';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ExcelService } from '../../services/Excel/excel.service';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef

  public platillo: PlatillosModel;
  public platillos: PlatillosModel [];
  pageActual: number = 1;
  buscar:string;
  refresh: any;

  constructor(private platilloService: PlatillosService,  private excelService: ExcelService) { 
    this.platillo = new PlatillosModel();
  }

  ngOnInit(): void {
    this.obtenerPlatillos();
  }

  editarPlatillo(value){
    this.platillo = value as PlatillosModel;
  }

  obtenerPlatillos(){
    this.platilloService.getPlatillo().then(res  =>{
      console.log(res);
      this.platillos =  res ['platillos'] as PlatillosModel [];
    })
  }


  registrarPlatillo(form: NgForm){
    this.platilloService.postPlatillo(form.value).then(res => {
      console.log(form.value);
      this.obtenerPlatillos();
      Swal.fire({
      icon: 'success',
      text: `¡El platillo ${this.platillo.strNombre} se registró exitosamente!`
    });
      form.reset();
      this.refresh.emit(true);
     
    
  }).catch(err =>{
    Swal.fire({
      icon: 'error',
      text: err.error.err.message
  })
})
}


  modificarRegistro(form: NgForm, value){
    this.platillo = value as PlatillosModel; this.platilloService.putPlatillo(this.platillo).then(res => {
      this.obtenerPlatillos();
      form.reset();
      this.platillo = new PlatillosModel();
    })
  }

  public downloadPDF():void {
    let Informacion = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a3');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(Informacion.innerHTML,15,15,{
      'width': 500,
      'elementHandlers': handleElement
    });

    doc.save('platillos.pdf');
  }

  exportarExcel(){
    this.excelService.exportToExcel(this.platillos, 'Platillos');
  }

}

