const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .menu a")

for(item of menuItems) {
    
    if(currentPage.includes(item.getAttribute("href"))) {
    
        item.classList.add("active")
    }
}



const cards = document.getElementsByClassName('card')
const buttons = document.getElementsByClassName('toggleContent')

for (let card of cards) {
	card.addEventListener('click', function() {
		const recipeId = card.getAttribute('id')
		window.location.href = `/recipes/${recipeId}`
	})
}

for (let button of buttons) {
	button.addEventListener('click', function() {
    if (!button) return

		let details = button.parentElement.nextElementSibling

		if (button.innerHTML === 'MOSTRAR') {
			button.innerHTML = 'ESCONDER'
			return details.classList.remove('hide')
		} else if (button.innerHTML === 'ESCONDER') {
			button.innerHTML = 'MOSTRAR'
			return details.classList.add('hide')
		}
	})
}