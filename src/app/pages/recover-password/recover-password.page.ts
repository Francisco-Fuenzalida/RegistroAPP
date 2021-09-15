import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, Animation, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  

  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController, private animationCtrl: AnimationController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

  ngOnInit() {
    const recover = this.animationCtrl.create()
      .addElement(document.querySelector('.recover'))
      .addElement(document.querySelector('#boton'))
      .duration(500)
      .fromTo('transform', 'translatey(200px)', 'translateX(0px)')
      .play();

    const title = this.animationCtrl.create()
    .addElement(document.querySelector('.title'))
    .duration(1000)
    .fromTo('opacity', '0.1', '1')
    .play();
  }

  public inicio(): void {

    const navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['login'], navigationExtras);
  }

}