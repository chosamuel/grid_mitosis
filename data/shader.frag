// GRID MITOSIS
// SAMUEL CHO
// 2020 


#version 120

uniform vec2 u_resolution;
uniform float u_time;


vec2 r = u_resolution;
float t = u_time;

mat2 rot(float a){
		return mat2(cos(a),sin(a),-sin(a),cos(a));
}

float quadEase(float t){
		float e = sin(t) * 0.5 + 0.5;
		return e * e;
}

float circle(vec2 uv, vec2 id){
		float lower;
		lower = abs(sin(t*0.05) * sin(t*0.05))*0.45; 
		float upper= 0.5;
		float c = smoothstep(lower,upper,distance(uv, id+0.5));
		c *= smoothstep(lower,upper,distance(uv, id+0.5+vec2(1.,0.)));
		c *= smoothstep(lower,upper,distance(uv, id+0.5+vec2(-1.,0.)));
		c *= smoothstep(lower,upper,distance(uv, id+0.5+vec2(0.,1.)));
		c *= smoothstep(lower,upper,distance(uv, id+0.5+vec2(0.,-1.)));
		return c;
}
void main(){
		vec3 col = vec3(1.);

		vec2 uv = (gl_FragCoord.xy -.5 * r) / r.y;
		uv *= 8.+(2.*quadEase(t*0.015));
		uv *= rot(t*0.01);
		uv.x += sin(t*0.01);
		uv.y += cos(t*0.01);
		uv.x += sin(uv.x+t*0.05);
		uv.y += cos(uv.y+t*0.05);
	
		vec2 id = floor(uv);

		if(floor(sin(t*0.5)) == 0){
			if(mod(id.y, 2) == 0){
				id.x += cos(t*0.5) ;
			} else {
				id.x -= cos(t*0.5);
			}
		} else {
			if(mod(id.x, 2) == 0){
				id.y += cos(t*0.5);
			} else {
				id.y -= cos(t*0.5);
			}
		}

		float r = circle(uv,id);
		float g = circle(uv+vec2(0.01),id);
		float b = circle(uv +vec2(-0.01),id);

		col = vec3(g,r,b);

		gl_FragColor = vec4(col,1.);
}
