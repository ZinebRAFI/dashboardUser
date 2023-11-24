import { Component, OnInit } from '@angular/core';
import User from 'src/app/Model/User';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface UserItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<User> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<User> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];

}

@Component({
  selector: 'app-user-list', 
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchTerm = '';
  listOfColumns: UserItem[] = [
       //Tri par nom
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: User, b: User) => a.username.localeCompare(b.username),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Registration Date',
      sortOrder: 'descend',
      sortFn: (a: User, b: User) => new Date(b.lastLoginDate).getTime() - new Date(a.lastLoginDate).getTime(),
      sortDirections: ['descend', 'ascend', null],
      filterMultiple: false,
      listOfFilter: [
  
        { text: 'Last 7 Days', value: 'last7days' },
        { text: 'Last 30 Days', value: 'last30days' },
        { text: 'Last 90 Days', value: 'last90days' },
      ],
      filterFn: (filterValue: string, item: User) => {
        const currentDate = new Date();
        const registrationDate = new Date(item.lastLoginDate);
    
        switch (filterValue) {
          case 'last7days':
            return currentDate.getTime() - registrationDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
          case 'last30days':
            return currentDate.getTime() - registrationDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
          case 'last90days':
            return currentDate.getTime() - registrationDate.getTime() <= 90 * 24 * 60 * 60 * 1000;
          default:
            return true; // Aucun filtre sélectionné, tout est inclus
        }
      }
    }
  ];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users : User[]) => {
      this.users = users;
    });
  }

  
search(): void {
  this.userService.searchUsers(this.searchTerm).subscribe(
    (results) => {
      this.users = results;
    },
    (error) => {
      console.error('Erreur lors de la recherche :', error);
    }
  )
}


// Méthode pour rediriger vers la page de détails de l'utilisateur
showUserProfile(userId: string): void {
  this.router.navigate(['/user-details', userId]);
}

// Méthode pour ajouter un nouvel utilisateur
addNewUser(): void {
  this.router.navigate(['/add-user']);
}
}
