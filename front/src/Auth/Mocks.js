
const EXPECTED_BODY = {

  REGISTER_SUCCESSFUL: {
    errors: null,
  },

  REGISTER_FAIL: {
    errors: {
      "username":
        [
          "A user with that username already exists."
        ]
    },
  },

  LOGIN_SUCCESSFUL: {
    errors: null,
    data: {
      first_name: 'George',
      last_name: 'Orwell',
    }
  },

  LOGIN_FAIL: {
    errors: ['Invalid username and/or password!'],
  },

  LOGOUT_SUCCESSFUL: {
    errors: null,
  },

  ME_SUCCESSFUL: {
    errors: null,
    data: {
      user: {
        first_name: 'George',
        last_name: 'Orwell',
        username: 'george',
      }
    }
  },

}

class MockApp {
  constructor() {
    this.setUserCalled = false;
  }
  setUser(user) {
    this.setUserCalled = true;
  }
}

export { EXPECTED_BODY, MockApp }
