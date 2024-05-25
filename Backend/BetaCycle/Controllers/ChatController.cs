using BetaCycle.BLogic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BetaCycle.Controllers
{
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<SupportChatHub> _messageHub;

        public ChatController(IHubContext<SupportChatHub> messageHub)
        {
            _messageHub = messageHub;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<List<string>> GetConnectionsOpen()
        {
            return SupportChatHub.connections;
        }


        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<List<string>>> JoinChat(string connectionId)
        {
            List<string> result = [];
            SupportChatHub.sessions.ForEach(session =>
            {
                if (session.Key == connectionId)
                    result = session.Value;
            });
            return result;
        }

    }
}
