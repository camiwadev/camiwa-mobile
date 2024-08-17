import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID,Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ScriptLoaderService } from './services/script-loader.service';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HeaderComponent } from "./components/ui/header/header.component";
import { GlobalService } from './services/global-service.service';
import { BookingComponent } from './components/booking/booking.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ChatComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent,
    BookingComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor( @Inject(PLATFORM_ID) private platformId: Object,
  private scriptLoader: ScriptLoaderService,
  public global: GlobalService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scriptLoader
        .loadScripts([
          'assets/js/bootstrap.min.js',
          'assets/js/jquery.min.js',
          'assets/js/swiper-bundle.min.js',
          'assets/js/carousel.js',
          'assets/js/init.js',
          'assets/js/main.js',
          'assets/js/multiple-modal.js',
        ])
        .then((data) => {
          console.log('Todos los scripts se han cargado correctamente', data);
        })
        .catch((error) => console.error('Error al cargar los scripts', error));
    }
  }
}
