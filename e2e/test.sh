#!/bin/sh

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR="$CUR_DIR/.."

export REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST:-"http://localhost:3000"}

# Clear DB for tests
sqlite3 ${BASE_DIR}/api/db.sqlite3 "DELETE FROM  auth_user WHERE username='mocktest_george'";

# Tests
testcafe chrome ${BASE_DIR}/e2e/auth.js
