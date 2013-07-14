using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Security;
using Durandal2UserMaint.Models;
using WebMatrix.WebData;

namespace Durandal2UserMaint.Controllers
{
    public class AdditionalController : ApiController
    {
        public void ChangePassword(LocalPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                bool valid = false;
                try
                {
                    valid = WebSecurity.ChangePassword(User.Identity.Name, model.OldPassword, model.NewPassword);

                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                if (!valid)
                {
                    throw new Exception("It appears your Old Password is NOT correct. Please try again.");
                }
            }
            else
            {
                string errors = string.Empty;
                foreach (var modelState in ModelState.Values)
                {
                    foreach (var error in modelState.Errors)
                    {
                        errors += error.ErrorMessage + Environment.NewLine;
                    }
                }
                throw new Exception(errors);
            }
        }

        [ActionName("GetUserRoles")]
        [HttpGet]
        public IEnumerable<string> GetUserRoles()
        {
            return Roles.GetRolesForUser(User.Identity.Name);
        }
    }
}
