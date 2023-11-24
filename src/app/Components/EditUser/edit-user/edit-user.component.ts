import { Component } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import User from 'src/app/Model/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  users!: User;

  availableRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    
  ];

  success = false;
  warning = false;
  error = false;

  activityLog: ActivityLogEntry[] = [];

  submitForm() {
    // Assume a successful update for demonstration purposes
    // In a real application, you would need to handle errors and success based on your backend response

    // Simulating a successful response
    const fakeBackendResponse = { success: true, duplicate: false }; 

    if (fakeBackendResponse.success) {
      this.success = true;
      this.warning = false;
      this.error = false;

      // Ajouter une entrée au journal d'activités
      this.activityLog.push({
        timestamp: new Date(),
        description: 'User updated successfully'
      });
    } else if (fakeBackendResponse.duplicate) {
      this.success = false;
      this.warning = true;
      this.error = false;
    } else {
      this.success = false;
      this.warning = false;
      this.error = true;
    }
  }

  getPasswordValidationStatus(): NzSafeAny {

    const password = this.users.password;
    if (password.length >= 8 && /[A-Za-z].*\d|\d.*[A-Za-z]/.test(password)) {
      return 'success';
    } else if (password.length > 0) {
      return 'error';
    } else {
      return '';
    }
  }

  validateField(field: string): boolean {
   const value = (this.users as any)[field];

  switch (field) {
    case 'firstName':
    case 'lastName':
      // Vérifiez la longueur minimale du nom
      return value && value.length >= 3;

    case 'email':
      // Vérifiez le format de l'e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);

    default:
      // Par défaut, considérez que le champ est valide
      return true;
  }
}
}

interface ActivityLogEntry {
  timestamp: Date;
  description: string;
}

