export async function getAndChangeFon() {
  const urlFon = 'https://source.unsplash.com/featured/?grey,black';
  const fonResponce = await fetch(urlFon);
  const fonData = fonResponce.url;
  const bodyFon = document.querySelector('body');
  bodyFon.style.backgroundImage = `url(${fonData})`;
}
