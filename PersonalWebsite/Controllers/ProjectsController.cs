using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PersonalWebsite.Controllers
{
    public class ProjectsController : Controller
    {
        // GET: Projects
        public ActionResult TictactoeGame()
        {
            return View();
        }

        public ActionResult ItunesApi()
        {
            return View();
        }

        public ActionResult RandomGen()
        {
            return View();
        }

        public ActionResult CheckList()
        {
            return View();
        }
    }
}