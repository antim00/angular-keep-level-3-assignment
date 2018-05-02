import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  fetchNotesFromServer() {

  }

  getNotes(): BehaviorSubject<Array<Note>> {

  }

  addNote(note: Note): Observable<Note> {

  }

  editNote(note: Note): Observable<Note> {

  }

  getNoteById(noteId): Note {

  }
}
