using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using DataAccessLayer;
using System.Threading.Tasks;

namespace TestProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        readonly UsersDataAccessLayer objuser = new UsersDataAccessLayer();

        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return objuser.GetAllUsersData();
        }

        //[HttpGet]
        //[Route("Contacts")]
        //public async Task<IActionResult> Contacts()
        //{
        //    return Ok(await _contactService.GetContacts());
        //}

        [HttpPost]
        [Route("SaveUsers")]//???
        public int SaveUser(User user)
        {
            return objuser.AddUser(user);
        }

        //[Route("SaveUsers")]
        //public async Task<IActionResult> SaveContact([FromBody] ContactModel model)
        //{
        //    return Ok(await _contactService.SaveContact(model));
        //}
    }
}
