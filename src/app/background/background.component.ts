import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../global/global.service";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  table: number[][] = [];

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.table = this.globalService.table;
  }

}
