//Returns ID of Active Tab for Code Injection
function getTabID() {
    return new Promise((resolve, reject) => {
        try {
            //Query Chrome tab API
            chrome.tabs.query({
                active: true,
            }, function (tabs) {
                resolve(tabs[0].id);
            })
        } catch (e) {
            reject(e);
        }
    })
};

//Injects code from ./scripts/content.js into Active Tab
async function InjectScripts() {
    //Get ActiveTabId
    let tabid = await getTabID();
    //Inject content.js into Active tab
    await chrome.scripting.executeScript({
        files: ["./scripts/content.js"],
        target: { tabId: tabid }
    })
};


//Define Start Button 
const StartBttn = document.getElementById("startBttn");

//Inject Code on Click
StartBttn.addEventListener("click", async () => {
    InjectScripts();
});