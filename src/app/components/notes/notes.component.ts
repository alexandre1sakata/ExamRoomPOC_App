import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    public notesService: NotesService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getAll()
      .subscribe({
        next: (data) => {
          this.notes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  deleteNote(id: number) {
    swal.fire({
      title: 'Do you really to delete this note?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success'
        )
        this.notesService.delete(id).subscribe((data) => {
          this.ngOnInit();
        });
      }
    })
  }
}