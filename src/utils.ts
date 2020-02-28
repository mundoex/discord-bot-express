export function replaceSpacesWithSlashes(text:string) {
    return text.replace(/[ ]/g,"/");
}

export function randomBetween(min:number, max:number){
    return Math.floor(Math.random() * max) + min;
}