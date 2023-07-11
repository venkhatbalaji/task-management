const isStandalone = (port) => String(port) === String(3000);
const appName = "task"
export const getUisvcBaseURL = () => {
  const { protocol, port, hostname } = window.location;
  return isStandalone(port)
    ? `${protocol}//${hostname}:${8085}`
    : process.env.NODE_ENV === "production"
    ? "prod url"
    : "testing";
};

export const getPagePath = (path) => {
  if (isStandalone(window.location.port)) {
    return path;
  }
  return `/${appName}` + path;
};
