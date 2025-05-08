const token = {
  marketplace_name: "figo",
  email: "playwright@test.com",
  token: "2740ebfd31e04818be20ab34316dcd2c",
};

const invalidToken = {
  marketplace_name: "figo",
  email: "playwright@test.com",
  token: "invalid-token",
};

export const encryptedToken = btoa(JSON.stringify(token));

export const invalidEncryptedToken = btoa(JSON.stringify(invalidToken));
