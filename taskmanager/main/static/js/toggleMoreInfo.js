// эта херь типа кнопка на основной странице которая типа печатает красиво текст. эта кнопка после кнопки настройки снизу находит

document.addEventListener('DOMContentLoaded', function() {
    const moreButton = document.getElementById('more-button');
    const moreInfo = document.getElementById('more-info');

    const localizationTexts = {
        "More-Text-1": {
            ru: "Последнее обновление системы было выполнено 20 мая 2024 года.",
            en: "The last system update was performed on May 20, 2024.",
            kz: "Соңғы жүйе жаңартуы 2024 жылдың 20 мамырында орындалды."
        },
        "More-Text-2": {
            ru: "Следующее запланированное обновление: 15 июня 2024 года. Все системы работают стабильно, нет предупреждений о безопасности.",
            en: "The next scheduled update: June 15, 2024. All systems are operating stably, no security warnings.",
            kz: "Келесі жоспарланған жаңарту: 2024 жылдың 15 маусымы. Барлық жүйелер тұрақты жұмыс істейді, қауіпсіздік ескертулері жоқ."
        },
        "More-Text-3": {
            ru: "Все подключенные устройства функционируют нормально.",
            en: "All connected devices are functioning normally.",
            kz: "Барлық қосылған құрылғылар қалыпты жұмыс істейді."
        },
        "More-Text-4": {
            ru: "Обнаружены проблемы с двумя устройствами: Кухонный светильник, Термостат в спальне.",
            en: "Problems detected with two devices: Kitchen light, Bedroom thermostat.",
            kz: "Екі құрылғымен ақаулар анықталды: Ас үй шамы, Жатын бөлмедегі термостат."
        }
    };

    // Функция для "печатания" текста
    function typeText(element, text, delay) {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, delay);
    }

    moreButton.addEventListener('click', function() {
        if (moreInfo.style.display === "none") {
            moreInfo.style.display = "block";
            moreInfo.querySelectorAll('p').forEach(p => p.innerHTML = "");

            const texts = [
                localizationTexts["More-Text-1"][currentLang],
                localizationTexts["More-Text-2"][currentLang],
                localizationTexts["More-Text-3"][currentLang],
                localizationTexts["More-Text-4"][currentLang]
            ];

            texts.forEach((text, index) => {
                setTimeout(() => {
                    typeText(moreInfo.querySelectorAll('p')[index], text, 50);
                }, index * 3000);
            });
        } else {
            moreInfo.style.display = "none";
        }
    });

    document.addEventListener("languageChange", function() {
        if (moreInfo.style.display === "block") {
            moreInfo.querySelectorAll('p').forEach(p => p.innerHTML = "");
            const texts = [
                localizationTexts["More-Text-1"][currentLang],
                localizationTexts["More-Text-2"][currentLang],
                localizationTexts["More-Text-3"][currentLang],
                localizationTexts["More-Text-4"][currentLang]
            ];
            texts.forEach((text, index) => {
                typeText(moreInfo.querySelectorAll('p')[index], text, 50);
            });
        }
    });
});
