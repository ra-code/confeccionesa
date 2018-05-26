import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { AppGlobals } from '../../app.globals';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';
import {Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  categories: any;
  items: any;
  private carouselToken: string;

  public carouselTileItems: Array<any>;
  public carouselTile: NguCarousel;

  constructor(public itemService: ItemsService, private _global: AppGlobals, private carousel: NguCarouselService, private router:Router) {}
  //Enviando id a la proxima pagina por url
  editElement(id){
      this.router.navigate(['/art/',id]);
    }
  public carouselTileLoad(evt: any) {

    const len = this.carouselTileItems.length
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }

  }
  initDataFn(key: NguCarouselStore) {
    this.carouselToken = key.token;
  }

  resetFn() {
    this.carousel.reset(this.carouselToken);
  }

  moveToSlide() {
    this.carousel.moveToSlide(this.carouselToken, 2, false);
  }
  ngOnInit() {
    this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.itemService.showAll()
      .subscribe(data => {
        this.items = data;
        console.log(this.items)
      })
    this.itemService.showCategories()
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories)
      })


    this.carouselTile = {
      grid: { xs: 1, sm: 3, md: 4, lg: 4, all: 0 },
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }


}
