$(document).ready(function() {
  $(document).on('click', '[data-toggle="dropdown"]', function(e) {
    e.preventDefault();
    $(this).siblings('.dropdown-menu').toggleClass('show');
  });
});

function drawChart(target, options) {
  console.log(target);
  const ctx = document.getElementById(target).getContext('2d');
  var chart = new Chart(ctx, options);
  return chart;
}