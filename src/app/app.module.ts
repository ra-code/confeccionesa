import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate  } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCarouselModule } from 'ngx-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppGlobals } from './app.globals';
import { NguCarouselModule } from '@ngu/carousel';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/auth/role-guard.service';




import { ItemsService } from './services/items.service';
import { PaymentsService } from './services/payments.service';
import { ClientsService } from './services/clients.service';
import { AuthService } from './services/auth/auth.service';
import { RoleGuardService } from './services/auth/role-guard.service';

import {
  MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatProgressBarModule, MatTableModule, MatPaginatorModule,
  MatSelectModule, MatSnackBarModule, MatStepperModule, MatGridListModule, MatDialogModule, MatDividerModule
} from '@angular/material';



import { AppComponent } from './app.component';
import { WebsiteComponent } from './components/website/website.component';
import { NavComponent } from './components/nav/nav.component';
import { SliderComponent } from './components/slider/slider.component';
import { IndexComponent } from './components/index/index.component';
import { AdminIndexComponent } from './components/admin/admin-index/admin-index.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminAddItemComponent } from './components/admin/admin-add-item/admin-add-item.component';
import { AdminShowAllItemsComponent } from './components/admin/admin-show-all-items/admin-show-all-items.component';
import { AdminHeaderSectionComponent } from './components/admin/admin-header-section/admin-header-section.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminEditItemComponent } from './components/admin/admin-edit-item/admin-edit-item.component';
import { ShowitemComponent } from './components/showitem/showitem.component';
import { CartMinComponent } from './components/cart-min/cart-min.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RaFooterComponent } from './components/ra-footer/ra-footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminConfigComponent } from './components/admin/admin-config/admin-config.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

const appRoutes: Routes = [

  { path: '', component: WebsiteComponent },
  { path: 'admin/login', component: AdminLoginComponent }, { path: 'admin/login', redirectTo: 'admin/login', pathMatch: 'full' },
  {
    path: 'admin', component: AdminIndexComponent,canActivate: [RoleGuard],data: {expectedRole: 'admin'} , children: [
      { path: 'additem', component: AdminAddItemComponent },
      { path: 'additem', redirectTo: 'admin/additem', pathMatch: 'full' },
      { path: 'showitems', component: AdminShowAllItemsComponent },
      { path: 'showitems', redirectTo: 'admin/showitems', pathMatch: 'full' },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'categories', redirectTo: 'admin/categories', pathMatch: 'full' },
      { path: 'editItem/:id', component: AdminEditItemComponent },
      { path: 'aditItem/:id', redirectTo: 'admin/editItem/:id', pathMatch: 'full' },
      { path: 'config', component: AdminConfigComponent },
      { path: 'config', redirectTo: 'config', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
      

    ]
  },
  { path: 'admin', redirectTo: 'admin', pathMatch: 'full' },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'art/:id', component: ShowitemComponent }, { path: 'art/:id', redirectTo: 'art/:id', pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent }, { path: 'checkout', redirectTo: 'checkout', pathMatch: 'full' },
  { path: 'client/signup', component: SignupComponent }, { path: 'client/signup', redirectTo: 'client/signup', pathMatch: 'full' },

]

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    NavComponent,
    SliderComponent,
    IndexComponent,
    AdminIndexComponent,
    AdminNavComponent,
    AdminAddItemComponent,
    AdminShowAllItemsComponent,
    AdminHeaderSectionComponent,
    AdminCategoriesComponent,
    AdminEditItemComponent,
    ShowitemComponent,
    CartMinComponent,
    CheckoutComponent,
    RaFooterComponent,
    SignupComponent,
    AdminConfigComponent,
    AdminLoginComponent,
    AdminDashboardComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxCarouselModule, NguCarouselModule,
    FileUploadModule,
    FormsModule, ReactiveFormsModule,
    MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatProgressBarModule, MatTableModule, MatSelectModule,
    MatPaginatorModule, MatSnackBarModule, MatStepperModule, MatGridListModule, MatDialogModule, MatDividerModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [ItemsService, AppGlobals, PaymentsService, ClientsService,AuthService,RoleGuard,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [CartMinComponent]
})
export class AppModule { }
