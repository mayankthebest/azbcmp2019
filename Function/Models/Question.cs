using System;
using System.Collections.Generic;
using Newtonsoft.Json;

public class Question
{
    public string QuestionId { get; set; }
    public string QuestionText { get; set; }
    public string[] Options { get; set; }
    public string CorrectResponse { get; set; }
    public bool IsFinalQuestion { get; set; }
}
