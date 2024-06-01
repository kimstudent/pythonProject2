// братан это страница трех языков короче по дефолту он на инглише. а так всего есть три яз каз рус и анг

const languageButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en", "kz"];

let currentLang = localStorage.getItem("language") || checkBrowserLang() || "en";

const localizationTexts = {
    "Gallery-1": { ru: "Главная", en: "Overview", kz: "Басты бет" },
    "Gallery-2": { ru: "Устройства", en: "Devices", kz: "Құрылғылар" },
    "Gallery-3": { ru: "Аналитика", en: "Analytics", kz: "Аналитика" },
    "Gallery-4": { ru: "Правила", en: "Rules", kz: "Ережелер" },
    "Gallery-5": { ru: "Галерея", en: "Gallery", kz: "Галерея" },
    "Gallery-6": { ru: "История", en: "History", kz: "Тарих" },
    "Gallery-7": { ru: "Настройки", en: "Settings", kz: "Параметрлер" },
    "Gallery-Title": { ru: "Панель управления умным домом", en: "Smart Home Control Panel", kz: "Ақылды үй басқару панелі" },
    "Gallery-Date": { ru: "Дата", en: "Date", kz: "Күні" },
    "Settings": { ru: "Настройки", en: "Settings", kz: "Параметрлер" },
    "More": { ru: "Подробнее", en: "More", kz: "Көбірек" },
    "System-Updates-Title": { ru: "Системные Обновления:", en: "System Updates:", kz: "Жүйелік жаңартулар:" },
    "System-Updates-Content": { ru: "Последнее обновление системы было выполнено 20 мая 2024 года. Следующее запланированное обновление: 15 июня 2024 года. Все системы работают стабильно, нет предупреждений о безопасности.", en: "The last system update was performed on May 20, 2024. The next scheduled update is on June 15, 2024. All systems are operating stably, no security warnings.", kz: "Жүйенің соңғы жаңартуы 2024 жылғы 20 мамырда орындалды. Келесі жоспарланған жаңарту: 2024 жылғы 15 маусым. Барлық жүйелер тұрақты жұмыс істейді, қауіпсіздік ескертулері жоқ." },
    "Device-Status-Title": { ru: "Текущий Статус Устройств:", en: "Current Device Status:", kz: "Қазіргі құрылғының күйі:" },
    "Device-Status-Content": { ru: "Все подключенные устройства функционируют нормально. Обнаружены проблемы с двумя устройствами: Кухонный светильник, Термостат в спальне.", en: "All connected devices are functioning normally. Issues detected with two devices: Kitchen light, Bedroom thermostat.", kz: "Барлық қосылған құрылғылар қалыпты жұмыс істейді. Екі құрылғыда ақаулар анықталды: Ас үй шамы, Жатын бөлме термостаты." },
    "Snapshot-Button": { ru: "Сделать снимок", en: "Take Snapshot", kz: "Суретке түсіру" },
    "Outside-Temp-Label": { ru: "Внешняя температура:", en: "Outside Temperature:", kz: "Сыртқы температура:" },
    "Inside-Temp-Label": { ru: "Внутренняя температура:", en: "Inside Temperature:", kz: "Ішкі температура:" },
    "Water-Usage-Label": { ru: "Водопотребление:", en: "Water Usage:", kz: "Су тұтыну:" },
    "Internet-Speed-Label": { ru: "Интернет скорость:", en: "Internet Speed:", kz: "Интернет жылдамдығы:" },
    "Outlets-Button": { ru: "Розетки", en: "Outlets", kz: "Розеткалар" },
    "Lights-Button": { ru: "Освещение", en: "Lights", kz: "Шамдар" },
    "Wifi-Button": { ru: "Wi-Fi", en: "Wi-Fi", kz: "Wi-Fi" },
    "Thermostats-Button": { ru: "Термостаты", en: "Thermostats", kz: "Термостаттар" },

    "Menu-1": { ru: "Главная", en: "Overview", kz: "Басты бет" },
    "Menu-2": { ru: "Устройства", en: "Devices", kz: "Құрылғылар" },
    "Menu-3": { ru: "Аналитика", en: "Analytics", kz: "Аналитика" },
    "Menu-4": { ru: "Правила", en: "Rules", kz: "Ережелер" },
    "Menu-5": { ru: "Галерея", en: "Gallery", kz: "Галерея" },
    "Menu-6": { ru: "История", en: "History", kz: "Тарих" },
    "Menu-7": { ru: "Настройки", en: "Settings", kz: "Параметрлер" },
    "Settings-Title": { ru: "Настройки", en: "Settings", kz: "Параметрлер" },
    "Settings-UserPreferences": { ru: "Пользовательские настройки", en: "User Preferences", kz: "Пайдаланушы параметрлері" },
    "Settings-Language": { ru: "Язык:", en: "Language:", kz: "Тіл:" },
    "Settings-Theme": { ru: "Тема:", en: "Theme:", kz: "Тақырып:" },
    "Settings-ToggleTheme": { ru: "Сменить тему", en: "Toggle Theme", kz: "Тақырыпты ауыстыру" },
    "Settings-Notifications": { ru: "Уведомления", en: "Notifications", kz: "Хабарламалар" },
    "Settings-EmailNotifications": { ru: "Email Уведомления:", en: "Email Notifications:", kz: "Электрондық пошта хабарламалары:" },
    "Settings-SMSNotifications": { ru: "SMS Уведомления:", en: "SMS Notifications:", kz: "SMS хабарламалары:" },
    "Settings-SecuritySettings": { ru: "Настройки безопасности", en: "Security Settings", kz: "Қауіпсіздік параметрлері" },
    "Settings-ChangePassword": { ru: "Сменить пароль:", en: "Change Password:", kz: "Құпия сөзді өзгерту:" },
    "Settings-ChangePasswordBtn": { ru: "Сменить пароль", en: "Change Password", kz: "Құпия сөзді өзгерту" },
    "Settings-System": { ru: "Система", en: "System", kz: "Жүйе" },
    "Settings-FactoryReset": { ru: "Сброс", en: "Reset", kz: "Қалпына келтіру" },

    "Rules-Title": { ru: "Правила", en: "Rules", kz: "Ережелер" },
    "Rules-Section-1": { ru: "Общие правила", en: "General Rules", kz: "Жалпы ережелер" },
    "Rules-Text-1": { ru: "Следуйте этим общим правилам, чтобы поддерживать оптимальную работу вашей системы умного дома:", en: "Follow these general rules to maintain optimal performance of your smart home system:", kz: "Ақылды үй жүйесінің оңтайлы жұмысын сақтау үшін осы жалпы ережелерді орындаңыз:" },
    "Rules-List-1-1": { ru: "Обновляйте свои устройства до последней версии прошивки.", en: "Update your devices to the latest firmware version.", kz: "Құрылғыларыңызды соңғы микробағдарламалық нұсқаға жаңартыңыз." },
    "Rules-List-1-2": { ru: "Убедитесь, что ваше сетевое соединение безопасно и стабильно.", en: "Ensure your network connection is secure and stable.", kz: "Желі қосылымының қауіпсіз және тұрақты екеніне көз жеткізіңіз." },
    "Rules-List-1-3": { ru: "Регулярно проверяйте и заменяйте батареи в беспроводных устройствах.", en: "Regularly check and replace batteries in wireless devices.", kz: "Сымсыз құрылғылардағы батареяларды үнемі тексеріп, ауыстырып отырыңыз." },
    "Rules-List-1-4": { ru: "Создавайте резервные копии конфигураций ваших устройств.", en: "Create backups of your device configurations.", kz: "Құрылғы конфигурацияларының сақтық көшірмелерін жасаңыз." },
    "Rules-List-1-5": { ru: "Проверяйте работу системы умного дома хотя бы раз в месяц.", en: "Check the operation of your smart home system at least once a month.", kz: "Ақылды үй жүйесінің жұмысын айына кемінде бір рет тексеріңіз." },
    "Rules-Section-2": { ru: "Правила безопасности", en: "Safety Rules", kz: "Қауіпсіздік ережелері" },
    "Rules-Text-2": { ru: "Безопасность - это приоритет. Соблюдайте следующие правила безопасности:", en: "Safety is a priority. Follow these safety rules:", kz: "Қауіпсіздік - бұл басымдық. Осы қауіпсіздік ережелерін сақтаңыз:" },
    "Rules-List-2-1": { ru: "Не перегружайте розетки слишком большим количеством устройств.", en: "Do not overload sockets with too many devices.", kz: "Розеткаларды тым көп құрылғылармен шамадан тыс жүктемеңіз." },
    "Rules-List-2-2": { ru: "Убедитесь, что все электрические установки выполняются профессионалами.", en: "Ensure that all electrical installations are carried out by professionals.", kz: "Барлық электр қондырғыларын кәсіпқойлар орындайтынына көз жеткізіңіз." },
    "Rules-List-2-3": { ru: "Регулярно проверяйте датчики дыма и пожарные сигнализации.", en: "Regularly check smoke detectors and fire alarms.", kz: "Түтін детекторлары мен өрт дабылдарын үнемі тексеріп отырыңыз." },
    "Rules-List-2-4": { ru: "Установите систему видеонаблюдения для повышения безопасности.", en: "Install a video surveillance system for added security.", kz: "Қауіпсіздікті арттыру үшін бейнебақылау жүйесін орнатыңыз." },
    "Rules-List-2-5": { ru: "Используйте только сертифицированные устройства и компоненты.", en: "Use only certified devices and components.", kz: "Тек сертификатталған құрылғылар мен компоненттерді пайдаланыңыз." },
    "Rules-Section-3": { ru: "Правила конфиденциальности", en: "Privacy Rules", kz: "Құпиялылық ережелері" },
    "Rules-Text-3": { ru: "Уважайте конфиденциальность и следуйте этим рекомендациям:", en: "Respect privacy and follow these guidelines:", kz: "Құпиялылықты құрметтеп, осы нұсқауларды орындаңыз:" },
    "Rules-List-3-1": { ru: "Используйте надежные, уникальные пароли для всех устройств и учетных записей.", en: "Use strong, unique passwords for all devices and accounts.", kz: "Барлық құрылғылар мен тіркелгілерге күшті, бірегей құпия сөздерді пайдаланыңыз." },
    "Rules-List-3-2": { ru: "Регулярно проверяйте и управляйте разрешениями для всех подключенных устройств.", en: "Regularly check and manage permissions for all connected devices.", kz: "Барлық қосылған құрылғыларға арналған рұқсаттарды үнемі тексеріп, басқарып отырыңыз." },
    "Rules-List-3-3": { ru: "Будьте в курсе и соблюдайте местные законы и правила конфиденциальности.", en: "Be aware of and comply with local privacy laws and regulations.", kz: "Жергілікті құпиялылық заңдары мен ережелерін біліп, сақтаңыз." },
    "Rules-List-3-4": { ru: "Не передавайте личные данные третьим лицам без необходимости.", en: "Do not share personal data with third parties without necessity.", kz: "Жеке деректерді қажетсіз үшінші тұлғалармен бөліспеңіз." },
    "Rules-List-3-5": { ru: "Используйте шифрование для защиты данных, передаваемых через сеть.", en: "Use encryption to protect data transmitted over the network.", kz: "Желіден жіберілетін деректерді қорғау үшін шифрлауды пайдаланыңыз." },
    "Rules-Section-4": { ru: "Советы по эксплуатации", en: "Operating Tips", kz: "Пайдалану бойынша кеңестер" },
    "Rules-Text-4": { ru: "Для оптимальной работы вашей системы умного дома:", en: "For optimal performance of your smart home system:", kz: "Сіздің ақылды үй жүйеңіздің оңтайлы жұмысы үшін:" },
    "Rules-List-4-1": { ru: "Следите за обновлениями программного обеспечения и устанавливайте их своевременно.", en: "Keep track of software updates and install them promptly.", kz: "Бағдарламалық жасақтама жаңартуларын қадағалап, оларды уақтылы орнатыңыз." },
    "Rules-List-4-2": { ru: "Используйте автоматизацию для упрощения ежедневных задач.", en: "Use automation to simplify daily tasks.", kz: "Күнделікті тапсырмаларды жеңілдету үшін автоматтандыруды пайдаланыңыз." },
    "Rules-List-4-3": { ru: "Регулярно тестируйте работу датчиков и актюаторов.", en: "Regularly test the operation of sensors and actuators.", kz: "Датчиктер мен жетектердің жұмысын үнемі тексеріп отырыңыз." },
    "Rules-List-4-4": { ru: "Создавайте сценарии для автоматизации процессов в вашем умном доме.", en: "Create scenarios for automating processes in your smart home.", kz: "Ақылды үйіңіздегі процестерді автоматтандыру үшін сценарийлер жасаңыз." },
    "Rules-List-4-5": { ru: "Интегрируйте умный дом с другими системами для повышения удобства и функциональности.", en: "Integrate your smart home with other systems to increase convenience and functionality.", kz: "Ыңғайлылық пен функционалдылықты арттыру үшін ақылды үйіңізді басқа жүйелермен біріктіріңіз." },

    "Settings-Text": { ru: "Настройки", en: "Settings", kz: "Параметрлер" },
    "More-Text": { ru: "Еще", en: "More", kz: "Тағы" },
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
    },


    
    "LightSensor": {
        ru: "Датчик Света",
        en: "Light Sensor",
        kz: "Жарық Сенсоры"
    },
    "TemperatureSensor": {
        ru: "Датчик Температуры",
        en: "Temperature Sensor",
        kz: "Температура Сенсоры"
    },
    "HumiditySensor": {
        ru: "Датчик Влажности",
        en: "Humidity Sensor",
        kz: "Ылғал Сенсоры"
    },
    "MotionSensor": {
        ru: "Датчик Движения",
        en: "Motion Sensor",
        kz: "Қозғалыс Сенсоры"
    },
    "GasSensor": {
        ru: "Датчик Газа",
        en: "Gas Sensor",
        kz: "Газ Сенсоры"
    },
    "Sensor-Curtains": {
        ru: "Шторы",
        en: "Curtains",
        kz: "Перделер"
    },
    "Sensor-Door": {
        ru: "Дверь",
        en: "Door",
        kz: "Есік"
    },
    "Sensor-On": {
        ru: "Включен",
        en: "On",
        kz: "Қосулы"
    },
    "Sensor-Off": {
        ru: "Выключен",
        en: "Off",
        kz: "Өшірулі"
    },
    "Sensor-Detected": {
        ru: "Обнаружено",
        en: "Detected",
        kz: "Анықталды"
    },
    "Sensor-NotDetected": {
        ru: "Нет",
        en: "Not Detected",
        kz: "Анықталған жоқ"
    },
    "Sensor-Normal": {
        ru: "Норма",
        en: "Normal",
        kz: "Норма"
    },
    "Sensor-Danger": {
        ru: "Опасность",
        en: "Danger",
        kz: "Қауіп"
    },
    "Sensor-Closed": {
        ru: "Закрыты",
        en: "Closed",
        kz: "Жабық"
    },
    "Sensor-Open": {
        ru: "Открыты",
        en: "Open",
        kz: "Ашық"
    },
    "Sensor-DoorClosed": {
        ru: "Закрыта",
        en: "Closed",
        kz: "Жабық"
    },
    "Sensor-DoorOpen": {
        ru: "Открыта",
        en: "Open",
        kz: "Ашық"
    },


    
    "Curtains": { ru: "Закрыть шторы/Открыть шторы", en: "Close Curtains/Open Curtains", kz: "Перделерді Жабу/Ашу" },
    "Door": { ru: "Открыть дверь/Закрыть дверь", en: "Open Door/Close Door", kz: "Есікті Ашу/Жабу" },
    "Lights": { ru: "Включить свет/Выключить свет", en: "Turn On Light/Turn Off Light", kz: "Жарықты Қосу/Өшіру" }
};

function changeLang() {
    const elementsToTranslate = document.querySelectorAll("[data-lang]");
    elementsToTranslate.forEach(elem => {
        const key = elem.getAttribute("data-lang");
        if (localizationTexts[key]) {
            elem.innerText = localizationTexts[key][currentLang];
        }
    });
}

function checkBrowserLang() {
    const navLang = navigator.language.slice(0, 2).toLowerCase();
    return allLangs.includes(navLang) ? navLang : null;
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("language-select");
    if (langSelect) {
        langSelect.value = currentLang;

        langSelect.addEventListener("change", (event) => {
            currentLang = event.target.value;
            localStorage.setItem("language", currentLang);
            changeLang();
        });
    }

    changeLang();
});


