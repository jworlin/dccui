using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DCCUI.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Queue;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DCCUI.Controllers
{
    [ApiController]
    [Route("api/Intervention")]
    public class InterventionController : Controller
    {
        private const string StorageAccountConnectionString =
            "DefaultEndpointsProtocol=https;AccountName=dccstoragetest;AccountKey=okaYfzR4HuelCeYRp0dULfsPwMeGRDkDvFmtB1NHxEDssuwnF3nyQOoH3qC+YL+uyi8z4g84ylUkRdkSOzyoJw==;EndpointSuffix=core.windows.net";


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InterventionRequest intervention)
        {
            var storageAccount = CloudStorageAccount.Parse(StorageAccountConnectionString);

            // Create the queue client.
            var queueClient = storageAccount.CreateCloudQueueClient();

            // Retrieve a reference to a queue.
            var queue = queueClient.GetQueueReference("registration-intervention-requests");

            var id = Guid.NewGuid();

            var interventionRequest = new
            {
                currentRegistrationId = intervention.RmpId,
                interventionId = "ABCDEF123",
                pendingRegistrationId = "ABCDEF123",
                reason = intervention.Reason,
                registrationSwitchId = intervention.RegistrationRequestId,
                receivedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                submissionDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                supplierGeneratedReference = "ABCDEFG124",
                typeId = intervention.ObjectionType,
                windowStartDate = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd HH:mm:ss")
            };

            // Create a message and add it to the queue.
            var message = new CloudQueueMessage(JsonConvert.SerializeObject(interventionRequest));
            await queue.AddMessageAsync(message);

            return Created("", interventionRequest);
        }

}
}
