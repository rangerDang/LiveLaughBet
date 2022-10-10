import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';

// the second parameter 'fr' is optional
registerLocaleData(localeHe, 'he');


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { GamesComponent } from './components/games/games.component';
import { BidiModule } from '@angular/cdk/bidi';
import { MatchesComponent } from './components/matches/matches.component';
import { BetsComponent } from './components/bets/bets.component';

const appRoutes: Routes = [
  { path: 'competitions', data: { title: 'תחרויות'}, component: CompetitionsComponent },
  { path: 'competition/:competitionId/matches', data: { title: 'משחקים'}, component: MatchesComponent },
  { path: 'bets/:competitionId/:matchId', data: { title: 'משחקים'}, component: BetsComponent },
  { path: '',
    data: { title: 'תחרויות'},
    redirectTo: '/competitions',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    MatchesComponent,
    BetsComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'he' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
