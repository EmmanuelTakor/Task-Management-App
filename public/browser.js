document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('edit-me')){
       let userInput = prompt("Please enter your desired text")
       axios.post('/update-item', {text:userInput, id: e.target.getAttribute("data-id") }).then(()=>{e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput}).catch(()=>{console.log("Please try again later!")})
    //    console.log(userInput)
    }
})