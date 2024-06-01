// это полное дерьмо


function updateDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    document.getElementById('currentDateTime').innerText = new Intl.DateTimeFormat('ru-RU', options).format(now);
}

setInterval(updateDateTime, 1000);

function updateSensorData() {
    document.getElementById('outsideTemp').innerText = (20 + Math.random() * 5).toFixed(1) + '°F';
    document.getElementById('insideTemp').innerText = (15 + Math.random() * 3).toFixed(1) + '°F';
    document.getElementById('waterUsage').innerText = (480 + Math.random() * 30).toFixed(0) + ' CF';
    document.getElementById('internetSpeed').innerText = (40 + Math.random() * 10).toFixed(1) + ' Mbps';
}

setInterval(updateSensorData, 5000);

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Красный', 'Синий', 'Желтый'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('cameraVideo');
    const snapshotButton = document.getElementById('snapshotButton');

    snapshotButton.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        //дат и вр на изо
        const now = new Date();
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(now.toLocaleString(), 10, 25);
    
        const imageData = canvas.toDataURL('image/png');
    
        // Снимок в localStorage сукаааааааа
        let images = localStorage.getItem('galleryImages') ? JSON.parse(localStorage.getItem('galleryImages')) : [];
        images.push({ src: imageData, timestamp: now.toString() });
        localStorage.setItem('galleryImages', JSON.stringify(images));
        alert('Snapshot saved to Gallery!');
    });

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.error('Ошибка при доступе к камере: ', error);
            });
    } else {
        alert('getUserMedia не поддерживается вашим браузером!');
    }

    // Обновление датчиков тут полня хуйня. пока что стоит типа рандомайзер
    function updateSensorData() {
        document.getElementById('lightSensor').innerText = (Math.random() > 0.5 ? localizationTexts["Sensor-On"][currentLang] : localizationTexts["Sensor-Off"][currentLang]);
        document.getElementById('temperatureSensor').innerText = (20 + Math.random() * 5).toFixed(1) + '°C';
        document.getElementById('humiditySensor').innerText = (30 + Math.random() * 10).toFixed(1) + '%';
        document.getElementById('motionSensor').innerText = (Math.random() > 0.5 ? localizationTexts["Sensor-Detected"][currentLang] : localizationTexts["Sensor-NotDetected"][currentLang]);
        document.getElementById('gasSensor').innerText = (Math.random() > 0.5 ? localizationTexts["Sensor-Normal"][currentLang] : localizationTexts["Sensor-Danger"][currentLang]);
        document.getElementById('curtainStatus').innerText = (Math.random() > 0.5 ? localizationTexts["Sensor-Closed"][currentLang] : localizationTexts["Sensor-Open"][currentLang]);
        document.getElementById('doorStatus').innerText = (Math.random() > 0.5 ? localizationTexts["Sensor-DoorClosed"][currentLang] : localizationTexts["Sensor-DoorOpen"][currentLang]);
    }

    setInterval(updateSensorData, 5000);
});




// галлерея

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const previewContainer = document.getElementById('preview-container');
    const preview = document.getElementById('preview');
    const previewDate = document.getElementById('preview-date');
    let images = localStorage.getItem('galleryImages') ? JSON.parse(localStorage.getItem('galleryImages')) : [];

    if (images.length === 0) {
        gallery.innerHTML = '<p>No images in Gallery.</p>';
    } else {
        images.forEach(function(image, index) {
            const img = document.createElement('img');
            img.src = image.src;
            img.classList.add('gallery-img');
            img.onclick = function() {
                preview.src = image.src;
                previewDate.textContent = 'Captured: ' + new Date(image.timestamp).toLocaleString();
                previewContainer.style.display = 'block';
            };

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = function() {
                images.splice(index, 1);
                localStorage.setItem('galleryImages', JSON.stringify(images));
                window.location.reload();
            };

            const imgContainer = document.createElement('div');
            imgContainer.appendChild(img);
            imgContainer.appendChild(removeBtn);
            gallery.appendChild(imgContainer);
        });
    }
});

function closePreview() {
    document.getElementById('preview-container').style.display = 'none';
}

