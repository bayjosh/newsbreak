# pomodoro-project
Pomodoro project

A website that brings news articles together for a focused 25-minute read. 


##Collaboratorss
Josh Bay, Dulguun Mango Enkh, Li Victoria Tu

##FIREBASE

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
