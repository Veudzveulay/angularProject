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

  buanderieButtonClass: string;

  salleDeBainButtonClass: string;

  salleMangerButtonClass: string;

  garageButtonClass: string;

  pacButtonClass: string;

  piscineButtonClass: string;

  eventLog: EventLog[] = [];

  // Définition des états explicites
  stateLabels: { [key: string]: string } = {
    'btn-off': 'Éteint',
    'btn-on': 'Allumé',
    // Ajoutez d'autres états explicites au besoin
  };

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
    const previousState = {
      buanderie: this.buanderieButtonClass,
      salleManger: this.salleMangerButtonClass,
      salleDeBain: this.salleDeBainButtonClass,
      garage: this.garageButtonClass,
      pac: this.pacButtonClass,
      piscine: this.piscineButtonClass
    };

    // Logique pour la buanderie
    if (currentHour >= 23 || currentHour < 7) {
      this.buanderieButtonClass = 'btn-off';
    } else {
      this.buanderieButtonClass = 'btn-on';
    }

    // Logique pour la salle à manger
    if (currentHour >= 23 || currentHour < 7) {
      this.salleMangerButtonClass = 'btn-off';
    } else {
      this.salleMangerButtonClass = 'btn-on';
    }

    // Logique pour la salle de bain
    if (currentHour >= 23 || currentHour < 7) {
      this.salleDeBainButtonClass = 'btn-off';
    } else {
      this.salleDeBainButtonClass = 'btn-on';
    }

    // Logique pour le garage
    if (currentHour === 7 || (currentHour > 7 && currentHour < 9)) {
      this.garageButtonClass = 'btn-on';
    } else {
      this.garageButtonClass = 'btn-off';
    }

    // Logique pour la PAC
    if (currentHour >= 23 || currentHour < 7) {
      this.pacButtonClass = 'btn-off';
    } else {
      this.pacButtonClass = 'btn-on';
    }

    // Logique pour la piscine
    if (currentHour >= 23) {
      this.piscineButtonClass = 'btn-off';
    } else {
      this.piscineButtonClass = 'btn-on';
    }

    this.checkStateChanges(previousState);

  }

  checkStateChanges(previousState: any): void {
    // Vérifiez les changements d'état pour chaque pièce
    if (previousState.buanderie !== this.buanderieButtonClass) {
      this.logEvent('Buanderie', this.buanderieButtonClass);
    }
    if (previousState.salleManger !== this.salleMangerButtonClass) {
      this.logEvent('Buanderie', this.buanderieButtonClass);
    }
    if (previousState.salleDeBain !== this.salleDeBainButtonClass) {
      this.logEvent('Salle de bain', this.salleDeBainButtonClass);
    }
    if (previousState.garage !== this.garageButtonClass) {
      this.logEvent('Garage', this.garageButtonClass);
    }
    if (previousState.pac !== this.pacButtonClass) {
      this.logEvent('PAC', this.pacButtonClass);
    }
    if (previousState.piscine !== this.piscineButtonClass) {
      this.logEvent('Piscine', this.piscineButtonClass);
    }
  }

  logEvent(room: string, state: string): void {
    const time = this.currentDateTime.toLocaleTimeString();
    // Utilisation de l'état explicite
    const event: EventLog = {
      time: time,
      room: room,
      state: this.stateLabels[state] || state  // Utilisation de l'état explicite s'il est défini, sinon utilisez l'état brut
    };
    this.eventLog.push(event);
  }
}
