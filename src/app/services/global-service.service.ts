import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  _activateRoute = 'home';
  constructor() {}
  get activateRoute(): string {
    return localStorage.getItem('activateRoute') || this._activateRoute;
  }
  setRoute(route: string) {
    this._activateRoute = route;
    localStorage.setItem('activateRoute', route);
  }
}
