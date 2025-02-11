import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { FriendsComponent } from './components/friends/friends.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsHeaderComponent } from './components/settings-options/settings-header/settings-header.component';
import { ChangeEmailComponent } from './components/settings-options/change-email/change-email.component';
import { ChangeUsernameComponent } from './components/settings-options/change-username/change-username.component';
import { ChangeBioComponent } from './components/settings-options/change-bio/change-bio.component';
import { ChangeProfilePictureComponent } from './components/settings-options/change-profile-picture/change-profile-picture.component';
import { EventsComponent } from './components/events/events.component';
import { LogrosComponent } from './components/logros/logros.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GroupsComponent } from './components/groups/groups.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { FriendProfileComponent } from './components/friend-profile/friend-profile.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    FooterComponent,
    HeaderComponent,
    FriendsComponent,
    PostsComponent,
    ProfileComponent,
    SettingsComponent,
    SettingsHeaderComponent,
    ChangeUsernameComponent,
    ChangeEmailComponent,
    ChangeBioComponent,
    ChangeProfilePictureComponent,
    EventsComponent,
    LogrosComponent,
    NavbarComponent,
    GroupsComponent,
    PostListComponent,
    CommentComponent,
    FriendProfileComponent,
    FriendRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
