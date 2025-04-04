const { NODE_ENV } = process.env;

export function isDev() {
  return NODE_ENV === "development";
}
