
const EXPECTED_BODY = {

  LIST_OF_POSTS: {
    errors: null,
    data: {
      posts: [
        {
          id: '1',
          message: 'War is peace. Freedom is slavery. Ignorance is strength.',
          author_name: 'George Orwell',
          created_at: '2018-05-05T23:45:59.733621Z',
        },
        {
          id: '2',
          message: 'All animals are equal, but some animals are more equal than others.',
          author_name: 'George Orwell',
          created_at: '2018-05-05T22:23:00.065067Z',
        },
      ]
    }
  },

  NEW_POST_SUCCESSFUL: {
    errors: null,
  },

}

class MockApp {
  constructor() {
    this.setUserCalled = false;
    this.updatePostsCalled = false;
  }
  setUser(user) {
    this.setUserCalled = true;
  }
  updatePosts() {
    this.updatePostsCalled = true;
  }
}

export { EXPECTED_BODY, MockApp }
