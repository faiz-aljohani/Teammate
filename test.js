

let a = [{
    userID: "21df",
    name: "Emad"
},
{
    userID: "3i3j4",
    name: "Khaled"
},
{
    userID: "awd8awy",
    name: "Ahmed"
},

]

a.forEach(element => {
    if(Object.values(element).indexOf('Ahmed') > -1){
        console.log("awd8awy");
        return true;
    }

})

