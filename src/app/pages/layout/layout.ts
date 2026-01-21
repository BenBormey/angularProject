import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  // Added RouterLinkActive to imports so your CSS .active styles work
  // Added CommonModule in case you use other Angular features like @if or @for
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  constructor(private router: Router) {}

  logout() {
    // Standard logout logic
    localStorage.removeItem('token');
    
    // Redirect to login page
    this.router.navigate(['/login']);
    
    console.log('User logged out successfully');
  }
}