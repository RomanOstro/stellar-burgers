# Проект Stellar Burger

Стек: HTML, SCSS, TS, React, Redux, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JSX компонентами
- src/components/services/slices -  папка с слайсами и Unit-тестами
- src/components/services - папка с глобальным хранилищем Redux

Важные файлы:
 - src/utils/burger-api - файл с запросами к серверу
 - src/utils/types - файл с типами


 ## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Запуск документации Storybook

```
npm run storybook
```

## Базовый код
### Api (src/utils/burger-api)
Файл отвечает за запросы к серверу:\
Методы Api:\
`checkResponse`  - проверка успешного ответа с сервера\
`refreshToken` - получение refreshToken\
`fetchWithRefresh` - GET запрос с обновлением токена\
`getIngredientsApi` - запрос на получение ингредиентов с сервера\
`getFeedsApi` - запрос на получение истории заказов



