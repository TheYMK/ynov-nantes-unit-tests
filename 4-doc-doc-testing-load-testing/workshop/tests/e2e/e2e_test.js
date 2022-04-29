const assert = require('assert')
Feature('TODO APP');

Scenario('Test if user can add a new todo', async ({ I }) => {
    I.amOnPage('http://localhost:5002');
    I.fillField('#newTODO', 'Installer docker et docker-compose');
    I.click('#create-todo')
    I.wait(5)
    I.see('Installer docker et docker-compose')
});

Scenario('Test if user can mark a todo as done', async ({ I }) => {
  I.amOnPage('http://localhost:5002');
  I.fillField('#newTODO', 'Installer VSCode');
  I.click('#create-todo')
  I.wait(5)
  I.see('Installer VSCode')
  I.click('[data-todo="donetodo-1"]')
  I.wait(5)
  const newTodoText = await I.grabTextFrom('#donetodo-1');
  assert.equal(newTodoText, 'Installer VSCode');
});

Scenario('Test if user can remove a todo', async ({ I }, page) => {
  I.amOnPage('http://localhost:5002');
  I.fillField('#newTODO', 'Installer Postman');
  I.click('#create-todo')
  I.wait(5)
  I.see('Installer Postman')
  I.click('[data-todo="canceltodo-2"]')
  I.dontSee('Installer Postman')
});
