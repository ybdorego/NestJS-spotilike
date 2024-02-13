import { Component, inject } from '@angular/core';
import { Album } from '../../../_interfaces/album';
import { AlbumService } from '../../../_services/album.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {

  // http = inject(HttpClient)

  // Album: Album = [];

  // ngOnInit() {
  // }



}
