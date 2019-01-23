using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationRequestsController : ControllerBase
    {
        private const string ConnectionString = "Server=tcp:dccdb.database.windows.net,1433;Initial Catalog=DccDb;Persist Security Info=False;User ID=dccdb;Password=Pa$$w0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        [HttpGet("[action]")]
        public IEnumerable<RegistrationRequests> GetAll()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var requests = connection.Query<RegistrationRequests>("SELECT * FROM RegistrationRequests");
                return requests;
            }
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Audit> Audit(string id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var requests = connection.Query<Audit>("SELECT * FROM Audits WHERE RegistrationRequestId = @id", new {id});
                return requests;
            }
        }
    }
}