using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;
using Microsoft.AspNetCore.SignalR;

namespace BetaCycle.BLogic
{
    public class SupportChatHub:Hub
    {
        public static List<string> connections = [];
        public static List<KeyValuePair <string, List<string>>> sessions = [];
        public async Task OnConnection(string connectionId)
        { 
            connections.Add(connectionId);
            sessions.Add(new KeyValuePair<string, List<string>>(connectionId, []));
        }

        public async Task SendMessage(string connectionId, string message)
        {
            sessions.ForEach(session =>
            {
                if(session.Key == connectionId)
                    session.Value.Add(message);
            });

            await Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
        }

        public async Task ReceiveMessage(string message) => await Clients.Caller.SendAsync(message);


        public async Task OnCloseConnection(string connectionId)
        {
            connections.Remove(connectionId);
            sessions.ForEach(session =>
            {
                if(session.Key == connectionId)
                    sessions.Remove(session);
            });
        }
    }
}
