// With JQuery
$(document).ready(function() {
	$('#ex1').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});
});
