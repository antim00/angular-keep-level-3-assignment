import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  notes: Array<Note>;
  errMessage: string;
  constructor(private notesService: NotesService) {
    this.note = new Note();
    this.notes = [];
  }
  ngOnInit() {
  }

  takeNotes() {
    if (this.note.title !== '' && this.note.text !== '') {
    // this.notes.push(this.note);
    this.notesService.addNote(this.note).subscribe(res => {
    // this.note = new Note();
    },

      error => {
        this.errMessage = error.message;
        // const index = this.notes.findIndex(note => note.title === this.note.title);
        // this.notes.splice(index, 1);
        }
    );
    this.note = new Note();
  } else {
    this.errMessage = 'Title and Text both are required fields';
  }
 }
}
