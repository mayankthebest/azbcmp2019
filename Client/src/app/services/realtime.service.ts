import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Client } from '../models/client.model';
import { Question } from '../models/question.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  connection: HubConnection = undefined;
  private clientSubject = new Subject<Client>();
  private questionSubject = new Subject<Question>();
  private responses: Response[] = [];
  private baseUrl = 'https://<YOUR_FUNCTION_URL_HERE>/api/';
  get Responses(): Response[] {
    return this.responses;
  }

  constructor(private http: HttpClient) {
    this.Initialize();
  }

  private Initialize(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start().then(function() {
      console.log('connected');
    });

    this.connection.on('TransmitQuestions', (data: Question) => {
      this.questionSubject.next(data);
    });

    this.connection.on('OnClientAdded', (data: Client) => {
      this.clientSubject.next(data);
    });

    this.connection.on('OnResponseRecorded', (data: Response) => {
      this.responses.push(data);
    });
  }

  sendQuestion(message: Question): void {
    this.http
      .post(this.baseUrl + 'TransmitQuestions', message)
      .subscribe(res => {});
  }

  sendClientInfo(message: Client): void {
    this.http
      .post(this.baseUrl + 'SendClientInfo', message)
      .subscribe(res => {});
  }

  sendResponse(message: Response): void {
    this.http
      .post(this.baseUrl + 'SendResponse', message)
      .subscribe(res => {});
  }

  getMessage(): Observable<Client> {
    return this.clientSubject.asObservable();
  }

  getQuestion(): Observable<Question> {
    return this.questionSubject.asObservable();
  }
}
