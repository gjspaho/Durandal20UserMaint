using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading;
using System.Web.Mvc;
using System.Web.Security;
using WebMatrix.WebData;
using Durandal2UserMaint.Models;

namespace Durandal2UserMaint.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public sealed class InitializeSimpleMembershipAttribute : ActionFilterAttribute
    {
        private static SimpleMembershipInitializer _initializer;
        private static object _initializerLock = new object();
        private static bool _isInitialized;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // Ensure ASP.NET Simple Membership is initialized only once per app start
            LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
        }

        private class SimpleMembershipInitializer
        {
            public SimpleMembershipInitializer()
            {
                Database.SetInitializer<Durandal2UserMaintContext>(null);

                try
                {
                    bool createdDb = false;
                    using (var context = new Durandal2UserMaintContext())
                    {
                        if (!context.Database.Exists())
                        {
                            // Create the SimpleMembership database without Entity Framework migration schema
                            ((IObjectContextAdapter)context).ObjectContext.CreateDatabase();
                            createdDb = true;
                        }
                    }

                    WebSecurity.InitializeDatabaseConnection("DefaultConnection", "UserProfile", "UserId", "UserName", autoCreateTables: true);                    

                    if (createdDb)
                    {
                        try
                        {
                            Roles.CreateRole("Administrator");
                            WebSecurity.CreateUserAndAccount("admin", "pass@word1", new {IsActive = true});
                            Roles.AddUserToRole("admin", "Administrator");
                        }
                        catch (Exception ex)
                        {

                        }
                    }
                    else
                    {
                        if (!Roles.RoleExists("Administrator"))
                        {
                            Roles.CreateRole("Administrator");
                        }
                        if (WebSecurity.UserExists("admin"))
                        {
                            if (!Roles.IsUserInRole("admin", "Administrator"))
                            {
                                try
                                {
                                    Roles.AddUserToRole("admin", "Administrator");
                                }
                                catch (Exception ex)
                                {

                                }
                            }

                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("The ASP.NET Simple Membership database could not be initialized. For more information, please see http://go.microsoft.com/fwlink/?LinkId=256588", ex);
                }
            }
        }
    }
}
