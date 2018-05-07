#!/bin/sh

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR="$CUR_DIR/.."

# Wait host to be ready
export REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST:-"http://localhost:3000"}
host=`echo ${REACT_APP_BACKEND_HOST} | sed 's/https\?:\/\///'`
$BASE_DIR/e2e/wait-for-it ${host}

# Clear DB for tests
sqlite3 ${BASE_DIR}/api/db.sqlite3 "DELETE FROM  auth_user WHERE username='mocktest_george'";
sqlite3 ${BASE_DIR}/api/db.sqlite3 "DELETE FROM  wall_post WHERE message='mocktest: This is my message'";

# Tests
testcafe chrome ${BASE_DIR}/e2e/auth.js \
                ${BASE_DIR}/e2e/wall.js
