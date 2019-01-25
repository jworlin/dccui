using Newtonsoft.Json;

namespace DCC_UI.Controllers
{
    public partial class NotificationsSentController
    {
        public class Notification
        {
            public int Id { get; set; }
            public string Receiver { get; set; }

            [JsonProperty("SupplierId")]
            public int Supplier_Id { get; set; }

            [JsonProperty("RMPId")]
            public int RMP_Id { get; set; }
        }
    }
}