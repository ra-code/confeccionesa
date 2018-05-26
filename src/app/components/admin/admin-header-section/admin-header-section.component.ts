import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-header-section',
  templateUrl: './admin-header-section.component.html',
  styleUrls: ['./admin-header-section.component.css']
})
export class AdminHeaderSectionComponent implements OnInit {
  @Input() public pageTitle: string=null;
  @Input() public pageSubtitle: string=null;

  constructor() { }

  ngOnInit() {
  }

}
