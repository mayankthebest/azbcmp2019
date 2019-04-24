using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;

namespace Bootcamp
{
    public static class RealtimeSignalR
    {
        [FunctionName("negotiate")]
        public static SignalRConnectionInfo Negotiate([HttpTrigger(AuthorizationLevel.Anonymous)]HttpRequest req,
        [SignalRConnectionInfo(HubName = "vote")]SignalRConnectionInfo connectionInfo)
        {
            return connectionInfo;
        }

        // [FunctionName("AddToGroup")]
        // public static Task AddToGroup([HttpTrigger(AuthorizationLevel.Anonymous, "post")]HttpRequest req, ClientInfo client,
        // [SignalR(HubName = "vote")]IAsyncCollector<SignalRGroupAction> signalRGroupActions)
        // {
        //     return signalRGroupActions.AddAsync(
        //         new SignalRGroupAction
        //         {
        //             UserId = client.ClientName,
        //             GroupName = client.GroupName,
        //             Action = GroupAction.Add
        //         });
        // }

        [FunctionName("TransmitQuestions")]
        public static Task TransmitQuestions([HttpTrigger(AuthorizationLevel.Anonymous, "post")]string message,
        [SignalR(HubName = "vote")]IAsyncCollector<SignalRMessage> signalRMessages)
        {
            var question = JsonConvert.DeserializeObject<Question>(message);
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "TransmitQuestions",
                    Arguments = new[] { question }
                });
        }

        [FunctionName("SendClientInfo")]
        public static Task OnClientConnected([HttpTrigger(AuthorizationLevel.Anonymous, "post")]ClientInfo message,
        [SignalR(HubName = "vote")]IAsyncCollector<SignalRMessage> signalRMessages)
        {
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "OnClientAdded",
                    Arguments = new[] { message }
                });
        }

        [FunctionName("SendResponse")]
        public static Task OnClientResponse([HttpTrigger(AuthorizationLevel.Anonymous, "post")]Response message,
        [SignalR(HubName = "vote")]IAsyncCollector<SignalRMessage> signalRMessages)
        {
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "OnResponseRecorded",
                    Arguments = new[] { message }
                });
        }
    }
}
