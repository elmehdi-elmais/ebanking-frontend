import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';

@Component({
  imports: [
    Navbar,
    RouterOutlet
  ],
  selector: 'app-admin-template',
  styleUrl: './admin-template.css',
  templateUrl: './admin-template.html',
})
export class AdminTemplate {}
