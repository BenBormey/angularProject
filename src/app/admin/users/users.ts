import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: any[] = [];

  // ===== Add User =====
  showAddModal = false;
  newUser = {
    fullName: '',
    email: '',
    phone: '',
    branchId: 1,
    role: 'User',
    password: '',
  };

  // ===== Edit User =====
  showEditModal = false;
  editUser: any = {
    userId: 0,
    fullName: '',
    email: '',
    phone: '',
    branchId: 1,
    role: 'User',
    password: '',
  };

  // ===== Change Password =====
  changePasswordModel = {
    userId: 0,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadinguser();
  }

  // ===== Load users =====
  loadinguser() {
    this.userService.getUser().subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.error(err),
    });
  }

  // ===== Add user =====
  addUser() {
    if (!this.newUser.fullName || !this.newUser.email || !this.newUser.password) {
      alert('Please fill required fields');
      return;
    }

    this.userService.saveUser(this.newUser).subscribe({
      next: () => {
        alert('User added successfully!');
        this.showAddModal = false;
        this.resetNewUser();
        this.loadinguser();
      },
      error: (err) => {
        console.error(err);
        alert('Add failed');
      },
    });
  }

  resetNewUser() {
    this.newUser = {
      fullName: '',
      email: '',
      phone: '',
      branchId: 1,
      role: 'User',
      password: '',
    };
  }

  // ===== Edit user =====
  openEditModal(user: any) {
    this.editUser = {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      branchId: user.branchId ?? 1,
      role: user.role,
      password: '', // must re-enter
    };

    this.showEditModal = true;
  }

  updateUser() {
    console.log(this.editUser); // debug

    this.userService
      .updateUser(this.editUser.userId, this.editUser)
      .subscribe({
        next: () => {
          alert('User updated successfully!');
          this.showEditModal = false;
          this.loadinguser();
        },
        error: (err) => {
          console.error(err);
          alert('Update failed');
        },
      });
  }

  // ===== Change password =====
  selectUser(userId: number) {
    this.changePasswordModel.userId = userId;
  }

  changePassword() {
    if (
      this.changePasswordModel.newPassword !==
      this.changePasswordModel.confirmNewPassword
    ) {
      alert('Passwords do not match!');
      return;
    }

    this.userService.changePassword(this.changePasswordModel).subscribe({
      next: () => {
        alert('Password changed!');
        this.resetPasswordForm();
      },
      error: (err) => {
        console.error(err);
        alert('Change password failed');
      },
    });
  }

  resetPasswordForm() {
    this.changePasswordModel = {
      userId: 0,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }
}
