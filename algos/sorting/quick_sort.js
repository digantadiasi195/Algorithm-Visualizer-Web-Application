// Quick Sort Code

function quickSort(arr, low, high) {
    if (low < high){
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    
    let i=low, j=high, pivot = arr[Math.floor((low + high) / 2)];
    while(i <= j) {
        while(arr[i] < pivot)  
            i++; 
        while(arr[j] > pivot)  
            j--; 
        if(i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++; j--; 
        }
    }
    return i;
}