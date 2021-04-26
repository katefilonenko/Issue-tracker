import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IssuesComponent } from './issues/issues/issues.component';
import { HomeComponent } from './home/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateComponent } from './issues/create/create/create.component';
import { CommentsComponent } from './issues/comments/comments.component';
import { ChartModule } from 'angular-highcharts';
import { EditComponent } from './issues/edit/edit.component';
import { StatComponent } from './stat/stat.component';
import { MatConfDialogComponent } from './mat-conf-dialog/mat-conf-dialog.component';;
import { InterceptorService } from './loader/interceptor.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { CreateOptionComponent } from './issues/create/create-option/create-option.component'

@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    HomeComponent,
    CreateComponent,
    CommentsComponent,
    EditComponent,
    StatComponent,
    MatConfDialogComponent,
    RegisterComponent,
    LoginComponent,
    CreateOptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    MatGridListModule,
    ChartModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    AuthGuard, AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
