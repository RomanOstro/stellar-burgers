const BURGER_TEST_URL = 'https://norma.nomoreparties.space/api';

beforeEach(() => {
  cy.visit('http://localhost:4000/');

  //  Перехватываем запрос получения ингредиентов и вставляем свои
  cy.intercept('GET', `${BURGER_TEST_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });

  // Запрашиваем данные пользователя при рендере главной страницы
  cy.intercept('GET', `${BURGER_TEST_URL}/auth/user`, {
    fixture: 'userResponse.json'
  });

  cy.intercept('POST', `${BURGER_TEST_URL}/orders`, {
    fixture: 'orderResponse.json'
  });
});

describe('Тест конструктора бургера', () => {
  it('Добавляем элементы в конструктор', () => {
    // Находим элемент булки и добавляем ее в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').children('button').click();

    // Находим элемент начинки и добавляем его в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').children('button').click();
    // Находим элемент соуса и добавляем его в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').children('button').click();
  });

  it('Открытие модального окна и закрытие по Х', () => {
    // // Открываем модальное окно булки
    cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').click();

    // Проверяем наличие модального окна в DOM
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]')
      .find('h3')
      .contains('Флюоресцентная булка R2-D3');

    // Проверяем что в ссылке модалки, находится тот id ингредиента на который кликнули
    cy.url().should('include', '643d69a5c3f7b9001cfa093d');

    // Закрытие модального окна по крестику Х
    cy.get('[data-cy="modal"]').find('button').click();

    // Проверяем отсутствие модального окна в DOM
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Открытие модального окна и закрытие по Esc', () => {
    // // Открываем модальное окно
    cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').click();
    cy.get('[data-cy="modal"]')
      .should('exist')
      .trigger('keydown', { key: 'Escape' });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Открытие модального окна и закрытие оверлею', () => {
    cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modalOverlay_close-button"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('refreshTocken', 'storageToken');
    });

    cy.setCookie('accessToken', 'cookieToken');
  });

  afterEach(() => {
    cy.clearLocalStorage('refreshTocken');
    cy.clearCookie('accessToken');
  });

  it('добавление ингредиентов в конструктор и нажатие на кнопку Оформить-заказ', () => {
    // Находим элемент булки и добавляем ее в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa093d"]').children('button').click();
    // Находим элемент начинки и добавляем его в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').children('button').click();
    // Находим элемент соуса и добавляем его в конструктор
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').children('button').click();
    //  Находим кнопку оформления заказа и кликаем по ней
    cy.get('[data-cy="order-button"]').find('button').click();
    //  она в DOM
    cy.get('[data-cy="modal"]').should('exist');
    //  Проверяем корректный номер заказа
    cy.get('[data-cy="modal"]').find('h2').contains('12345');
    //  Закрываем модалку
    cy.get('[data-cy="modal"]').find('button').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    //Проверяем что не добавлены булки
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-down"]').should('not.exist');

    //Проверяем что ингредиенты не добавлены
    cy.get('[data-cy="constructor-ingredients"]')
      .children()
      .should('have.length', 1);
    cy.get('[data-cy="constructor-ingredients"]')
      .children()
      .contains('Выберите начинку');
  });
});
