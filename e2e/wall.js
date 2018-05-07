import { Selector } from 'testcafe';

fixture`Wall`
  .page`${process.env.REACT_APP_BACKEND_HOST}`;


test('Login and post to wall', async t => {
  await t
    .click("#login_register_menu")
    .typeText('#login_username', 'mocktest_george')
    .typeText('#login_password', 'password')
    .click("#login_submit")
    .expect(Selector('#btn_logout').innerText).eql('Logout');

  await t
    .typeText('#newpost_message', 'mocktest: This is my message')
    .click("#newpost_submit")
    .expect(Selector('.jumbotron p:first-child').innerText).eql('mocktest: This is my message');
});
