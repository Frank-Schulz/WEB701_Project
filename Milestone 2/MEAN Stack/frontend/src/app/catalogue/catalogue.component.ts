import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Catalogue - NFT");
  }

  ngOnInit(): void {
  }

}
