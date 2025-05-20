import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routes';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {BookDetailDialogComponent} from './components/detail/book-detail-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SuccessModalComponent} from './components/success-modal/success-modal.component';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BookDetailDialogComponent,
    SuccessModalComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
