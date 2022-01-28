/* eslint-disable no-undef */
export function getCookie(name) {
  if (typeof document !== "undefined") {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    const exists = cookies.find((el) => el.trim().indexOf(name) === 0);
    if (exists) {
      return exists.trim().substring(name.length + 1);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, milliseconds = 3600000) {
  const d = new Date();
  d.setTime(d.getTime() + milliseconds);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}
