import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minicard',
  templateUrl: './minicard.component.html',
  styleUrls: ['./minicard.component.css']
})
export class MinicardComponent implements OnInit {

  @Input() icon: string;
  @Input() name: string;
  @Input() title: string;
  @Input() value: number;
  @Input() filterKey: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToDetail(name: string, filterKey: string): void {
    console.log(name);
    if (name == 'Partners')
      this.router.navigate((['/', 'partner']))
    else if (name == 'Users')
      this.router.navigate((['/', 'user']))
    else if (name == 'UnmappedPartners')
      this.router.navigate((['/', 'partner', 'unmapped', this.filterKey]))
  }


}
