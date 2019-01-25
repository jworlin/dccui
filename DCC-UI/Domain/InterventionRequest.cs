using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DCCUI.Domain
{
    public class InterventionRequest
    {
        public string RegistrationRequestId { get; set; }
        public int RmpId { get; set; }
        public string ObjectionType { get; set; }
        public string Reason { get; set; }
    }
}
