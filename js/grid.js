// let controlState='select_boxes';
let isMouseDown=0,mouseDown_src=0,isMouseDownForMovingIcons=0;
let timer;
let height=20,width=40;

let [src_x,src_y]=[1,1];
let [dest_x,dest_y]=[1,1];
let virtual_grid=[];
let clearPathfunc;


let grid_table=document.querySelector('.grid-table');
let icon_src=document.createElement('i');
let icon_dest=document.createElement('i');
icon_src.setAttribute('class','bi bi-pin-fill');
icon_dest.setAttribute('class','bi bi-person-fill');


// creating the virtual-grid and src,dest points
for(let i=0;i<height;i++){
    let temp=[];
    for(let j=0;j<width;j++){
        temp.push(0);
    }
    virtual_grid.push(temp);
}
for(let i=0;i<height;i++){
    let row=document.createElement('tr');
    for(let j=0;j<width;j++){
        let box=document.createElement('td');
        box.setAttribute('id',`${i+1}-${j+1}`);
        box.setAttribute('class','box');
        row.appendChild(box);
    }
    grid_table.appendChild(row);
}

// setting src and dest icons positions
function set_src(x,y){
    [src_x,src_y]=[x,y];
    document.getElementById(`${x}-${y}`).appendChild(icon_src);
    document.getElementById(`${x}-${y}`).classList.add('text-center');
}
function set_dest(x,y){
    [dest_x,dest_y]=[x,y];
    document.getElementById(`${x}-${y}`).appendChild(icon_dest);
    document.getElementById(`${x}-${y}`).classList.add('text-center');
}

// clearing individual wall and resetting virtual box
function clearWall(box){
    let [x,y]=box.id.split('-');
    if(box.classList.contains('wall')){
        box.classList.remove('wall');
        virtual_grid[x-1][y-1]=0;
    }

}

function addingEventListeners(){
    // console.log('entered addingevents');
    let allboxes=Array.from(document.querySelectorAll('.box'));



    // ----------------selection of walls events(mouse down)---------------------
    allboxes.map(box=>box.addEventListener('mousedown',function(event){
        let [x,y]=this.id.split('-');

        if((x==src_x&&y==src_y)||(x==dest_x&&y==dest_y)){
            isMouseDownForMovingIcons=1;
            mouseDown_src=(x==src_x&&y==src_y)?1:0;
            return;
        }
        if(this.classList.contains('visited')) return;

        if(this.classList.contains('wall')) {
            this.classList.remove('wall');
            virtual_grid[x-1][y-1]=0;
        }
        else {
            this.classList.add('wall');
            virtual_grid[x-1][y-1]=1;
        }
        // console.log('cliked');
    }))
    
    // ----------------selection of walls events(mouse over)---------------------
    allboxes.map(box=>{
            box.addEventListener('mouseover',function(event){
                let [x,y]=this.id.split('-');
                if(isMouseDownForMovingIcons){
                    if(mouseDown_src){
                        set_src(x,y);
                    }
                    else{
                        set_dest(x,y);
                    }
                    return ;
                }
                if(isMouseDown==0||(x==src_x&&y==src_y)||(x==dest_x&&y==dest_y)) return ;
                if(this.classList.contains('visited')) return;
                if(this.classList.contains('wall')) {
                    this.classList.remove('wall');
                    virtual_grid[x-1][y-1]=0;
                }
                else {
                    this.classList.add('wall');
                    virtual_grid[x-1][y-1]=1;
                }
            })

            
        }
    )


    //------------------------Clearing btns events and their functions------------

    //clearAll
    document.getElementById('clearAll').addEventListener('click',function(){
        allboxes.map(box=>{
            clearWall(box);
            box.classList.remove(...box.classList);
            box.classList.add('box');
        })
    })
    //clearWalls
    document.getElementById('clearWalls').addEventListener('click',function(){
        allboxes.map(box=>clearWall(box))
    })
    //clear only path not the walls
    clearPathfunc=function(){
        allboxes.map(box=>{
            box.classList.contains('visited')&&box.classList.remove('visited','pathed');
        })
    }
    document.getElementById('clearPath').addEventListener('click',clearPathfunc);


    //stop algos btn
    document.querySelector('#stop-btn').addEventListener('click',()=>{
        clearInterval(timer);
        document.querySelector('#stop-btn').classList.add('disabled');
    })
    
    // global mouse listeners
    grid_table.addEventListener('mousedown',function(){
        isMouseDown=1;
    })
    document.addEventListener('mouseup',function(){
        isMouseDown=0;
        isMouseDownForMovingIcons=0;
        mouseDown_src=0;
    })


}

addingEventListeners();
set_src(5,10);
set_dest(9,30);
