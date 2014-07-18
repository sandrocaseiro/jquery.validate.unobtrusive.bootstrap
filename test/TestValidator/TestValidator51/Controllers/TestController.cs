using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestValidator51.Controllers
{
	public class TestController : Controller
	{
		public ViewResult User()
		{
			return View(new Models.User());
		}

		[HttpPost]
		public ViewResult User(Models.User model)
		{
			ViewBag.Valid = ModelState.IsValid;

			return View(model);
		}

		public ViewResult Partial()
		{
			return View(new Models.User());
		}

		[HttpPost]
		public ViewResult Partial(Models.User model)
		{
			ViewBag.Valid = ModelState.IsValid;

			return View(model);
		}

		public PartialViewResult ProductPartial()
		{
			return PartialView(new Models.Product());
		}

		[HttpPost]
		public ViewResult ProductPartial(Models.Product model)
		{
			ViewBag.Valido = ModelState.IsValid;

			return Partial();
		}

		public ViewResult Multiple()
		{
			return View(new Models.User());
		}

		[HttpPost]
		public ViewResult Multiple(Models.User model)
		{
			ViewBag.Valid = ModelState.IsValid;

			return View(model);
		}
	}
}