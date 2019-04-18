
function searchAssigned() {
  const INPUT = document.getElementById('input')
  const FILTER = INPUT.value.toUpperCase()
  const CARDS_ARRAY = Array.from(document.getElementsByClassName("card-container"))

  for(let i = 0; i < CARDS_ARRAY.length; i++) {
    const P_TEXT = CARDS_ARRAY[i].getElementsByClassName('assigned-user')[0].innerText
    const NAME = P_TEXT.split('Assigned to ').join('')
    console.log(NAME);
    
  }

  console.log(FILTER)
}