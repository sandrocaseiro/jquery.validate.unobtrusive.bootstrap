/*!
 * jQuery Validate Unobtrusive Bootstrap 1.2.1
 *
 * https://github.com/sandrocaseiro/jquery.validate.unobtrusive.bootstrap
 *
 * Copyright 2014 Sandro Caseiro
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($)
{
	function escapeAttributeValue(value)
	{
		// As mentioned on http://api.jquery.com/category/selectors/
		return value.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
	}

	function onError(formElement, errorPlacementBase, error, inputElement)
	{
		var container = $(formElement).find("[data-valmsg-for='" + escapeAttributeValue(inputElement[0].name) + "']"),
			replaceAttrValue = container.attr("data-valmsg-replace"),
			replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) !== false : null;

		errorPlacementBase(error, inputElement);

		if (replace)
		{
			var group = inputElement.closest('.form-group');
			if (group && group.length > 0)
			{
				group.addClass('has-error').removeClass('has-success');
			}
		}
	}

	function onSuccess(successBase, error)
	{
		var container = error.data("unobtrusiveContainer");

		successBase(error);

		if (container)
		{
			var group = container.closest('.form-group');
			if (group && group.length > 0)
			{
				group.addClass('has-success').removeClass('has-error');
			}
		}
	}

	$.fn.validateBootstrap = function(refresh)
	{
		return this.each(function()
		{
			var $this = $(this);
			if (refresh)
			{
				$this.removeData('validator');
				$this.removeData('unobtrusiveValidation');
				$.validator.unobtrusive.parse($this);
			}
			
			var validator = $this.data('validator');
			validator.settings.errorClass += ' text-danger';
			var errorPlacementBase = validator.settings.errorPlacement;
			var successBase = validator.settings.success;

			validator.settings.errorPlacement = function(error, inputElement)
			{
				onError($this, errorPlacementBase, error, inputElement);
			};

			validator.settings.success = function(error)
			{
				onSuccess(successBase, error);
			}

			$this.find('.input-validation-error').each(function()
			{
				var errorElement = $this.find("[data-valmsg-for='" + escapeAttributeValue($(this)[0].name) + "']");
				var newElement = $(document.createElement(validator.settings.errorElement))
					.addClass('text-danger')
					.attr('for', escapeAttributeValue($(this)[0].name))
					.text(errorElement.text());
				onError($this, errorPlacementBase, newElement, $(this));
			});
		});
	};

	$(function()
	{
		$('form').validateBootstrap();
	});

}(jQuery));