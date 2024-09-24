const host = 'http://localhost:3000'

//returns all words from dictionary
export function getWords(){
    return fetch(host + '/words')
    .then(data => data.json())
}

//returns a word pair matching finnish word
export function getWord(word){
    return fetch(host + '/words/' + word)
    .then(data => {
        if(data.ok){
            return data.json()
        }else{
            throw new Error('Word not found')
        }
    })
}

//add a new word pair to dictionary
export function addWord(wordPair){ 
    console.log(wordPair);
    return fetch(host + '/words', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(wordPair)
    })
    .then(data => data.json())
}