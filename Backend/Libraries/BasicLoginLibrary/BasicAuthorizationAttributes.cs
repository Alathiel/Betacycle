using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BasicLoginLibrary
{
    public class BasicAuthorizationAttributes : AuthorizeAttribute
    {
        public BasicAuthorizationAttributes()
        {
            Policy = "BasicAuthentication";
        }
    }
}
