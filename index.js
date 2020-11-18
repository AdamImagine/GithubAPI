'use strict';

function submitForm(){
    $('#searchUserForm').submit(event => {
        event.preventDefault();
        console.log('submitForm ran')
        const userInput = $('#userHandle').val();
        getSearchResults(userInput);
        console.log(userInput)
    });
}




function getSearchResults(userHandle) {
    console.log('getSearchResults ran');
    const url = `https://api.github.com/users/${userHandle}/repos`
    console.log(url);
    //request to Github API
    fetch(url)
    .then(response =>{
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => renderSearchResults(responseJson))
    .catch(err =>alert(err));
}

function renderSearchResults(resultsList) {
    console.log(resultsList);
    $('#results-list').html("");
    $('#results').text("Your results");
    resultsList.forEach(item =>{
        $('#results-list').append(`<li><h3>${item.full_name}</h3>)
        <p><a href=${item.html_url}>${item.html_url}</a></p></li>`)
    });
}

function init() {
    console.log("initializing");
    
    submitForm();
}

init()