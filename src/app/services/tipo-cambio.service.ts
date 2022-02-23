import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'
import {throwError as observableThrowError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {
  _url = 'http://localhost/api/TipoCambio';
  _url2 = 'http://localhost/api/OperacionTipoCambio';
  constructor(
    private http: HttpClient
  ) { 
    console.log('Servicio Tipo Cambio')
  }
  getTipoCambio(){
    let head = new HttpHeaders()
    .set('Type-content', 'aplication/json')

    return this.http.get(this._url, {
      headers : head});
  }

  getValorTipoCambio(data){
    let head = new HttpHeaders()
    .set('Type-content', 'aplication/json')
    
    let params1 = new HttpParams({fromObject:data});

    return this.http
      .get(this._url2, {params : params1})
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message);
  }
}
