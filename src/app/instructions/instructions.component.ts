import { Component } from '@angular/core';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html'
})
export class InstructionsComponent {
  roomStates = {};

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomStates = this.roomService.roomStates;
  }
  
  selectedRoom = '';
  startTime = '';
  endTime = '';
  selectedDate = '';
  message = '';
  messageColor = '';
  jsonFile = '';

  addInstruction() {
    if (this.startTime === '' || this.endTime === '' || this.selectedDate === '' || this.selectedRoom === '') {
      this.message = '*Remplissez tous les champs';
      this.messageColor = 'red';
      return ;
    } else if (this.startTime >= this.endTime) {
      this.message = '*L\'heure de début doit être inférieure à l\'heure de fin';
      this.messageColor = 'red';
      return ;
    } else {
      this.roomService.roomStates[this.selectedRoom].instruction.push({
        startTime: this.startTime,
        endTime: this.endTime,
        Date: new Date(this.selectedDate),
        state: false
      });
      this.messageColor = 'green';
      this.message = 'L\'instruction : ' + this.selectedRoom + ' de ' + this.startTime + ' à ' + this.endTime + ' le ' + this.selectedDate + ' a été ajoutée';
      this.selectedRoom = '';
      this.startTime = '';
      this.endTime = '';
      this.selectedDate = '';
    }
  }

  showJsonFile() {
    this.jsonFile = JSON.stringify(this.roomService.roomStates, null, 2);
  }
}
