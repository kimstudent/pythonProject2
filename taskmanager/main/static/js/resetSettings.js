document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('factory-reset');

    resetButton.addEventListener('click', function() {
        // Сбрасываем язык до английского
        currentLang = 'en';
        localStorage.setItem('language', currentLang);
        changeLang();
        
        // Сбрасываем тему до светлой
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');

        // Обновляем интерфейс
        const languageSelect = document.getElementById('language-select');
        languageSelect.value = 'en';

        alert('Settings have been reset to default.');
    });
});
// на сайте если быть точнее на странице настрроек есть в самом низу кнопка которая сбрасывает все настройки типа до заводских. ну пока что это язык тема и все. потом надо будет добавить чтобы при нажатии на кнопку он сбрасивал и диаграммы до 0. и типа память всех датчиков тоже сбрасывал
