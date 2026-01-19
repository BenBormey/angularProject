import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ REQUIRED for ngClass
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ ADD CommonModule
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  username = '';
  password = '';
  isSubmitted = false;

  constructor(private authService: Auth, private router: Router) {}

  login() {
    this.isSubmitted = true; // ✅ move to top

    // ✅ Validate BEFORE API call
    if (!this.username || !this.password) {
      return;
    }

    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.login(data).subscribe((res: any) => {
      localStorage.setItem('token', res.accessToken);
      alert('Login success!');
      this.router.navigate(['/home']);
    });
  }
}
