
const EXPECTED_BODY = {

  REGISTER_SUCCESSFUL: {
    errors: null,
  },

  LOGIN_SUCCESSFUL: {
    errors: null,
    data: {
      first_name: 'George',
      last_name: 'Orwell',
    }
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
