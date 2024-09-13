import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Ajusta la ruta según tu estructura
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes.js';

//if (/* condición para producción */) {  // Cambia esto según tu lógica de producción
//  enableProdMode();
//}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot(routes)  // Configura el enrutador aquí
    ),
    provideHttpClient(withFetch()),
  ]
}).catch(err => console.error(err));
