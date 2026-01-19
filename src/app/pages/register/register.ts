import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // កែប្រែឱ្យត្រូវតាម Swagger API ដែលអ្នកបានផ្ញើមក
  registerData = {
    fullName: '',
    email: '',
    phone: '',
    branchId: 1, // តម្លៃ Default យកតាម ID ក្នុងរូប Swagger របស់អ្នក
    role: 'User',
    password: ''
  };

  isSubmitted = false;

  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    this.isSubmitted = true;
    
    // បាញ់ទិន្នន័យទៅកាន់ API
    this.auth.register(this.registerData).subscribe({
      next: (res: any) => {
        console.log('Registration Success!', res);
        alert('Account created successfully!');
        this.router.navigate(['/login']); // ទៅកាន់ទំព័រ Login ពេលជោគជ័យ
      },
      error: (err: any) => {
        console.error('Registration Error:', err);
        alert('Failed to register. Please try again.');
      }
    });
  }
}