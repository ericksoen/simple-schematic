import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<%= selector %>-root',
  template: `
  <div>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}