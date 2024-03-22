import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css'],
})
export class CalificacionComponent implements OnInit {
  @Input() calificacion: number = 0;
  @Output() accion = new EventEmitter<any>();
  lista: Array<any> = [];
  constructor() {}

  ngOnInit() {
    for(let i=0; i<this.calificacion; i++){
      this.lista.push(i);
    }
  }

  select(){
    this.accion.emit(this.calificacion);
  }
}
