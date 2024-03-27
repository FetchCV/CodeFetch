"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var userData; // global variable
var username = "";
var totalStars = 0;
var languages = [];
var TOKEN;
var tokenRecieved = false;
var header = {};
getToken("github");
function getToken(service) {
    return __awaiter(this, void 0, void 0, function () {
        var response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Fetching token...");
                    return [4 /*yield*/, fetch("/token/".concat(service))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    token = _a.sent();
                    tokenRecieved = true;
                    console.log("Token received.");
                    TOKEN = token;
                    header = {
                        'headers': {
                            'Authorization': "token ".concat(TOKEN)
                        }
                    };
                    return [3 /*break*/, 4];
                case 3:
                    showError("Token Error", "Failed to fetch token. Try reloading the page.", "bg-red-800");
                    console.error('Error fetching token:', response.statusText);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tokenRecieved) {
                        console.log('Waiting for token to be received...');
                        setTimeout(getUserInfo, 200);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    console.log(header);
                    return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username), header)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.json()];
                case 3:
                    userData = _a.sent();
                    updateData();
                    updateGithubStats();
                    return [4 /*yield*/, getRepoData()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    if (response.status === 404) {
                        showError("Oh no!", "User does not exist. Try another username.", "bg-red-800");
                    }
                    else {
                        showError("Connection Error", "Failed to fetch user data. Try reloading the page.", "bg-red-800");
                        console.error("Failed to fetch user data. Status:", response.status, response);
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    showError("Connection Error", "Could not request user data.", "bg-red-800");
                    console.error("Failed to request user data. Error - ", error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getRepoData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, repos, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username, "/repos"), header)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    repos = _a.sent();
                    getRepoStars(repos);
                    getRepoLangs(repos);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    showError("Oh no!", "Could not get user repository data.", "bg-red-800");
                    console.error('Error fetching data:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateData() {
    if (!userData) {
        showError("Oh no!", "Could get the user data, my bad", "bg-red-800");
        return;
    }
    document.querySelector(".user-info").classList.remove("hidden");
    document.querySelector(".profile-picture").src = userData.avatar_url;
    document.querySelector(".profile-name").textContent = userData.name;
    document.querySelector(".profile-handle").textContent = userData.login;
    document.querySelector(".profile-desc").textContent = userData.bio;
    document.querySelector(".profile-repos").textContent = userData.public_repos.toString();
    document.querySelector(".profile-followers").textContent = userData.followers.toString();
    document.querySelector(".profile-following").textContent = userData.following.toString();
    document.querySelector(".profile-location").textContent = userData.location;
    document.querySelector(".profile-email").textContent = userData.email;
    document.querySelector(".profile-website").textContent = "Personal Website";
    document.querySelector(".profile-github").textContent = "Github Profile";
    document.querySelector(".profile-website").href = userData.blog;
    document.querySelector(".profile-github").href = userData.html_url;
}
function getRepoStars(repos) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, repos_1, repo, repoResponse, repoData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, repos_1 = repos;
                    _a.label = 1;
                case 1:
                    if (!(_i < repos_1.length)) return [3 /*break*/, 5];
                    repo = repos_1[_i];
                    return [4 /*yield*/, fetch("https://api.github.com/repos/".concat(repo.owner.login, "/").concat(repo.name), header)];
                case 2:
                    repoResponse = _a.sent();
                    return [4 /*yield*/, repoResponse.json()];
                case 3:
                    repoData = _a.sent();
                    totalStars += repoData.stargazers_count;
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    document.querySelector(".profile-stars").textContent = totalStars.toString();
                    return [2 /*return*/, totalStars];
            }
        });
    });
}
function getRepoLangs(repos) {
    return __awaiter(this, void 0, void 0, function () {
        var langs, _i, repos_2, repo, repoResponse, repoData, lang, sortedLangs, lang, total, percentLanguages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    langs = {};
                    languages = [];
                    _i = 0, repos_2 = repos;
                    _a.label = 1;
                case 1:
                    if (!(_i < repos_2.length)) return [3 /*break*/, 5];
                    repo = repos_2[_i];
                    return [4 /*yield*/, fetch("https://api.github.com/repos/".concat(repo.owner.login, "/").concat(repo.name, "/languages"), header)];
                case 2:
                    repoResponse = _a.sent();
                    return [4 /*yield*/, repoResponse.json()];
                case 3:
                    repoData = _a.sent();
                    for (lang in repoData) {
                        if (langs.hasOwnProperty(lang)) {
                            langs[lang] += repoData[lang];
                        }
                        else {
                            langs[lang] = repoData[lang];
                        }
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    sortedLangs = [];
                    for (lang in langs) {
                        languages.push([lang, langs[lang]]);
                    }
                    languages.sort(function (a, b) {
                        return b[1] - a[1];
                    });
                    total = languages.reduce(function (acc, curr) { return acc + curr[1]; }, 0);
                    percentLanguages = languages.map(function (lang) { return [lang[0], Math.round((lang[1] / total) * 100)]; });
                    generateLanguageElements(percentLanguages);
                    return [2 /*return*/, languages];
            }
        });
    });
}
function generateLanguageElements(languages) {
    var langList = document.querySelector(".profile-langs");
    if (langList) {
        langList.innerHTML = "";
        for (var _i = 0, languages_1 = languages; _i < languages_1.length; _i++) {
            var lang = languages_1[_i];
            var langElement = document.createElement("li");
            langElement.textContent = "".concat(lang[0], ": ").concat(lang[1], "%");
            langElement.classList.add("inline-block", "bg-zinc-200", "dark:bg-zinc-700", "px-2", "m-1", "py-1", "rounded-lg", "border-[1px]", "border-zinc-400", "dark:border-zinc-700", "border-t-zinc-300", "dark:border-t-zinc-600", "inline-flex", "items-center");
            langElement.innerHTML = " <i class=\"devicon-".concat(getLangIcon(lang[0]), "-plain mr-1.5\"></i>") + langElement.textContent;
            langList.appendChild(langElement);
        }
    }
    function getLangIcon(lang) {
        switch (lang) {
            case "JavaScript":
                return "javascript";
            case "TypeScript":
                return "typescript";
            case "EJS":
            case "HTML":
                return "html5";
            case "CSS":
                return "css3";
            case "Python":
                return "python";
            case "Java":
                return "java";
            case "C":
                return "c";
            case "C++":
                return "cplusplus";
            case "Lua":
                return "lua";
            case "Shell":
                return "bash";
            case "Ruby":
                return "ruby";
            case "PHP":
                return "php";
            case "Swift":
                return "swift";
            case "Go":
                return "go";
            case "Rust":
                return "rust";
            case "Kotlin":
                return "kotlin";
            case "GDScript":
                return "godot";
            default:
                return "gimp hidden";
        }
    }
}
function updateGithubStats() {
    console.log("Username: ".concat(username));
    var githubStatsElement = document.querySelector(".github-stats");
    if (githubStatsElement) {
        githubStatsElement.innerHTML = "<picture>\n         <source\n            srcset=\"https://github-readme-stats.vercel.app/api?username=".concat(username, "&show_icons=true&theme=slateorange\"\n            media=\"(prefers-color-scheme: dark)\"\n         />\n         <source\n            srcset=\"https://github-readme-stats.vercel.app/api?username=").concat(username, "&show_icons=true\"\n            media=\"(prefers-color-scheme: light), (prefers-color-scheme: no-preference)\"\n         />\n         <img src=\"https://github-readme-stats.vercel.app/api?username=").concat(username, "&show_icons=true\" />\n      </picture>");
    }
}
function getRateLimit() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!header) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetch('https://api.github.com/rate_limit', header)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    console.error('Error fetching rate limit:', response.statusText);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
