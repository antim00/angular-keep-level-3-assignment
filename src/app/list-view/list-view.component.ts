import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit{

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  constructor(private noteService : NotesService){
    this.notStartedNotes = [];
    this.completedNotes = [];
    this.startedNotes = [];
  }
  ngOnInit(){
    // Fetch Alle the notes
    this.noteService.getNotes().subscribe(res=>{
      this.filterNotes(res);
    }, err=>{});
  }
  filterNotes(data: Array<Note>){
    this.notStartedNotes = data.filter((note) => note.state ==='not-started');
    this.startedNotes = data.filter((note) => note.state ==='started');
    this.completedNotes = data.filter((note) => note.state ==='completed');
  }
}
