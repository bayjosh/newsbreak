# pomodoro-project
Pomodoro project


Mangogit

HELLO THIS IS A CHANGE


##Collaboratorss
Josh
HI DIS IS ME

##Collaboratorss
Josh
HI DIS IS ME 


mango mango mango

WHYYYYYYYY


meow moewo moewoeo aoggoaiug erg
test tet est 
mango mango mango
Firebase
 <script src="https://www.gstatic.com/firebasejs/4.10.0/firebase.js"></script>
 <script>            var config = {
                apiKey: "AIzaSyBa5ABniwGgmVdCEnijfdABEEk7cGLuzXk",
                authDomain: "pomodoro-project-1dd76.firebaseapp.com",
                databaseURL: "https://pomodoro-project-1dd76.firebaseio.com",
                projectId: "pomodoro-project-1dd76",
                storageBucket: "",
                messagingSenderId: "702315489756"
            };
            firebase.initializeApp(config);
            var database = firebase.database();
            var clickCounter = 0;
            $(".addClassHere").on("click", function () {
                clickCounter++;
                database.ref().set({
                    clickCount: clickCounter
                });
            });
  </script>
