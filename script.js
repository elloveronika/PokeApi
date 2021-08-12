// for Monday Aug 9th:
  // Convert Promise chain to async/await syntax
  // Display all pokemon evolutions to the DOM along with sprites
  // hard mode: get Eevee's evolutions to display in the DOM


//   document.querySelector('button').addEventListener('click' , doPokeStuff);
  document.querySelector('button').addEventListener('click' , async ()=>{
        let poke = await getPoke(); 
        
        getSprites(poke);
    });



// function getPoke(){
//     const choice = document.querySelector('input').value
//     const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${choice}/`

//     try {
//     fetch(pokeUrl)
//         .then(res => res.json())
//         //json is a method on the response object which is being called
//         .then(data => {
//             console.log(data)
//             let chainUrl = data.species.url
            
//             document.querySelector('.pokeOne').src = data.sprites.front_default 
//             // querySelector is a method on the document object and is passed .pokeOne as an argument
//             // document method querySelector is called with .pokeOne as an argument
//             //a parameter is a placeholder for an argument that hasnt been passed in yet
//         fetch(chainUrl)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 let evoChain = data.evolution_chain.url
//             fetch(evoChain)
//                 .then(res => res.json())
//                 .then(data => {
//                     console.log(data)
//                 })
//             })
//         })   
//     } catch (error) {
        
//     }

// }


let pokeUrl = `https://pokeapi.co/api/v2/pokemon/`;

async function getSprites(poke){
 try{

    document.querySelector('#img_cont').innerText = ''
    document.querySelector('#name').innerText = ''

    for(let i =0; i< poke.length; i++){
        
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke[i]}/`)

        const pokeData = await pokeRes.json()
        let p = document.createElement('p');
        p.innerText = pokeData.species.name
        let image = document.createElement('img');//thie is creating an image element 
        image.src = pokeData.sprites.front_default; //this is reassassigning image to an added source of the sprites
        document.getElementById("img_cont").appendChild(image);//it looks like this is appending or adding created  elements into the div id img cont
        document.getElementById('name').appendChild(p);

       
        }

 }catch(error){

 }
}
async function  doPokeStuff(){ 

    let poke = await getPoke(); 
    
    getSprites(poke); //this variable is declared and ran when the eventlistener triggers this function ?
}




async function getPoke(){
    try {
        const choice = document.querySelector('input').value.toLowerCase();
        pokeUrl = `https://pokeapi.co/api/v2/pokemon/${choice}/`

    
        const resOne = await fetch(pokeUrl);
        const dataOne = await resOne.json();
            //json is a method on the response object which is being called
            console.log(dataOne)
        const chainUrl = dataOne.species.url;
                
            document.querySelector('.pokeChosen').src = dataOne.sprites.front_default;

            document.querySelector('.pokeChosenBack').src = dataOne.sprites.back_default;
                // querySelector is a method on the document object and is passed .pokeChosen as an argument
                // document method querySelector is called with .pokeOne as an argument
                //a parameter is a placeholder for an argument that hasnt been passed in yet
        const resTwo = await fetch(chainUrl);
        const dataTwo = await resTwo.json();
            console.log(dataTwo)
        
        const evoChain = dataTwo.evolution_chain.url
        const resThree = await fetch(evoChain)
        
        const dataThree = await resThree.json()
            console.log(dataThree)
            const evoBegin = dataThree.chain

            // const firstEvo = evoBegin.species
            // const secondEvo = evoBegin.evolves_to[0].species
            // const thirdEvo = evoBegin.evolves_to[0].evolves_to[0].species

            let nextEvo = evoBegin.evolves_to
            
            let name = [evoBegin.species.name]
            
            while(nextEvo.length > 0){
    
                name.push(...nextEvo.map(poke => poke.species.name))// the dots breaks the arrays up into a list of strings which then get pushed into array of name 

                // console.log(`This is inside the while loop: ${nextEvo}`)
                nextEvo = nextEvo[0].evolves_to;
    
            }
            
             return name
            // console.log(firstEvo)
            // console.log(secondEvo)
            // console.log(thirdEvo)

          
    } catch (error) {
        
    }

}

// async function getPokeNames(){
// document.querySelector('h2').innerHTML = ''
// let thisArray =  await getPoke()
// var d1 = document.querySelector('h2');

//     for(let i =0; i< thisArray.length; i++){
//        d1.insertAdjacentHTML. thisArray[i]
//     }
// }
