const apiKey = "e124a8f93b4a49a8b71f04b9e40503a8";
const clientId = "44038";
const clientSecret = "iAm99vYYKsYWcF9-g04u0Vy3G-XJOv0lPfXS4P4Z2cU";
const redirectUri = "https://mrkindesign.github.io/";
const scope = "1 2 4 8"; // ReadBasicUserProfile, ReadGroups, WriteGroups, AdminGroups

// Funkce pro přesměrování na autorizační stránku
function redirectToAuthorization() {
  const authUrl = "https://www.bungie.net/en/OAuth/Authorize";
  const responseType = "code";
  const url = `${authUrl}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;

  window.location.href = url;
}

// Zde bude další kód pro získání přístupového tokenu a komunikaci s Destiny 2 API.

async function getAccessToken(authorizationCode) {
  const tokenUrl = "https://www.bungie.net/Platform/App/OAuth/Token/";
  const encodedAuthorization = btoa(`${clientId}:${clientSecret}`);

  const response = await $.ajax({
    url: tokenUrl,
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedAuthorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "authorization_code",
      code: authorizationCode,
      redirect_uri: redirectUri,
    },
  });

  return response.access_token;
}

async function callDestiny2Api(endpoint, accessToken) {
  const apiUrl = `https://www.bungie.net/Platform${endpoint}`;

  const response = await $.ajax({
    url: apiUrl,
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.Response;
}

(async () => {
  // Získání autorizačního kódu z URL parametrů
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");

  if (authorizationCode) {
    // Získání přístupového tokenu pomocí autorizačního kódu
    const accessToken = await getAccessToken(authorizationCode);

    // Vyvolání Destiny 2 API požadavku s přístupovým tokenem
    const endpoint = "/Destiny2/Manifest/";
    const data = await callDestiny2Api(endpoint, accessToken);

    console.log(data);
  } else {
    redirectToAuthorization();
  }
})();
