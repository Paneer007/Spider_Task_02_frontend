import axios from "axios"
import "./style.css"
let userData =''
const clearLayout =()=>{
    const root = document.getElementById('root')
    root.innerHTML=''
}
const giftPage=()=>{
    const giftPage = document.getElementById("GiftPage")
    let title = document.createElement('h3')
    giftPage.appendChild(title)
    title.innerText="Gift List"
    userData.toGift.forEach(x=>addGiftDetails(x))
}
const randomNumberToken=()=>{
    return Math.random()*10000000
}

const sendUpdateGiftItemFunction=async(x)=>{
    const token = localStorage.getItem('token')
    const Name = document.getElementById('giftNameInput').value
    const Budget = document.getElementById('giftBudgetInput').value
    const body ={Name,Budget}
    const resp = await axios.post(`http://localhost:3001/api/giftdata/${x._id}/update`,body,{headers:{'authorization':token}})
    if(resp.status==200){
        homePageAfterLogin()        
    }
}
const addEventListenersToGiftPagePop=(x)=>{
    const button = document.getElementById("sendStuff")
    button.addEventListener('click',()=>{
        sendUpdateGiftItemFunction(x)
    })
}
const popUpForUpdatingGift=(x)=>{
    const groupPagePopUp = document.getElementById('PopUp')
    groupPagePopUp.innerHTML=
    `
    <div id="GiftPopUpStuff" class="PopUpStyling">
        <p class="InputName">Enter Name: </p>
        <input id="giftNameInput" class="InputLabelPopUp">
        <p class="InputName">Enter Budget: </p>
        <input id="giftBudgetInput" class="InputLabelPopUp">
        <button id="sendStuff" class="popUpSubmitButton">Send Stuff</button>
    </div>
    `
    addEventListenersToGiftPagePop(x)
}
const addGiftEventListener =(giftUuid,x)=>{
    const updateGiftItem = document.getElementById(`updateToken-${giftUuid}`)
    updateGiftItem.addEventListener('click',()=>{
        popUpForUpdatingGift(x)
    })
}
const addGiftDetails=(x)=>{
    const giftUuid = randomNumberToken()
    const GiftPage = document.getElementById('GiftPage')
    const giftDiv= document.createElement('div')
    GiftPage.appendChild(giftDiv)
    giftDiv.innerHTML=`
    <div class="GiftDescBox">
        <p class="giftDescBoxText" id="username-${giftUuid}"><span class="GroupHighStuff">To:</span> ${x.to.username}</p>
        <p class="giftDescBoxText" id="Group-${giftUuid}"><span class="GroupHighStuff">Group:</span> ${x.group.name}</p>
        ${x.name?`<p class="giftDescBoxText" id="Name-${giftUuid}"><span class="GroupHighStuff">Name:</span> ${x.name}</p>`:''}
        ${x.budget?`<p class="giftDescBoxText" id="Budget-${giftUuid}"><span class="GroupHighStuff">Name:</span> ${x.budget}</p>`:''}
        <p class="giftDescBoxButton" id="updateToken-${giftUuid}">Update Gift item</p>
    </div>
    `
    addGiftEventListener(giftUuid,x)
}
const makeLoginPageUi =()=>{
    clearLayout()
    const root = document.getElementById('root')
    root.innerHTML=`
    <div id="SignUp" class="MainEntryPage">
        <div id="LoginCard" class="loginCard">
            <div id="secretSanta" class="CardHeader">
                <p>Secret Santa</p>
            </div>
            <div class="TypeOfCardStuff">
                <p>Login</p>
            </div>
            <div class="TypeOfCard">
                <input placeholder="username" id="loginUsername" class="inputStuffContent" type="password">
            </div>
            <div class="TypeOfCard">
                <input placeholder="password" id="loginPassword" class="inputStuffContent" type="password">
            </div>
            <div class="submitButtonDiv">
                <button id="SubmitLoginButton" class="submitButtonStuff">Login</button>
            </div>
            <p>Don't have an account?<span id="goToSignup" class="SwapStuff"> Sign up</span></p>
        </div>
    </div>
    `
}
const makeSignUpPageUi =()=>{
    clearLayout()
    const root = document.getElementById('root')
    root.innerHTML=`
    <div id="SignUp" class="MainEntryPage">
        <div id="LoginCard" class="loginCard">
            <div id="secretSanta" class="CardHeader">
                <p>Secret Santa</p>
            </div>
            <div class="TypeOfCardStuff">
                <p>Sign up</p>
            </div>
            <div class="TypeOfCard">
                <input id="signupUsername" placeholder="username" class="inputStuffContent" type="password">
            </div>
            <div class="TypeOfCard">
                <input id="signupPassword" placeholder="password" class="inputStuffContent" type="password">
            </div>
            <div class="submitButtonDiv">
                <button id="SubmitSignUpButton" class="submitButtonStuff">Sign Up</button>
            </div>
            <p>Have an account?<span id="goToLogin" class="SwapStuff"> Log in</span></p>
        </div>
    </div>
    `
}
const homePage=()=>{
    clearLayout()
    const root = document.getElementById('root')
    root.innerHTML=`
    <div class="UserPageDiv" id="UserPageDiv">
        <div id="theSideBarContent" class="theSideBarContent">
            <div id="sideBarContentDiv" class="sideBarContentDiv">
                <p id="HomePageButton" class="sideBarStuff">Home Page</p>
                <p id="NewGroupButton" class="sideBarStuff">New Group</p>
                <p id="JoinGroupButton" class="sideBarStuff">Join Group</p>
            </div>
        </div>
        <div id="TheMainContent" class="TheMainContent">
            <div id="TitleOfHomePage" class="TitleOfHomePage">
                <div class="UserGreeting">
                    <p id="greetingLogic">Welcome back</p>
                </div>
            </div>
            <div id="mainContentOfThisPage" class="mainContentOfThisPage">

            </div>
            <div id="GiftPage" class="GiftPage">
            </div>
        </div>
        <div id="PopUp" class="PopUp popUpContentHide">
        </div>    
    </div>
    `
}
const getUserData =async()=>{
    return new Promise(async(resolve,reject)=>{
        const token = localStorage.getItem('token')
        const result = await axios.get('http://localhost:3001/api/userdata',{headers:{'authorization':token}})
        userData= result.data
        console.log(userData)
        return resolve(100)
    })
   
}
const appendTheGroupThingy=(x,groupsDiv)=>{
    const groupData = document.createElement('div')
    groupsDiv.appendChild(groupData)
    groupData.className="GameContent"
    groupData.innerHTML=`
        <p id="groupName-${x.roomId}" class="GroupDetailsTag"><span id="GroupHighStuff">Group Name:</span> ${x.name}</p>
        <p id="groupRoomId-${x.roomId}" class="GroupDetailsTag"><span id="GroupHighStuff">Room Id:</span> ${x.roomId}</p>
        <p id="visitGroupPage-${x.roomId}" class="GroupDetailsTagEnter">Enter</p>
    `
    addEventListenersToGroup(x)
}
const getAdminText=async(x)=>{
    const token = localStorage.getItem('token')
    const resp = await axios.get(`http://localhost:3001/api/groupdata/${x._id}`,{headers:{'authorization':token}})
    let userData = resp.data.participants
    const admin = userData.find(y=>y.Details._id==x.creatorId)
    const getAdmin = document.getElementById(`Admin-${x.roomId}`)
    getAdmin.textContent=`Admin-${admin.Details.username}`
    return admin.username
}
const removePopUpPassword=()=>{
    document.getElementById('groupPagePopUp').innerHTML=''
}
const SubmitPasswordStuff=async(x)=>{
    const token = localStorage.getItem('token')
    const password = document.getElementById('inputForPassword').value
    const body ={password:password}
    const resp = await axios.post(`http://localhost:3001/api/groupdata/${x._id}/lockandshuffle`,body,{headers:{'authorization':token}})
    if(resp.status==200){
        removePopUpPassword()
        alert('Each member has been assigned a secret santa')
    }
}
const createPassWordPopUp=(x)=>{
    const groupPagePopUp = document.getElementById("groupPagePopUp")
    groupPagePopUp.innerHTML=`
        <div id="LockGroupAndStartSecretSanta" class="LSPopUp">
            <p class="LSPopUpText">Lock Group and start secret Santa</p>
            <p class="LSPopUpTextPassword">Password</p>
            <input id="inputForPassword" class="LSPopUpInput" type="password"/>
            <div class="OptionButtonPopUp" >
                <p id="submitInputPass" class="submitButton">Submit</p>
                <p id="deleteInputPass" class="deleteButton">Delete</p>
            </div>
        </div>
    `
    const passWord= document.getElementById('submitInputPass')
    passWord.addEventListener('click',()=>{
        SubmitPasswordStuff(x)
    })
    const deleteStuff = document.getElementById("deleteInputPass")
    deleteStuff.addEventListener('click',()=>{
        removePopUpPassword()
    })
}  
const addEventListenersToGiftPage=(x)=>{
    const AdminFeatures = document.getElementById(`Features-${x.roomId}`)
    AdminFeatures.addEventListener('click',()=>{
        createPassWordPopUp(x)
    })
}
const createGiftPageLayout=(x)=>{
    const root = document.getElementById('TheMainContent')
    document.getElementById("GiftPage").innerHTML=``
    root.innerHTML=`
        <div class="GroupDesc">
            <div class="groupDescription">
                <div class="groupFeature">
                    <h2>${x.name}</h2>
                    <h3>${x.location}</h3>
                    <h3 id="Admin-${x.roomId}">Admin:</h3>
                    <h4>${x.roomId}</h4>
                </div>
                <div class="groupAdmin Stuff">
                    <p class="AdminFeatures" id="Features-${x.roomId}">Admin Features</p>
                </div>
            </div>
            <div class="DivForParticipants">
                <h2>Participants</h2>
                <div id="ListOfParticipants">
                </div>
            </div>
            <div id="groupPagePopUp">
            </div>
        </div>
    `
    addEventListenersToGiftPage(x)

}
const updateParticipants = async(x) =>{
    const token = localStorage.getItem('token')
    const resp = await axios.get(`http://localhost:3001/api/groupdata/${x._id}`,{headers:{'authorization':token}})
    console.log(resp)
    let userData = resp.data.participants
    const ListOfParticipants = document.getElementById("ListOfParticipants")
    ListOfParticipants.innerHTML=''
    userData.forEach((x)=>{
        console.log(x)
        let nameContent = document.createElement('p')
        ListOfParticipants.appendChild(nameContent)
        nameContent.textContent=x.Details.username + ' Since: '+(x.DateOfJoining==undefined?resp.data.date: x.DateOfJoining)
    })
}
const GroupPageDisplay=async(x)=>{
    createGiftPageLayout(x)
    getAdminText(x)
    updateParticipants(x)
}
const addEventListenersToGroup=(x)=>{
    const EnterGroupPage = document.getElementById(`visitGroupPage-${x.roomId}`)
    EnterGroupPage.addEventListener('click',()=>{
        GroupPageDisplay(x)
    })
    
}

const FillTheGroups = async()=>{
    const groupsDiv = document.getElementById('mainContentOfThisPage')
    console.log(userData)
    groupsDiv.innerHTML=` 
        <h3>Groups</h3>
        <div id="ListOfGroupInFlex">
        </div>
    `
    const ListOfGroups = document.getElementById("ListOfGroupInFlex")
    userData.groups.forEach(x=>appendTheGroupThingy(x,ListOfGroups))
}
const addGroupPopUp =()=>{
    const popUp = document.getElementById("PopUp")
    //fix bug onLi Once it work
    popUp.classList.remove('popUpContentHide')
    popUp.innerHTML=`
    <div class="addGroupContent">
        <p class="addGroupStuff">Enter Room ID</p>
        <input class="addGroupInput" id="groupRoomIDInput">
        <div class="OptionButtonPopUp">
            <p class="addGroupButton" id="sendGroupIDInput">Send</p>
            <p class="addGroupButton" id="cancelGroupInput">Cancel</p>
        </div>
    </div>
    `
}
const newGroupPopUp=()=>{
    const popUp = document.getElementById("PopUp")
    popUp.classList.remove('popUpContentHide')
    popUp.innerHTML=`
    <div class="addGroupContent">
        <p class="addGroupStuff">Enter Group name</p>
        <input class="addGroupInput" id="groupNameInput">
        <p class="addGroupStuff">Enter Location </p>
        <input id="groupLocationInput" class="addGroupInput" >
        <p class="addGroupStuff">Enter Budget</p>
        <input id="groupBudgetInput" class="addGroupInput" >
        <p class="addGroupStuff">Enter password</p>
        <input id="groupPasswordInput" class="addGroupInput" type="password">
        <div class="OptionButtonPopUp">
            <p id="sendGroupInput" class="addGroupButton">Send</p>
            <p id="cancelGroupInput" class="addGroupButton">Cancel</p>
        </div>
    </div>
    `
}
const removePopUp =()=>{
    const popUp = document.getElementById("PopUp")
    popUp.classList.add('popUpContentHide')
    popUp.innerHTML=``
}
const sendMakeGroupData=async ()=>{
    const groupNameInput = document.getElementById("groupNameInput").value
    const groupLocationInput = document.getElementById("groupLocationInput").value
    const groupBudgetInput = document.getElementById("groupBudgetInput").value
    const groupPasswordInput = document.getElementById("groupPasswordInput").value
    const body = {groupNameInput, groupLocationInput,groupBudgetInput,groupPasswordInput}
    const token = localStorage.getItem('token')
    const response = await axios.post("http://localhost:3001/api/groupdata",body,{headers:{'authorization':token}})
    if(response.status==200){
        removePopUp()
        await getUserData()
        FillTheGroups()
    }
}
const addMakeGroupPopUpEventListeners=()=>{
    const sendGroupInput = document.getElementById('sendGroupInput')
    sendGroupInput.addEventListener('click',()=>{
        sendMakeGroupData()
    })
    const cancelGroupInput= document.getElementById("cancelGroupInput")
    cancelGroupInput.addEventListener('click',()=>{
        removePopUp()
    })
}
const sendJoinGroupData=async()=>{
    try{
        const roomID= document.getElementById("groupRoomIDInput").value
        const body ={roomID}
        const token = localStorage.getItem('token')
        const resp = await axios.post("http://localhost:3001/api/groupdata/joingroup",body,{"headers":{"authorization":token}})
        if(resp.status==200){
            removePopUp()
            await getUserData()
            FillTheGroups()
        }
    }catch(e){
        alert(e.response.data.message)
    }
    
}
const addJoinGroupPopUpEventListeners=()=>{
    const sendGroupInput = document.getElementById('sendGroupIDInput')
    sendGroupInput.addEventListener('click',()=>{
        sendJoinGroupData()
    })
    const cancelGroupInput= document.getElementById("cancelGroupInput")
    cancelGroupInput.addEventListener('click',()=>{
        removePopUp()
    })
}
const addEventListenerToMainContentSideBar=()=>{
    const homePageButton = document.getElementById('HomePageButton')
    homePageButton.addEventListener('click',()=>{
        homePageAfterLogin()
    })
    const newGroupButton = document.getElementById('NewGroupButton')
    newGroupButton.addEventListener('click',()=>{
        newGroupPopUp()
        addMakeGroupPopUpEventListeners()
    })
    const JoinGroupButton = document.getElementById("JoinGroupButton")
    JoinGroupButton.addEventListener('click',()=>{
        addGroupPopUp()
        addJoinGroupPopUpEventListeners()
    })
}
const homePageAfterLogin=async()=>{
    await getUserData()
    homePage()
    FillTheGroups()
    giftPage()
    addEventListenerToMainContentSideBar()
}
const sendLoginDetails =async()=>{
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    const body={username:username,password:password}
    const result = await axios.post("http://localhost:3001/api/login",body)
    if(result.status==200){
        localStorage.setItem('token','bearer '+result.data.token)
        homePageAfterLogin()
    }
}
const addEventLoginPageListener=()=>{
    const signupSwitchButton = document.getElementById('goToSignup')
    signupSwitchButton.addEventListener('click',()=>{
        makeSignUpPageUi()
        addEventSignUpPageListener()
    })
    const loginButton = document.getElementById("SubmitLoginButton")
    loginButton.addEventListener('click',()=>{
        sendLoginDetails()
    })
}
const addEventSignUpPageListener =()=>{
    const loginSwitchButton = document.getElementById('goToLogin')
    loginSwitchButton.addEventListener('click',()=>{
        makeLoginPageUi()
        addEventLoginPageListener()
    })
    const signupButton = document.getElementById("SubmitSignUpButton")
    signupButton.addEventListener('click',()=>{
        sendSignUpDetails()
    })
}
const sendSignUpDetails = async()=>{
    const username = document.getElementById("signupUsername").value
    const password = document.getElementById("signupPassword").value
    const body={username:username,password:password}
    const result = await axios.post("http://localhost:3001/api/signup",body)
    if(result.status == 200){
        alert("Account made successfully ")
        makeLoginPageUi()
        addEventLoginPageListener()
    }
}
const removeTokenIfAny=()=>{
    window.onbeforeunload = function() {
        localStorage.removeItem('token');
      };
}
const main =()=>{
    removeTokenIfAny()
    makeSignUpPageUi()
    addEventSignUpPageListener()
}
main()