export const getFirstnameLastname = (name: string | null) => {
  if (!name) {
    return { firstname: "", lastname: "" };
  }

  const includesSpecialCharacters = /[^a-züöäß\s]/gim.test(name);

  if (!includesSpecialCharacters) {
    const [firstname, lastname] = name
      .trim()
      .split(" ")
      .map((n) => capitalize(n));
    return { firstname, lastname };
  }

  if (/^,/.test(name)) {
    const [lastname, firstname] = name
      .trim()
      .split(",")
      .map((n) => n.trim())
      .map((n) => capitalize(n));

    return { firstname, lastname };
  }

  return { firstname: name, lastname: "" };
};

function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
