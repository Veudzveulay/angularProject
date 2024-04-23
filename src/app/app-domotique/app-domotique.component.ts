import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-domotique',
  templateUrl: './app-domotique.component.html',
  styleUrl: './app-domotique.css'
})
export class AppDomotiqueComponent {

  currentDateTime: Date;

  buanderieButtonClass: string;

  salleDeBainButtonClass: string;

  salleMangerButtonClass: string;

  garageButtonClass: string;

  pacButtonClass: string;

  piscineButtonClass: string;


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
    
    if (currentHour >= 23 || currentHour < 7 ) {
      this.buanderieButtonClass = 'btn-off'; // Éteindre la buanderie
    } else {
      this.buanderieButtonClass = 'btn-on'; // Allumer la buanderie
    }

    if (currentHour >= 23 || currentHour < 7 ) {
      this.salleDeBainButtonClass = 'btn-off'; // Éteindre la salle de bain
    } else {
      this.salleDeBainButtonClass = 'btn-on'; // Allumer la salle de bain
    }
  }
}
