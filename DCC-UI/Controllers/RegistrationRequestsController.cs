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
        [HttpGet("[action]")]
        public IEnumerable<RegistrationRequests> GetAll()
        {
            using (var connection = new SqlConnection(
                "Server=tcp:dccdb.database.windows.net,1433;Initial Catalog=DccDb;Persist Security Info=False;User ID=dccdb;Password=Pa$$w0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;")
            )
            {
                 var requests = connection.Query<RegistrationRequests>("SELECT * FROM RegistrationRequests");
                return requests;
            }
                /*return new List<RegistrationRequests>
            {
                new RegistrationRequests
                {
                    CreatedDate = DateTime.Now.ToString("g"),
                    Data = "{\"registration-request-id\": \"1\", \"other-data\": \"Jason\"}",
                    Id = "1",
                    InterveneDate = DateTime.Now.AddDays(1).ToString("g"),
                    Status = "JustTesting"
                },
                new RegistrationRequests
                {
                    CreatedDate = DateTime.Now.AddDays(-1).ToString("g"),
                    Data = "{\"registration-request-id\": \"2\", \"other-data\": \"Jason 2\"}",
                    Id = "2",
                    InterveneDate = DateTime.Now.AddDays(2).ToString("g"),
                    Status = "JustTesting 2"
                },
                new RegistrationRequests
                {
                    CreatedDate = DateTime.Now.AddDays(-2).ToString("g"),
                    Data = "{\"registration-request-id\": \"3\", \"other-data\": \"Jason 3\"}",
                    Id = "3",
                    InterveneDate = DateTime.Now.AddDays(3).ToString("g"),
                    Status = "JustTesting 3"
                }
            };*/
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Audit> Audit(string id)
        {
            return new List<Audit>
            {
                new Audit
                {
                    RegistrationRequestId = DateTime.Now.ToString("g"),
                    Data = "{\"registration-request-id\": \"1\", \"other-data\": \"Jason\"}",
                    Id = "1",
                    LogicAppId = DateTime.Now.AddDays(1).ToString("g"),
                    Status = "JustTesting",
                    Type = "",
                    EventAt = DateTime.Now.AddDays(3).ToString("g")
                },
                new Audit
                {
                    RegistrationRequestId = DateTime.Now.AddDays(-1).ToString("g"),
                    Data = "{\"registration-request-id\": \"2\", \"other-data\": \"Jason 2\"}",
                    Id = "1",
                    LogicAppId = DateTime.Now.AddDays(2).ToString("g"),
                    Status = "JustTesting 2",
                    Type = "",
                    EventAt = DateTime.Now.AddDays(3).ToString("g")
                },
                new Audit
                {
                    RegistrationRequestId = DateTime.Now.AddDays(-2).ToString("g"),
                    Data = "{\"registration-request-id\": \"3\", \"other-data\": \"Jason 3\"}",
                    Id = "1",
                    LogicAppId = DateTime.Now.AddDays(3).ToString("g"),
                    Status = "JustTesting 3",
                    Type = "",
                    EventAt = DateTime.Now.AddDays(3).ToString("g")
                }
            };
        }
    }

    public class RegistrationRequests
    {
        public string Id { get; set; }
        public string Data { get; set; }
        public string CreatedDate { get; set; }
        public string Status { get; set; }
        public string InterveneDate { get; set; }
    }

    public class Audit
    {
        public string Id { get; set; }
        public string RegistrationRequestId { get; set; }
        public string LogicAppId { get; set; }
        public string Data { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string EventAt { get; set; }
    }
}