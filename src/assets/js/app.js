$(document).ready(function() {
  $(document).on('click', '[data-toggle="dropdown"]', function(e) {
    e.preventDefault();
    $(this).siblings('.dropdown-menu').toggleClass('show');
  });
});

function generateC3(data) {
  return c3.generate(data);
}