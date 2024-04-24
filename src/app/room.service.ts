import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomStates: { [key: string]: { 
    name: string, 
    state: boolean, 
    previousState: boolean, 
    forced: boolean, 
    startTime: string, 
    endTime: string, 
    reversed: boolean,
    instruction: Array<{startTime: string, endTime: string, Date: Date, state: boolean}>
  } } = { 
    buanderie: { 
      name: "Buanderie", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:30', 
      endTime: '10:30', 
      reversed: false,
      instruction: []
    }, 
    salleDeBain: { 
      name: "Salle de bain", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:30', 
      endTime: '10:30', 
      reversed: false,
      instruction: []
    }, 
    salleManger: { 
      name: "Salle a manger", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:30', 
      endTime: '10:30', 
      reversed: false,
      instruction: []
    }, 
    garage: { 
      name: "Garage", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:00', 
      endTime: '09:00', 
      reversed: false,
      instruction: []
    }, 
    pac: { 
      name: "P.A.C", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:00', 
      endTime: '23:00', 
      reversed: true,
      instruction: []
    }, 
    piscine: { 
      name: "Piscine", 
      state: true, 
      previousState: false, 
      forced: false, 
      startTime: '07:00', 
      endTime: '23:00', 
      reversed: true,
      instruction: []
    } 
  };
  constructor() { }
}
