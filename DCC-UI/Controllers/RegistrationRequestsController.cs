using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            return new List<RegistrationRequests>
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
}