import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';
import { Usuario } from 'src/app/model/Usuario';
import { Persona } from 'src/app/model/Persona';
import { Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public usuario: Usuario;

  public persona: Persona = new Persona();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router, 
    private alertController: AlertController,
    private animationController: AnimationController) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  public ngOnInit() {
    this.persona.nombre = '';
    this.persona.apellido = '';
  }

  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.persona)) {
      Object.defineProperty(this.persona, key, { value: '' });
    }
  }

  public mostrarDatosPersona(): void {

    if (this.persona.nombre.trim() === '' && this.persona.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    const mensaje =
      '<br>Usuario: ' + this.usuario.nombreUsuario
      + '<br>Nombre: ' + this.persona.nombre
      + '<br>Apellido: ' + this.persona.apellido

    this.presentAlert('Datos personales', mensaje);
  }

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}