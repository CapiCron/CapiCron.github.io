//#region ADD TO DB
//ADD AN EXERCISE TO THE DB
function AddExerciseToDB() {
    //Controls that dont cleared on entry
    const control_Instructor = document.getElementById("input_NeEx_Instructor");
    const control_SetName = document.getElementById("input_NeEx_SetName");

    //Controls that wil be cleared on entry
    const control_Exercise = document.getElementById("input_NeEx_Exercise");
    const control_Sets = document.getElementById("input_NeEx_Sets");
    const control_Reps = document.getElementById("input_NeEx_Reps");
    const control_Rest = document.getElementById("input_NeEx_Rest");

    db.Exercises.add({
        instructor: control_Instructor.value,
        set_name: control_SetName.value,
        exercise: control_Exercise.value,
        sets: control_Sets.value,
        reps: control_Reps.value,
        rest: control_Rest.value,
    })
        .then(() => {
            LTC("Entry added successfully");
            ClearControl(
                control_Sets,
                control_Reps,
                control_Rest,
                control_Exercise
            );
        })
        .catch((err) => {
            LTC("Something went wrong. No entry added");
            LTC(err);
        });
}
//#endregion
