class Ground{
    constructor(x,y,w,h) {
     this.x=x;
     this.y=y;
     this.width=w;
     this.height=h;
     var options={
         isStatic: true
     }
     this.body=Bodies.rectangle(x,y,w,h,options);
     World.add(world,this.body)
    }

  display() {
   let pos=this.body.position;
   push();
   rectMode(CENTER);
   noStroke();
   fill("red");
   rect(pos.x,pos.y,this.width,this.height);
   pop();
 }
}









































// class Ground 
// {
//   constructor(x, y, w,h) 
//   {
//     let options = {
//      isStatic:true
//     };
    
//     this.body = Bodies.rectangle(x, y, w, h, options);
//     this.w = w;
//     this.h = h;
//     World.add(world, this.body);
//   }

//   show() {
//     let pos = this.body.position;
//     push();
//     rectMode(CENTER);
//     noStroke();
//     fill(148,127,146);
//     rect(pos.x,pos.y, this.w, this.h);
//     pop();
//   }
// }
