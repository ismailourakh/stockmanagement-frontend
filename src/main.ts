import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ProductService } from './app/services/product.service';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), ProductService],
}).catch(err => console.error(err));
