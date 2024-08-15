import { Component } from '@angular/core';
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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private scriptLoader: ScriptLoaderService,public global:GlobalService) {}

  ngOnInit(): void {
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
