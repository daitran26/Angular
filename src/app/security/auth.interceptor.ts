import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
const TOKEN_AUTHORITY = 'Authorization'
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    let authRequest = request;
    if(token) {
      authRequest = request.clone({headers: request.headers.set(TOKEN_AUTHORITY,'Bearer '+token)});
      return next.handle(authRequest);
    }
    else{
      return next.handle(request);
    }
  }
}
export const httpInterceptorProvider =[
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]
