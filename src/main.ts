import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Importe les routes définies
import { ProductService } from './app/services/product.service';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes), ProductService],
}).catch(err => console.error(err));
