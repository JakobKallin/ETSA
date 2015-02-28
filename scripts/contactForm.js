function contactForm() {
	var link = document.getElementById('contactLink');
	link.onclick = function() {
		var form = document.getElementById('contact');
		toggle(form);
		if (form.style.display == 'block') {
			window.location.href = '#contact';
		}
		return false;
	}
	var form = document.getElementById('contact');
	form.style.display = 'none';
}

function toggle(el) {
	if (el.style.display === 'block') {
		el.style.display = 'none';
	} else {
		el.style.display = 'block';
	}
}

addLoadEvent(contactForm);