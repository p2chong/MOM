document.getElementById("help_button").addEventListener("click",function(event){
	ga("send", "event", 'help', 'click');
	event.preventDefault();
	document.location.href = '../help/help';
});