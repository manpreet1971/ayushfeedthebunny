class Rope{
    constructor(nlink,pointA) {
     this.nlink=nlink;
     this.pointA=pointA;
     const rects = Composites.stack(100, 100, this.nlink, 1, 5,5, function(x, y) {
        return Bodies.rectangle(x, y, 30, 5, {
          render: {
            fillStyle: 'orange',
            strokeStyle: 'black'
          }
        });
      });
      this.body=Composites.chain(rects,0.1,0,-1,0,{stiffness:0.1,length:0.1});
      World.add(world,rects);
      Composite.add(rects, Constraint.create({ pointA: this.pointA, bodyB: rects.bodies[0], length:10, stiffness: 0.1 }));
 }
   show() 
   { 
     if(this.body!=null) 
      { 
       for (let i = 0; i < this.body.bodies.length-1; i++) 
      { 
        this.drawVertices(this.body.bodies[i].vertices); 
        console.log(this.body.bodies[i].vertices) 
   } 
  }  
 }
 drawVertices(vertices) { 
   beginShape(); 
   fill('#FFF717') 
   noStroke(); 
   for (let i = 0; i < vertices.length; i++) { vertex(vertices[i].x, vertices[i].y); 
  }  endShape(CLOSE); 
 }
   
  break(){
    this.body=null;
  }
}