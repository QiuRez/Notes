export function setCookie(name, value, date = 7) {
	let dateNow = new Date(Date.now());
	dateNow.setDate(dateNow.getDate() + date);
	document.cookie = name + "=" + value + ";expires=" + dateNow.toUTCString();
}

export function removeCookie ( cookie_name )
{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

export function getCookie(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
