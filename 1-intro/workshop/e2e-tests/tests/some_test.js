const assert = require('assert')
Feature('Ynov Nantes');

Scenario('Test Ynov Nantes Land Page', async ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');
    I.click('.icon-search')
    await within('.searchform', () => {
        I.fillField('#s', 'Info')
    })
    let searchResult = await I.grabTextFrom('.tile-title');
    assert.equal(searchResult, 'Bachelor Informatique');

});