import { Component, OnInit } from '@angular/core';
import { Result, Option } from '../models/result.model';
import { RealtimeService } from '../services/realtime.service';
import { Question } from '../models/question.model';
import { Response } from '../models/response.model';
const questions = require('../questions.json') as Question[];

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  results: Result[] = [];
  responses: Response[];
  constructor(private resultsService: RealtimeService) {
    this.responses = this.resultsService.Responses;
  }

  ngOnInit() {
    questions.forEach(question => {
      const res = new Result();
      res.QuestionId = question.QuestionId;
      res.QuestionText = question.QuestionText;
      res.CorrectResponse = question.CorrectResponse;
      res.Options = [];
      question.Options.forEach(op => {
        const option = new Option();
        option.OptionText = op;
        option.NoOfResponses = 0;
        res.Options.push(option);
      });
      this.results.push(res);
    });
    this.responses.forEach(response => {
      const question = this.results.filter(x => x.QuestionId.toString() === response.QuestionId)[0];
      const option = question.Options.filter(x => x.OptionText === response.ResponseText)[0];
      option.NoOfResponses += 1;
    });
  }
}
