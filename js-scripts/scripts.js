const Url = 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000';
let numberOfPosts = 0;
let dataSet = '';
// let userInput = $('#userInput');




fetch(Url)
.then(res => {
   return res.json()
})
.then(data => {

  numberOfPosts = data.length;

  data = data.map((post) => {
    let title = document.createElement('textarea');
    let body = document.createElement('textarea');

    title.innerHTML += post.title;
    body.innerHTML += post.body;
    post.keywords = post.keywords.split(",").join(" ");

    return {title: title.value, body: body.value, keywords: post.keywords};
  })

  postHiddenData(data)
  dataSet = data;

  $('#getPosts').click(()=> {
    resetFocus();
    renderResults(search(getUserQuery()))


  })

  $('#getPosts').keydown((event)=>{
    if (event.keyCode === 13){
      resetFocus();
      renderResults(search(getUserQuery()))


    }
  })


  $('#userInput').on('input', () => {
    hideAllPost();
  })


  // $("i[class*='fa-star']").click(()=> {
  //   // alert('hi')
  //   changeToGreenStar();
  // })

  $("i").click(function () {
    // alert('hi')
    changeToGreenStar($(this));
    changeToGrayStar($(this));
  })


})
.catch(error => console.log(error))



const postHiddenData = (data) => {
  let index = 0;
  let output = '';

  data.forEach((element) => {

    output += `
      <div style="display:none" class="container keyword" data-keywords="${element.keywords}" id="${index}">
        <div class="row">
        <div class="col-1"><i class="fas fa-star fa-lg"></i></div>
        <div class="col title">${element.title}</div>
        <div class="col">${element.body}</div>
        </div>
      </div>
    `;

    index++;
  });

  $('#output').html(output);
}


const getUserQuery = () => {
  let userInput = $('#userInput').val().toLowerCase().split(" ");
  let uniqueUserInput = [...new Set(userInput)];
  return uniqueUserInput;
}

const search = (query) => {
  let allResultsArr = [];
  let title = $("div[class*='title']");
  let keyword = $("div[class*='keyword']");

  for (let arrIndex in query){

    let eachQuery = query[arrIndex];
    let eachQueryInReg = new RegExp(eachQuery,"g");
    for (let dataIndex in dataSet){

      if (title.eq(dataIndex).text().toLowerCase().match(eachQueryInReg) !== null){
        allResultsArr.push(dataIndex);
      }

      if (keyword.eq(dataIndex).data("keywords").match(eachQueryInReg) !== null) {
        allResultsArr.push(dataIndex);
      }
    }
  }

      let uniqueResultsArr = [...new Set(allResultsArr)];
      return uniqueResultsArr;
}


const renderResults = (arr) => {
  console.log(arr)
  for (let index in arr) {
    $("div[id=" + arr[index] + "]").removeAttr("style");
  }
}

const clearInputField = () => {
  $('#userInput').val("");
}

const resetFocus = () => {
  $('#userInput').focus();
}

const hideAllPost = () => {

  for (let index in dataSet) {
    if ($("div[id=" + index + "]:not([style])")){
      $("div[id=" + index + "]").css("display","none");
      console.log("display none")
    }
  }
}

const changeToGreenStar = (obj) => {
  let clone;
    if (!obj.hasClass("clicked")){
        // console.log('not clicked class');
         obj.addClass("clicked");
         // clone = obj.parent().parent().clone();
         clone = obj.parents().eq(2).clone();
         $('#favorites-list').append(clone);
       }
}

const changeToGrayStar = (obj) => {
  let id;

    if(obj.hasClass("clicked")){
      id = obj.parents().eq(2).attr("id");
      console.log(id);
      $("div[id=" + id + "]").
    }
}


// questions:
// why array is automatically empty after first itiration
// issue:
//get rid of comma inside array
