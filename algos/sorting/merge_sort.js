// Merge Sort Code


function mergeSort(arr){
    if (arr.length < 2) 
        return arr;

    let mid =  Math.ceil(arr.length / 2), i, il, ir, left, right;

    left = mergeSort(arr.slice(0, mid));
    right = mergeSort(arr.slice(mid));

    for (i = 0, il = 0, ir = 0; i < (left.length + right.length); i++){
        if (left[il] < right[ir])
            arr[i] = left[il++];
        else 
            arr[i] = right[ir++];
        

      	if (il == left.length)
            for (i++; ir < right.length; ir++, i++)
                arr[i] = right[ir];
        if (ir == right.length)
            for (i++; il < left.length; il++, i++)
                arr[i] = left[il];
    }
    return arr;
}