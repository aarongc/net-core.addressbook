using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace net.addressbook.Pages
{
    public class DirectoryModel : PageModel
    {
        private readonly ILogger<DirectoryModel> _logger;

        public DirectoryModel(ILogger<DirectoryModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
