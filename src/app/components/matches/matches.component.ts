import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Competition } from '../competitions/competitions.component';
import { promise } from 'protractor';

export interface Match { opponent_a: string; opponent_b: string; location: string; }
export interface MatchId extends Match { id: string; }

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  private matchesCollection: AngularFirestoreCollection<Match>;
  public competitionId: string;
  public matches: { [id: string] : MatchId; } = {};

  constructor(private route: ActivatedRoute, private readonly afs: AngularFirestore) {
    route.paramMap.subscribe(params => {
        this.competitionId = params.get('competitionId');
        const competitionDoc = afs.doc<Competition>('competitions/' + this.competitionId);
        competitionDoc.valueChanges().subscribe(competition => {
          competition.matches.forEach(matchId => {
            const matchDoc = afs.doc<Match>('matches/' + matchId);
             matchDoc.snapshotChanges().subscribe(matchSnap => {
               const matchId = matchSnap.payload.id;
               const match = matchSnap.payload.data() as MatchId;
               match.id = matchId;
               this.matches[match.id] = match;
             });
          });
        });
    });
  }

  ngOnInit() {
  }

}
