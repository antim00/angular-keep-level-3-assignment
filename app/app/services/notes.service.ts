import { Injectable, OnInit } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs/Observable';

@Injectable()
export class NotesService implements OnInit {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
      this.notes = [];
      this.notesSubject = new BehaviorSubject([]);
    }
    ngOnInit() {}
  fetchNotesFromServer() {
    this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers : new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(res => {
        this.notes = res;
        this.notesSubject.next(this.notes);
    }, (err: any) => {
      this.notesSubject.error(err);
    });
  }
  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }
addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers : new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
 }).do(addedNote => {
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
      });
  }
  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers : new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(editedNote => {
       const foundNote = this.notes.find(enote  => enote.id === editedNote.id);
       Object.assign(foundNote, editedNote);
       this.notesSubject.next(this.notes);
     });
  }
  getNoteById(noteById): Note {
    return this.notes.find(note => note.id == noteById);
  }
}
