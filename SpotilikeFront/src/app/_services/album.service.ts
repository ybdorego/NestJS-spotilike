import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../_interfaces/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  url = 'http://localhost:3000/albums';

  constructor(private http:  HttpClient) { }

  getAlbums(): Observable<Album> {
    return this.http.get<Album>(this.url);
  }







}
