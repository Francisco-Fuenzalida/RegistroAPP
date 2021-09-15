import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';
import { Usuario } from 'src/app/model/Usuario';
import { Animation, AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public usuario: Usuario;


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router, 
    private alertController: AlertController,
    private animationCtrl: AnimationController) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public ngOnInit() {

    const footer = this.animationCtrl.create()
      .addElement(document.querySelector('.footer'))
      .duration(1000)
      .fromTo('transform', 'translateX(-300px)', 'translateX(0px)')
      .play();

    const card = this.animationCtrl.create()
      .addElement(document.querySelector('.card'))
      .addElement(document.querySelector('.bienvenido'))
      .duration(600)
      .fromTo('opacity', '0.1', '1')
      .play();

  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  public scan(): void {

    const navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['scan-qr'], navigationExtras);
  }

}