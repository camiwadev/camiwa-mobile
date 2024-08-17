import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  private pb: PocketBase | undefined;
  private specialistsSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  public specialists$: Observable<any[]> =
    this.specialistsSubject.asObservable();
  specialists: any[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.pb = new PocketBase('https://db.buckapi.com:8090');
      this.initializeRealtime();
    }
  }

  // Método para inicializar la conexión en tiempo real
  private initializeRealtime() {
    if (this.pb) { // Asegúrate de que `pb` esté inicializado antes de usarla
      this.pb.collection('camiwaSpecialists').subscribe('*', (event) => {
        this.handleRealtimeUpdate(event); // Maneja las actualizaciones en tiempo real
      });

      this.updateSpecialistsList();
    }
  }

  // Método para manejar actualizaciones en tiempo real
  private handleRealtimeUpdate(event: any) {
    let specialists = this.specialistsSubject.value;

    switch (event.action) {
      case 'create':
        specialists.push(event.record); // Añade un nuevo especialista
        break;
      case 'update':
        const index = specialists.findIndex(
          (s: any) => s.id === event.record.id
        );
        if (index !== -1) {
          specialists[index] = event.record; // Actualiza un especialista existente
        }
        break;
      case 'delete':
        specialists = specialists.filter((s: any) => s.id !== event.record.id); // Elimina un especialista
        break;
    }

    // Emite la nueva lista de especialistas
    this.specialistsSubject.next(specialists);
  }

  // Método para obtener y actualizar la lista de especialistas
  private updateSpecialistsList() {
    if (!this.pb) {
        console.error('PocketBase no está inicializado');
        return; // O lanzar un error: throw new Error('PocketBase no está inicializado');
    }

    this.pb
      .collection('camiwaSpecialists')
      .getFullList(200 /* page size */, {
        filter: 'status="approved"', // Filtra solo los especialistas aprobados
      })
      .then((specialists: any[]) => {
        this.specialistsSubject.next(specialists); // Actualiza el observable con la nueva lista
      })
      .catch((error) => {
        console.error('Error al obtener la lista de especialistas:', error);
      });
}

  // Método para obtener especialistas como Observable
  public getSpecialists(): Observable<any[]> {
    return this.specialists$;
  }
}
