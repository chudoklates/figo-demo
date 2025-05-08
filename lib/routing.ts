export const navigateReplace = (path: string) => {
  window.history.replaceState(null, "", path);
  location.reload();
};

export const navigate = (path: string) => {
  window.history.pushState(null, "", path);
  location.reload();
};
