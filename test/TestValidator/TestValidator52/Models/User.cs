using FluentValidation;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestValidator52.Models
{
	[Validator(typeof(UserValidator))]
	public class User
	{
		public string Name { get; set; }
		public string Email { get; set; }

		private class UserValidator : AbstractValidator<User>
		{
			public UserValidator()
			{
				RuleFor(r => r.Name).NotEmpty();
				RuleFor(r => r.Email).NotEmpty().EmailAddress();
			}
		}
	}
}