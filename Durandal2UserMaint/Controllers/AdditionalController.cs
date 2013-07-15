using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Security;
using Durandal2UserMaint.Models;
using WebMatrix.WebData;

namespace Durandal2UserMaint.Controllers
{
    [Authorize]
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
        public IQueryable<string> GetUserRoles()
        {
            return Roles.GetRolesForUser(WebSecurity.CurrentUserName).AsQueryable();
        }

        [ActionName("ListUsers")]
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public IQueryable<UserGridModel> ListUsers()
        {
            var repo = new Durandal2UserMaintContext();

            return (from u in repo.UserProfiles
                    from m in repo.webpages_Membership
                    where u.UserId == m.UserId
                    select new UserGridModel
                    {
                        UserName = u.UserName,
                        CreateDate = m.CreateDate,
                        LastPasswordChange = m.PasswordChangedDate,
                        IsActive = u.IsActive,
                        Email = u.UserEmail
                    });
        }

        [ActionName("UpdateUser")]
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public void UpdateUserInfo(UserProfile userProfile)
        {
            if (ModelState.IsValid)
            {
                var repo = new Durandal2UserMaintContext();

                var user = (from v in repo.UserProfiles select v).FirstOrDefault(x => x.UserName == userProfile.UserName);
                if (user != null)
                {
                    user.UserEmail = userProfile.UserEmail;
                    user.IsActive = userProfile.IsActive;
                    repo.SaveChanges();
                }
                else
                {
                    throw new Exception("User to update not found");
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

        [ActionName("AddUser")]
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public void AddUserInfo(UserProfile userProfile)
        {
            if (ModelState.IsValid)
            {
                throw new NotImplementedException("Add User is not Implemented in the server yet");
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
    }
}
