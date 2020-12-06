import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService} from './services/in-memory-data.service';

import { AuthComponent } from './auth/auth/auth.component';
import { IssuesComponent } from './issues/issues/issues.component';
import { HomeComponent } from './home/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateComponent } from './issues/create/create/create.component';
import { CommentsComponent } from './issues/comments/comments.component';
import { ChartModule } from 'angular-highcharts';
import { EditComponent } from './issues/edit/edit.component';;


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    IssuesComponent,
    HomeComponent,
    CreateComponent,
    CommentsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatGridListModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
