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

Scenario('Can send application', async ({ I }) => {
    I.amOnPage('https://register.ynov.com/?_s=&_c=701D0000000r85M');
    I.fillField('#prenom', 'John')
    I.fillField('#nom', 'Doe')
    I.fillField('#mail', 'johndoe3@gmail.com')
    I.checkOption("J'accepte de recevoir des informations sur les formations Ynov par e-mail");
    I.fillField('#telephone', '0000000000')
    I.checkOption("J'accepte de recevoir des informations sur les formations Ynov par SMS");
    I.fillField('#mot_de_passe', '@Iamverysecure007')
    // Afficher le mot de passe
    I.click('.dripicons-preview')
    I.selectOption({ css: 'form select[name=formation_id]' }, 'Ynov Informatique');
    I.selectOption({ css: 'form select[name=ville_id]' }, 'Nantes');
    I.selectOption({ css: 'form select[name=f_12_programme_id]' }, 'Mastère1 Ynov Informatique');
    I.click('#register_btn')

    I.wait(5)
    I.see('Merci de votre candidature !');

    pause()

});

