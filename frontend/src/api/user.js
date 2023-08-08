import { API } from "../config/config";


export const signin = user => {
  return fetch(`${API}/u/signin`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

//register

export const signup = user => {
  return fetch(`${API}/u/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

export const apigetDataFollow = (id, Userid) => {
  return fetch(`${API}/u/follow/check`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id,Userid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apipostStatusFollow = (id, Userid) => {
  return fetch(`${API}/u/follow/modify`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id,Userid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apimodifyUser = (object) => {
  return fetch(`${API}/u/modify`, {
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

export const apiaddCity = (object) => {
  return fetch(`${API}/u/addcity`, {
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

export const apigetDataUser = (id) => {
  return fetch(`${API}/u/data/${id}`, {
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

export const apigetDataCities = (id) => {
  return fetch(`${API}/u/data/${id}`, {
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


// export const apigetDataCities = async () => {
//   const url = 'https://localhost:44364/Service1.svc';
//   const headers = {
//     'Content-Type': 'text/xml;charset=UTF-8',
//     'soapAction': 'http://Microsoft.ServiceModel.Samples/IService/getCiudades',
//   };

//   const xml = `
//     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
//       <soapenv:Body>
//         <GetUserById xmlns="http://Microsoft.ServiceModel.Samples">
//         </GetUserById>
//       </soapenv:Body>
//     </soapenv:Envelope>
//   `;

//   try {
//     const response = await soapRequest({ url: url, headers: headers, xml: xml });
//     return response.body;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

