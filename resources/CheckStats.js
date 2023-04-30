//GLOBAL
let UniqueExercise;
let TableData = [];

//#region MAX WEIGHT TABLE
async function GetUniqueExercises() {
    const ReturnedResult = await db.Sessions.orderBy(
        "exercise_name"
    ).uniqueKeys(function (KeyArray) {
        return KeyArray;
    });

    UniqueExercise = ReturnedResult;

    for (let i = 0; i < UniqueExercise.length; i++) {
        const CurrentExercise = await db.Sessions.where("exercise_name")
            .equals(UniqueExercise[i])
            .toArray();
        let current_max = 0;
        for (let j = 0; j < CurrentExercise.length; j++) {
            if (CurrentExercise[j].weight <= current_max) {
                continue;
            } else {
                current_max = CurrentExercise[j].weight;
            }
        }
        TableData.push({
            exercise: CurrentExercise[0].exercise_name,
            max_weight: current_max,
        });
    }
    BuildTable();
}

function BuildTable() {
    for (let i = 0; i < TableData.length; i++) {
        const htTable = document.getElementById("Disp_ChSt_MaxWeight");
        let row = htTable.insertRow();
        const cellName = row.insertCell(0);
        const cellMaxWeight = row.insertCell(1);
        cellName.innerHTML = TableData[i].exercise;
        cellMaxWeight.innerHTML = TableData[i].max_weight + " kg";
    }
}
//#endregion MAX WEIGHT TABLE

//#region CONSISTANCY TABLE
async function GetDaysWorkedOut() {
    //Get array of all days exercised
    const CurrentDate = new Date();
    const CurYear = CurrentDate.getFullYear();
    const CurMonth = CurrentDate.getMonth() + 1; //Month is zero indexed
    const DaysWorkedDexie = await db.Sessions.where({
        year: CurYear,
        month: CurMonth,
    }).toArray();
    let temp = [];
    let tempSet;
    let arrDays;
    //Get only the days
    for (let i = 0; i < DaysWorkedDexie.length; i++) {
        temp.push(DaysWorkedDexie[i].day);
    }

    tempSet = new Set(temp);
    arrDays = Array.from(tempSet);

    let numberOfDaysInMonth = GetDaysInCurrentMonth(CurYear, CurMonth);
    const tbl = document.getElementById("Disp_ChSt_Consistancy");
    let tblContent = "<tr>";
    //Loop Through for Days
    let DayOfWeek = 0;
    let cl = "";

    const textDayName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const textMonthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const MonthDisp = document.getElementById("Disp_Month");
    MonthDisp.innerText = textMonthName[CurMonth - 1];

    let Headings = "<tr>";
    for (let f = 1; f < 8; f++) {
        let temp_Date = new Date(CurYear, CurMonth - 1, f);

        let x = temp_Date.getDay();

        Headings += `<td>${textDayName[x]}</td>`;
    }
    Headings += "</tr>";

    tblContent += Headings;

    for (
        let DaysInMonth = 1;
        DaysInMonth < numberOfDaysInMonth + 1;
        DaysInMonth++
    ) {
        if (DayOfWeek < 7) {
            cl = "<td>";
            for (let i = 0; i < arrDays.length; i++) {
                if (DaysInMonth == arrDays[i]) {
                    cl = `<td class="has-background-primary">`;
                    break;
                }
            }
            tblContent += cl + `${DaysInMonth}</td>`;
            DayOfWeek++;
        } else {
            cl = "<td>";
            for (let j = 0; j < arrDays.length; j++) {
                if (DaysInMonth == arrDays[j]) {
                    cl = `<td class="has-background-primary">`;
                    break;
                }
            }

            tblContent += `</tr><tr>${cl}${DaysInMonth}</td>`;
            DayOfWeek = 1;
        }
    }

    tbl.innerHTML = tblContent;
}

function GetDaysInCurrentMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

//#endregion CONSISTANCY TABLE

GetDaysWorkedOut();
GetUniqueExercises();
