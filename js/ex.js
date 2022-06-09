$(function () {
  /*
   * International Telephone Input v16.0.0
   * https://github.com/jackocnr/intl-tel-input.git
   * Licensed under the MIT license
   */
  var input = document.querySelectorAll("input[name=phone]");
  var iti_el = $(".iti.iti--allow-dropdown.iti--separate-dial-code");
  if (iti_el.length) {
    iti.destroy();

    // Get the current number in the given format
  }
  for (var i = 0; i < input.length; i++) {
    iti = intlTelInput(input[i], {
      autoHideDialCode: false,
      autoPlaceholder: "aggressive",
      initialCountry: "auto",
      separateDialCode: true,
      preferredCountries: ["ru", "th"],
      customPlaceholder: function (
        selectedCountryPlaceholder,
        selectedCountryData
      ) {
        return "" + selectedCountryPlaceholder.replace(/[0-9]/g, "X");
      },
      geoIpLookup: function (callback) {
        $.get(
          "https://ipinfo.io/json?token=33b543fe392013",
          function () {},
          "jsonp"
        ).always(function (resp) {
          var countryCode = resp && resp.country ? resp.country : "";
          callback(countryCode);
        });
      },
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js", // just for
    });

    $('input[name="phone"]').on(
      "focus click countrychange",
      function (e, countryData) {
        var pl = $(this).attr("placeholder") + "";
        var res = pl.replace(/X/g, "9");
        if (res != "undefined") {
          $(this).inputmask(res, {
            placeholder: "X",
            clearMaskOnLostFocus: true,
          });
        }
      }
    );

    $('input[name="phone"]').on("focusout", function (e, countryData) {
      var intlNumber = iti.getNumber();
      console.log(intlNumber);
    });
  }
});
