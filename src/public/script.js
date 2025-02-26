(function(){
	const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}`;
	document.getElementById('qrForm')?.addEventListener('submit', function (e) {
		e.preventDefault();
	
		const content = document.getElementById('content').value;
		const data = { content }
		generateQRCode(data);
	});
	
	async function generateQRCode(data){
		const button = document.getElementById('send_button');
		const button_icon = document.getElementById('send_button_icon');
		const qrResultDiv = document.getElementById('qrResult');
		try {
			button.disabled = true;
			button_icon.classList.remove('hidden');
			const request = await fetch(`${BASE_URL}/generate-qr`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ data })
			});

			if (!request.ok){
				throw new Error("HTTP ERROR");
			}
			const response = await request.blob();
	
			const qrImage = document.createElement('img');
			const qrImageUrl = URL.createObjectURL(response);
			qrImage.src = qrImageUrl;
			qrResultDiv.innerHTML = '';
			qrImage.className = 'w-48 h-48';
			qrResultDiv.appendChild(qrImage);
			button.disabled = false;
			button_icon.classList.add('hidden');
	
		} catch (error) {
			button.disabled = false;
			button_icon.classList.add('hidden');
			console.error('Error generating QR code:', error)
		}
	}

	function generateQRCode_v1(data){
		fetch(`${BASE_URL}/generate-qr`, {
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
	}
})();