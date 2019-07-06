import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../../../app/note';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  noteId : number;
  constructor(public dialog : MatDialog,
              public activatedRoute : ActivatedRoute) {
              const noteId= this.activatedRoute.snapshot.paramMap.get('noteId');
              this.dialog.open(EditNoteViewComponent, {
                data : noteId
              })
  }
  ngOnInit() {}
}
