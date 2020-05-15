PShader s;

void setup(){
  size(640,480,P2D);
  s = loadShader("shader.frag");
  
 }

void draw(){
  s.set("u_time", (float)(millis()/1000.0));
  s.set("u_resolution",float(width),float(height));
  shader(s);
  noStroke();
  rect(0,0,width,height);

}
