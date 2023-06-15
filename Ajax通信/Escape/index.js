function main(){
    const textbox = document.getElementById("userId");
    fetchUserInfo(textbox.value);
}



function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok) {
                console.error("エラーレスポンス", response);
            } else {
                return response.json().then(userInfo => {
                    // HTMLの組み立て
                    const view = createView(userInfo);
                    // HTMLの挿入
                    displayView(view);
                });
            }
        }).catch(error => {
            console.error(error);
        });
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}
function createView(userInfo){
    return escapeHTML`
                    <h4>${userInfo.name} (@${userInfo.login})</h4>
                    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
                    <dl>
                        <dt>Location</dt>
                        <dd>${userInfo.location}</dd>
                        <dt>Repositories</dt>
                        <dd>${userInfo.public_repos}</dd>
                    </dl>
                    `;
}
function displayView(view){
    const result = document.getElementById("result");
                    result.innerHTML = view;
}