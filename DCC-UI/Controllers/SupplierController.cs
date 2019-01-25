﻿using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using DCC_UI.Domain;
using Microsoft.AspNetCore.Mvc;

namespace DCC_UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController
    {
        //// TODO Move to config for deployment\config, etc?
        private const string ConnectionString = "Server=tcp:dccdb.database.windows.net,1433;Initial Catalog=DccDb;Persist Security Info=False;User ID=dccdb;Password=Pa$$w0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        [HttpGet("[action]")]
        public IEnumerable<Supplier> GetAll()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var suppliers = connection.Query<Supplier>("SELECT * FROM Supplier");
                return suppliers;
            }
        }
    }
}