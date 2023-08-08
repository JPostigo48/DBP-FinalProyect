import { API } from "../config/config";

export const apigetPublications = () => {
  return fetch(`${API}/p/list`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetPublicationsByUser = (id) => {
  return fetch(`${API}/p/postsbyuser/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apicheckFile = (id) => {
  return fetch(`${API}/p/file/check/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetFile = (id) => {
  return fetch(`${API}/p/file/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      if (response.ok) {
        return response.blob(); // Obtén el contenido del archivo como un objeto Blob
      } else {
        throw new Error("Error al obtener el archivo");
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}


export const apigetLikes = (Postid) => {
  return fetch(`${API}/p/likes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({Postid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetDataLike = (id, Postid) => {
  return fetch(`${API}/p/like/check`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id,Postid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apipostStatusLike = (id, Postid) => {
  return fetch(`${API}/p/like/modify`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id,Postid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apicreatePost = (formData) => {
  return fetch(`${API}/p/create`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetPostSearched = (object) => {
  return fetch(`${API}/p/search`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}