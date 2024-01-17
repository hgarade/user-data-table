import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { isEmpty } from 'ramda';
import { UserDataService } from './service/user-data.service';
import { User, UserData } from './type/user.types';
import { getUserDataAction, updateUserData } from './store/user.actions';
import { getUser } from './store/user.selectors';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CONSTANT_LABELS } from './app.constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers: [UserDataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<{ user: User }>) {}
  isButtonLoading: boolean = false;
  usersTableData: UserData[] = [];
  labels = CONSTANT_LABELS;
  columnsToDisplay = ['id', 'firstName', 'lastName', 'email', 'phone'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  expandedElement: UserData | undefined;

  // Reactive form for individual expanded user row
  userDataForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(8),
    ]),
  });

  // Getters for getting data from form.
  get getFirstName() {
    return this.userDataForm.get('firstName');
  }

  get getLastName() {
    return this.userDataForm.get('lastName');
  }

  get getEmail() {
    return this.userDataForm.get('email');
  }

  get getPhone() {
    return this.userDataForm.get('phone');
  }

  ngOnInit(): void {
    this.getUserDataFromBe();
    this.getUserDataFromStore();
  }

  //To get user data from API
  getUserDataFromBe(): void {
    this.store.dispatch(getUserDataAction());
  }

  // To get user data from ngrx store
  getUserDataFromStore(): void {
    this.store.select(getUser).subscribe((users) => {
      if (!isEmpty(users.user.users)) {
        this.usersTableData = users.user.users;
      }
    });
  }

  // To submit the expanded user form
  onSubmit(element: UserData): void {
    this.isButtonLoading = true;
    setTimeout(() => {
      this.updateDataToStore(element.id);
      this.changeAccordionState(element);
      this.isButtonLoading = false;
    }, 2000);
  }

  // To reset the form and close table accordion
  onClose(element: UserData): void {
    this.changeAccordionState(element);
  }

  // To toggle accordian of expanded user and reset the form
  changeAccordionState(element: UserData) {
    this.userDataForm.reset();
    this.expandedElement =
      this.expandedElement === element ? undefined : element;
  }

  // To update store with form data of expanded user
  updateDataToStore(id: Number): void {
    if (
      !isEmpty(this.userDataForm.value.firstName) &&
      !isEmpty(this.userDataForm.value.lastName) &&
      !isEmpty(this.userDataForm.value.email) &&
      !isEmpty(this.userDataForm.value.phone)
    )
      this.store.dispatch(
        updateUserData({
          id: id as Number,
          firstName: this.userDataForm.value.firstName as string,
          lastName: this.userDataForm.value.lastName as string,
          phone: this.userDataForm.value.phone as string,
          email: this.userDataForm.value.email as string,
        })
      );
  }
}
