const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = " !~`@#$%^&*()-+=[]{}/<?>,:;|_.";

   let password ="";
   let passwordLength = 10;
   let checkCount = 0;
   handleSlider();
//    set strength circle color to grey
setIndicator("#ccc");

//set passward length
function handleSlider(){
   inputSlider.value = passwordLength;
   lengthDisplay.innerText = passwordLength;

   const min = inputSlider.min;
   const max = inputSlider.max;
   inputSlider.style.backgroundSize =((passwordLength-min)*100/(max-min))+"% 100% "
}

 
function setIndicator(color) {
   indicator.style.backgroundColor = color;
   indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
   //shadow - HW. 
}

 //generate Integer
function getRndInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min;
} 

//Generate Random no.
function generateRandomNumber(){
   return getRndInteger(0,9);
}

// Generate Lowercase
function generateLowerCase(){
  return String.fromCharCode(getRndInteger(97,123));
}

//Generate Uppercase
function generateUpperCase(){
   return String.fromCharCode(getRndInteger(65,91)); 
}

//Generate Symbols
function generateSymbol(){
   const randomNum = getRndInteger(0,symbols.length);
   return symbols.charAt[randomNum];
}

//When we have tick the check boxes if condition apply 
function calcStrength(){     
   let hasUpper = false;
   let hasLower = false;
   let hasNum = false;
   let hasSym = false;
   if(uppercaseCheck.check) hasUpper = true;
   if(lowercaseCheck.check) hasLower = true;
   if(numbersCheck.check) hasNum = true;
   if(symbolsCheck.check) hasSym = true;


if((hasUpper && hasLower) && (hasNum||hasSym)&&passwordLength >=8){
   setIndicator("#0f0");
}
 else if(
   (hasLower||hasUpper)&&
   (hasNum||hasSym)&&
   passwordLength >=6)
   {
   setIndicator("#ff0");
  }
  else{
   setIndicator("#f00");
   }      
}



// function getRndInteger(min, max) {
//    return Math.floor(Math.random() * (max - min)) + min;
// }

// function generateRandomNumber() {
//    return getRndInteger(0,9);
// }

// function generateLowerCase() {  
//       return String.fromCharCode(getRndInteger(97,123))
// }

// function generateUpperCase() {  
//    return String.fromCharCode(getRndInteger(65,91))
// }

// function generateSymbol() {
//    const randNum = getRndInteger(0, symbols.length);
//    return symbols.charAt(randNum);
// }

// function calcStrength() {
//    let hasUpper = false;
//    let hasLower = false;
//    let hasNum = false;
//    let hasSym = false;
//    if (uppercaseCheck.checked) hasUpper = true;
//    if (lowercaseCheck.checked) hasLower = true;
//    if (numbersCheck.checked) hasNum = true;
//    if (symbolsCheck.checked) hasSym = true;
 
//    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
//      setIndicator("#0f0");
//    } else if (
//      (hasLower || hasUpper) &&
//      (hasNum || hasSym) &&
//      passwordLength >= 6
//    ) {
//      setIndicator("#ff0");
//    } else {
//      setIndicator("#f00");
//    }
// }


async function copyContent(){
   try{
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText="copied";  
   }
   catch(e){
      copyMsg.innerText="Failed";  
   }

   //Copy wala span visible ho jyga
   copyMsg.classList.add("active");

   // Span active ko remove krne k liye setTimeout laga diya
   setTimeout(() => {
      copyMsg.classList.remove("active");
   },2000); 
}


function shufflePassword(array){
   //Fisher yates Method
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

//For check box    
function handleCheckBoxChange(){
   checkCount=0;
   allCheckBox.forEach((checkbox)=>{
      if(checkbox.checked)
      checkCount++;
   });

   if(passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider();    //for passward length change we call function handleslider 
   }

}

allCheckBox.forEach((checkbox)=>{
   checkbox.addEventListener('change',handleCheckBoxChange); 
})


//For slider and the no. lengtth change 
inputSlider.addEventListener('input',(e)=>{
   passwordLength = e.target.value;
   handleSlider();
}) 

//For the copying the content If content is present 
copyBtn.addEventListener('click',()=>{
   if(passwordDisplay.value)
   copyContent();
})


//Generate button 
generateBtn.addEventListener('click',() =>{
   if(checkCount == 0 ) 
    return;

   if(passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider();
   }

   console.log("starting the journey");
   //let start the journey to find new password
 // Remove old password
 password="";
 //let's put the stuff mentioned by checkboxes
//  if(uppercaseCheck.checked){
//    password+=generateUpperCase();
//  }
//  if(lowercaseCheck.checked){
//    password+=generateLowerCase();
//  }
//  if(numbersCheck.checked){
//    password+=generateRandomNumber();
//  }
//  if(symbolsCheck.checked){
//    password+=generateSymbol();
//  }   
 
//through array function 
 let funcArr = [];
 if(uppercaseCheck.checked)
 funcArr.push(generateUpperCase);

 if(lowercaseCheck.checked)
 funcArr.push(generateLowerCase);
  
 if(numbersCheck.checked)
 funcArr.push(generateRandomNumber);

 if(symbolsCheck.checked)
 funcArr.push(generateSymbol);

 //Compulsory addition
 for(let i=0;i<funcArr.length;i++){
   password+=funcArr[i]();
 }
 console.log("Compulsory addition done");

 //remaning additon
 for(let i=0;i<passwordLength-funcArr.length;i++){
    let randIndex = getRndInteger(0,funcArr.length);
   //  console.log("randIndex"  + randIndex);
    password+=funcArr[randIndex]();
 }  
console.log("Remaining addition done");

 //Suffle the password
 password = shufflePassword(Array.from(password));
 console.log("shuffle done");
 //show to UI

 passwordDisplay.value=password;
 //calculate strength
 calcStrength();


});



   

 







  
