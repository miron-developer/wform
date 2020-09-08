'use strict'


const initDoctors = () =>
    `<option value="Иванов">Иванов</option>
    <option value="Захаров">Захаров</option>
    <option value="Чернышева">Чернышева</option>`;

const initDocTypes = () =>
    `<option value="Паспорт">Паспорт</option>
    <option value="Свидетельство о рождении">Свидетельство о рождении</option>
    <option value="Вод. удостоверение">Вод. удостоверение</option>`;

const addRequired = () => {
    const rqs = document.querySelectorAll('.form input:required');
    rqs.forEach(r => r.parentElement.insertAdjacentHTML('afterbegin', `<span class="rqStyle">*</span>`));
}

const infoUser = (where, text) => where.insertAdjacentHTML('afterEnd', `<span class="dntValid rqStyle">${text}</span>`);

const validateForm = async() => {
    const number = document.querySelector('.valPhone');
    if (!(/^7{1}\d{10}$/.test(number.value))) return infoUser(number, 'wrong number');

    const dates = document.querySelectorAll('.form input[type="date"]');
    for (let date of dates.values()) {
        const year = parseInt(date.value.split('-')[0]);
        console.log(year);
        if (year < 1950 || year > 3000) return infoUser(date, 'wrong date');
    }

    return true;
}

const submitForm = async(e) => {
    e.preventDefault();
    const ok = await validateForm();
    if (ok) alert('passs');
}

const init = () => {
    document.body.insertAdjacentHTML(
        'beforeend',
        `<div class="form">
            <form action="/" method="POST">
                <h2>Атрибуты</h2>
                <div class="form-attrs">
                    <div class="fio">
                        <label>Фамилия:  <input type="text" name="surname" placeholder="Фамилия" required></label>
                        <label>Имя:      <input type="text" name="name" placeholder="Имя" required></label>
                        <label>Отчество: <input type="text" name="patronymic" placeholder="Отчество" required></label>
                    </div>

                    <label>Дата рождения:  <input type="date" name="bdate" placeholder="2020-02-02" required></label>
                    <label>Номер телефона: <input class="valPhone" type="tel" name="bdate" placeholder="7-777-777-7777" required></label>

                    <div class="gender">Пол:
                        <label><input type="radio" name="gender" value="Мужской">Мужской</label>
                        <label><input type="radio" name="gender" value="Женский">Женский</label>
                    </div>

                    <div class="group">Группа клиентов:
                        <label> VIP:        <input type="checkbox" name="vip" value="VIP"></label>
                        <label> Проблемные: <input type="checkbox" name="problem" value="Проблемные"></label>
                        <label> ОМС:        <input type="checkbox" name="omc" value="ОМС"></label>
                    </div>

                    <div class="doctor">
                        <label>Лечащий врач:
                            <select name="doctor">
                               ${initDoctors()}
                            </select>
                        </label>
                    </div>

                    <label> Не отправлять СМС. <input type="checkbox" name="sms" value="Не отправлять СМС"></label>
                </div>

                <h2>Адрес</h2>
                <div class="address">
                    <label>Индекс:  <input type="number" name="index"   placeholder="Индекс"></label>
                    <label>Страна:  <input type="text"   name="country" placeholder="Страна"></label>
                    <label>Область: <input type="text"   name="region"  placeholder="Область"></label>
                    <label>Город:   <input type="text"   name="city"    placeholder="Город" required></label>
                    <label>Улица:   <input type="text"   name="street"  placeholder="Улица"></label>
                    <label>Дом:     <input type="text"   name="home"    placeholder="Дом"></label>
                </div>

                <h2>Паспорт</h2>
                <div class="passport">
                    <div class="passport-type">
                        <label>Тип документа:
                            <select name="passportType" required>
                               ${initDocTypes()}
                            </select>
                        </label>
                    </div>

                    <label>Серия:       <input type="text"   name="serie"    placeholder="Серия"></label>
                    <label>Номер:       <input type="text"   name="number"   placeholder="Номер"></label>
                    <label>Кем выдан:   <input type="text"   name="whoGive"  placeholder="Кем выдан"></label>
                    <label>Дата выдачи: <input type="date"   name="giveDate" placeholder="2020-02-02" required></label>
                </div>

                <input type="submit" value="Отправить">
            </form>
        </div>`
    );
    addRequired();
    document.querySelector('.form form').addEventListener('submit', submitForm)
}

document.addEventListener('DOMContentLoaded', init);
document.body.addEventListener('click', () => document.querySelectorAll('.dntValid').forEach(msg => msg.remove()));