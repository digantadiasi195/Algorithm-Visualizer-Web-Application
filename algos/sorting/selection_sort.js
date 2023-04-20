// Selection Sort Code

function selectionSort(arr){
    let i, j, min_id;
    for (i = 0; i < arr.length; i++){
        min_id = i;
        for (j = i + 1; j < arr.length; j++)
            if (arr[j] < arr[min_id])
                min_id = j;
        [arr[i], arr[min_id]] = [arr[min_id], arr[i]]
    }
    return arr;
    
}