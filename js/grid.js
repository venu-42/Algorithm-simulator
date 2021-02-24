let controlState='select_boxes';
let isMouseDown=0;
let [src_x,src_y]=[5,10];
let [dest_x,dest_y]=[9,17];
let virtual_grid=[];


let grid_table=document.querySelector('.grid-table');
let icon_src=document.createElement('i');
let icon_dest=document.createElement('i');

// setting up the grid and src,dest points

for(let i=0;i<25;i++){
    let temp=[]
    for(let j=0;j<40;j++){
        temp.push(0);
    }
    virtual_grid.push(temp);
}
for(let i=0;i<25;i++){
    let row=document.createElement('tr');
    for(let j=0;j<40;j++){
        let box=document.createElement('td');
        box.setAttribute('id',`${i+1}-${j+1}`);
        box.setAttribute('class','box');
        row.appendChild(box);
    }
    grid_table.appendChild(row);
}

function set_src(x,y){
    [src_x,src_y]=[x,y];
    icon_src.setAttribute('class','bi bi-pin');
    document.getElementById(`${x}-${y}`).appendChild(icon_src);
    document.getElementById(`${x}-${y}`).classList.add('text-center');
}
function set_dest(x,y){
    [dest_x,dest_y]=[x,y];
    icon_dest.setAttribute('class','bi bi-person-fill');
    document.getElementById(`${x}-${y}`).appendChild(icon_dest);
    document.getElementById(`${x}-${y}`).classList.add('text-center');
}

function addingEventListeners(){
    console.log('entered addingevents');
    let allboxes=Array.from(document.querySelectorAll('.box'));

    document.querySelector('#change_src').addEventListener('click',function(){
        controlState=controlState=="change_src"?"select_boxes":"change_src";
        if(this.classList.contains('active')) {
            this.classList.remove('active');
        }
        else {
            this.classList.add('active');
            document.querySelector('#change_dest').classList.remove('active');
        }
    })
    document.querySelector('#change_dest').addEventListener('click',function(){
        controlState=controlState=="change_dest"?"select_boxes":"change_dest";
        if(this.classList.contains('active')) {
            this.classList.remove('active');
        }
        else {
            this.classList.add('active');
            document.querySelector('#change_src').classList.remove('active');
        }
    })
    // console.log(allboxes);

    // selection of boxes events
    allboxes.map(box=>box.addEventListener('mousedown',function(event){
        let [x,y]=this.id.split('-');

        if(controlState!=='select_boxes'||(x==src_x&&y==src_y)||(x==dest_x&&y==dest_y)) return ;

        if(this.classList.contains('checked')) {
            this.classList.remove('checked');
            virtual_grid[x-1][y-1]=0;
        }
        else {
            this.classList.add('checked');
            virtual_grid[x-1][y-1]=1;
        }
        console.log('cliked');
    }))

    allboxes.map(box=>{
            box.addEventListener('mouseover',function(){
                let [x,y]=this.id.split('-');

                if(isMouseDown==0||(controlState!=='select_boxes')||(x==src_x&&y==src_y)||(x==dest_x&&y==dest_y)) return ;

                if(this.classList.contains('checked')) {
                    this.classList.remove('checked');
                    virtual_grid[x-1][y-1]=0;
                }
                else {
                    this.classList.add('checked');
                    virtual_grid[x-1][y-1]=1;
                }
            })

            box.addEventListener('click',function(){
                let [x,y]=this.id.split('-');
                if(controlState=="change_src"){
                    set_src(x,y);
                }
                else if(controlState=="change_dest"){
                    set_dest(x,y);
                }
            })
            
        }
    )
    
    grid_table.addEventListener('mousedown',function(){
        isMouseDown=1;
    })
    grid_table.addEventListener('mouseup',function(){
        isMouseDown=0;
    })


}

addingEventListeners();
set_src(5,10);
set_dest(10,15);
