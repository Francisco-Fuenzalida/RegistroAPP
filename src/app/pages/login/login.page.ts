import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController, Animation, AnimationController } from '@ionic/angular';
import { type } from 'os';
import { Usuario } from 'src/app/model/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {



  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController,
    private animationCtrl: AnimationController, public alertController: AlertController) {

    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }
  public ngOnInit(): void {

    this.usuario.nombreUsuario = 'Daniel';
    this.usuario.password = '1234';
    this.ingresar();
    const title = this.animationCtrl.create()
      .addElement(document.querySelector('.title'))
      .duration(500)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .play();

    const loginCard = this.animationCtrl.create()
      .addElement(document.querySelector('.login-card'))
      .duration(600)
      .fromTo('opacity', '0.1', '1')
      .play();
  }

  public ingresar(): void {

    if (!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Ingreso Exitoso!');


    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }

  public restablecer(): void {

    const navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['recover-password'], navigationExtras);
  }


  public validarUsuario(usuario: Usuario): boolean {

    const mensajeError = usuario.validarUsuario();

    if (mensajeError) {
      this.mostrarAlerta(mensajeError);
      return false;
    }

    return true;
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      position: "top"
    });
    toast.present();
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  
}