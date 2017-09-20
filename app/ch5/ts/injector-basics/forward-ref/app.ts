import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  NgModule,
  Component,
  Inject,
  InjectionToken,
  Injectable,
  forwardRef
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

const BUFFER_SIZE = new InjectionToken<number>('buffer-size');

@Injectable()
class Socket {
  constructor(
    @Inject(forwardRef(() => Buffer))
    private buffer: Buffer
  ) {}
}

// undefined
// console.log(Buffer);

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size: Number) {}
}

// [Function: Buffer]
console.log(Buffer);

@Component({
  selector: 'app',
  template: "Open your browser's console"
})
class AppComponent {
  constructor(private socket: Socket) {
    console.log(socket);
  }
}

@NgModule({
  providers: [{ provide: BUFFER_SIZE, useValue: 42 }, Buffer, Socket],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
