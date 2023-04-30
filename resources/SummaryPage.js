//GLOBAL
let Sess;
const con_Weight = document.getElementById("disp_Total_Weight");
const con_Sets = document.getElementById("disp_Total_Sets");
const con_Reps = document.getElementById("disp_Total_Reps");

async function GetSessionInformation(){
    const CurrentDate = new Date();
    const cYear = CurrentDate.getFullYear();
    const cMonth = CurrentDate.getMonth()+1;
    const cDay = CurrentDate.getDate(); 

    //LTC("Finding Session Information");



    const SessionDetails = await db.Sessions.where({day:cDay,month:cMonth,year:cYear}).toArray();
    Sess = SessionDetails;
    
}

function CountWeight(ArrList){
    let sumWeight = 0;
    let sumReps = 0;
    let sumSets = 0;
    
    console.log(ArrList)
 
    for (let i =0; i< ArrList.length; i++){
        sumWeight +=ArrList[i].weight
        sumSets +=1;
        sumReps +=ArrList[i].reps
    }

    con_Weight.innerText = sumWeight;
    con_Sets.innerText = sumSets;
    console.log(sumSets)
    con_Reps.innerText = sumReps;
   
}

function CreateStats(){
    CountWeight(Sess);
}

GetSessionInformation().then(()=>{
    CreateStats();
});

