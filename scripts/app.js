function loadPokemons() {
    $.ajax({
        url: "http://localhost:3000/pokemon/",
        type: 'GET',
        dataType: "JSON",
        success : function(data) {         
            let output = "";
            for(let i in data) {
                output += `
                    <li class="pokemon-pre-view">
                        <article id="_pokId">
                            <figure class="poke-picture" onClick="modal(${data[i].id})">
                                <img src="${data[i].picture}" alt="${data[i].name}">
                            </figure>
                            <div class="pre-view-title">
                                <label>${data[i].name}</label>
                                <button onClick="modal(${data[i].id})"> See More </button>
                            </div>
                        </article>
                    </li>
                `;
            }
            document.querySelector("#_list").innerHTML = output;
        }
    }); 
}

function getPokemonById(pokId) {
    $.ajax({
        url: "http://localhost:3000/pokemon/"+pokId,
        type: 'GET',
        dataType: "JSON",
        success : function(data) {         
            output = `
                <div class="pokSection-title">
                    <button onclick="hide()">Back</button>
                    <label id="pokName">${data.name}</label>
                </div>
                <div class="pokSection-stats">
                    <div>
                        <label>${runArray(data.type)}</label>
                    </div>
                    <label>#${data.id}</label>
                    <div class="stats">
                        <figure class="poke-picture">
                            <img src="${data.img}" alt="${data.name}">
                        </figure>
                        <ul class="pokAttribs">
                            <li class="pokAttrib">HP :      ${data.stats.hp}</li>
                            <li class="pokAttrib">ATTACK :  ${data.stats.attack}</li>
                            <li class="pokAttrib">DEFENSE : ${data.stats.defense}</li>
                        </ul>
                    </div>
                </div>
                <div class="pokSection-misc">
                    <div>
                        <label> Profile </label>
                    </div>
                    <label> Height: ${data.misc.height} </label>
                    <label> Weight: ${data.misc.weight} </label>
                    <label> Gender: Male : ${data.misc.sex.male} Female : ${data.misc.sex.female} </label>
                </div>
                <div id="reg">
                    <div>
                        <label for="">Name</label><input id="p_name" type="text">
                    </div>
                    <div>
                        <label for="">Lastname</label><input id="p_lastname" type="text">
                    </div>
                    <div>
                        <label for="">Age</label><input id="p_age" type="text">
                    </div>
                    <div>
                        <label for="">Country</label><input id="p_country" type="text">
                    </div>
                    <div>
                        <label for="">City</label><input id="p_city" type="text">
                    </div>
                    <button onclick="reg()">Register</button>
                </div>
            `;
            document.querySelector("#myPokemon").innerHTML = output;
        }
    });
}

function modal(pokId) {
    document.querySelector("#modal").classList.remove("hidden");
    let id = parseInt(pokId)-1;
    getPokemonById(id);
}

function runArray(arr){
    let txt = "";
    for (let i in arr) {
        txt += arr[i];
    }
    return txt;
}

function hide() {
    document.querySelector("#modal").classList.add("hidden");
}

function reg() {
    let name = document.querySelector("#p_name").value;
    let lastname = document.querySelector("#p_lastname").value;
    let age = document.querySelector("#p_age").value;
    let country = document.querySelector("#p_country").value;
    let city = document.querySelector("#p_city").value;
    $.ajax({
        url: "http://localhost:3000/register",
        type: 'POST',
        dataType: "JSON",
        data: {
            "name":name,
            "lastname":lastname,
            "age":age,
            "country":country,
            "city":city
        }
    });
}