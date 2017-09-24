import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  NgModule,
  Component,
  Inject,
  InjectionToken,
  Injectable
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

class Http {}

class DummyHttp {}

@Injectable()
class UserService {
  constructor(private http: Http) {
    console.log(this.http instanceof DummyHttp);
  }
}

@Component({
  selector: 'app',
  template: "Open your browser's console"
})
class AppComponent {
  constructor(private service: UserService) {
    console.log(service);
  }
}

@NgModule({
  providers: [UserService, { provide: Http, useClass: DummyHttp }],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
