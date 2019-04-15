class ServerApi {

  static Base_url = 'http://localhost:3000/users';

  static getUserData(userId){
      return this.get(this.Base_url + '/' + userId);
  }

  static get(url) {
    return fetch(url).then(resp => resp.json());
  }

  static getUsers() {
    return fetch(this.Base_url).then(resp => resp.json())
  }


}




