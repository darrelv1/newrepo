/*


Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/




/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemsPerPage = 9;

/** Produces the list of the students, providing the option of what page to display in the page parameter
 *
 * @param {Array} list - The array of student objects
 * @param {int} page - # you'll want to display
 */
function showPage (list, page = 1) {
    let startInd = (page * itemsPerPage) - itemsPerPage;
    let endInd = (page * itemsPerPage);

    const ul_studentList = document.querySelector(".student-list");

    ul_studentList.innerHTML = "";

    /** helper function  - inserting each object properties to the html string*/
    function createItem (li){
        const email = li["email"];
        const fullname = li.name['first'] +" "+ li.name['last'];
        const datejoined = `Joined ${li.registered["date"]}`;
        const src = li.picture['large'];

        const html= `<li class="student-item cf">
                <div class="student-details">
                  <img class="avatar" src=${src} alt="Profile Picture">
                  <h3>${fullname}</h3>
                  <span class="email">${email}</span>
                </div>
                <div class="joined-details">
                  <span class="date">${datejoined}</span>
                </div>
             </li>`

        return html;
    }
    /** helper function  - appending the students html component into the index.html */
    function insertli(plugin){
        ul_studentList.insertAdjacentHTML("beforeend", plugin);
    }

    for (let ind = 0; ind < list.length; ++ind){
        if ( ind >= startInd && ind < endInd){
            let li = list[ind];
            insertli(createItem(li));
        }

    }
}
showPage(data,1)
let numberOfPages ;

/**
 * defines and creates buttons according to pages necessary to display 9 students based on the object array
 * @param {Array} list - Array of students objects.
 */
function addPagination(list){
    numberOfPages = Math.ceil(list.length /  itemsPerPage);
    ul_linklist =document.querySelector(".link-list");
    ul_linklist.innerHTML = "";

    function createPgButton (number){
        const html = `
        <li>
            <button type="button">${number}</button>
        </li>
        `

        return html
    }

    function addpgButton(butt){
        ul_linklist.insertAdjacentHTML("beforeend", butt);
    }

   for (let ind = 1; ind <= numberOfPages ; ind++){

       addpgButton(createPgButton(ind));
    }


};
addPagination(data);



document.querySelector(".link-list button").className = "Active";



ul_linklist.addEventListener( "click" , (e) =>{

    if(e.target.tagName === "BUTTON"){
        let button = e.target


        try{
        prevButton = document.querySelector("button.Active");
        prevButton.className = ""} catch (error){

        }

        button.className = "Active"

        showPage(data,button.textContent )
    }
})

const searchLabel = `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`

document.querySelector("div .header").innerHTML = searchLabel;

submit = document.querySelector( 'div.page button[type = button]')
const searchInput = document.querySelector('#search')

/**
 * searches a match of the searchVal and returns a sublist of student objects of the matches
 * @param {String} searchVal - search value
 * @param {Array} data - Array of student objects
 * @returns {number} - the # of students that match
 */
function search (searchVal, data){
    const filterData = [];
    for (let ind = 0 ;  ind <  data.length; ind++){
        const ele = data[ind]
        const eleName = ele.name['first'] + ele.name['last'];
        if(searchVal.value !== "" && eleName.toLowerCase().includes(searchVal.toLowerCase())){
                filterData.push(ele);
        }
    }
    addPagination(filterData);
    showPage(filterData);
    return filterData.length
}

/** helper function - handles  two events when the search executed.
 */
function searching(){
    const searchInput = document.querySelector ("#search").value;
    if (searchInput === "" ){

        addPagination(data);
        showPage(data, 1);


    }else {
        const pplFound = search(searchInput, data)
        if (pplFound === 0){
            const ul = document.querySelector(".student-list")
            ul.innerHTML = "No Result Found"
            ul.style.textAlign = 'Center'
        }
    }

}

submit.addEventListener ("click", searching)

searchInput.addEventListener ("keyup", searching)
// Call functions
