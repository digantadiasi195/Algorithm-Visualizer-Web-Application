//  Heap Sort Code

function createHeap(arr){
    let i = Math.floor(arr.length / 2 - 1);
    while (i >= 0)
        heapify(arr, i--, arr.length);
    
}
  
function heapify(arr, i, n){
    let largeValue = i, il = 2 * i + 1, ir = il + 1;

    if (il < n && arr[il] > arr[largeValue])
        largeValue = il;
    
    if (ir < n && arr[ir] > arr[largeValue])        
        largeValue = ir;
  
    if (largeValue != i) {
        [arr[i], arr[largeValue]] = [arr[largeValue], arr[i]];
        heapify(arr, largeValue, n);
    }
}

function heapSort(arr){
    let n = arr.length - 1;
    
    createHeap(arr);
  	while (n > 0){
        [arr[0], arr[n]] = [arr[n], arr[0]];
        heapify(arr, 0, n--);
    }
    return arr;
}