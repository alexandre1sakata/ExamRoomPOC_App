import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs/internal/Observable';

const baseUrl = 'http://localhost:5000/api/notes/';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(baseUrl);
  }

  getOneById(id: number): Observable<Note> {
    return this.http.get<Note>(baseUrl + id);
  }

  create(note: Note): Observable<any> {
    return this.http.post<Note>(baseUrl, JSON.stringify(note), this.httpOptions);
  }

  update(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(baseUrl + id, JSON.stringify(note), this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Note>(baseUrl + id);
  }
}
