using Newtonsoft.Json;

namespace DCC_UI.Controllers
{
    public partial class NotificationsSentController
    {
        public class RegistrationRequestData
        {
            [JsonProperty("supplyMeterPointReferenceNumber")]
            public int RmpId { get; set; }
        }
    }
}