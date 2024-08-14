import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import PocketBase from 'pocketbase';


@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  private pb: PocketBase;
  private specialistsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public specialists$: Observable<any[]> = this.specialistsSubject.asObservable();
  specialists: any[] = [];
  constructor() {
    // Inicializa PocketBase con la URL de tu backend
    this.pb = new PocketBase('https://db.buckapi.com:8090');
    
    // Inicia la suscripción a tiempo real

     this.getSpecialists().subscribe((specialists) => {
      this.specialists = specialists;
    });

    this.initializeRealtime();
  }

  // Método para inicializar la conexión en tiempo real
  private initializeRealtime() {
    // Suscríbete a los cambios en la colección 'camiwaSpecialists'
    this.pb.collection('camiwaSpecialists').subscribe('*', (event) => {
      this.handleRealtimeUpdate(event); // Maneja las actualizaciones en tiempo real
    });

    // Actualiza la lista inicial de especialistas
    this.updateSpecialistsList();
  }

  // Método para manejar actualizaciones en tiempo real
  private handleRealtimeUpdate(event: any) {
    let specialists = this.specialistsSubject.value;

    switch (event.action) {
      case 'create':
        specialists.push(event.record); // Añade un nuevo especialista
        break;
      case 'update':
        const index = specialists.findIndex((s: any) => s.id === event.record.id);
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
    this.pb.collection('camiwaSpecialists').getFullList(200 /* page size */, {
      filter: 'status="approved"', // Filtra solo los especialistas aprobados
    }).then((specialists: any[]) => {
      this.specialistsSubject.next(specialists); // Actualiza el observable con la nueva lista
    });
  }

  // Método para obtener especialistas como Observable
  public getSpecialists(): Observable<any[]> {
    return this.specialists$;
  }
}
