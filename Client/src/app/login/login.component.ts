import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RealtimeService } from '../services/realtime.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: RealtimeService
  ) {}

  onButtonClick(): void {
    if (this.username !== undefined && this.username !== '') {
      this.userService.Username = this.username;
      const client = new Client();
      client.ClientName = this.username;
      if (this.username === 'admin') {
        client.GroupName = 'admin';
        // this.loginService.addToVotersGroup(client);
        this.router.navigate(['/admin']);
      } else {
        this.loginService.sendClientInfo(client);
        client.GroupName = 'voters';
        // this.loginService.addToVotersGroup(client);
        this.router.navigate(['/questions']);
      }
    }
  }

  ngOnInit() {}
}
