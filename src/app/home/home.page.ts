import { Component, OnInit,OnDestroy,HostListener  } from '@angular/core';
import { MusicService } from './../services/music.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  artistsJson:any;
  artists:any;
  slides=[
    {
      "titulo":"Titulo 1",
      "imagen":"assets/images/slide1.png",
      "descripcion":"Descripcion 1"
    },
    {
      "titulo":"Titulo 2",
      "imagen":"assets/images/slide2.png",
      "descripcion":"Descripcion 2"
    },
    {
      "titulo":"Titulo 3",
      "imagen":"assets/images/slide3.png",
      "descripcion":"Descripcion 3"
    },
    {
      "titulo":"Titulo 4",
      "imagen":"assets/images/slide4.png",
      "descripcion":"Descripcion 4"
    }
  ]
  constructor(private musicService:MusicService, private storage:Storage) {}
  
  swiperSlideChanged(e:any){
    console.log('changed',e);
  }

  ngOnInit(){
    //this.artistsJson = this.musicService.getArtistJson().artists;
    //console.log(this.artistsJson);
    this.musicService.getArtinsts().subscribe((data:any)=>{
      this.artists=data;
      console.log(this.artists);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.storage.remove("isUserLoggedIn");
  }

}
