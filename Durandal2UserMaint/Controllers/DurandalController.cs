using System.Web.Mvc;

namespace Durandal2UserMaint.Controllers
{
    [Authorize]
    public class DurandalController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}