using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCC_UI.Controllers
{
    [Route("api/notifications/for")]
    [ApiController]
    public partial class NotificationsSentController : ControllerBase
    {
        private const string ConnectionString = "Server=tcp:dccdb.database.windows.net,1433;Initial Catalog=DccDb;Persist Security Info=False;User ID=dccdb;Password=Pa$$w0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        [HttpGet("{id}")]
        public IEnumerable<Notification> Notifications(string id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var request = connection.Query<RegistrationRequests>("SELECT * FROM RegistrationRequests WHERE Id = @id", new { id }).Single();

                var rmpId = JsonConvert.DeserializeObject<RegistrationRequestData>(request.Data)?.RmpId;

                var notifications = connection.Query<Notification>("SELECT * FROM [NotificationsSent] WHERE RMP_Id = @rmpId ORDER BY EventAt DESC", new { rmpId });

                return notifications;
            }
        }
    }
}