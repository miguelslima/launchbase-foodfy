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

const PhotosUpload = {
	input: "", 
	preview: document.querySelector('#photos-preview'),
	uploadLimit: 6,
	files: [],
	handleFileInput(event) {
		const { files: fileList } = event.target;
		PhotosUpload.input = event.target;
		
		if(PhotosUpload.hasLimit(event)) {
			return;
		}

		Array.from(fileList).forEach((file) => {
			PhotosUpload.files.push(file);

			const reader = new FileReader();
			
			reader.onload = () => {
				const image = new Image();
				image.src = String(reader.result);
				
				const div = PhotosUpload.getContainer(image)
				PhotosUpload.preview.appendChild(div);
			}

			reader.readAsDataURL(file);
		})

		PhotosUpload.input.files = PhotosUpload.getAllFiles();
	},
	hasLimit(event) {
		const { uploadLimit, input, preview } = PhotosUpload
		const { files: fileList } = input

		if (fileList.length > uploadLimit) {
				alert(`Envie no máximo ${uploadLimit} fotos`)
				event.preventDefault()
				return true
		}

		const photosDiv = []
		preview.childNodes.forEach(item => {
				if (item.classList && item.classList.value == "photo")
						photosDiv.push(item)
		})

		const totalPhotos = fileList.length + photosDiv.length
		if (totalPhotos > uploadLimit) {
				alert("Você atingiu o limite máximo de fotos")
				event.preventDefault()
				return true
		}

		return false
},
	getAllFiles() {
		const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();

		PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

		return dataTransfer.files;
	},
	getContainer(image) {
		const div = document.createElement('div');
		div.classList.add('photo');

		div.onclick = PhotosUpload.removePhoto;

		div.appendChild(image);
		div.appendChild(PhotosUpload.getRemoveButton());

		return div;
	},
	getRemoveButton() {
		const button = document.createElement('i');
		button.classList.add('material-icons');
		button.innerHTML = 'close';
		return button;
	},
	removePhoto(event) {
		const photoDiv = event.target.parentNode;
		const photosArray = Array.from(PhotosUpload.preview.children);
		const index = photosArray.indexOf(photoDiv);

		PhotosUpload.files.splice(index, 1);
		PhotosUpload.input.files = PhotosUpload.getAllFiles();

		photoDiv.remove();
	}
}