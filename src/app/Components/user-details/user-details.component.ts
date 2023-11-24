import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import User from 'src/app/Model/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

}
    export class UserDetailsModalComponent {
  @Input() user: User | undefined;

  constructor(private User : NzModalRef) {}

  closeModal(): void {
    this.User.destroy();
  }
}
