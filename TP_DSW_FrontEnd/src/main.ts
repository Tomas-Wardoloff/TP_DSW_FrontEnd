//import { enableProdMode } from '@angular/core';
//import { provideHttpClient, withFetch } from '@angular/common/http';
//if (/* condición para producción */) {  // Cambia esto según tu lógica de producción
//  enableProdMode();
//}

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Asegúrate de que la ruta al archivo sea correcta


bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
