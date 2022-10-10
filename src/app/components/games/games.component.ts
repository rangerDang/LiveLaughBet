import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Game { team_a: string; team_b: string; }
export interface GameId extends Game { id: string; }

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  private gamesCollection: AngularFirestoreCollection<Game>;
  private id: string;
  public games: Observable<GameId[]>;

  constructor(private route: ActivatedRoute, private readonly afs: AngularFirestore) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.gamesCollection = afs.collection<Game>('competitions/' + this.id + '/games');
    this.games = this.gamesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Game;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  ngOnInit() {
  }

}
