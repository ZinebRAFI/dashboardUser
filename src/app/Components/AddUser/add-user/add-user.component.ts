import { Component } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  constructor(private userservice: UserService, ) {}
  constructor(private fb: FormBuilder, private userService: UserService) {
    // Initialisation du formulaire avec le FormBuilder
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // ... autres propriétés du modèle de données
    });
  }

  // Méthode pour soumettre le formulaire
  submitForm(): void {
    if (this.userForm.valid) {
      const formData: UserModel = this.userForm.value;

      // Utilisez votre service pour créer un nouvel utilisateur
      this.userService.createUser(formData).subscribe(
        (newUser) => {
          console.log('Utilisateur créé avec succès :', newUser);
          // Ajoutez ici la logique supplémentaire en fonction de vos besoins
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
          // Ajoutez ici la gestion des erreurs en fonction de vos besoins
        }
      );
    } else {
      console.error('Formulaire non valide. Veuillez vérifier vos données.');
    }
  }
}
sendEmail = false;

  availableRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    
  ];

  success = false;
  warning = false;
  error = false;

  submitForm() {
    // Handle form submission logic
    // Validate inputs, communicate with backend, etc.

    // For demonstration purposes, let's assume a successful submission for now
    this.success = true;
    this.warning = false;
    this.error = false;

    // Reset the form or navigate to another page if needed
    this.resetForm();
  }

  resetForm() {
    // Reset form-related properties and fields
    this.user = {
      username: '',
      email: '',
      password: '',
      role: '',
    };
    this.sendEmail = false;
    this.success = false;
    this.warning = false;
    this.error = false;
  }

  getPasswordValidationStatus(): NzSafeAny {
    const password = User.password;
    if (password.length >= 8 && /[A-Za-z].*\d|\d.*[A-Za-z]/.test(password)) {
      return 'success';
    } else if (password.length > 0) {
      return 'error';
    } else {
      return '';
    }
  }
}

