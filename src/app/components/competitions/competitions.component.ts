import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatchId } from '../matches/matches.component';

export interface Competition { name: string; description: string; startDate: Date; matches: string[]; }
export interface CompetitionId extends Competition { id: string; }

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  private competitionsCollection: AngularFirestoreCollection<Competition>;
  public competitions: Observable<CompetitionId[]>;
  public title = 'aaa';

  constructor(private readonly afs: AngularFirestore) {
    this.competitionsCollection = afs.collection<Competition>('competitions');
    this.competitions = this.competitionsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Competition;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  ngOnInit() {
  }

}
