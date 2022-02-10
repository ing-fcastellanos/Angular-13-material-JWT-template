import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { Role } from '@app/_models'

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  isCredenciales = false;
  Roles: any[] = [];
  account = this.accountService.accountValue;

  userData: data = {
    firstName: '',
    lastName: '',
    email: '',
    role: null,
    password: '',
    confirmPassword: '',
    theme: 'indigo-pink',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    for (const key in Role) {
      switch (this.account.role) {
        case 'Admin':
          this.Roles.push({
            key: key,
            value: Role[key]
          })
          break;
        default: break;
      }
    }

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.userData = {
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email,
            role: x.role,
            password: '',
            confirmPassword: '',
            theme: x.theme
          }
        }, err => {
          console.log(err);
        });
    }
  }


  getUserFriendlyName(role) {
    switch (role) {
      case 'Admin': return 'Administrador global';
      case 'User': return 'Usuario regular';
      case 'Ventas': return 'Punto de Venta';
      case 'Supervisor': return 'Supervisor';
      default: return role;
    }
  }

  passMatch() {
    if (this.userData.password === '' || this.userData.confirmPassword === '')
      return false;
    else if (this.userData.password != this.userData.confirmPassword)
      return true;
    else return false
  }

  isEmail() {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.userData.email === '')
      return false;
    else if (!emailPattern.test(this.userData.email))
      return true;
    else return false
  }

  isFormValid() {
    if(this.isAddMode){
      if (this.userData.firstName.length > 0 &&
        this.userData.lastName.length > 0 &&
        this.userData.email.length > 0 &&
        this.userData.role &&
        this.userData.password.length > 0 &&
        this.userData.confirmPassword.length > 0 &&
        this.userData.password === this.userData.confirmPassword &&
        !this.isEmail()
      ) return true
      else
        return false;
    }
    else {
      if (this.userData.firstName.length > 0 &&
        this.userData.lastName.length > 0 &&
        this.userData.email.length > 0 &&
        this.userData.role &&
        !this.isEmail()
      ) return true
      else
        return false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.isFormValid()) { return; }

    this.loading = true;
    if (this.isAddMode) {
      this.createAccount();
    } else {
      this.updateAccount();
    }
  }

  private createAccount() {
    this.accountService.create(this.userData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Cuenta creada correctamente');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateAccount() {
    this.accountService.update(this.id, this.userData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Actualizado correctamente');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}

export class data {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  theme: string;
}
