
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
