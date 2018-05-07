import { Selector } from 'testcafe';

fixture`Auth`
  .page`${process.env.REACT_APP_BACKEND_HOST}`;


test('Register', async t => {
  await t
    .click("#login_register_menu")
    .typeText('#register_username', 'mocktest_george')
    .typeText('#register_password', 'password')
    .typeText('#register_first_name', 'George')
    .typeText('#register_last_name', 'Orwell')
    .typeText('#register_email', 'george@orwell.com')
    .click("#register_submit")
    .expect(Selector('#btn_logout').innerText).eql('Logout');
});

test('Login', async t => {
  await t
    .click("#login_register_menu")
    .typeText('#login_username', 'mocktest_george')
    .typeText('#login_password', 'password')
    .click("#login_submit")
    .expect(Selector('#btn_logout').innerText).eql('Logout');
});
