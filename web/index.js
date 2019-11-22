// objectToQueryString({ a:1, b:2})  => a=1&b=2
//  objectToQueryString({ a:1, b:2}, '?')  => ?a=1&b=2
const objectToQueryString = (obj, prefix = '') => Object.entries(obj)
  .reduce((prev, [key, val]) => prev += (val ? `${key}=${val}&` : ''), prefix).slice(0, -1);

// www.a.com?a=1&b=2 =>  {a: 1,b:2}
const queryStringToObject = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
  (prev, curr) => ({
    ...prev,
    [curr.slice(0, curr.indexOf('='))]: curr.slice(curr.indexOf('=') + 1)
  }),
  {}
);

const parseCookie = () => {
  const cookies = document.cookie.replace(/\s/g, '');
  return cookies.split(';').reduce((prev, curr) => ({
    ...prev,
    [curr.slice(0, curr.indexOf('='))]: curr.slice(curr.indexOf('=') + 1)
  }), {});
};

const objectToCookie = obj => Object.entries(obj).forEach(([key, value]) => value && (document.cookie = `${key}=${value}`))

const cookie = {
  // "type=1; a=1; b=2; 58tj_uuid=81df9a7a-ecba-44ae-b902-e86303db7de0; aQQ_ajkguid=A2B7FF81-3D19-4DBF-AB99-BA204B02F127; als=0; _ga=GA1.2.1527009534.1574139102; propertys=vk5my4-q179nr_vjfasb-q179jy_; __xsptplus8=8.1.1574139102.1574139413.11%234%7C%7C%7C%7C%7C%23%23ehLHTaxj8QKbDPnQ_MPol0543B1akQyH%23; ctid=11; from_weapp=1; PHPSESSID=ST-211681-PdINtJoHRjOKibZ9sMdx-passport-58corp-com; ajk_ibug_auth_info=YE9Vvp8ZQt7o3CZ2BP%2BCtqRNqVkx%2BP83xFz4VQ; sessid=BD0C552D-E0D8-A25D-4859-23349F502548; new_uv=17
  get: () => document.cookie,
  // {type: "1", a: "1", b: "2", 58tj_uuid: "81df9a7a-ecba-44ae-b902-e86303db7de0", aQQ_ajkguid: "A2B7FF81-3D19-4DBF-AB99-BA204B02F127", …}
  parse: () => parseCookie(),
  set: obj => objectToCookie(obj)
};

const query = {
  parse: url => queryStringToObject(url),
  stringify: (obj, prefix) => objectToQueryString(obj, prefix = '')
};
