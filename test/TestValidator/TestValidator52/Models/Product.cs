using FluentValidation;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestValidator52.Models
{
	[Validator(typeof(ProductValidator))]
	public class Product
	{
		public string Name { get; set; }
		public string Category { get; set; }

		private class ProductValidator : AbstractValidator<Product>
		{
			public ProductValidator()
			{
				RuleFor(r => r.Name).NotEmpty();
				RuleFor(r => r.Category).NotEmpty();
			}
		}
	}
}