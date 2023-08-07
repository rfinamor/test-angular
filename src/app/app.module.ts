import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './services/FakeBackendInterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login } from './components/login/login.component';
import { Shopping } from './components/shopping/shopping.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'  
import { ErrorInterceptor } from './services/ErrorInterceptor';
import { JwtInterceptor } from './services/JwtInterceptor';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        BrowserModule,
        MatTableModule,
        FormsModule,
    ],
    declarations: [
      Shopping,       
      Login,
      AppComponent,
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
