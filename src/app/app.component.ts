import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MensajeService, Transaccion_eve } from './mensaje.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, InputTextModule, FormsModule, MessageModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto1';

  //SE LLAMA A LA CLASE DE JAVA-ECLIPSE
  private mensajeDelServidor = inject(MensajeService);  //CLASE DE JAVA CON EL MENSAJE QUE RECIBE

  //variables
  textoIngresado: string = '';
  transaccionExitosa: boolean = false;
  mensajeaMostrar: string = '';

  //métodos
  procesarTransaccion() {
    if(this.textoIngresado !==''){
      //this.mensajeaMostrar = this.textoIngresado;
      //this.textoIngresado;
      this.mensajeDelServidor.enviarMensaje(this.textoIngresado).subscribe({  //LLAMA AL MÉTODO DE LA CLASE MensajeService EN JAVA
        next: (respuesta) => {
        this.transaccionExitosa = true;
        this.mensajeaMostrar=""+respuesta.resultado; 
        },
        error: (err) => {
         console.error('Error al conectar con WildFly:', err); 
        }
      });
    }
  }

  // Objeto enlazado al formulario - OBJETO transaccionDatos
  transaccionDatos: Transaccion_eve = {
    nombre:'',
    cedula:'',
    monto: 0
  };
  conjuntoMostrar: string = '';
  transaccionExitosaConjunto: boolean = false;

  //Valida los datos en pantalla, envia los datos al sw y recibe una respuesta de vuelta.
  procesarTransaccionDeDatos(){
    if (this.transaccionDatos.nombre !== '' && this.transaccionDatos.cedula !== '' && this.transaccionDatos.monto > 0){
      this.mensajeDelServidor.enviarConjuntodeDatosDA(this.transaccionDatos).subscribe({  //ESTA LÍNEA PASA A WS-JAVA //VAMOS A LA CLASE MensajeService mediante la variable mensajeDelServidor / VAMOS AL METODO CORRESPONDIENTE REALIZADO EN LA CLASE Y PASAMOS LOS DATOS ENLAZADOS AL FORMULARIO EN LA VARIABLE transaccionDatos DE TIPO Transaccion_eve
        next:(conjuntodatos2) => {    //UNA VEZ JAVA RESPONDA CON OK - SE ACTIVA ESTA LINEA  //Desempaquetado: Angular recibe ese JSON ya convertido en un objeto dentro de la variable conjuntodatos2.
          this.transaccionExitosaConjunto = true;
          this.conjuntoMostrar = ""+conjuntodatos2.resultado2;
        },
        error: (err) => {
          this.transaccionExitosaConjunto = false;
          console.error('Error al conectar con WildFly: e', err);
        }
      });
    }
  }
}

//if(this.textoIngresado.trim() !==''){

