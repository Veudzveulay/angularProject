import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';

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

  roomStates = {};

  constructor(private roomService: RoomService) { }

  eventLog: EventLog[] = [];

  ngOnInit(): void {
    this.roomStates = this.roomService.roomStates;
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
    let instruction_bool = false;

    // Sauvegarde de l'état précédent
    Object.keys(this.roomStates).forEach((room) => {
      this.roomStates[room].previousState = this.roomStates[room].state;
      const roomState = this.roomStates[room];

      if (roomState.instruction.length > 0 && !roomState.forced) {
        roomState.instruction.forEach((instruction) => {
          const startHour = parseInt(instruction.startTime.split(':')[0]);
          const endHour = parseInt(instruction.endTime.split(':')[0]);
          const instructionDate = instruction.Date;

          if (this.currentDateTime.getDate() === instructionDate.getDate() && this.currentDateTime.getMonth() === instructionDate.getMonth() && this.currentDateTime.getFullYear() === instructionDate.getFullYear()) {
            if (currentHour >= startHour && instruction.state === false) {
                roomState.state = true;
                instruction.state = true;
                instruction_bool = true;
            } else if (currentHour >= endHour && instruction.state === true) {
                roomState.state = false;
                instruction_bool = true;
            }
          }
        });
      }
      else if (roomState.startTime && roomState.endTime && !roomState.forced) {
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
        this.logEvent(room, roomState.state, false, instruction_bool);
      }
    });
  }

  logEvent(room: string, state: boolean, forced: boolean, instruction: boolean): void {
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

    if (instruction) {
      eventState += ' (instruction)';
    }

    const event: EventLog = {
      time: time,
      room: this.roomStates[room].name,
      state: eventState
    };
    this.eventLog.push(event);
  }

  forced(room: string): void {
    // Forcer l'état de la pièce spécifiée
    if (this.roomStates[room].forced) {
      this.roomStates[room].forced = !this.roomStates[room].forced;
    } else {
      this.roomStates[room].state = !this.roomStates[room].state;
      this.roomStates[room].forced = !this.roomStates[room].forced;
      this.logEvent(room, this.roomStates[room].state, true, false);
    }
  }
}
