document.getElementById('qrForm').addEventListener('submit', function (e) {
	e.preventDefault();

	// const id = document.getElementById('qr-id').value;
	const content = document.getElementById('qr-content').value;
	const data = { content }

	fetch('http://localhost:3500/generate-qr', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data })
	})
		.then(response => response.blob())
		.then(blob => {
			const qrImage = document.createElement('img');
			const qrImageUrl = URL.createObjectURL(blob);
			qrImage.src = qrImageUrl;
			const qrResultDiv = document.getElementById('qrResult');
			qrResultDiv.innerHTML = '';
			qrImage.className = 'w-48 h-48';
			qrResultDiv.appendChild(qrImage);
		})
		.catch(error => console.error('Error generating QR code:', error));

});