interface UserData {
   avatar_url: string,
   name: string,
   login: string,
   bio: string,
   public_repos: number,
   followers: number,
   following: number,
   location: string,
   email: string,
   blog: string,
   html_url: string
}

let userData: UserData; // global variable
let totalStars: number = 0;
let languages: [string, number][] = [];
let TOKEN: string;
let tokenRecieved: boolean = false;
let header: RequestInit | undefined = {};

getToken("github");

async function getToken(service: string) {
   // console.log("Fetching token...");
   const response = await fetch(`/token/${service}`);
   if (response.ok) {
      const token = await response.text() as string;
      tokenRecieved = true;
      // console.log("Token received.");
      TOKEN = token;
      header = {
         'headers': {
            'Authorization': `token ${TOKEN}`
         }
      }
   } else {
      showError("Token Error", "Failed to fetch token. Try reloading the page.", "bg-red-800");
      console.error('Error fetching token:', response.statusText);
   }
}




async function getUserInfo() {
   if (!tokenRecieved) {
      // console.log('Waiting for token to be received...');
      setTimeout(getUserInfo, 200);
      return;
   }

   try {
      // console.log(header);
      const response = await fetch(`https://api.github.com/users/${username}`, header);
      if (response.ok) {
         userData = await response.json();
         updateData();
         updateGithubStats();
         await getRepoData();
      } else if (response.status === 404) {
         showError("Oh no!", "User does not exist. Try another username.", "bg-red-800");
      } else {
         showError("Connection Error", "Failed to fetch user data. Try reloading the page.", "bg-red-800");
         console.error("Failed to fetch user data. Status:", response.status, response);
      }
   }
   catch (error) {
      showError("Connection Error", "Could not request user data.", "bg-red-800");
      console.error("Failed to request user data. Error - ", error);
   }
}

async function getRepoData() {
   try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, header);
      const repos = await response.json();

      getRepoStars(repos);
      getRepoLangs(repos);
   } catch (error) {
      showError("Oh no!", "Could not get user repository data.", "bg-red-800");
      console.error('Error fetching data:', error);
   }
}

async function getRepoLangs(repos: any[]) {
   let langs: { [key: string]: number } = {};
   languages = [];

   for (const repo of repos) {
      const repoResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`, header);
      const repoData = await repoResponse.json();

      for (const lang in repoData) {
         if (langs.hasOwnProperty(lang)) {
            langs[lang] += repoData[lang];
         } else {
            langs[lang] = repoData[lang];
         }
      }
   }

   let sortedLangs: [string, number][] = [];
   for (let lang in langs) {
      languages.push([lang, langs[lang]] as [string, number]);
   }

   languages.sort(function (a, b) {
      return b[1] - a[1];
   });

   const total = languages.reduce((acc, curr) => acc + curr[1], 0);
   const percentLanguages: [string, number][] = languages.map(lang => [lang[0], Math.round((lang[1] / total) * 100)]);

   generateLanguageElements(percentLanguages);

   return languages;
}