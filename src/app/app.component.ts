import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TerminalService } from './services/terminal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private refreshRate: number = 10;
  private modules: Observable<string>[] = [];

  public terminalOutput$: Observable<string> = combineLatest(this.modules).pipe(
    map((moduleOutputs) => moduleOutputs.join('')),
    tap((terminalOutput) => this.titleService.setTitle(terminalOutput))
  );

  constructor(
    private terminalService: TerminalService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.modules.push(of('loading '));
    this.modules.push(this.terminalService.loading());
  }
}
