// With JQuery
$(document).ready(function() {
  $("#insanity").slider();
  populateFormFields();
});

var q = {
  faction: str => {
    $(`#faction-${str}`).prop("checked", true);
  },
  food: val => $("#food").val(val),
  color: val => $("#color").val(val),
  insanity: val => $("#insanity").slider("setValue", val)
};

function populateFormFields() {
  getParsedCookies().forEach(el => {
    if (el[0].length > 0 && $.isFunction(q[el[0]])) {
      q[el[0]](el[1]);
    }
  });
}

function getParsedCookies() {
  return document.cookie
    .split(";")
    .map(el => decodeURIComponent(el.trim()).split("="));
}
