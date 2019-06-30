class Musician {
  constructor(albumsUrl) {
    this.albumsUrl = albumsUrl;
  }

  async getAlbums() {
    const data = await fetch(this.albumsUrl);
    return data.json();
  }
}

const musician = new Musician('https://jsonplaceholder.typicode.com/albums');

musician.getAlbums().then(albums => console.log(albums));
