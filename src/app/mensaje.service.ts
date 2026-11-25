import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//EL MENSAJERO HACIA JAVA
//se encarga de la lógica de datos y de comunicarse con servidores externos

//Importar la estructura idéntica a Transaccion_eve.java
export interface Transaccion_eve{  //porque conoce la clase de java Transaccion_eve?
  nombre: string;
  cedula: string;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private http = inject(HttpClient);
  
  // URL del proyecto desplegado en WildFly
  private apiUrl = 'http://localhost:8083/ejemplo_ws_eve/api/mensaje';

  enviarMensaje(texto: string): Observable<any> {
    const cuerpo = { mensaje: texto };  //Lo escribe en formato JSON LO QUE SE INGRESÓ EN PANTALLA
    return this.http.post<any>(this.apiUrl, cuerpo);
  }

 //private apiUrl2 = 'http://localhost:8083/ejemplo_ws_eve/api/mensaje';
  // Ahora recibe el objeto completo
  enviarConjuntodeDatosDA(conjunto: Transaccion_eve): Observable<any> {
    //const conjuntodedatosA = {conjunto1: conjunto };
    return this.http.post<any>(this.apiUrl + '/conjunto', conjunto);  //ENVIA LOS DATOS, OBJETO AL SW - JAVA
    //Al detectar que le pasas un objeto TypeScript, HttpClient de Angular lo convierte automáticamente en texto JSON
  }
}
