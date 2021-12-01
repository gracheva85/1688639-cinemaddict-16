//Временный файл
export const getData = (url, onSuccess, password) => fetch(url,
  {method:'GET',
    headers: {'Authorization': `Basic ${  password}`}
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {

  });
