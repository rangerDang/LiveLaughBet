import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

export interface Bet { opponent_a: number; opponent_b: number; }
export interface BetId extends Bet { id: string; }

export interface User { name: string; nickname: string; }

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  public bets: Bet[];
  public usersDictionary = <User>{};

  constructor(private route: ActivatedRoute, private readonly afs: AngularFirestore, private afAuth: AngularFireAuth) { 
    route.paramMap.subscribe(params => {
      const competitionId = params.get('competitionId');
      const matchId = params.get('matchId');
      const userId = afAuth.auth.currentUser.uid;
      afs.collection<User>(`users`).snapshotChanges().subscribe(users => {
        if (users) {
          users.forEach(user => this.usersDictionary[user.payload.doc.id] = user.payload.doc.data() as User );
        }
      });
      afs.collection<Bet>(`bets/${competitionId}/matches/${matchId}/match_bets`).valueChanges().subscribe(bets => {
          this.bets = bets;
      });
  });
  }

  ngOnInit() {
    
  }

}
