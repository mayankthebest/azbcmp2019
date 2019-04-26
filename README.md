# Global Azure Bootcamp 2019

This solution conatins the code used in demo for Global Azure Bootcamp help in Valuemomentum Towers, Hyderabad on 27th April 2019.

The solution contains two parts:
1. Angular Client - This is the front end
2. Azure Functions which talk to Azure SignalR service

To get started, create an Azure SignalR Service in `Serverless` mode. Copy the connection string from Azure Portal and paste it in `local.settings.json` of Azure Functions project against `AzureSignalRConnectionString`.

In Angular Client open file `realtime.service.ts` and change value of baseUrl to whereever you have hosted your Azure Function - `https://<YOUR_FUNCTION_URL_HERE>/api/`

Open up a browser and navigate to Angular Front End. Type username as `admin`. This will bring you to Admin Portal from where you can control question flow and view responses.

On a different browser instance, navigate to same Angular Front End. Type in your username and it will bring you to client view. You will be able to view and answer questions as the admins navigates through them.

Happy Learning!
