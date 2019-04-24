export class Result {
  QuestionId: string;
  QuestionText: string;
  Options: Option[];
  CorrectResponse: string;
}

export class Option {
  OptionText: string;
  NoOfResponses: number;
}
