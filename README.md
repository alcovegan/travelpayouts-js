
# Node.js Travelpayouts API (Aviasales / JetRadar) wrapper

Node.js библиотека для работы с [Travelpayouts API](http://www.travelpayouts.com/?marker=11885.github&locale=ru) с некоторыми *opinionated defaults* и использованием промисов. Поддерживается только получение данных об авиабилетах. Библиотека вдохновлена [node-travelpayouts](https://github.com/Alex7Kom/node-travelpayouts), в ней можно найти так же работу с поиском авиабилетов и партнерской статистикой.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Установка](#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0)
- [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
- [Дефолтные настройки](#%D0%B4%D0%B5%D1%84%D0%BE%D0%BB%D1%82%D0%BD%D1%8B%D0%B5-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8)
- [Обработка ошибок](#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA)
- [Результаты ответа API и переформатирование](#%D1%80%D0%B5%D0%B7%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%82%D1%8B-%D0%BE%D1%82%D0%B2%D0%B5%D1%82%D0%B0-api-%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
- [Генерация ссылок на поиск билетов](#%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D1%81%D1%81%D1%8B%D0%BB%D0%BE%D0%BA-%D0%BD%D0%B0-%D0%BF%D0%BE%D0%B8%D1%81%D0%BA-%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D0%BE%D0%B2)
- [Отладка](#%D0%BE%D1%82%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0)
- [Методы](#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B)
- [Цены](#%D1%86%D0%B5%D0%BD%D1%8B)
  - [api.prices_for_dates(options)](#apipricesfordatesoptions)
  - [api.grouped_prices(options)](#apigroupedpricesoptions)
  - [api.latest(options)](#apilatestoptions)
  - [api.monthMatrix(options)](#apimonthmatrixoptions)
  - [api.weekMatrix(options)](#apiweekmatrixoptions)
  - [api.nearestPlacesMatrix(options)](#apinearestplacesmatrixoptions)
  - [api.cheap(options)](#apicheapoptions)
  - [api.monthly(options)](#apimonthlyoptions)
  - [api.direct(options)](#apidirectoptions)
  - [api.calendar(options)](#apicalendaroptions)
  - [api.holidaysByRoutes(options)](#apiholidaysbyroutesoptions)
  - [api.minPricesCalendar(options)](#apiminpricescalendaroptions)
- [Карта цен](#%D0%BA%D0%B0%D1%80%D1%82%D0%B0-%D1%86%D0%B5%D0%BD)
  - [api.directions(options)](#apidirectionsoptions)
  - [api.prices(options)](#apipricesoptions)
- [Направления](#%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F)
  - [api.airline(options)](#apiairlineoptions)
  - [api.city(options)](#apicityoptions)
- [Использование с async/await](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%81-asyncawait)
- [Хелперы](#%D1%85%D0%B5%D0%BB%D0%BF%D0%B5%D1%80%D1%8B)
- [Тесты](#%D1%82%D0%B5%D1%81%D1%82%D1%8B)
- [Todos](#todos)
- [Лицензия](#%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Установка
```
$ npm install travelpayouts-js
```

## Использование
1. Зарегистрируйтесь в [Travelpayouts](http://www.travelpayouts.com/?marker=11885.github&locale=ru)
2. Получите API-токен в разделе [Разработчикам → API](https://www.travelpayouts.com/developers/api)
3. Подключите библиотеку в коде:

```js
const lib = require('travelpayouts-js');
const api = lib({token: 'полученный_токен'})
```

Или в одну строку:
```js
const api = require('travelpayouts-js')({token: 'полученный_токен'});
```

Также можно передать токен как `TPAPITOKEN=token` через `process.env` при запуске приложения или указав в `.env`-файле.

4. Готово. Теперь можно вызывать методы API.

## Дефолтные настройки

Во многих методах есть некоторые предустановленные по умолчанию опции, которые используются при запросе. Чтобы перезаписать их, нужно явно передать нужную опцию и ее значение. В целом в качестве дефолтов я старался использовать дефолтные значения из документации API, но это не везде так.

Возможно, вам понадобится, чтобы запрос прошел без каких-то опций, у которых установлены дефолты (и даже если их не указать, они все равно будут подставлены в строку запроса). Для этого можно передать в опциях параметр `removeParams` со значением в виде массива названий параметров, которые нужно удалить из запроса, например:

Мы хотим убрать из метода `api.weekMatrix()` дефолтные параметры `depart_date` и `return_date` (там, в случае если не передать их, они устанавливаются как завтрашняя дата и сегодняшняя дата + 2 недели соответственно):
```js
api.weekMatrix({ origin: "MOW", destination: "BKK", removeParams: ['depart_date', 'return_date'] })
```
Теперь эти два параметра не будут подставлены в запрос, даже если для них были какие-то дефолты. Чтобы точно понять какие данные уходят в запрос, можно использовать параметр `debug` (подробнее ниже в разделе __Отладка__).

Всё это я постарался подробно описать в каждом из методов. Также я попытался максимально описать некоторые, не всегда очевидные, моменты использования API.

## Обработка ошибок

Поскольку мне нужна была стабильная работа модуля, даже в случае если API вернет ошибку (неважно по какой причине - упало API или неправильно переданы параметры) - на ошибки возвращается пустой массив (кроме методов `holidaysByRoutes`, `minPricesCalendar` `directions` и `airline` - тут вернется пустой объект). В будущем постараюсь сделать это опциональным или настраиваемым.

## Результаты ответа API и переформатирование

Результаты некоторых методов API я переформатирую в другой вид, для своего удобства. Например объект в массив. Об этом подробно написано в каждом из методов, которые это затронуло, с пояснениями что было и что стало.

## Генерация ссылок на поиск билетов

У вас есть возможность возвращать данные по билетам, которые уже будут содержать нужную ссылку на поисковую выдачу с подставленными данными (город вылета и прилета, даты вылета/прилета, кол-во взрослых, детей и младенцев и прочее). Подробнее можно почитать в разделе [Партнерские ссылки](https://support.travelpayouts.com/hc/ru/articles/203638568-Партнерские-ссылки).

Для генерации ссылки нужно передать вместе с опциями запроса параметр `generateUrls`, например:

```js
api.city({
	origin: "MOW",
	generateUrls: {
		oneway: 0,
		adults: 1,
		children: 0,
		infants: 0,
		trip_class: 0,
		marker: 666777888,
		with_request: true,
		currency: 'rub',
		locale: 'ru',
		url: 'http://whitelabel.yoursite.ru'
	}
})
.then(data => console.log(data))
```

Можно передавать все параметры из таблицы описания параметров запроса ([здесь, пролистать чуть ниже после открытия](https://support.travelpayouts.com/hc/ru/articles/203638568-%D0%9F%D0%B0%D1%80%D1%82%D0%BD%D0%B5%D1%80%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8#015)), кроме: `origin_iata`, `destination_iata`, `depart_date`, `return_date` (они подставляются из параметров каждого конкретного билета).

Кроме того можно подставить URL запроса: по умолчанию он `http://hydra.aviasales.ru`. Полезно, если у вас есть White Label или вы хотите спрятать ссылку на aviasales. Для этого нужно добавить в опции параметр `url` со значением в виде домена (показано выше в примере).

В каждом методе где можно сгенерировать ссылку - она будет параметром `searchlink` в каждом из билетов. Например:

```js
{
	origin: 'MOW',
	destination: 'TBS',
	price: 7280,
	transfers: 1,
	airline: 'A3',
	flight_number: 973,
	departure_at: '2018-01-24T05:20:00Z',
	return_at: '2018-02-04T11:50:00Z',
	expires_at: '2017-07-22T13:27:20Z',
	searchlink: 'http://hydra.aviasales.ru/searches/new?origin_iata=MOW&destination_iata=TBS&depart_date=2018-01-24&return_date=2018-02-04&adults=1&children=0&infants=0&trip_class=0&marker=2178729379&with_request=true&currency=rub&locale=ru'
}
```

## Отладка
В любой из методов можно передать параметр `debug: true`. В таком случае в консоль будет выводиться следующая информация:
- опции которые были переданы в запросе к API;
- конечный URL запроса (из консоли можно кликнуть этот URL и открыть в браузере (обычно нужно зажать для этого клавишу `Cmd` (MacOS) или `Ctrl` (Windows))).

Выглядит это так:
![скриншот отладки](https://user-images.githubusercontent.com/9094917/28378151-d866dc4a-6cb7-11e7-8e77-f72c786403fc.png)

## Методы

## Цены

### api.prices_for_dates(options)
[Cамые дешевые авиабилеты на определённые даты](https://support.travelpayouts.com/hc/ru/articles/203956163-Aviasales-API-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0-%D0%BA-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B4%D0%BB%D1%8F-%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D1%91%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B#prices-for-dates)

Новый метод в API версии 3 (aviasales/v3/prices_for_dates), позволяющий заменить три эндпоинта API версии 1:

 - /v1/prices/cheap — выставить параметры direct=false и sorting=price
 - /v1/prices/direct — выставить параметры direct=true и sorting=price
 - /v1/city-directions — выставить параметры sorting=route и unique=true. Передавать только origin

#### Параметры

См. описание в [документации метода](https://support.travelpayouts.com/hc/ru/articles/203956163-Aviasales-API-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0-%D0%BA-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B4%D0%BB%D1%8F-%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D1%91%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B#prices-for-dates). Все значения из документации можно передать в вызов метода. Актуальны так же параметры описанные выше - __debug__ и __generateUrls__.

### api.grouped_prices(options)

Новый метод в API версии 3 (aviasales/v3/grouped_prices), позволяющий заменить два эндпоинта API версии 1:

 - /v1/prices/calendar — передать в group_by значение departure_at или return_at
 - /v1/prices/monthly — передать в group_by значение month и не передавать параметры departure_at и return_at

См. описание в [документации метода](https://support.travelpayouts.com/hc/ru/articles/203956163-Aviasales-API-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0-%D0%BA-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%B4%D0%BB%D1%8F-%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D1%91%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%8B#grouped-prices). Все значения из документации можно передать в вызов метода. Актуальны так же параметры описанные выше - __debug__ и __generateUrls__.

### api.latest(options)
[Цены на авиабилеты за 48 часов](https://support.travelpayouts.com/hc/ru/articles/203956163#02)

#### Замечания
1. Если не указывать `period_type` = `month` явно, то он будет использован по умолчанию и будет автоматически подставлен `beginning_of_period` = дата текущего месяца с первого числа.
2. Если не указывать `period_type` = `month` явно и указать `beginning_of_period`, то будет использован `period_type` = `month` и переданный `beginning_of_period`.
3. Если указать `period_type` = `year`, то `beginning_of_period` (даже если передать его) не будет использован (потому что в случае запроса с сочетанием этих двух параметров API отдает пустой ответ).
4. Если не передаются оба значения `origin` и `destination` - из запроса удаляются `period_type` и `beginning_of_period` (в случае если сделать запрос с ними - запрос зависнет и ничего не вернет). В случае, если запрос идет без `origin` и `destination` - *API вернет 30 самых дешевых билетов, которые были найдены за последние 48 часов* (это из документации к API. Если передать параметр limit - то вернет не 30, а кол-во указанное в нем).
5. Можно делать запросы указывая отдельно `origin` или `destination`. В этом случае будут выводиться билеты *все из origin в разных направлениях* или соответственно наоборот *все в destination из разных origin*.
6. Этот метод **поддерживает** использование двухзначных кодов страны.

#### Параметры

#### currency
Type: `string`

Default: `rub`

#### origin
Type: `string`

Default: `none`

#### destination
Type: `string`

Default: `none`

#### beginning\_of\_period
Type: `string`

Default: `первый день текущего месяца` (в формате `YYYY-MM-DD`)

#### period_type
Type: `string`

Default: `month`

Supported: `year`, `month`

#### one_way
Type: `Boolean`

Default: `false`

#### page
Type: `Number`

Default: `1`

#### limit
Type: `Number`

Default: `30`

Maximum: `1000`

#### show\_to\_affiliates
Type: `Boolean`

Default: `true`

#### sorting
Type: `string`

Default: `price`

Supported: `price`, `route`, `distance_unit_price`

#### trip_class
Type: `Number`

Default: `0`

Supported: `0`, `1`, `2`

#### trip_duration
Type: `Number`

Default: `none`

### api.monthMatrix(options)
[Календарь цен на месяц](https://support.travelpayouts.com/hc/ru/articles/203956163#03)

#### Замечания
1. Если не передать явно `month`, будет использована дата указанная выше в Default. Так сделано потому, что если не передать этот параметр - API почему-то отдает билеты, как будто использована дата **следующего** месяца.
2. По дефолту, если не передавать `origin` или `destination` - API Travelpayouts использует коды `LED` (Санкт-Петербург) и `HKT` (Пхукет) соответственно. Потому передавать их нужно здесь явно, если конечно вам не нужен именно этот маршрут.
3. Несмотря на заявление в документации к API, что можно передавать двузначный код страны в `origin` и `destination` - это не работает и API возвращает ошибку, в которой пишет, что код короче чем 3 знака.

#### Параметры

#### currency
Type: `string`

Default: `rub`

#### origin
Type: `string`

Default: `LED` (API defaults)

#### destination
Type: `string`

Default: `HKT` (API defaults)

#### show\_to\_affiliates
Type: `Boolean`

Default: `true`

#### month
Type: `string`

Default: `первый день текущего месяца` (в формате `YYYY-MM-DD`)

### api.weekMatrix(options)
[Календарь цен на неделю](https://support.travelpayouts.com/hc/ru/articles/203956163#19)

#### Параметры

#### currency
Type: `string`

Default: `rub`

#### origin
Type: `string`

Default: `LED` (API defaults)

#### destination
Type: `string`

Default: `HKT` (API defaults)

#### show\_to\_affiliates
Type: `Boolean`

Default: `true`

#### depart\_date
Type: `string`

Default: `дата завтрашнего дня` (в формате YYYY-MM-DD)

#### return\_date
Type: `string`

Default: `дата: сегодня + 2 недели` (в формате YYYY-MM-DD)

### api.nearestPlacesMatrix(options)
[Цены по альтернативным направлениям](https://support.travelpayouts.com/hc/ru/articles/203956163#04)

#### Параметры

#### currency
Type: `string`

Default: `rub`

#### origin
Type: `string`

Default: `LED` (API defaults)

#### destination
Type: `string`

Default: `HKT` (API defaults)

#### show\_to\_affiliates
Type: `Boolean`

Default: `true`

#### depart\_date
Type: `string`

Default: `дата: сегодня + 2 дня` (в формате YYYY-MM-DD)

#### return\_date
Type: `string`

Default: `дата: сегодня + 2 недели` (в формате YYYY-MM-DD)

#### distance
Type: `Number`

Default: `1000`

Описание: расстояние (в километрах) от пунктов назначения и отправления, на котором ищутся соседние города

#### limit
Type: `Number`

Default: `1`

Описание: количество выводимых вариантов от 1 до 20. Где 1 - это только вариант с указанынми пунктами назначения и отправления

#### flexibility
Type: `Number`

Default: `0`

Описание: расширение диапазона дат в большую и меньшую сторону. Значение может быть от 0 до 7, где 0 - в результате будут только варианты на указанные даты, 7 - все найденные варианты за неделю до указанных дат и неделю после

### api.cheap(options)
[Самые дешевые авиабилеты](https://support.travelpayouts.com/hc/ru/articles/203956163#05)

#### Замечания
__Данный метод переформатирует ответ от API из объекта в массив.__ В оригинале ответ представляет собой объект с ключами в виде кода города назначения, внутри которого также лежат объекты с ключами в виде чисел, означающих количество пересадок (0-3). В переформатированном виде в каждый из объектов билетов добавляются параметры origin, destination и number\_of\_changes (количество пересадок). В массиве значения располагаются по возрастанию кол-ва пересадок. В случае если в качестве destination использовать прочерк (-, что означает в любом направлении, объекты для каждого из destination так же располагаются в порядке возрастания кол-ва пересадок).

#### Параметры

#### origin
Type: `string`

Default: `MOW` (Москва, моя дефолтная настройка)

#### destination
Type: `string`

Default: `-` (тире, при этом значении выводятся любые направления из `origin`)

#### depart\_date
Type: `string`

Default: `none` (указывать в формате YYYY-MM)

#### return\_date
Type: `string`

Default: `none` (указывать в формате YYYY-MM)

#### page
Type: `Number`

Default: `1`

Описание: необязательный параметр, используется для отображения найденных данных (по умолчанию на странице отображается 100 найденных вариантов. Если не выбран destination, то данных может быть больше. В этом случае используйте page, для отображения следующего набора данных, например, page=2).

#### currency
Type: `string`

Default: `rub`

### api.monthly(options)
[Самые дешевые авиабилеты по месяцам](http://api.travelpayouts.com/#v1_prices_monthly_endpoint)

Возвращает самые дешевые билеты для выбранного направления на год вперёд. По одной цене на каждый месяц.

#### Замечания
__Данный метод переформатирует ответ от API из объекта в массив.__ В оригинале ответ представляет собой объект с ключами в виде даты в формате YYYY-MM. В переформатированном ответе эта дата добавляется в объект каждого из билетов как параметр __month__.

__Nota bene:__ Можно передать в origin и destination __одновременно__ двухзначный код страны и трехзначный код города соответственно, и наоборот.

#### Параметры

#### currency
Type: `string`

Default: `rub`

#### origin
Type: `string`

Default: `MOW` (Москва, API default)

Замечания: можно передавать двузначный код страны (несмотря на то, что в API написано *Длина не более 3. Длина не менее 3.*)

#### destination
Type: `string`

Default: `LED` (Санкт-Петербург, моя дефолтная настройка)
Замечания: можно передавать двузначный код страны

### api.direct(options)
[Билеты без пересадок](https://support.travelpayouts.com/hc/ru/articles/203956163#06)

Возвращает самый дешевый билет без пересадок для выбранного направления с фильтрами по датам вылета и возвращения.

#### Замечания
__Данный метод переформатирует ответ от API из объекта в массив.__

#### Параметры

#### origin
Type: `string`

Default: `MOW` (Москва, моя дефолтная настройка)

#### destination
Type: `string`

Default: `-` (любые направления, моя дефолтная настройка)

#### depart\_date
Type: `string`

Required: `false`

Default: `none` (указывать в формате YYYY-MM)

#### return\_date
Type: `string`

Required: `false`

Default: `none` (указывать в формате YYYY-MM)

#### currency
Type: `string`

Default: `rub`

### api.calendar(options)
[Билеты из города на любое число месяца](https://support.travelpayouts.com/hc/ru/articles/203956163#07)

#### Замечания
__Данный метод переформатирует ответ от API из объекта в массив.__ В оригинале ответ представляет собой объект с ключами в виде даты в формате YYYY-MM-DD, для каждого из дней месяца из depart\_date. В переформатированном виде эта дата добавляется в объект каждого из билетов как параметр __day\_of\_month__.

#### Параметры

#### origin
Type: `string`

Default: `MOW` (Москва, моя дефолтная настройка)

#### destination
Type: `string`

Default: `LED` (Санкт-Петербург, моя дефолтная настройка)

#### depart\_date
Type: `string`

Default: `текущий месяц` (в формате YYYY-MM)
Замечания: если не передать сюда ничего, то будет использован текущий месяц в формате YYYY-MM. Если же передать пустую строку, то будут выведены результаты аж на год вперёд. Какие-то особенности API.
Также, если ничего не передать и до конца месяца меньше недели - будет использована дата следующего месяца в формате YYYY-MM.

#### return\_date
Type: `string`

Default: `none`

Замечания: если не передать сюда ничего, но передать `depart_date`, то выведутся просто билеты на указанный там месяц.
Если передать пустую строку в `depart_date` и передать `return_date`, то он выступит своеобразные ограничителем даты и выведет билеты до конца месяца `return_date` с текущей даты (но почему-то иногда не по 30-31 число, а до 25-29).
Если передавать оба параметра, то соответственно выведутся билеты подходящие под оба параметра.

#### calendar\_type
Type: `string`

Default: `departure_date`

Supported: `departure_date`, `return_date`

#### trip\_duration
Type: `Number`

Default: `none`

#### currency
Type: `string`

Default: `rub`

### api.holidaysByRoutes(options)
[Самые дешевые билеты на выходные](http://api.travelpayouts.com/#v2_prices_holidays-by-routes_endpoint)

#### Параметры

#### currency
Type: `string`

Default: `rub`

### api.minPricesCalendar(options)
[Календарь цен](https://support.travelpayouts.com/hc/ru/articles/203972143-API-%D0%BA%D0%B0%D0%BB%D0%B5%D0%BD%D0%B4%D0%B0%D1%80%D1%8F-%D1%86%D0%B5%D0%BD)

#### Параметры

#### origin
Type: `string`

Default: `none`

#### destination
Type: `string`

Default: `none`

#### depart\_date
Type: `string`

Default: `сегодняшняя дата + 2 дня` (в формате YYYY-MM-DD)

#### one_way
Type: `Boolean`

Default: `false`

## Карта цен

### api.directions(options)
[Поддерживаемые направления](https://support.travelpayouts.com/hc/ru/articles/203755406-API-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D1%86%D0%B5%D0%BD)

#### Параметры

#### origin\_iata
Type: `string`

Default: `MOW` (Москва, моя дефолтная настройка)

#### one\_way
Type: `Boolean`

Default: `false`

#### locale
Type: `string`

Default: `ru`

### api.prices(options)
[Цены](https://support.travelpayouts.com/hc/ru/articles/203755406-API-%D0%BA%D0%B0%D1%80%D1%82%D1%8B-%D1%86%D0%B5%D0%BD)

#### Параметры

#### origin\_iata
Type: `string`

Default: `MOW`

#### period
Type: `string`

Default: `текущий месяц с первого числа:month` (пример: 2017-07-01:month)

Supported: `month` (указывать как `2017-08-01:month`), `season` (указывать как `2017-08-01:season`), `year` (указывать как `year` без месяца)

#### direct
Type: `Boolean`

Default: `true`

#### one\_way
Type: `Boolean`

Default: `false`

#### no\_visa
Type: `Boolean`

Default: `true`

#### schengen
Type: `Boolean`

Default: `true`

#### need\_visa
Type: `Boolean`

Default: `true`

#### locale
Type: `string`

Default: `ru`

#### min\_trip\_duration\_in\_days
Type: `Number`

Default: `13`

#### max\_trip\_duration\_in\_days
Type: `Number`

Default: `31`

## Направления

### api.airline(options)
[Популярные направления авиакомпании](https://support.travelpayouts.com/hc/ru/articles/203956163#08)

#### Замечания
Стоит отметить, что это достаточно медленный метод API.

#### Параметры

#### airline\_iata
Type: `string`

Default: `SU` (Аэрофлот, моя дефолтная настройка)

#### limit
Type: `Number`

Default: `10` (моя дефолтная настройка)
Max: `1000`

### api.city(options)
[Популярные направления из города](https://support.travelpayouts.com/hc/ru/articles/203956163#20)

#### Замечания
__Данный метод переформатирует ответ от API из объекта в массив.__ В оригинале ответ представляет собой объект с ключами в виде кода города назначения. В переформатированном виде просто возвращается массив с объектами.

#### Параметры

#### origin
Type: `string`

Default: `MOW` (Москва, моя дефолтная настройка)

#### currency
Type: `string`

Default: `rub`

## Использование с async/await

Минимально необходимая версия NodeJS >= __7.6__.

Пример:
```js
const api = require('travelpayouts-js')({token: "your_token_here"});

async function getAll() {

	const week   = api.weekMatrix({origin: "MOW", destination: "BKK"});
	const month  = api.monthMatrix({origin: "MOW", destination: "BKK"});
	const cheap  = api.cheap({origin: "MOW", destination: "BKK", generateUrls: { adults: 1, infants: 0 }});
	const direct = api.direct({origin: "MOW", destination: "BKK"});
	const latest = api.latest({origin: "MOW", limit: 10});

	return await Promise.all([week, month, cheap, direct, latest])
}

// Получить данные:
getAll().then(data => console.log(data))

// Получить именованные данные (ES6 destructuring):
getAll.then(([week, month, cheap, direct, latest]) => {

	console.log(week);
	console.log(month);
	console.log(cheap);
	console.log(direct);
	console.log(latest);

})

```

## Хелперы

Пока что в модуле есть один хелпер - __daysBeforeNextMonth__. Возвращает количество дней до следующего месяца. Может быть полезно для некоторых методов API, которые возвращают пустые значения, когда до конца месяц остается меньше чем несколько дней.

Использование:

```js
api.helpers.daysBeforeNextMonth
```

## Тесты

To-do.

## Todos

[ ] Тесты
[ ] Написать лучше оформленную и более понятную документацию
[ ] Почистить дублирующийся код

Не откажусь от любой помощи, присылайте пулл-реквесты!

## Лицензия

The MIT License (MIT)

Copyright (c) 2017 Alexander Sharabarov alcovegan@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
