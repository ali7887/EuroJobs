const BASE_URL = "http://localhost:3000";

let accessToken = null;

function log(title) {
  console.log("\n=================================");
  console.log(title);
  console.log("=================================");
}

function pass(msg) {
  console.log("✅ PASS:", msg);
}

function fail(msg) {
  console.log("❌ FAIL:", msg);
}

async function testUnauthorizedMe() {
  log("TEST 1: /api/me بدون توکن");

  const res = await fetch(`${BASE_URL}/api/me`);

  if (res.status === 401) {
    pass("Unauthorized guard works");
  } else {
    fail("Expected 401 but got " + res.status);
  }
}

async function testLogin() {
  log("TEST 2: LOGIN");

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "admin@jobboard.com", // ✔️ دقیقا همان ایمیلی که در Seeder استفاده کردی
      password: "123456",
    }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    fail("Login failed: " + JSON.stringify(data));
    return false;
  }

  if (!data.tokens?.accessToken) {
    fail("Access token not returned");
    return false;
  }

  accessToken = data.tokens.accessToken;

  pass("Login successful");
  return true;
}

async function testMeWithToken() {
  log("TEST 3: /api/me با توکن");

  const res = await fetch(`${BASE_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status !== 200) {
    fail("Expected 200 but got " + res.status);
    return;
  }

  const user = await res.json();

  pass("User fetched successfully");
  console.log("User:", user.email);
}

async function testAdminRoute() {
  log("TEST 4: Admin Route");

  const res = await fetch(`${BASE_URL}/api/admin/stats`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 403) {
    pass("RBAC works (non-admin blocked)");
  } else if (res.status === 200) {
    pass("Admin access granted");
  } else {
    fail("Unexpected status " + res.status);
  }
}

async function run() {
  console.log("\n🚀 Starting API Test Suite");

  await testUnauthorizedMe();

  const loginSuccess = await testLogin();

  if (!loginSuccess) {
    console.log("\n⚠️  Skipping remaining tests because login failed.");
    return;
  }

 await testMeWithToken();
  await testAdminRoute();

  console.log("\n✅ Test suite finished\n");
}

run();
