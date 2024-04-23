import { Component, OnInit } from '@angular/core';

// Définition de l'interface EventLog
interface EventLog {
  time: string;
  room: string;
  state: string;
}

@Component({
  selector: 'app-app-domotique',
  templateUrl: './app-domotique.component.html',
  styleUrl: './app-domotique.css'
})
export class AppDomotiqueComponent {

  currentDateTime: Date;

  roomStates: { [key: string]: { 
    name: string, 
    state: boolean, 
    previousState: boolean, 
    forced: boolean, 
    startTime: string, 
    endTime: string, 
    reversed: boolean 
  } } = {
    buanderie: { 
      name: "Buanderie", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:30', 
      endTime: '10:30', 
      reversed: false 
    },
    salleDeBain: { 
      name: "Salle de bain", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:30', 
      endTime: '10:30', 
      reversed: false 
    },
    salleManger: { 
      name: "Salle a manger", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:30', 
      endTime: '10:30', 
      reversed: false 
    },
    garage: { 
      name: "Garage", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:00', 
      endTime: '09:00', 
      reversed: false 
    },
    pac: { 
      name: "P.A.C", 
      state: false, 
      previousState: false, 
      forced: false, 
      startTime: '07:00', 
      endTime: '23:00', 
      reversed: true 
    },
    piscine: { 
      name: "Piscine", 
      state: true, 
      previousState: false, 
      forced: false, 
      startTime: '07:00', 
      endTime: '23:00', 
      reversed: true 
    }
  };
  eventLog: EventLog[] = [];

  constructor() { }

  ngOnInit(): void {
    this.updateDateTime();
    this.updateRoomStates(); // Appeler la méthode pour mettre à jour l'état des pièces en fonction de l'heure
    setInterval(() => {
      this.updateDateTime();
      this.updateRoomStates(); // Appeler la méthode à intervalles réguliers pour mettre à jour l'état des pièces
    }, 1000);
  }

  updateDateTime(): void {
    if (!this.currentDateTime) {
      this.currentDateTime = new Date();
    } else {
      this.currentDateTime = new Date(this.currentDateTime.getTime() + (1000)); // Ajoute une seconde à l'heure actuelle
    }
  }

  add30Minutes(): void {
    if (!this.currentDateTime) {
      this.currentDateTime = new Date();
    } else {
      this.currentDateTime = new Date(this.currentDateTime.getTime() + (30 * 60000)); // Ajoute 30 minutes à l'heure actuelle
    }
    this.updateRoomStates(); // Appeler la méthode pour mettre à jour l'état des pièces en fonction de l'heure
  }

  updateRoomStates(): void {
    const currentHour = this.currentDateTime.getHours();

    // Sauvegarde de l'état précédent
    Object.keys(this.roomStates).forEach((room) => {
      this.roomStates[room].previousState = this.roomStates[room].state;
      const roomState = this.roomStates[room];

      if (roomState.startTime && roomState.endTime && !roomState.forced) {
        const startHour = parseInt(roomState.startTime.split(':')[0]);
        const endHour = parseInt(roomState.endTime.split(':')[0]);

        if (roomState.reversed) {
          if (currentHour >= startHour && currentHour < endHour) {
            // Eteindre la pièce si l'heure actuelle est comprise entre l'heure de début et l'heure de fin
            roomState.state = false;
          } 
        } else {
          if (currentHour >= startHour && currentHour < endHour) {
            // Allumer la pièce si l'heure actuelle est comprise entre l'heure de début et l'heure de fin
            roomState.state = true;
          } else {
            // Eteindre la pièce si l'heure actuelle n'est pas comprise entre l'heure de début et l'heure de fin
            roomState.state = false;
          }
        }
      }
      if (roomState.previousState !== roomState.state) {
        this.logEvent(room, roomState.state, false);
      }
    });

    console.log(this.roomStates);
  }

  logEvent(room: string, state: boolean, forced: boolean): void {
    const time = this.currentDateTime.toLocaleTimeString();
    let eventState: string;

    if (state === true) {
      eventState = 'allumée';
    } else {
      eventState = 'éteinte';
    }

    if (forced) {
      eventState += ' (forcée)';
    }

    const event: EventLog = {
      time: time,
      room: room,
      state: eventState
    };
    this.eventLog.push(event);
  }

  forced(room: string): void {
    // Forcer l'état de la pièce spécifiée
    if (this.roomStates[room].forced) {
      this.roomStates[room].state = false;
    } else {
      this.roomStates[room].state = true;
    }
    this.roomStates[room].forced = !this.roomStates[room].forced;
    this.logEvent(room, this.roomStates[room].state, true);
  }
}
