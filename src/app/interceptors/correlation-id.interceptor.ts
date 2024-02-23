import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CorrelationIdService } from '../services/correlation-id.service';

@Injectable()
export class CorrelationIdInterceptor implements HttpInterceptor {
  constructor(private correlationIdService: CorrelationIdService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const correlationId = this.correlationIdService.getCorrelationId();
    request = request.clone({
      setHeaders: {
        'X-Correlation-Id': correlationId
      }
    });

    const started = Date.now();
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`Request for ${request.urlWithParams} took ${elapsed} ms. Correlation ID: ${correlationId}`);
        }
      })
    );
  }
}
