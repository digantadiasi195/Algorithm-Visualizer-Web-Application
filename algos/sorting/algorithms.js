
// all the algorithms

var x;

export async function bubbleSort(arr, state){
    let i, j, len = arr.length;

    x = d3.scaleLinear()
        .domain([0,d3.max(arr)])
        .range([0,700]);

    for (i = 0; i < len; i++)
        drawUnselect(i);
    
    for (i = 0; i < len ; i++){
        for(j = 0; j < len - i - 1; j++){
            drawSelect(j);
            drawSelect(j + 1);
            await sleep(state.delay);

            if (arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                drawSwapSelected(j, j + 1);
                await sleep(state.delay);
            }
            
            if (!state.running) 
                return arr;
            if (state.pause)
                while (state.pause) 
                    await sleep(100);
        
            drawUnselect(j);
            drawUnselect(j + 1);
        }
        
        drawSorted(len - 1 - i);
    }
    return arr;
}

export async function insertionSort(arr, state){ 
    let i, j, k, key, len = arr.length;
    x = d3.scaleLinear()
        .domain([0,d3.max(arr)])
        .range([0,700]);

    for (i = 0; i < len; i++)
        drawUnselect(i);

    drawSorted(0);
    await sleep(state.delay);

    for (i = 1; i < len; i++){ 
        key = arr[i];
        j = i - 1; 
        drawSelect(i);
        await sleep(state.delay);
        
        if (!state.running) 
            return arr;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        while (j >= 0 && arr[j] > key){ 
            drawAltSelect(j);
            arr[j + 1] = arr[j]; 
            j--;  
            await sleep(state.delay);
            
            if (!state.running) 
                return arr;
            if (state.pause)
                while (state.pause) 
                    await sleep(100);
        } 
        arr[j + 1] = key; 
        for (k = j + 1; k <= i; k++) 
            drawUpdate(arr[k], k);

        for (k = j + 1; k <= i; k++) 
            drawSorted(k);
        
        await sleep(state.delay);
    } 
    return arr;
} 

export async function selectionSort(arr, state){
    let i, j, min_id, len = arr.length;
    x = d3.scaleLinear()
        .domain([0,d3.max(arr)])
        .range([0,700]);
    for (i = 0; i < len; i++)
        drawUnselect(i);

    for (i = 0; i < len; i++){
        min_id = i;
        drawSelect(i);
        await sleep(state.delay);
        for (j = i + 1; j < len; j++){
            drawSelect(j);
            if (arr[j] < arr[min_id]){
                drawUnselect(min_id);
                await sleep(state.delay);
                min_id = j;
                drawSelect(j);
            }
            else{
                drawAltSelect(j);
                if (!state.running) 
                    return arr;
                if (state.pause)
                    while (state.pause) 
                        await sleep(100);
                await sleep(state.delay);
                drawUnselect(j);
            }
            if (!state.running) 
                return arr;
            if (state.pause)
                while (state.pause) 
                    await sleep(100);
            
            
        }

        [arr[i], arr[min_id]] = [arr[min_id], arr[i]]
        drawSwapSelected(i, min_id);
        drawUnselect(min_id);
        drawSorted(i);
        await sleep(state.delay);
    }
    return arr;

}

export async function mergeSort(arr, state){
    x = d3.scaleLinear()
        .domain([0,d3.max(arr)])
        .range([0,700]);

    for (let i = 0; i < arr.length; i++)
        drawUnselect(i);

    await mergeSortRun(arr, state);

    if (state.running)
        for (let i = 0; i < arr.length; i++){
            drawUpdate(arr[i], i);
            drawSorted(i);
            await sleep (state.delay);
        }
    return arr;
}

async function mergeSortRun(arr, state){
    if (arr.length < 2) 
        return arr;

    let mid =  Math.ceil(arr.length / 2), i, il, ir, left, right;
    left = await mergeSortRun(arr.slice(0, mid), state);
    if (left == null)
        return null;
    state.opt += mid;
    right = await mergeSortRun(arr.slice(mid), state);
    if (left == null)
        return null;
    state.opt -= mid;

    if (!state.running) 
            return arr;
    if (state.pause)
        while (state.pause) 
            await sleep(100);
    
    for (let i = 0; i < arr.length; i++)
        drawAltSelect(state.opt + i);

    for (i = 0, il = 0, ir = 0; i < (left.length + right.length); i++){
        if (!state.running) 
            return arr;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        drawSelect(state.opt + i);

        if (left[il] < right[ir] ){
            arr[i] = left[il];
            await sleep(state.delay);
            drawUpdate(arr[i],state.opt + i);
            il++;
        }
        else{
            arr[i] = right[ir];
            await sleep(state.delay);
            drawUpdate(arr[i], state.opt + i);
            ir++;
        }
        drawSorted(state.opt + i);

      	if (il == left.length)
            for (i++; ir < right.length; ir++, i++){
                if (!state.running) 
                    return arr;
                if (state.pause)
                    while (state.pause) 
                        await sleep(100);
    
                await sleep(state.delay)

                arr[i] = right[ir];
                drawSelect(state.opt + i);
                await sleep (state.delay);
                drawUpdate(arr[i], state.opt + i);
                await sleep(state.delay);
                drawSorted(state.opt + i);
            }
        if (ir == right.length)
            for (i++; il < left.length; il++, i++){
                if (!state.running) 
                    return arr;
                if (state.pause)
                    while (state.pause) 
                        await sleep(100);
                        
                await sleep(state.delay)

                arr[i] = left[il];
                drawSelect(state.opt + i);  
                await sleep (state.delay); 
                drawUpdate(arr[i], state.opt + i)
                await sleep (state.delay);
                drawSorted(state.opt + i);
            }
            await sleep(state.delay)

    }
    await sleep(state.delay)
    for (let i = 0; i < arr.length; i++)
        drawUnselect(state.opt + i);
    
    return arr;
}

export async function quickSort(arr, state){
    x = d3.scaleLinear()
    .domain([0,d3.max(arr)])
    .range([0,700]);

    for (let i = 0; i < arr.length; i++)
        drawUnselect(i);


    await quickSortRun(arr, 0, arr.length - 1, state);
    if (state.running)
        for (let i = 0; i < arr.length; i++){
            drawUpdate(arr[i], i);
            drawSorted(i);
            await sleep (state.delay);
        }
    
    return arr;
}

async function quickSortRun(arr, low, high, state){
    if (low < high){
        let pi = await quickSortPartition(arr, low, high, state);
        await quickSortRun(arr, low, pi - 1, state);
        await quickSortRun(arr, pi, high, state);
    }
}

async function quickSortPartition(arr, low, high, state){
    let i=low, j=high, pivot_id = Math.floor((low + high) / 2), pivot = arr[pivot_id];
    drawSelect(pivot_id);
    await sleep(state.delay);
    if (!state.running) 
        return arr;
    if (state.pause)
    while (state.pause) 
        await sleep(100);
    while(i <= j) {
        while(arr[i] < pivot){
            drawAltSelect(i);
            await sleep(state.delay);
            if (!state.running) 
                return arr;
            if (state.pause)
            while (state.pause) 
                await sleep(100);
            drawUnselect(i);
            i++; 

        }
        if (i != pivot_id)
            drawSorted(i);
        await sleep(state.delay);

        while(arr[j] > pivot){
            drawAltSelect(j);
            await sleep(state.delay);
            if (!state.running) 
                return arr;
            if (state.pause)
            while (state.pause) 
                await sleep(100);
            drawUnselect(j);
            j--; 

        }
        if (j != pivot_id)
            drawSorted(j);
        await sleep(state.delay);
        if(i <= j) {
            drawSwapSelected(i, j);
            await sleep(state.delay);

            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++; j--; 
        }

        if (!state.running) 
            return arr;
        if (state.pause)
        while (state.pause) 
            await sleep(100);

        drawUnselect(i - 1);
        drawUnselect(j + 1);
        if (i - 1 == pivot_id) {
            drawUnselect(pivot_id);
            drawSelect(j + 1);
            pivot_id = j + 1;
        }
        if (j + 1 == pivot_id) {
            drawUnselect(pivot_id);
            drawSelect(i - 1);
            pivot_id = i - 1; 
        }

        await sleep(state.delay);
        if (!state.running) 
            return arr;
        if (state.pause)
        while (state.pause) 
            await sleep(100);
    }
    drawUnselect(pivot_id);

    return i;
}

export async function heapSort(arr, state){
    let n = arr.length - 1;
    
    x = d3.scaleLinear()
    .domain([0,d3.max(arr)])
    .range([0,700]);

    for (let i = 0; i < arr.length; i++)
        drawUnselect(i);

    await heapSortCreateHeap(arr, state);
    for (let i = 0; i < arr.length; i++)
        drawAltSelect(i);

    await sleep(state.delay);

  	while (n > 0){
        drawSelect(0);
        await sleep(state.delay);
        if (!state.running) 
            return arr;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        drawSwapSelected(0, n);
        drawSorted(n);
        await sleep(state.delay);
        if (!state.running) 
            return arr;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        [arr[0], arr[n]] = [arr[n], arr[0]];
        await heapSortHeapify(arr, 0, n--, state);
    }
    drawSorted(0);
    return arr;
}

async function heapSortCreateHeap(arr, state){
    let i = Math.floor(arr.length / 2 - 1);
    while (i >= 0){
        await heapSortHeapify(arr, i--, arr.length, state);
    }
}

async function heapSortHeapify(arr, i, n, state){
    let largest = i, il = 2 * i + 1, ir = il + 1;

    if (il < n && arr[il] > arr[largest])
        largest = il;
    
    if (ir < n && arr[ir] > arr[largest])        
        largest = ir;

    if (!state.running) 
        return arr;
    if (state.pause)
        while (state.pause) 
            await sleep(100);

    if (largest != i) {
        drawSwapSelected(i, largest);
        
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await sleep(state.delay);

        if (!state.running) 
            return arr;
        if (state.pause)
            while (state.pause) 
                await sleep(100);


        await heapSortHeapify(arr, largest, n, state);
    }
}



function digit(x, i){
    let xString = x.toString();
    return Number(xString[xString.length - 1 - i]);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawSelect(i){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(255, 0, 255)", null);
}

function drawAltSelect(i){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(200, 200, 0)", null);
}

function drawUnselect(i, j){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(64, 0, 255)", null);
}

function drawSwapSelected(i , j){
    var diagram = document.getElementById("content").childNodes;
    var first = diagram.item(i);
    var second = diagram.item(j);
    let temp = first.style.getPropertyValue("height");
    first.style.setProperty("height", second.style.getPropertyValue("height"), null);
    second.style.setProperty("height", temp, null);
}

function drawUpdate(val, i){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("height", x(val) + "px", null);
}


function drawSorted(i){
    var diagram = document.getElementById("content").childNodes;
    var sorted = diagram.item(i);
    sorted.style.setProperty("background", "rgb(0, 220, 0)", null);
}