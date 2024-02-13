import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenService } from './_services/token.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { tokenInterceptor } from './_helpers/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    TokenService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(withInterceptors([tokenInterceptor]))]
};
