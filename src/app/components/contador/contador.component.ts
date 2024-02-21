import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {

  @Output() incrementarValor: EventEmitter<number> = new EventEmitter<number>();
  contador:number=0

  incremento(){
    this.contador++;
    this.incrementarValor.emit(this.contador);

  }

}
