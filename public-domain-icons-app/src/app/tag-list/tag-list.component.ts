import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BusinessService } from '../services/business.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  @Input() tags: string[];
  @Input() isAdmin: boolean;
  @Input() id: string;

  constructor(private business: BusinessService, private renderer2: Renderer2) { }

  ngOnInit() {
  }

  enterTag(tag: string) {
    this.business.addTag(this.id, tag);
  }

  select() {
    this.renderer2.selectRootElement('#input'+this.id).focus();
  }
}
