import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  constructor() {}

  loading(stepDuration: number = 10): Observable<string> {
    const indicators: string[] = ['|', '/', '-', '\\', '|', '/', '-', '\\'];

    return interval(indicators.length * stepDuration).pipe(
      map((seq) => seq % indicators.length),
      map((step) => indicators[step])
    );
  }
}
