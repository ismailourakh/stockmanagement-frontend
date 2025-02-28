import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // 🔥 Ajoute ceci !

@Component({
  selector: 'app-sidebar',
  standalone: true, // 🔥 Vérifie que c'est un Standalone Component
  imports: [CommonModule, RouterModule], // 🔥 Ajoute ici pour que *ngIf fonctionne
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;

  testClick() {
    console.log("Le lien Stock a été cliqué !");
  }
  
}
