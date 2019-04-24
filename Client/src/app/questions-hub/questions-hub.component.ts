import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';
import { UserService } from '../services/user.service';
import { Question } from '../models/question.model';
import { Response } from '../models/response.model';

@Component({
  selector: 'app-questions-hub',
  templateUrl: './questions-hub.component.html',
  styleUrls: ['./questions-hub.component.css']
})
export class QuestionsHubComponent implements OnInit {
  username: string;
  currentQuestion: Question;
  selectedAnswer: string;
  titleText = '';

  constructor(
    private questionService: RealtimeService,
    private userService: UserService
  ) {
    this.username = this.userService.Username;
    this.titleText = 'Wait for next question ' + this.username;
    this.questionService.getQuestion().subscribe(result => {
      this.titleText = 'Answer the following question ' + this.username;
      this.currentQuestion = result;
    });
  }

  ngOnInit() {}

  onItemChange(value) {
    this.selectedAnswer = value;
  }

  onSubmit() {
    if (this.selectedAnswer !== undefined && this.selectedAnswer !== '') {
      const response = new Response();
      response.QuestionId = this.currentQuestion.QuestionId;
      response.ResponseText = this.selectedAnswer;
      this.questionService.sendResponse(response);
      if(!this.currentQuestion.IsFinalQuestion){
      this.titleText = 'Wait for next question ' + this.username;
      } else {
        this.titleText = 'Thanks for voting ' + this.username;
      }
      this.currentQuestion = undefined;
    }
  }
}
