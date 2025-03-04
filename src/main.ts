import { bootstrapApplication } from '@angular/platform-browser'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ProductService } from './app/services/product.service';
import { authInterceptor } from './app/services/auth.interceptor'; // ✅ Function-based interceptor

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), // ✅ Now using function-based interceptor
    provideRouter(routes),
    ProductService
  ],
}).catch(err => console.error(err));
