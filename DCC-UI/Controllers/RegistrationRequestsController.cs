using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Queue;
using Newtonsoft.Json;

namespace DCC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationRequestsController : ControllerBase
    {
        private const string StorageAccountConnectionString =
            "DefaultEndpointsProtocol=https;AccountName=dccstoragetest;AccountKey=okaYfzR4HuelCeYRp0dULfsPwMeGRDkDvFmtB1NHxEDssuwnF3nyQOoH3qC+YL+uyi8z4g84ylUkRdkSOzyoJw==;EndpointSuffix=core.windows.net";
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

        [HttpGet("{id}")]
        public RegistrationRequests GetOne (string id)
        {
          using (var connection = new SqlConnection(ConnectionString))
          {
            var requests = connection.Query<RegistrationRequests>("SELECT * FROM RegistrationRequests WHERE Id = @id", new { id });
            return requests.Single();
          }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRegistrationRequest registraton)
        {
            var storageAccount = CloudStorageAccount.Parse(StorageAccountConnectionString);

            // Create the queue client.
            var queueClient = storageAccount.CreateCloudQueueClient();

            // Retrieve a reference to a queue.
            var queue = queueClient.GetQueueReference("registration-requests");

            var id = Guid.NewGuid();

            var registrationRequest = new
            {
                registrationRequestId = id.ToString(),
                supplierId = registraton.SupplierId,
                registrationManagementRequestTypeIdentifierReference = "ABCDEFGHIJKLMNOPQR",
                registrationSupplierMarketParticipantRoleIdentifier = "ABCDEFGHI",
                switchRequestChangeOfOccupancyIndicator = "ABCDEFGHIJKLMNOP",
                supplyMeterPointReferenceNumber = registraton.RmpId,
                mPANCore = "ABCDEFGHIJKLMNOPQ",
                meteringPointEnergyFlow = "ABCDEFGHIJKLMNOPQ",
                registrationManagementRequestSupplierMarketParticipantRoleIdentifier = "ABCDEFGHIJKLMNOPQRST",
                registrationManagementRequestSupplierGeneratedReference = "ABCDEFGHIJKLMNOPQ",
                registrationEventShipperMarketParticipantRoleIdentifier = "ABCDEFGHIJKLM",
                registrationErroneousSwitchResolutionIndicator = "ABCDEF",
                rMPFuelType = "ABCDEFGHIJKLMNOPQRSTUVWXYZABC",
                registrationEffectiveFromDate = registraton.SwitchDate//.ToString("G")
            };

            // Create a message and add it to the queue.
            var message = new CloudQueueMessage(JsonConvert.SerializeObject(registrationRequest));
            await queue.AddMessageAsync(message);

            return Created("", registrationRequest);
        }

        public class CreateRegistrationRequest
        {
            public int SupplierId { get; set; }
            public int RmpId { get; set; }
            public string SwitchDate { get; set; }
        }

    }
}