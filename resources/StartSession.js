//GLOBAL

let CompleteSet;
let CompleteSetIndex = 0;
let SetCount = 1;
let DateStart = new Date();
let timer;

//Controls
const Con_Instruc_DropD = document.getElementById("input_StSe_Instructor");
const Con_SetName_DropD = document.getElementById("input_StSe_SetName");

//GET ONLY UNIQUE INSTRUCTORS
async function GetUniqueInstructor() {
    await db.Exercises.orderBy("instructor")
        .eachUniqueKey((instructor) => {
            const newOption = new Option(instructor, instructor);
            Con_Instruc_DropD.add(newOption, undefined);
        })
        .then(() => {
            LTC("Unique Instructors Found");
        });
}

//GET ONLY UNIQUE SETS BASED ON INSTRUCTOR
async function GetUniqueSetsByInstructor() {
    Con_SetName_DropD.innerHTML = "";
    const ReturnedResult = await db.Exercises.where("instructor")
        .equalsIgnoreCase(Con_Instruc_DropD.value)
        .toArray();
    LTC("Unique Sets Found");

    let SetName = [];
    for (let res in ReturnedResult) {
        SetName.push(ReturnedResult[res].set_name);
    }
    LTC("Looped Through Sets And Took Only Names");
    SetName = new Set(SetName);
    LTC("Used Set To Create Unique Set");
    SetName = Array.from(SetName);
    LTC("Converted back to List");

    for (let item in SetName) {
        const newOption = new Option(SetName[item], SetName[item]);
        Con_SetName_DropD.add(newOption, undefined);
    }
    LTC("Added List Options");
}

//GET EXERCISES WHERE INSTRUCTOR AND SET NAME MATCH
async function GetSetExercises() {
    LTC("Found Actual Exercises");
    const SetExercises = await db.Exercises.where(["instructor", "set_name"])
        .equals([Con_Instruc_DropD.value, Con_SetName_DropD.value])
        .toArray();
    LTC("Set Dexie Return To Local DB");
    CompleteSet = SetExercises;

    DisplayExercises();
    ShowOrHide(document.getElementById("div_StSe_Start"));
    ShowOrHide(document.getElementById("divSessionTracker"));
}

//DISPLAY THE EXERCISE IN BOX
function DisplayExercises() {
    LTC("Print To Screen The Exercise Details");
    const con_disp_Instructor = document.getElementById(
        "display_StSe_Instructor"
    );
    const con_disp_SetName = document.getElementById("display_StSe_SetName");
    const con_disp_SetCount = document.getElementById("display_StSe_SetCount");
    const con_disp_Exercise = document.getElementById(
        "display_StSe_ExerciseName"
    );
    const con_disp_Rest = document.getElementById("display_StSe_Rest");
    UpdateLabels(con_disp_Instructor, CompleteSet[CompleteSetIndex].instructor);
    UpdateLabels(con_disp_SetName, CompleteSet[CompleteSetIndex].set_name);
    UpdateLabels(con_disp_SetCount, SetCount);
    UpdateLabels(con_disp_Exercise, CompleteSet[CompleteSetIndex].exercise);
    UpdateLabels(con_disp_Rest, CompleteSet[CompleteSetIndex].rest);
}

//INCREASE SETS OR CHANGE EXERCISE AND RESET SETS
function NextExercise() {
    const con_disp_Rest = document.getElementById("display_StSe_Rest");

    TimerStart(+con_disp_Rest.innerText);
    if (++SetCount > 3) {
        SetCount = 1;
        CompleteSetIndex++;
        ClearControl(document.getElementById("input_StSe_Weight"));
        ClearControl(document.getElementById("input_StSe_Reps"));

        if (CompleteSetIndex > CompleteSet.length - 1) {
            alert("Session Completed");
            window.location.href = "./SummaryPage.html";
        } else {
            DisplayExercises();
        }
    } else {
        DisplayExercises();
    }
}

//START THE TIMER
function TimerStart(TimeInSeconds) {
    AddSessionEntry();
    LTC("Set Rest Timer");
    const conTimer = document.getElementById("TimerBar");
    let value = 0;
    const Alarm = new Audio("./resources/AUDIO/Alarm.mp3");
    conTimer.max = TimeInSeconds;
    conTimer.value = 0;
    ClearControl(document.getElementById("input_StSe_Reps"));
    clearInterval(timer);

    timer = setInterval(() => {
        if (value <= TimeInSeconds) {
            conTimer.value = value;
            value++;
        } else {
            clearInterval(timer);
            LTC("Play Alarm");
            Alarm.play();
        }
    }, 1000);
}

//STOP THE TIMER
function StopTimer() {
    LTC("Stop Rest Timer");
    clearInterval(timer);
    const conTimer = document.getElementById("TimerBar");
    conTimer.value = 0;
}

//ADD EXERCISE TO DATABASE
function AddSessionEntry() {
    const con_input_Weight =
        +document.getElementById("input_StSe_Weight").value;
    const con_input_Reps = +document.getElementById("input_StSe_Reps").value;
    const cont_label_ExerciseName = document.getElementById(
        "display_StSe_ExerciseName"
    ).innerText;

    let Sday, Smonth, Syear;

    Sday = DateStart.getDate();
    Smonth = DateStart.getMonth() + 1;
    Syear = DateStart.getFullYear();

    db.Sessions.put({
        day: Sday,
        month: Smonth,
        year: Syear,
        exercise_name: cont_label_ExerciseName,
        weight: con_input_Weight,
        reps: con_input_Reps,
    })
        .then(() => {
            LTC("Exercise Added To DB");
            ClearControl(document.getElementById("input_StSe_Reps"));
        })
        .catch((err) => {
            LTC("Err encountered");
            LTC(err);
        });
}

//ONSTART
Con_Instruc_DropD.addEventListener("change", () => {
    GetUniqueSetsByInstructor();
});
GetUniqueInstructor();
ShowOrHide(document.getElementById("divSessionTracker"));
