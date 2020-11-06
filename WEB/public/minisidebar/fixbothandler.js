var firebaseConfig = {
    apiKey: "AIzaSyAyh0LoymfZHbTu3mWyXYs2Z7pMz7lnF_8",
    authDomain: "obd-data-track.firebaseapp.com",
    databaseURL: "https://obd-data-track.firebaseio.com",
    projectId: "obd-data-track",
    storageBucket: "obd-data-track.appspot.com",
    messagingSenderId: "49352787430",
    appId: "1:49352787430:web:3f0bd5e0451f94f7964227",
    // measurementId: "G-VR292V8GVH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var dri = firebase.database().ref().child("public/FIXBOT/Registered devices/");
var page = window.location.href.split('/')[window.location.href.split('/').length - 1];

var dve;
var prid;

console.log(page);
var userinfo;
var userd;
if(page.split(".").includes("register")){
    // console.log(document.getElementById('country').value);
    
    console.log("aulbvfiuakejs");
    //console.log(document.getElementById('country').value);
    document.getElementById('regform').onsubmit = function () {
        var fullname = document.getElementById('fullname').value;
        var dob = document.getElementById('dob').value;
        var email = document.getElementById('email').value;
        var gender = document.getElementById('gender').value;
        var plan = document.getElementById('plan').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var confpass = document.getElementById('confpass').value;
        var cls = document.getElementById('cls').value;
        var ids = document.getElementById('ids').value;
        var street = document.getElementById('street').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var country = document.getElementById('country').value;
        var phone = document.getElementById('phone').value;
        var passed = true;
        // console.log(ids.split(",").length)
        var done;
        // fullname = "Mgbaramuko Chidiebube Emmanuel";
        // email = "chidi.mgbara@fixbot.com";
        // username = "Emmytheo247";
        // password = "EMMYfinest@123";
        // confpass = "EMMYfinest@123";
        // ids = '359197080045546,';
        // dob = '7/12/1999';
        // phone = "07089602044";
        // street = "No 13 Nnokwa Street,";
        // city = "Umuahia";
        // state = "Abia State";


        
        if (confpass !== "" || email !== ""){
            if (email.split("@").includes("fixbot.com")) {
                if (cls == "FixbotAdmin") {
                    passed = true;
                    $('#classs').removeClass('has-danger');
                    document.getElementById("adm").innerText = "You're Good to Go";
                    $('#classs').addClass('has-success');
                }
                else {
                    passed = false;
                    $('#classs').addClass('has-danger');
                    document.getElementById("adm").innerText = "You're not allowed to Choose this Option, Switch to a different Class";
                    return false;

                }
            }
            if (!email.split("@").includes("fixbot.com")) {
                if (cls == "FixbotAdmin") {
                    passed = false;
                    $('#classs').addClass('has-danger');
                    document.getElementById("adm").innerText = "You're not allowed to Choose this Option, Switch to a different Class";
                    console.log(cls);
                    return false;
                }
                else {
                    passed = true;
                    $('#classs').removeClass('has-danger');
                    document.getElementById("adm").innerText = "You're Good to Go";
                    $('#classs').addClass('has-success');
                }

            }
            if (confpass != password) {
                $('.pass').addClass('has-danger');
                var el = document.getElementsByClassName("passtxt");


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Passwords don't Match";
                }
                passed = !passed;
                return false;

            }
            if (confpass == password) {
                $('.pass').removeClass('has-danger');
                $('.pass').addClass('has-success');
                var el = document.getElementsByClassName("passtxt");
                // console.log(el.length);


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Passwords Match";
                }
                passed = true;
            }
            if (password.length < 5) {
                $('.pass').addClass('has-danger');
                var el = document.getElementsByClassName("passtxt");


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Passwords Must be atleast 6 Characters Long";
                }
                passed = !passed;
                return false;

            }
            if (password.length > 5) {
                $('.pass').removeClass('has-danger');
                $('.pass').addClass('has-success');
                var el = document.getElementsByClassName("passtxt");
                // console.log(el.length);


                for (var i = 0; i < el.length; i++) {
                    el[i].innerText = "Password Strength Okay";
                }
                passed = true;

            }
            

            if (ids.split(",").length < 2) {
                passed = false;
                $('#idtxt').addClass('has-danger');
                document.getElementById("idtxte").innerText = "Use atleast One Device";
                console.log(cls);
                return false;

            }
            else {
                passed = true;
                $('#idtxt').removeClass('has-danger');
                document.getElementById("idtxte").innerText = "You're Good to Go";
                $('#classs').addClass('has-success');
            }

            
        }
        else{
            passed = false;
            return false;
            
            
        }
        




        userinfo = {
            "fullname": fullname,
            "email": email,
            "gender": gender,
            "plan": plan,
            "username": username,
            "password": password,
            "dob": dob,
            "cls": cls,
            'street': street,
            'city': city,
            'state': state,
            'country': country,
            'deviceids': ids,
            // 'Car names': cnames,
            'phone': phone

        }
        console.log(userinfo);

        if (passed) {
            console.log(passed);
            done = passed;
            if (userinfo.email !== undefined && userinfo.password !== undefined) {
                
                firebase.auth().createUserWithEmailAndPassword(userinfo.email, userinfo.password).catch(function (error) {
                    if (error) {
                        done = false;
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        var err = errorCode.split('/');
                        console.log("Error Code : " + errorCode);
                        console.log("Error Message : " + errorMessage);

                        if (err[err.length - 1].search('email') !== -1) {
                            document.getElementById("eml").innerText = errorMessage;
                            $("#emll").addClass('has-danger');
                        }
                        if (err[err.length - 1].search('email-') == -1) {
                            document.getElementById("eml").innerText = "You're Good To Go";
                            $("#emll").removeClass("has-danger");
                            $("#emll").addClass("has-success");
                        }
                        if (err[err.length - 1].search('email-') !== -1) {
                            document.getElementById("eml").innerText = errorMessage;
                            $("#emll").addClass('has-danger');
                        }
                        if (err[err.length - 1].search('email') == -1) {
                            document.getElementById("eml").innerText = "You're Good To Go";
                            $("#emll").removeClass("has-danger");
                            $("#emll").addClass("has-success");
                        }
                        if (err[err.length - 1].search('password') !== -1) {
                            document.getElementById("pss").innerText = errorMessage;
                            $(".pass").addClass("has-danger");
                        }

                        if (err[err.length - 1].search('password') == -1) {
                            document.getElementById("pss").innerText = "You're Good to Go";
                            $(".pass").removeClass("has-danger");
                        }
                        if (err[err.length - 1].search('network-request-failed') !== -1) {
                            document.getElementById("net").innerText = errorMessage;

                        }
                        if (err[err.length - 1].search('network-request-failed') == -1) {
                            document.getElementById("net").innerText = "";

                        }
                        
                    }
                    else{
                        done = true;
                    }
                }).then(function (){
                    if(done){
                        firebase.auth().signInWithEmailAndPassword(userinfo.email, userinfo.password).catch(function (error) {
                            // Handle Errors here.
                            
                            var errorCod = error.code;
                            var errorMessag = error.message;
                            console.log("Error Code : " + errorCod);
                            console.log("Error Message : " + errorMessag);
                            if (error) {
                                done = false;
                            }
                            else {
                                done = true;
                                
                            }


                        }).then(function (){
                            if(done){
                                console.log("Signing in");

                                firebase.auth().onAuthStateChanged(function (user) {
                                    if (user) {

                                        // User is signed in.
                                        user.updateProfile({
                                            displayName: userinfo.username,
                                            email: userinfo.email
                                        }).catch(function (error) {
                                            if (error) {
                                                done = false;
                                                var errorCo = error.code;
                                                var errorMessa = error.message;
                                                console.log("Error Code : " + errorCo);
                                                console.log("Error Message : " + errorMessa);
                                                document.getElementById("net").innerText = errorMessage;
                                            }
                                            else {
                                                done = true;
                                                
                                            }


                                        }).then(function(){
                                            
                                            user.providerData.forEach(function (profile) {
                                                console.log("Sign-in provider: " + profile.providerId);
                                                console.log("  Provider-specific UID: " + profile.uid);
                                                console.log("  Name: " + profile.displayName);
                                                console.log("  Email: " + profile.email);
                                                // console.log("  Photo URL: " + profile.photoURL);
                                                prid = profile.displayName;
                                                return;
                                            })
                                            
                                        }).catch(function (error){
                                            if(error){
                                                done = false;
                                                var errorCo = error.code;
                                                var errorMessa = error.message;
                                                console.log("Error Code : " + errorCo);
                                                console.log("Error Message : " + errorMessa);
                                                document.getElementById("net").innerText = errorMessage;
                                            }
                                            else{
                                                console.log("ksufvulairfbarf");
                                                done = true;
                                            }

                                        }).then(function(){
                                            if(done){
                                                console.log(prid);
                                                var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
                                                dir = dir.child(prid);
                                                dir.update(userinfo);
                                                // console.log(email);
                                                console.log("Logging in");
                                                console.log("Logging Done");



                                                document.getElementById("net").innerText = "Registration Complete";
                                                window.localStorage.setItem('emailForSignIn', userinfo.email);
                                                window.localStorage.setItem('passwordForSignIn', userinfo.password);
                                                console.log("Logging Done");
                                                // window.location.assign("pages-login.html.htm");
                                            }
                                        })
                                    } else {

                                        console.log("Not working");
                                        document.getElementById("net").innerText = errorMessage;
                                        return false;
                                        // No user is signed in.
                                    }
                                })

                            }
                            else{

                            }
                        })
                    }
                    else{
                        return;
                    }
                    
                })

            }


        }



        return false;
    };
}
else if (page.split(".").includes("pages-login")) {
    // document.getElementById("Uname").value = "chidi.mgbara@gmail.com";
    // document.getElementById("Upass").value = "EMMYfinest@123";
    emaill = document.getElementById("Uname").value;
    passwordd = document.getElementById("Upass").value;
    
    console.log(emaill);
    
    


    document.getElementById('loginform').onsubmit = function () {
        console.log(emaill);
        document.getElementById("note").innerHTML = "Signing you in, please be patient";
        firebase.auth().signInWithEmailAndPassword(emaill, passwordd).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log("Error Code : " + errorCode);
            console.log("Error Message : " + errorMessage);
            document.getElementById("note").innerHTML = errorMessage;
            
            
        }).then(function () {
            
            
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    
                    var userdata = {
                        'username': '',
                        'fullname': '',
                        'email': '',
                        'phone': '',
                        'address': '',
                        'gender': '',
                        'plan': '',
                        'cls': '',
                        'dob': '',
                        'devices': '',
                        'device_data': {},
                        "providerid" : ""
                    }
                    var dta;
                    user.providerData.forEach(function (profile) {
                        userdata.username = profile.displayName;
                        userdata.email = profile.email;
                        // userdata.uid = profile.uid;
                        // userdata.gender = profile.gender;
                        // userdata.plan = profile.plan;
                        // userdata.cls = profile.cls;
                        // userdata.dob = profile.dob;
                        // userdata.devices = profile.deviceids.split(',');
                        // userdata.address = profile.street + ', ' + profile.city + ", " + profile.state + ', ' + profile.country;
                    });
                    var dir = firebase.database().ref().child("public/FIXBOT/Accounts/");
                    dir.child(userdata.username).on("value", function(snap) {
                        dta = snap.val();
                        


                    }).then(function(){
                        userdata.username = dta.username;
                        userdata.email = dta.email;
                        userdata.gender = dta.gender;
                        userdata.plan = dta.plan;
                        userdata.cls = dta.cls;
                        userdata.dob = dta.dob;
                        userdata.devices = dta.deviceids;
                        userdata.address = dta.street + ', ' + dta.city + ", " + dta.state + ', ' + dta.country;
                        userdata.phone = dta.phone;
                        userdata.fullname = dta.fullname;

                    }).then(function (){
                        userd = userdata;
                        console.log(userd);
                        document.getElementById("note").innerHTML = "Signed In, Fetching your data";
                        for (id in userd.deviceids.split(",")) {
                            if (typeof (id) !== undefined) {
                                userd.device_data[id] = firebase.database().ref().child("public/FIXBOT/Registered devices/" + id); 
                            }
                        }
                        document.getElementById("note").innerHTML = "Data Fetch Successful, Preparing The Dashboard";
                    // console.log(userd);
                        switch (userd.cls.toLowerCase()) {
                            case "fixbotadmin": {
                                window.location.assign("indexFixbotAdmin.html");
                            }
                                break;
                            case "admin": {
                                window.location.assign("indexAdmin.html");
                            }
                                break;
                        }
                    })
                    
                    
                    


                    // User is signed in.
                } else {
                    document.getElementById("note").innerHTML = "Encountered an error while fetching data, Try logging in again";


                    // No user is signed in.
                }
            });
        });
        return false;    
    }
    

}
else if (page.split(".").includes("indexAdmin")) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var fnam = document.getElementsByClassName("fnam");
            var nam = document.getElementsByClassName("nam");
            var namclass = document.getElementById("namclass");
            var namdetails = document.getElementById("namdetails");
            var namsubstart = document.getElementById("namsubstart");
            var namsubexp = document.getElementById("namsubexp");
            var namsubbal = document.getElementsByClassName("namsubbal");
            var eml = document.getElementsByClassName("eml");
            var phnnum = document.getElementsByClassName("phnnum");
            var add = document.getElementsByClassName("add");
            var assets = document.getElementById("assets");
            var carnams = document.getElementById("carnams");
            var asset = document.getElementById("asset");
            var namuserovw = document.getElementById("namuserovw");
            var namcarsubs = document.getElementById("namcarsubs");
            var namassets = document.getElementById("namassets");
            var sngnam = document.getElementById("sngnam");
            var sngnamcond = document.getElementById("sngnamcond");
            var sngnamdet = document.getElementById("sngnamdet");
            var namcarmodel = document.getElementById("namcarmodel");
            var namtrackmap = document.getElementById("namtrackmap");
            var namwindspeed = document.getElementById("namwindspeed");
            var namtotalmileage = document.getElementById("namtotalmileage");
            var namtotalcrashes = document.getElementById("namtotalcrashes");
            var runningspeed = document.getElementById("runningspeed");
            var throttleopeningwidth = document.getElementById("throttleopeningwidth");
            var engineload = document.getElementById("engineload");
            var coolanttemperature = document.getElementById("coolanttemperature");
            var instantenousfuelconsumption = document.getElementById("instantenousfuelconsumption");
            var averagefuelconsumption = document.getElementById("averagefuelconsumption");
            var drivingrange = document.getElementById("drivingrange");
            var totalmileage = document.getElementById("totalmileage");
            var singlefuelconsumptionvol = document.getElementById("singlefuelconsumptionvol");
            var totalfuelconsumptionvol = document.getElementById("totalfuelconsumptionvol");
            var currenterrorcodenos = document.getElementById("currenterrorcodenos");
            var harshaccelerationno = document.getElementById("harshaccelerationno");
            var harshbrakeno = document.getElementById("harshbrakeno");
            var drivingbehaviourdata = document.getElementById("drivingbehaviourdata");
            var batteryvoltage = document.getElementById("batteryvoltage");
            var enginespeed = document.getElementById("enginespeed");
            var batteryvoltagebar = document.getElementById("batteryvoltagebar");
            var enginespeedbar = document.getElementById("enginespeedbar");
            var runningspeedbar = document.getElementById("runningspeedbar");
            var throttleopeningwidthbar = document.getElementById("throttleopeningwidthbar");
            var engineloadbar = document.getElementById("engineloadbar");
            var coolanttemperaturebar = document.getElementById("coolanttemperaturebar");
            var instantenousfuelconsumptionbar = document.getElementById("instantenousfuelconsumptionbar");
            var averagefuelconsumptionbar = document.getElementById("averagefuelconsumptionbar");
            var drivingrangebar = document.getElementById("drivingrangebar");
            var totalmileagebar = document.getElementById("totalmileagebar");
            var singlefuelconsumptionvolbar = document.getElementById("singlefuelconsumptionvolbar");
            var totalfuelconsumptionvolbar = document.getElementById("totalfuelconsumptionvolbar");
            var currenterrorcodenosbar = document.getElementById("currenterrorcodenosbar");
            var harshaccelerationnobar = document.getElementById("harshaccelerationnobar");
            var harshbrakenobar = document.getElementById("harshbrakenobar");
            var namign = document.getElementById("namign");
            var namdrivtim = document.getElementById("namdrivtim");
            var namidltim = document.getElementById("namidltim");
            var namhotstarts = document.getElementById("namhotstarts");
            var namavgspeed = document.getElementById("namavgspeed");
            var namhighestspeed = document.getElementById("namhighestspeed");
            var namengrotation = document.getElementById("namengrotation");
            var namharshaccel = document.getElementById("namharshaccel");
            var namharshbraking = document.getElementById("namharshbraking");
            var namignbar = document.getElementById("namignbar");
            var namdrivtimbar = document.getElementById("namdrivtimbar");
            var namidltimbar = document.getElementById("namidltimbar");
            var namhotstartsbar = document.getElementById("namhotstartsbar");
            var namavgspeedbar = document.getElementById("namavgspeedbar");
            var namhighestspeedbar = document.getElementById("namhighestspeedbar");
            var namengrotationbar = document.getElementById("namengrotationbar");
            var namharshaccelbar = document.getElementById("namharshaccelbar");
            var namharshbrakingbar = document.getElementById("namharshbrakingbar");
            var weekly = [];



            for (it in fnam) {
                console.log(fnam[it]);
                if (userd !== undefined) {
                    fnam[it].value = userd.fullname;
                    fnam[it].innerHTML = userd.fullname;
                }
                else {
                    fnam[it].value = "Not Set";
                    fnam[it].innerHTML = "Not Set";
                }

            }
            for (it in nam) {
                console.log(nam[it]);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    nam[it].innerHTML = userd.username;
                }
                else {
                    // fnam[it].value = "Not Set";
                    nam[it].innerHTML = "Not Set";
                }

            }
            console.log(namclass);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                namclass.innerHTML = userd.cls;
            }
            else {
                // fnam[it].value = "Not Set";
                namclass.innerHTML = "Not Set";
            }

            console.log(namdetails);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                namdetails.innerHTML = userd.details;
            }
            else {
                // fnam[it].value = "Not Set";
                namdetails.innerHTML = "Not Set";
            }
            console.log(namsubstart);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                namsubstart.innerHTML = "--/--/----";
            }
            else {
                // fnam[it].value = "Not Set";
                namsubstart.innerHTML = "--/--/----";
            }
            console.log(namsubexp);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                namsubexp.innerHTML = "--/--/----";
            }
            else {
                // fnam[it].value = "Not Set";
                namsubexp.innerHTML = "--/--/----";
            }
            for (it in namsubbal) {
                console.log(namsubbal[it]);
                if (userd !== undefined) {
                    // nam[it].value = userd.fullname;
                    namsubbal[it].innerHTML = "$0";
                }
                else {
                    // fnam[it].value = "Not Set";
                    namsubbal[it].innerHTML = "Not Set";
                }

            }
            for (it in eml) {
                console.log(eml[it]);
                if (userd !== undefined) {
                    eml[it].value = userd.email;
                    eml[it].innerHTML = userd.email;
                }
                else {
                    eml[it].value = "Not Set";
                    eml[it].innerHTML = "Not Set";
                }

            }
            for (it in phnnum) {
                console.log(phnnum[it]);
                if (userd !== undefined) {
                    phnnum[it].value = userd.phone;
                    phnnum[it].innerHTML = userd.phone;
                }
                else {
                    phnnum[it].value = "Not Set";
                    phnnum[it].innerHTML = "Not Set";
                }

            }
            for (it in add) {
                console.log(add[it]);
                if (userd !== undefined) {
                    add[it].value = userd.address;
                    add[it].innerHTML = userd.address;
                }
                else {
                    add[it].value = "Not Set";
                    add[it].innerHTML = "Not Set";
                }

            }

            console.log(assets);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                dve = userd.devices[0];
                var asss = "";
                for (it in userd.devices) {
                    asss += `
                            <div class="col-lg-3 col-md-6 m-b-20 ${userd.devices[it]}">
                                <center>
                                    <img src="../assets/images/big/img1.jpg" class="img-responsive radius userpic" />
                                    <br><br>
                                    <p class="btn btn-success" onclick="vwasset(${userd.devices[it]})" >${userd.devices[it]}</p>
                                </center>
                            </div>`
                        ;

                }
                assets.innerHTML = asss;
            }
            else {
                // fnam[it].value = "Not Set";
                dve = "noasset";


                assets.innerHTML = `
                    <div class="col-lg-3 col-md-6 m-b-20 noasset">
                        <center>
                            <img src="../assets/images/big/img1.jpg" class="img-responsive radius userpic" />
                            <br><br>
                            <p class="btn btn-success" onclick="vwasset('noasset')">noasset</p>
                        </center>
                    </div>
                    `;
                assets.innerHTML += `
                    <div class="col-lg-3 col-md-6 m-b-20 noasset1">
                        <center>
                            <img src="../assets/images/big/img1.jpg" class="img-responsive radius userpic" />
                            <br><br>
                            <p class="btn btn-success" onclick="vwasset('noasset1')">noasset</p>
                        </center>
                    </div>
                    `;


            }

            console.log(asset);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                asset.innerHTML = dve;
            }
            else {
                // fnam[it].value = "Not Set";
                asset.innerHTML = dve;
            }
            console.log(namuserovw);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                namuserovw.innerHTML = "TBD";
            }
            else {
                // fnam[it].value = "Not Set";
                namuserovw.innerHTML = "Not Set";
            }
            console.log(carnams);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                var dvc = `Assets: '\r\n'`;
                userd.devices.forEach(function (device) {
                    dvc += `<span class="btn btn-success">${device}</span><br><br>`
                })

                carnams.innerHTML = dvc;
            }
            else {
                // fnam[it].value = "Not Set";
                carnams.innerHTML = `
                    Assets: <span class="btn btn-success">None Available</span><br><br>
                    `;
            }
            console.log(namcarsubs);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                var dav = `Subscriptions: '\r\n'`;
                userd.devices.forEach(function (device) {
                    dav += `
                    <h5 class="m-t-30">Current Subscription----<span class="pull-right">${device}</span></h5>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar"
                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                            style="width:100%; height:6px;"> <span class="sr-only"></span> 
                        </div>
                    </div>
                    <br>
                    `;
                })

                namcarsubs.innerHTML = dav;
            }
            else {
                // fnam[it].value = "Not Set";
                namcarsubs.innerHTML = `
                    <h5 class="m-t-30">Current Subscription----<span class="pull-right">None</span></h5>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar"
                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                            style="width:100%; height:6px;"> <span class="sr-only"></span> 
                        </div>
                    </div>
                    `;
            }
            console.log(namassets);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                var dvs;
                userd.devices.forEach(function (device) {
                    dvs += `
                        <div class="col-lg-3 col-md-6 ">
                            <div class="card ${device}" onclick="vwasset(${device})">
                                <div class="card-body">
                                    <div class="d-flex flex-row">
                                        <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                                        </div>
                                        <div class="m-l-10 align-self-center">
                                            <h3 class="m-b-0 font-light">Asset Name</h3>
                                            <h5 class="text-muted m-b-0">${device}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                });

                namassets.innerHTML = dvs;
            }
            else {
                // fnam[it].value = "Not Set";
                namassets.innerHTML = `
                    <div class="col-lg-3 col-md-6">
                        <div class="card noasset" onclick="vwasset('noasset')">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                                    </div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0 font-light">Asset Name</h3>
                                        <h5 class="text-muted m-b-0">No Assets Present</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                namassets.innerHTML += `
                    <div class="col-lg-3 col-md-6">
                        <div class="card noasset1" onclick="vwasset('noasset1')">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round round-lg align-self-center round-info"><i class="ti-wallet"></i>
                                    </div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0 font-light">Asset Name</h3>
                                        <h5 class="text-muted m-b-0">No Assets Present</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            }
            console.log(sngnam);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                sngnam.innerHTML = dve;
            }
            else {
                // fnam[it].value = "Not Set";
                sngnam.innerHTML = "No Asset";
            }
            console.log(sngnamcond);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                sngnamcond.innerHTML = "Good Condition";
            }
            else {
                // fnam[it].value = "Not Set";
                sngnamcond.innerHTML = "Unknown";
            }
            console.log(sngnamdet);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                sngnamdet.innerHTML = "No Details To Be Shown for Now";
            }
            else {
                // fnam[it].value = "Not Set";
                sngnamdet.innerHTML = "Couldn't fetch any Asset";
            }
            console.log(namcarmodel);
            if (userd !== undefined) {
                // nam[it].value = userd.fullname;
                namcarmodel.innerHTML = `
                    <span class="btn btn-success">None Available</span>
                    `;
            }
            else {
                // fnam[it].value = "Not Set";
                namcarmodel.innerHTML = `
                    <span class="btn btn-success">None Available</span>
                    `;
            }
            if (userd !== undefined) {
                if (userd.devices !== undefined) {
                    runningspeed.innerText = "Not Set";
                    throttleopeningwidth.innerText = "Not Set";
                    engineload.innerText = "Not Set";
                    coolanttemperature.innerText = "Not Set";
                    instantenousfuelconsumption.innerText = "Not Set";
                    averagefuelconsumption.innerText = "Not Set";
                    drivingrange.innerText = "Not Set";
                    totalmileage.innerText = "Not Set";
                    singlefuelconsumptionvol.innerText = "Not Set";
                    totalfuelconsumptionvol.innerText = "Not Set";
                    currenterrorcodenos.innerText = "Not Set";
                    harshaccelerationno.innerText = "Not Set";
                    harshbrakeno.innerText = "Not Set";
                    drivingbehaviourdata.innerText = "Not Set";
                    batteryvoltage.innerText = "Not Set";
                    enginespeed.innerText = "Not Set";

                }
                else {
                    runningspeed.innerText = "Not Set";
                    throttleopeningwidth.innerText = "Not Set";
                    engineload.innerText = "Not Set";
                    coolanttemperature.innerText = "Not Set";
                    instantenousfuelconsumption.innerText = "Not Set";
                    averagefuelconsumption.innerText = "Not Set";
                    drivingrange.innerText = "Not Set";
                    totalmileage.innerText = "Not Set";
                    singlefuelconsumptionvol.innerText = "Not Set";
                    totalfuelconsumptionvol.innerText = "Not Set";
                    currenterrorcodenos.innerText = "Not Set";
                    harshaccelerationno.innerText = "Not Set";
                    harshbrakeno.innerText = "Not Set";
                    drivingbehaviourdata.innerText = "Not Set";
                    batteryvoltage.innerText = "Not Set";
                    enginespeed.innerText = "Not Set";
                    batteryvoltagebar.innerHTML = `<div data-label="${getpcnt("batteryvoltage", userd.device_data.dve.batteryvoltage)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    enginespeedbar.innerHTML = `<div data-label="${getpcnt("enginespeed", userd.device_data.dve.enginespeed)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    runningspeedbar.innerHTML = `<div data-label="${getpcnt("runningspeed", userd.device_data.dve.runningspeed)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    throttleopeningwidthbar.innerHTML = `<div data-label="${getpcnt("throttleopeningwidth", userd.device_data.dve.throttleopeningwidth)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    engineloadbar.innerHTML = `<div data-label="${getpcnt("engineload", userd.device_data.dve.engineload)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    coolanttemperaturebar.innerHTML = `<div data-label="${getpcnt("coolanttemperature", userd.device_data.dve.coolanttemperature)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    instantenousfuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("instantenousfuelconsumption", userd.device_data.dve.instantenousfuelconsumption)} class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    averagefuelconsumptionbar.innerHTML = `<div data-label="${getpcnt("averagefuelconsumption", userd.device_data.dve.averagefuelconsumption)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    drivingrangebar.innerHTML = `<div data-label="${getpcnt("drivingrange", userd.device_data.dve.drivingrange)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    totalmileagebar.innerHTML = `<div data-label="${getpcnt("totalmileage", userd.device_data.dve.totalmileage)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    singlefuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("singlefuelconsumptionvol", userd.device_data.dve.singlefuelconsumptionvol)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    totalfuelconsumptionvolbar.innerHTML = `<div data-label="${getpcnt("totalfuelconsumptionvol", userd.device_data.dve.totalfuelconsumptionvol)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    currenterrorcodenosbar.innerHTML = `<div data-label="${getpcnt("currenterrorcodenos", userd.device_data.dve.currenterrorcodenos)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                    harshaccelerationnobar.innerHTML = `<div data-label="${getpcnt("harshaccelerationno", userd.device_data.dve.harshaccelerationno)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`
                    harshbrakenobar.innerHTML = `<div data-label="${getpcnt("harshbrakeno", userd.device_data.dve.harshbrakeno)}%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;

                }
            }
            else {
                runningspeed.innerText = "Not Set";
                throttleopeningwidth.innerText = "Not Set";
                engineload.innerText = "Not Set";
                coolanttemperature.innerText = "Not Set";
                instantenousfuelconsumption.innerText = "Not Set";
                averagefuelconsumption.innerText = "Not Set";
                drivingrange.innerText = "Not Set";
                totalmileage.innerText = "Not Set";
                singlefuelconsumptionvol.innerText = "Not Set";
                totalfuelconsumptionvol.innerText = "Not Set";
                currenterrorcodenos.innerText = "Not Set";
                harshaccelerationno.innerText = "Not Set";
                harshbrakeno.innerText = "Not Set";
                // drivingbehaviourdata.innerText = "Not Set";
                batteryvoltage.innerText = "Not Set";
                enginespeed.innerText = "Not Set";
                batteryvoltagebar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                enginespeedbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                runningspeedbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                throttleopeningwidthbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                engineloadbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                coolanttemperaturebar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                instantenousfuelconsumptionbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                averagefuelconsumptionbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                drivingrangebar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                totalmileagebar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                singlefuelconsumptionvolbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                totalfuelconsumptionvolbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                currenterrorcodenosbar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                harshaccelerationnobar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`
                harshbrakenobar.innerHTML = `<div data-label="0%" class="css-bar m-b-0 css-bar-danger css-bar-0"></div>`;
                namign.innerText = "Not Set";
                namdrivtim.innerText = "Not Set";
                namidltim.innerText = "Not Set";
                namhotstarts.innerText = "Not Set";
                namavgspeed.innerText = "Not Set";
                namhighestspeed.innerText = "Not Set";
                namengrotation.innerText = "Not Set";
                namharshaccel.innerText = "Not Set";
                namharshbraking.innerText = "Not Set";
                $("#namignbar").addClass("label-info");
                $("#namdrivtimbar").addClass("label-info");
                $("#namidltimbar").addClass("label-info");
                $("#namhotstartsbar").addClass("label-info");
                $("#namavgspeedbar").addClass("label-info");
                $("#namhighestspeedbar").addClass("label-info");
                $("#namengrotationbar").addClass("label-info");
                $("#namharshaccelbar").addClass("label-info");
                $("#namharshbrakingbar").addClass("label-info");
                namignbar.innerText = "Not Set";
                namdrivtimbar.innerText = "Not Set";
                namidltimbar.innerText = "Not Set";
                namhotstartsbar.innerText = "Not Set";
                namavgspeedbar.innerText = "Not Set";
                namhighestspeedbar.innerText = "Not Set";
                namengrotationbar.innerText = "Not Set";
                namharshaccelbar.innerText = "Not Set";
                namharshbrakingbar.innerText = "Not Set";
                weekly = [0, 0, 0, 0, 0, 0, 0];


            }


            var sel = document.getElementsByClassName(dve);

            for (ind in sel) {
                if (ind < sel.length) {
                    console.log(ind);
                    sel[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 0, 0.5)";
                }
            }











            // ============================================================== 
            // Sales overview
            // ============================================================== 
            var chart2 = new Chartist.Bar('.amp-pxl', {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', "Sun"],
                series: [
                    weekly,
                    // [6, 3, 9, 5, 4, 6]
                ]
            }, {
                axisX: {
                    // On the x-axis start means top and end means bottom
                    position: 'end',
                    showGrid: false
                },
                axisY: {
                    // On the y-axis start means left and end means right
                    position: 'start'
                },
                high: '12',
                low: '0',
                plugins: [
                    Chartist.plugins.tooltip()
                ]
            });

            // ============================================================== 
            // Newsletter
            // ============================================================== 

            var chart = new Chartist.Line('.campaign2', {
                labels: [1, 2, 3, 4, 5, 6, 7, 8],
                series: [
                    [0, 5, 6, 8, 25, 9, 8, 24]
                    , [0, 3, 1, 2, 8, 1, 5, 1]
                ]
            }, {
                low: 0,
                high: 28,
                showArea: true,
                fullWidth: true,
                plugins: [
                    Chartist.plugins.tooltip()
                ],
                axisY: {
                    onlyInteger: true
                    , scaleMinSpace: 40
                    , offset: 20
                    , labelInterpolationFnc: function (value) {
                        return (value / 1) + 'k';
                    }
                },
            });

            // Offset x1 a tiny amount so that the straight stroke gets a bounding box
            // Straight lines don't get a bounding box 
            // Last remark on -> http://www.w3.org/TR/SVG11/coords.html#ObjectBoundingBox
            chart.on('draw', function (ctx) {
                if (ctx.type === 'area') {
                    ctx.element.attr({
                        x1: ctx.x1 + 0.001
                    });
                }
            });

            // Create the gradient definition on created event (always after chart re-render)
            chart.on('created', function (ctx) {
                var defs = ctx.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(255, 255, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(38, 198, 218, 1)'
                });
            });


            var chart = [chart2, chart];

            // ============================================================== 
            // This is for the animation
            // ==============================================================

            for (var i = 0; i < chart.length; i++) {
                chart[i].on('draw', function (data) {
                    if (data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                            d: {
                                begin: 500 * data.index,
                                dur: 500,
                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeInOutElastic
                            }
                        });
                    }
                    if (data.type === 'bar') {
                        data.element.animate({
                            y2: {
                                dur: 500,
                                from: data.y1,
                                to: data.y2,
                                easing: Chartist.Svg.Easing.easeInOutElastic
                            },
                            opacity: {
                                dur: 500,
                                from: 0,
                                to: 1,
                                easing: Chartist.Svg.Easing.easeInOutElastic
                            }
                        });
                    }
                });
            }
            // ============================================================== 
            // This is for the map
            // ==============================================================

            $('#usa').vectorMap({
                map: 'us_aea_en',
                backgroundColor: 'transparent',
                zoomOnScroll: false,
                regionStyle: {
                    initial: {
                        fill: '#c9d6de'
                    }
                },
                markers: [{
                    latLng: [40.71, -74.00],
                    name: 'Newyork: 250'
                    , style: { fill: '#1e88e5' }
                }, {
                    latLng: [39.01, -98.48],
                    name: 'Kansas: 250'
                    , style: { fill: '#fc4b6c' }
                },
                {
                    latLng: [37.38, -122.05],
                    name: 'Vally : 250'
                    , style: { fill: '#26c6da' }
                }]
            });
            // ============================================================== 
            // Badnwidth usage
            // ============================================================== 
            new Chartist.Line('.usage', {
                labels: ['0', '4', '8', '12', '16', '20', '24', '30']
                , series: [
                    [5, 0, 12, 1, 8, 3, 12, 15]

                ]
            }, {
                high: 10
                , low: 0
                , showArea: true
                , fullWidth: true
                , plugins: [
                    Chartist.plugins.tooltip()
                ], // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
                axisY: {
                    onlyInteger: true
                    , offset: 20
                    , showLabel: false
                    , showGrid: false
                    , labelInterpolationFnc: function (value) {
                        return (value / 1) + 'k';
                    }
                }
                , axisX: {
                    showLabel: false
                    , divisor: 1
                    , showGrid: false
                    , offset: 0
                }
            });
            // ============================================================== 
            // Download count
            // ============================================================== 
            var sparklineLogin = function () {
                $('.spark-count').sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9], {
                    type: 'bar'
                    , width: '100%'
                    , height: '70'
                    , barWidth: '2'
                    , resize: true
                    , barSpacing: '6'
                    , barColor: 'rgba(255, 255, 255, 0.5)'
                });
            }
            var sparkResize;

            sparklineLogin();





        }
        else {
            window.location.assign("pages-login.html.htm");
        }
    });

}
else if (page.split(".").includes("indexFixbotAdmin")) {

}



switch (page) {
    case "register.html.htm?" : {
        
        
        

    }
        break;
    case "pages-login.html.htm": {

        
        
    }
        break;
    case "indexFixbotAdmin.html": {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
















                // ============================================================== 
                // Sales overview
                // ============================================================== 
                var chart2 = new Chartist.Bar('.amp-pxl', {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    series: [
                        [2, 5, 3, 7, 5, 10],
                        // [6, 3, 9, 5, 4, 6]
                    ]
                }, {
                    axisX: {
                        // On the x-axis start means top and end means bottom
                        position: 'end',
                        showGrid: false
                    },
                    axisY: {
                        // On the y-axis start means left and end means right
                        position: 'start'
                    },
                    high: '12',
                    low: '0',
                    plugins: [
                        Chartist.plugins.tooltip()
                    ]
                });

                // ============================================================== 
                // Newsletter
                // ============================================================== 

                var chart = new Chartist.Line('.campaign2', {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8],
                    series: [
                        [0, 5, 6, 8, 25, 9, 8, 24]
                        , [0, 3, 1, 2, 8, 1, 5, 1]
                    ]
                }, {
                    low: 0,
                    high: 28,
                    showArea: true,
                    fullWidth: true,
                    plugins: [
                        Chartist.plugins.tooltip()
                    ],
                    axisY: {
                        onlyInteger: true
                        , scaleMinSpace: 40
                        , offset: 20
                        , labelInterpolationFnc: function (value) {
                            return (value / 1) + 'k';
                        }
                    },
                });

                // Offset x1 a tiny amount so that the straight stroke gets a bounding box
                // Straight lines don't get a bounding box 
                // Last remark on -> http://www.w3.org/TR/SVG11/coords.html#ObjectBoundingBox
                chart.on('draw', function (ctx) {
                    if (ctx.type === 'area') {
                        ctx.element.attr({
                            x1: ctx.x1 + 0.001
                        });
                    }
                });

                // Create the gradient definition on created event (always after chart re-render)
                chart.on('created', function (ctx) {
                    var defs = ctx.svg.elem('defs');
                    defs.elem('linearGradient', {
                        id: 'gradient',
                        x1: 0,
                        y1: 1,
                        x2: 0,
                        y2: 0
                    }).elem('stop', {
                        offset: 0,
                        'stop-color': 'rgba(255, 255, 255, 1)'
                    }).parent().elem('stop', {
                        offset: 1,
                        'stop-color': 'rgba(38, 198, 218, 1)'
                    });
                });


                var chart = [chart2, chart];

                // ============================================================== 
                // This is for the animation
                // ==============================================================

                for (var i = 0; i < chart.length; i++) {
                    chart[i].on('draw', function (data) {
                        if (data.type === 'line' || data.type === 'area') {
                            data.element.animate({
                                d: {
                                    begin: 500 * data.index,
                                    dur: 500,
                                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                    to: data.path.clone().stringify(),
                                    easing: Chartist.Svg.Easing.easeInOutElastic
                                }
                            });
                        }
                        if (data.type === 'bar') {
                            data.element.animate({
                                y2: {
                                    dur: 500,
                                    from: data.y1,
                                    to: data.y2,
                                    easing: Chartist.Svg.Easing.easeInOutElastic
                                },
                                opacity: {
                                    dur: 500,
                                    from: 0,
                                    to: 1,
                                    easing: Chartist.Svg.Easing.easeInOutElastic
                                }
                            });
                        }
                    });
                }
                // ============================================================== 
                // This is for the map
                // ==============================================================

                $('#usa').googleMap({
                    map: 'us_aea_en',
                    backgroundColor: 'transparent',
                    zoomOnScroll: false,
                    regionStyle: {
                        initial: {
                            fill: '#c9d6de'
                        }
                    },
                    markers: [{
                        latLng: [40.71, -74.00],
                        name: 'Newyork: 250'
                        , style: { fill: '#1e88e5' }
                    }, {
                        latLng: [39.01, -98.48],
                        name: 'Kansas: 250'
                        , style: { fill: '#fc4b6c' }
                    },
                    {
                        latLng: [37.38, -122.05],
                        name: 'Vally : 250'
                        , style: { fill: '#26c6da' }
                    }]
                });
                // ============================================================== 
                // Badnwidth usage
                // ============================================================== 
                new Chartist.Line('.usage', {
                    labels: ['0', '4', '8', '12', '16', '20', '24', '30']
                    , series: [
                        [5, 0, 12, 1, 8, 3, 12, 15]

                    ]
                }, {
                    high: 10
                    , low: 0
                    , showArea: true
                    , fullWidth: true
                    , plugins: [
                        Chartist.plugins.tooltip()
                    ], // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
                    axisY: {
                        onlyInteger: true
                        , offset: 20
                        , showLabel: false
                        , showGrid: false
                        , labelInterpolationFnc: function (value) {
                            return (value / 1) + 'k';
                        }
                    }
                    , axisX: {
                        showLabel: false
                        , divisor: 1
                        , showGrid: false
                        , offset: 0
                    }
                });
                // ============================================================== 
                // Download count
                // ============================================================== 
                var sparklineLogin = function () {
                    $('.spark-count').sparkline([4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9], {
                        type: 'bar'
                        , width: '100%'
                        , height: '70'
                        , barWidth: '2'
                        , resize: true
                        , barSpacing: '6'
                        , barColor: 'rgba(255, 255, 255, 0.5)'
                    });
                }
                var sparkResize;

                sparklineLogin();





            }
            else {
                window.location.assign("pages-login.html.htm");
            }
        });


    }
        break;
    // var userdata = {
    //     'username': '',
    //     'fullname': '',
    //     'email': '',
    //     'phone': '',
    //     'address': '',
    //     'gender': '',
    //     'plan': '',
    //     'cls': '',
    //     'dob': '',
    //     'devices': '',
    //     'device_data': ''
    // }
    case "indexAdmin.html": {
        

    }
        break;
    case "indexUser.html": {
        console.log("a;iurlvnfjtv");

    }
        break;

}





function changeBarlog(data, but) {
    document.getElementById("barlog").innerHTML = data;
    var rt = data + ' DATA';
    document.getElementById("rtdata").innerHTML = rt;
    document.getElementById("rtdatasub").innerHTML = data;



};

var render = function (data, element) {
    switch (data) {

    }

}

// console.log(dve);
function vwasset(data) {
    document.getElementById('asset').innerText = data;
    var se = document.getElementsByClassName(dve);
    for (ind in se) {
        if (ind < se.length) {
            se[ind].style.boxShadow = "initial";
        }
    }
    console.log(dve);
    dve = data;
    console.log(data);
    se = document.getElementsByClassName(dve);
    for (ind in se) {
        if (ind < se.length) {
            se[ind].style.boxShadow = "0px 25px 42px rgba(0, 0, 0, 0.5)";
        }
    }

    if (userd) {
        // document.getElementById("namuserovw").innerHTML = userd.device_data[data];
        document.getElementById("sngnam").innerHTML = data;
        document.getElementById("runningspeed").innerHTML = data;
        document.getElementById("throttleopeningwidth").innerHTML = data;
        document.getElementById("engineload").innerHTML = data;
        document.getElementById("coolanttemperature").innerHTML = data;
        document.getElementById("instantenousfuelconsumption").innerHTML = data;
        document.getElementById("averagefuelconsumption").innerHTML = data;
        document.getElementById("drivingrange").innerHTML = data;
        document.getElementById("totalmileage").innerHTML = data;
        document.getElementById("singlefuelconsumptionvol").innerHTML = data;
        document.getElementById("totalfuelconsumptionvol").innerHTML = data;
        document.getElementById("currenterrorcodenos").innerHTML = data;
        document.getElementById("harshaccelerationno").innerHTML = data;
        document.getElementById("harshbrakeno").innerHTML = data;
        document.getElementById("batteryvoltage").innerHTML = data;
        document.getElementById("enginespeed").innerHTML = data;
    }
    else {
        document.getElementById("namuserovw").innerHTML = data;
        document.getElementById("sngnam").innerHTML = data;
        document.getElementById("runningspeed").innerHTML = data;
        document.getElementById("throttleopeningwidth").innerHTML = data;
        document.getElementById("engineload").innerHTML = data;
        document.getElementById("coolanttemperature").innerHTML = data;
        document.getElementById("instantenousfuelconsumption").innerHTML = data;
        document.getElementById("averagefuelconsumption").innerHTML = data;
        document.getElementById("drivingrange").innerHTML = data;
        document.getElementById("totalmileage").innerHTML = data;
        document.getElementById("singlefuelconsumptionvol").innerHTML = data;
        document.getElementById("totalfuelconsumptionvol").innerHTML = data;
        document.getElementById("currenterrorcodenos").innerHTML = data;
        document.getElementById("harshaccelerationno").innerHTML = data;
        document.getElementById("harshbrakeno").innerHTML = data;
        document.getElementById("batteryvoltage").innerHTML = data;
        document.getElementById("enginespeed").innerHTML = data;

    }

    // console.log("oadbv usdbca");
};

var getpcnt = function(name, amt){
    var pcnt;
    switch(name){
        case "runningspeed" : {
            pcnt = (amt/100) * 100;
        }
        break;
        case "throttleopeningwidth": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "engineload": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "coolanttemperature": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "instantenousfuelconsumption": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "averagefuelconsumption": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "singlefuelconsumptionvol": {
            pcnt = (amt / 100) * 100;
        }
        break;
        case "totalfuelconsumptionvol": {
            pcnt = (amt / 100) * 100;
        }
            break;
    }
    return pcnt.toString();

};


