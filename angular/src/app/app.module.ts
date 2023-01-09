import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';

import { AccountService, NotificacionesService } from './_services';
import { ThemeService } from './_themes/theme.service';
import { StyleManagerService } from './_themes/style-manager.service';
import { MenuComponent } from "./_themes/menu/menu.component";
import { DialogsComponent, ConfirmDialog, displayDataDialog, userAccount_dialog } from './_dialogs/dialogs.component'
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AlertComponent } from './_components/alert/alert.component';;
import { AvisoprivacidadComponent } from './avisoprivacidad/avisoprivacidad.component'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatBadgeModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        DialogsComponent,
        MenuComponent,
        ConfirmDialog,
        displayDataDialog,
        userAccount_dialog,
        AlertComponent,
        AvisoprivacidadComponent
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService, NotificacionesService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ThemeService, StyleManagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
