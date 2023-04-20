// Bubble Sort Code

function bubbleSort(arr){
    let i, j;
    for (i = 0; i < arr.length ; i++)
        for(j = 0; j < arr.length - i - 1; j++)
            if (arr[j] > arr[j + 1])
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    return arr;
}