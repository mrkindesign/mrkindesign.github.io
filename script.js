document
  .getElementById("linkButton")
  .addEventListener("click", function (event) {
    const bungie_client_id = "44038"; // Nahraďte svým skutečným client_id
    const bungie_client_secret = "iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU"; // Nahraďte svým skutečným client_secret
    const authCode = "c75397005633d988f94b427fe135a36f"; // Nahraďte svým skutečným autorizačním kódem

    fetch("https://www.bungie.net/Platform/App/OAuth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${window.btoa(
          `${bungie_client_id}:${bungie_client_secret}`
        )}`,
      },
      body: new URLSearchParams({
        client_id: bungie_client_id,
        grant_type: "authorization_code",
        code: authCode,
      }).toString(),
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // Zde můžete provádět další akce s přístupovým tokenem, např. získání profilu hráče.
      })
      .catch(function (error) {
        console.error(error);
      });
  });

// const authorizationCode = "e1cba45c83aeef366e2500abcea1614c"; // Nahraďte hodnotou svého platného autorizačního kódu.

// if (authorizationCode) {
//   const clientId = "44038";
//   const clientSecret = "iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU";
//   const grantType = "authorization_code";

//   const tokenUrl = "https://www.bungie.net/platform/app/oauth/token/";
//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//   };
//   const data = new URLSearchParams({
//     code: authorizationCode,
//     grant_type: grantType,
//   });

//   fetch(tokenUrl, {
//     method: "POST",
//     headers: headers,
//     body: data,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.access_token);
//       // Zde můžete provádět další akce s přístupovým tokenem, např. získání profilu hráče.
//     })
//     .catch((error) => console.error(error));
// } else {
//   console.log("Autorizační kód není k dispozici.");
// }

// const urlParams = new URLSearchParams(window.location.search);
// const authorizationCode = urlParams.get("code");

// if (authorizationCode) {
//   const clientId = "44038";
//   const clientSecret = "iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU";
//   const grantType = "authorization_code";

//   const tokenUrl = "https://www.bungie.net/platform/app/oauth/token/";
//   const headers = {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
//   };
//   const data = new URLSearchParams({
//     code: authorizationCode,
//     grant_type: grantType,
//   });

//   fetch(tokenUrl, {
//     method: "POST",
//     headers: headers,
//     body: data,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.access_token);
//       // Zde můžete provádět další akce s přístupovým tokenem, např. získání profilu hráče.
//     })
//     .catch((error) => console.error(error));
// } else {
//   console.log("Autorizační kód není k dispozici.");
// }

// const clientId = "44038";
// const clientSecret = "iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU";
// const authorizationUrl = "https://www.bungie.net/en/OAuth/Authorize";
// const grant_type = "authorization_token";
//const authorizationCode = "91323b576a3ec18b901134308f17a6b0";

// const tokenUrl = "https://www.bungie.net/platform/app/oauth/token/";
// const headers = { "Content-Type": "application/x-www-form-urlencoded" };
// const data = new URLSearchParams({
//   client_id: clientId,
//   client_secret: clientSecret,
//   code: authorizationCode,
//   grant_type: grantType,
// });

// // Odeslání POST požadavku pro získání přístupového tokenu
// fetch(tokenUrl, {
//   method: "POST",
//   headers: headers,
//   body: data,
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data.access_token))
//   .catch((error) => console.error(error));

// const tokenUrl = "https://www.bungie.net/platform/app/oauth/token/";
// const clientId = "44038";
// const clientSecret = "iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU";
// const authorizationCode = "YOUR_AUTHORIZATION_CODE"; // Získejte tento kód z procesu OAuth 2.0
// const redirectUri = "https://destinice.space"; // Tato hodnota musí být shodná s URL, která byla použita při registraci aplikace
// const API_KEY = "e124a8f93b4a49a8b71f04b9e40503a8";

// const requestOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   body: new URLSearchParams({
//     client_id: clientId,
//     client_secret: clientSecret,
//     grant_type: "authorization_code",
//     code: authorizationCode,
//     redirect_uri: redirectUri,
//   }),
// };

// fetch(tokenUrl, requestOptions)
//   .then((response) => response.json())
//   .then((data) => {
//     const accessToken = data.access_token;
//     const refreshToken = data.refresh_token;
//     console.log("Přístupový token:", accessToken);
//     console.log("Obnovovací token:", refreshToken);

//     // Uložte obnovovací token pro pozdější použití při obnovení přístupového tokenu
//   })
//   .catch((error) => console.error(error));

// const apiKey = "e124a8f93b4a49a8b71f04b9e40503a8";
// const accessToken = "váš_přístupový_token";
// const membershipType = 3; // Steam
// const membershipId = "4611686018528150250";
// const url = `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=200`;

// const headers = new Headers();
// headers.append("X-API-Key", apiKey);
// headers.append("Authorization", `Bearer ${accessToken}`);

// fetch(url, {
//   headers: headers,
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error(`Chyba: ${response.status}`);
//     }
//   })
//   .then((data) => {
//     const characters = data.Response.characters.data;
//     console.log(characters);

//     // Zde můžete zpracovat a zobrazit data o postavách
//     // Například vytisknout ID a třídu postavy:
//     for (const characterId in characters) {
//       console.log(
//         `ID postavy: ${characterId}, třída postavy: ${characters[characterId].classType}`
//       );
//     }
//   })
//   .catch((error) => console.error(error));
