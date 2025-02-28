import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { StockComponent } from './components/stock/stock.component';
import { CommandeComponent } from './components/commande/commande.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { StatistiqueComponent } from './components/statistique/statistique.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'stock', component: StockComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'statistique', component: StatistiqueComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
