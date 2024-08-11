const canvasSetup = document.getElementById("canvas");
const ctx = canvasSetup.getContext("2d");
var width = canvasSetup.width = canvasSetup.offsetWidth;
var height = canvasSetup.height = canvasSetup.offsetHeight;

var recursion_slider = document.getElementById("recursion_slider");
var angle_slider = document.getElementById("angle_slider");
var select = document.getElementById("dropdown");
var start_axiom, axiom, replace_axiom, start_angle, thickness, dist, base_dist;

function new_axiom(n_axiom, n_replace_axiom) {
	for(let c = 0; c < recursion_slider.value; c++)
  		n_axiom = n_axiom.replace(/A/g, n_replace_axiom);
	return n_axiom;
}

const t = new turtle(width/2, height/2);

function draw(start_x, start_y) {	
	t.setpos(start_x, start_y);
	t.angle = start_angle;
	let st = [], angle = Number(angle_slider.value);;
	ctx.clearRect(0, 0, width, height);
	for(let i in axiom){
		if(axiom[i] == "F")
			t.forward(dist, '#fff');
		if(axiom[i] == "A")
			t.forward(dist, "#1e90ff");
		if(axiom[i] == "+")
			t.right(angle);
		if(axiom[i] == "-")
			t.left(angle);
		if(axiom[i] == "["){
			st.push([t.x, t.y, t.angle, t.k, thickness]);
			t.k /= 1.5;
			thickness = thickness*0.8 > 1 ? thickness*0.8: 1;
		}
		if(axiom[i] == "]"){
			t.setpos(st[st.length-1][0], st[st.length-1][1]);
			t.angle = st[st.length-1][2];
			t.k = st[st.length-1][3];
			thickness = st[st.length-1][4];
			st.pop();
		}
	}
}

main();
async function main() {
	var selectedOption = select.selectedIndex;
	switch(selectedOption){
		case 0:
			//Дерево Пифагора
			angle_slider.style.display = "block";
			recursion_slider.max = 14;
			recursion_slider.value = 8;
			recursion_text.textContent = 8;
			start_axiom = "A";
			replace_axiom = "F[+A][-A]";
			axiom = new_axiom(start_axiom, replace_axiom);
			thickness = 10 * (height/722);
			dist = 210 * (height/722);
			start_angle = rad(-90);
			start_x = width/2;
			start_y = height;
			break;
		case 1:
			//Ель
			angle_slider.style.display = "block";
			recursion_slider.max = 9;
			recursion_slider.value = 4;
			recursion_text.textContent = 4;
			start_axiom = "A";
			replace_axiom = "F[+A-A][-A]";
			axiom = new_axiom(start_axiom, replace_axiom);
			thickness = 10 * (height/722);
			dist = 145 * (height/722); 
			start_angle = rad(-90);
			start_x = width/2;
			start_y = height;
			break;
		case 2:
			//Каламит
			angle_slider.style.display = "block";
			recursion_slider.max = 6;
			recursion_slider.value = 3;
			recursion_text.textContent = 3;
			start_axiom = "A";
			replace_axiom = "F[+A][-A]FA";
			axiom = new_axiom(start_axiom, replace_axiom);
			thickness = 5 * (height/722);
			dist = 50 * (height/722);
			start_angle = rad(-90);
			start_x = width/2;
			start_y = height;
			break;
		case 3:
			//Водоросль
			angle_slider.style.display = "block";
			recursion_slider.max = 4;
			recursion_slider.value = 2;
			recursion_text.textContent = 2;
			start_axiom = "A";
			replace_axiom = "[-FA][+FA]FA-[-A+A+A]+[+A-A-A]";
			axiom = new_axiom(start_axiom, replace_axiom);
			thickness = 3 * (height/722);
			dist = 35 * (height/722);
			start_angle = rad(-90);
			start_x = width/2;
			start_y = height;
			break;
		case 4:
			//Снежинка Коха
			angle_slider.style.display = "none";
			recursion_slider.max = 6;
			recursion_slider.value = 3;
			recursion_text.textContent = 3;
			angle_slider.value = 60;
			start_axiom = "A--A--A";
			replace_axiom = "A+A--A+A";
			axiom = new_axiom(start_axiom, replace_axiom);
			thickness = 1;
			base_dist = 500 * (height/722);
			dist = base_dist/(Math.pow(3, recursion_slider.value));
			start_angle = 0;
			start_x = (width-base_dist)/2;
			start_y = height/2-(Math.sqrt(base_dist*base_dist - (base_dist*base_dist)/4))/3;
			break;
	}
	angle_text.textContent = angle_slider.value;
	draw(start_x, start_y);
}

recursion_slider.addEventListener("input", function() {
	recursion_text.textContent = recursion_slider.value;
	axiom = new_axiom(start_axiom, replace_axiom);
	if(select.selectedIndex == 4)
		dist = base_dist/(Math.pow(3, recursion_slider.value));
	draw(start_x, start_y);
});

angle_slider.addEventListener("input", function() {
	angle_text.textContent = angle_slider.value;
	draw(start_x, start_y);
});

select.addEventListener("change", function() {
  main();
});
