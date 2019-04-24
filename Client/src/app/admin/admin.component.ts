import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { RealtimeService } from '../services/realtime.service';
import { Router } from '@angular/router';
const questions = require('../questions.json');
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentClients: string[];
  currentId: number;
  currentQuestion: Question;
  allQuestions: Question[];
  constructor(private http: HttpClient, private questionService: RealtimeService, private router: Router) {
    this.allQuestions = questions;
    this.currentClients = [];

    this.questionService.getMessage().subscribe(result => {
      this.currentClients.push(result.ClientName);
    });
   }

  ngOnInit() {

  }

  startVoting(): void {
    this.currentId = 0;
    this.currentQuestion = this.allQuestions[this.currentId];
    this.questionService.sendQuestion(this.currentQuestion);
  }

  showNextQuestion(id: string): void {
    this.currentId += 1;
    this.currentQuestion = this.allQuestions[this.currentId];
    this.questionService.sendQuestion(this.currentQuestion);
  }

  showPreviousQuestion(id: string): void {
    this.currentId -= 1;
    this.currentQuestion = this.allQuestions[this.currentId];
    this.questionService.sendQuestion(this.currentQuestion);
  }

  showResponses(): void {
    this.router.navigate(['results']);
  }

}
