const clientId = "YOUR_CLIENT_ID"; // Změňte za svého klienta ID
const clientSecret = "YOUR_CLIENT_SECRET"; // Změňte za svůj klienta Secret
const grantType = "authorization_code";
const authorizationCode = "YOUR_AUTHORIZATION_CODE"; // Změňte za svůj autorizační kód

const getTokenButton = document.getElementById("getTokenButton");
getTokenButton.addEventListener("click", getToken);

async function getToken() {
  try {
    const response = await fetch(
      "https://www.bungie.net/platform/app/oauth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // kódování klientského ID a klientského Secretu do base64
        },
        body: `grant_type=${grantType}&code=${authorizationCode}`,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data.access_token);
    } else {
      console.error(
        `Chyba získání přístupového tokenu: ${data.error_description}`
      );
    }
  } catch (error) {
    console.error("Nastala chyba:", error);
  }
}
