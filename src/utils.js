export function debounce(mainFunc, delay){
    let timerId;

    return function(...args){
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            mainFunc(...args);
        }, delay);
    }
}