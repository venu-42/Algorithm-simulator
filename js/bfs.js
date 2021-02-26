function bfs(){
    let queue=[];
        queue.push([src_x-1,src_y-1]);

        let visited=[],parent=[];               
        for(let i=0;i<height;i++){
            let temp=[],temp1=[];
            for(let j=0;j<width;j++){
                temp.push(0);
                temp1.push([0,0]);
            }
            visited.push(temp);
            parent.push(temp1);
        }

    //util fn
    function push_addclass(x,y,p_x,p_y){
        // setTimeout(()=>{
            visited[x][y]=1;
            if(virtual_grid[x][y]==1) return ;
            parent[x][y]=[p_x,p_y];
            queue.push([x,y]);
            // console.log('pushed');
            
        // },0);
    }

    function findPath(){
        let arr=[];
        let x=dest_x-1,y=dest_y-1;
        // console.log('inside finpath',x,y);
        arr.unshift([x,y]);
        for(;!(x==src_x-1&&y==src_y-1);){
            [x,y]=[...parent[x][y]]
            // console.log(x,y);
            arr.unshift([x,y]);
        }
        return arr;
    }

    function utilfunc(i,path){
        setTimeout(function(){
            // console.log(`${path[i][0]+1}-${path[i][1]+1}`);
            document.getElementById(`${path[i][0]+1}-${path[i][1]+1}`).classList.add('pathed');
        },50*i);
    }
    function createPath(path){
        for(let i=0;i<path.length;i++){
            utilfunc(i,path);
        }
    }

    visited[src_x-1][src_y-1]=1;
    // for(;queue.length>0;){
    timer=setInterval(()=>{
        // console.log('ran');
        if(queue.length==0) {
            clearInterval(timer);
            document.querySelector('#stop-btn').classList.add('disabled');
            return;
        }
        let [tx,ty]=queue.shift();
        document.getElementById(`${tx+1}-${ty+1}`).classList.add('visited');
        if(tx+1==dest_x&&ty+1==dest_y){
            console.log('finally found!!!');
            clearInterval(timer);
            document.querySelector('#stop-btn').classList.add('disabled');
            let path=findPath();
            createPath(path);
        }
        // if(tx-1>=0&&ty-1>=0&&!visited[tx-1][ty-1]) push_addclass(tx-1,ty-1,tx,ty);
        if(tx-1>=0&&ty>=0&&!visited[tx-1][ty]) push_addclass(tx-1,ty,tx,ty);
        // if(tx-1>=0&&ty+1<width&&!visited[tx-1][ty+1]) push_addclass(tx-1,ty+1,tx,ty);
        if(tx>=0&&ty+1<width&&!visited[tx][ty+1]) push_addclass(tx,ty+1,tx,ty);
        // if(tx+1<height&&ty+1<width&&!visited[tx+1][ty+1]) push_addclass(tx+1,ty+1,tx,ty);
        if(tx+1<height&&ty>=0&&!visited[tx+1][ty]) push_addclass(tx+1,ty,tx,ty);
        // if(tx+1<height&&ty-1>=0&&!visited[tx+1][ty-1]) push_addclass(tx+1,ty-1,tx,ty);
        if(tx>=0&&ty-1>=0&&!visited[tx][ty-1]) push_addclass(tx,ty-1,tx,ty);
    },10);
    // console.log('exited');
}

document.querySelector('#bfs-btn').addEventListener('click',function(){
    clearPathfunc();
    bfs();
    document.querySelector('#stop-btn').classList.remove('disabled');
})