import { BrowserModule } from '@angular/platform-browser';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  Inject,
  InjectionToken,
  Injector,
  Component,
  NgModule
} from '@angular/core';

const BUFFER_SIZE = new InjectionToken('buffer-size');

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size: Number) {}
}

class Certificate {}
class Crypto {}

class Socket {
  isOpen: boolean;
  constructor(private buffer: Buffer) {}
  open() {
    this.isOpen = true;
  }
}

class TLSConnection {
  public socket: Socket;
  public crypto: Crypto;
  public certificate: Certificate;
}

@Component({
  selector: 'app',
  template: "Open your browser's console"
})
class AppComponent {
  constructor(private connection: TLSConnection) {
    console.log(connection);
  }
}

@NgModule({
  providers: [
    {
      provide: TLSConnection,
      useFactory: function(
        socket: Socket,
        certificate: Certificate,
        crypto: Crypto
      ) {
        let connection = new TLSConnection();
        connection.certificate = certificate;
        connection.socket = socket;
        connection.crypto = crypto;
        socket.open();
        return connection;
      },
      deps: [Socket, Certificate, Crypto]
    },
    { provide: BUFFER_SIZE, useValue: 42 },
    Buffer,
    Socket,
    Certificate,
    Crypto
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
