//#region DEV
function Dev_BulkAdd() {
    db.Exercises.bulkPut([
        {
            instructor: "SkiMask",
            set_name: "Day 1",
            exercise: "Flat Bench Press",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 1",
            exercise: "Barbell Squat",
            rest: 120,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 1",
            exercise: "Bent-Over Row",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 1",
            exercise: "Dumbbell Side Raises",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 1",
            exercise: "Rarbell Bicep Curls",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 1",
            exercise: "Tricep Rope Pulldown",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 2",
            exercise: "Incline Dumbbell Press",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 2",
            exercise: "Romanian Deadlifts",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 2",
            exercise: "Lying Down Overhead Lifts",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 2",
            exercise: "Seated Dumbell Shoulder Press",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 2",
            exercise: "Incline Dumbell Curl",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 2",
            exercise: "Seated Tricep Overhead Extension",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 3",
            exercise: "Cable Chest Crossovers",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 3",
            exercise: "Leg Press",
            rest: 120,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 3",
            exercise: "Seated Cable Row",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 3",
            exercise: "Standing Overhead Press",
            rest: 90,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 3",
            exercise: "Dumbbell Hammer Curl",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "SkiMask",
            set_name: "Day 3",
            exercise: "Lying Down Skull Crushers",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "Will Tennyson",
            set_name: "Day 1",
            exercise: "Squats",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "Will Tennyson",
            set_name: "Day 1",
            exercise: "Pause Bench Press",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "Will Tennyson",
            set_name: "Day 1",
            exercise: "Barbell Rows",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "Will Tennyson",
            set_name: "Day 1",
            exercise: "Romanian Deadlifts",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "Will Tennyson",
            set_name: "Day 1",
            exercise: "Barbell Curls",
            rest: 60,
            reps: 12,
            sets: 3,
        },
        {
            instructor: "Will Tennyson",
            set_name: "Day 1",
            exercise: "Inverted Rows",
            rest: 60,
            reps: 12,
            sets: 3,
        },
    ]);
}

function Dev_CheckStats() {
    db.Sessions.bulkPut([
        {
            day: 1,
            year: 2023,
            month: 4,
            exercise_name: "Testing 1",
            reps: 1,
            weight: 10,
        },
        {
            day: 2,
            year: 2023,
            month: 4,
            exercise_name: "Testing 1",
            reps: 1,
            weight: 10,
        },
        {
            day: 3,
            year: 2023,
            month: 4,
            exercise_name: "Testing 1",
            reps: 1,
            weight: 10,
        },
        {
            day: 8,
            year: 2023,
            month: 4,
            exercise_name: "Testing 1",
            reps: 1,
            weight: 10,
        },
        {
            day: 9,
            year: 2023,
            month: 4,
            exercise_name: "Testing 1",
            reps: 1,
            weight: 10,
        },
        {
            day: 20,
            year: 2023,
            month: 4,
            exercise_name: "Testing 1",
            reps: 1,
            weight: 10,
        },
    ]);
}
//#endregion

//#region DEXIE
//Initialize Dexie
var db = new Dexie("ExerciseDB");
db.version(1).stores({
    Exercises: `
        id++,
        instructor,
        set_name,
        [instructor+set_name]
        `,
    Sessions: `
        id++,
        day,
        month,
        year,
        exercise_name,
        weight,
        [month+year],
        [day+month+year]
        `,
});
//#endregion

//#region LOG ENABLED
function LTC(msg) {
    console.log(msg);
}
//#endregion

//Check if there are no exercises
async function CheckDB(){
    const ReturnedResult = await db.Exercises.toArray();
    if (ReturnedResult.length == 0){
        Dev_BulkAdd();
    }
}

//#region CLEAR CONTROLS
//CLEAR CONTROLS ON ADDED NEW EXERCISE
function ClearControl() {
    let args = Array.from(arguments);
    for (let arg in args) {
        args[arg].value = "";
    }
    LTC("Cleared Labels");
}

function UpdateLabels(Element, Value) {
    Element.innerText = Value;
    LTC("Update Label");
}

function ShowOrHide(Element) {
    if (Element.style.display == "none") {
        Element.style.display = "block";
    } else {
        Element.style.display = "none";
    }
}
//#endregion
//Dev_BulkAdd()
//Dev_CheckStats()
