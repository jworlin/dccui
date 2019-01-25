using Newtonsoft.Json;

namespace DCC_UI.Controllers
{
    public class RegistrationRequestData
    {
        [JsonProperty("supplyMeterPointReferenceNumber")]
        public int RmpId { get; set; }
    }
}