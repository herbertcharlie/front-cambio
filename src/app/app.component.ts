import { TipoCambioService } from './services/tipo-cambio.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  public tipoCambio: Array<any> = [];
  public valorTC;
  public monto = 0;
  public monedaOrigenId = 1;
  public monedaDestinoId = 2;
  public montoTC;
  public resultado;
  public errorMessage = "";

  constructor(
    private tipoCambioService: TipoCambioService
    ) {
      this.tipoCambioService.getTipoCambio().subscribe((resp: any) =>{
        this.tipoCambio = resp        
        this.valorTC = this.tipoCambio[0].tipoCambioActual;
        //console.log(this.tipoCambio, resp, this.valorTC);
      })
      
    }

    getMonto(){
      console.log(this.monto);
    }
    getMonedaOrigenId(){
      console.log(this.monedaOrigenId);
    }
    getMonedaDestinoId(){
      console.log(this.monedaDestinoId);
    }

    getOperacionTipoCambio(){
      console.log(this.monedaDestinoId);
      if (this.monto<=0) {
        alert("Monto debe ser mayor a 0");
        return;
      }

      if (this.monedaOrigenId==this.monedaDestinoId) {
        alert("Moeda Origen no puede ser igual a moneda destino");
        return;
      }

      let data={
        monto:this.monto,
        monedaOrigenId:this.monedaOrigenId,
        monedaDestinoId:this.monedaDestinoId
     }

      this.tipoCambioService.getValorTipoCambio(data).subscribe((resp: any) =>{
        this.tipoCambio = resp
        //this.valorTC = this.tipoCambio[0].tipoCambioActual;
        //console.log(resp, resp.tipoCambioOperacion);    
        this.montoTC = resp.montoDestino;   
      }, error => {
        this.errorMessage = error
        console.log('error controlado', error); 
      })
    }
}
