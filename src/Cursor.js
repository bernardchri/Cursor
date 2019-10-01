/**
	### Gestion du custom cursor
	- const cursor = new Cursor({
		minWidth: '1024px',
		pointer: "hidden",
		framerate: 33,
		ignore: '.bouton'
	});
  - Un wrapper général avec la class '.cursor__wrapper'
  - Au clic le wrapper prend une class '.cursor--click'
  - Au rollOver le wrapper prend une class '.cursor--link'
  - **data-cursor-color="#ffffff"** ou n'importe quel couleur hexadécimale
  - **data-cursor-hover** pour forcer l'effet du hover
-
*/
export class Cursor {
	constructor({ minWidth = '1024px', delta, framerate = 10, colorDefault="#e5007e", pointer = "auto", ignore=[]}) {
		//responsive
		this.framerate = framerate;
		this.colorDefault = colorDefault;
		this.minWidth = minWidth;
		this.mq = window.matchMedia(`screen and (min-width:${this.minWidth})`);
		this.pointer = pointer;
		this.ignore = ignore

		
		// 
		this.delta = delta ;
		
		//
		this.cursorDatas = {
			mouseX: 0,
			mouseY: 0,
			pageX: window.pageXOffset || window.scrollX,
			pageY: window.pageYOffset || window.scrollY,
		};

		this.markup = `
		<div class="cursor__wrapper">
		  <div class="cursor__pointer" /></div>
		  <div class="cursor__int" /></div>
		  <div class="cursor__ext"/></div>
		</div>`;

		this.init();
	}

	init() {
		// Responsive resetCursor on tablet/mobil, create for deskop
		this.mq.matches ? this.createCursor() : null;

		this.mq.addListener(() => {
			this.mq.matches ? this.createCursor() : this.resetCursor();
		});
	}

	calcDelta(){
		return this.delta =  -this.cursor.clientWidth / 2;
	}

	createCursor() {
		// window.onload = this.insertMarkup();
		this.insertMarkup();
		this.cursor = document.querySelector('.cursor__wrapper');
		// reset style
		// console.log(this.pointer)
		// Enlève tous les style pointer sur tous les éléments

		let elementsPointerDefault = [
			'a',
			'button', 
			...this.ignore
		]
		
		if(this.pointer == "hidden"){
			// global
			document.documentElement.style.setProperty('cursor',"none",'important');

			// ciblé
			elementsPointerDefault.forEach(el => {
				document.querySelectorAll(el).forEach(item=>{
					item.style.setProperty('cursor',"none",'important');
				})
			})
		}
		else{
			// global
			document.documentElement.style.setProperty('cursor',"none",'important');
			// ciblé
			elementsPointerDefault.forEach(el => {
				document.querySelectorAll(el).forEach(item=>{
					item.style.setProperty('cursor',"auto",'important');
				})
				
			})
		}

		//reset cursor
		this.cursor.style.left = 0;
		this.cursor.style.top = 0;
		this.cursor.style.position = "fixed"

		this.calcDelta()

		document.addEventListener('mousemove', (event) => { this.cursorAnim(event) }, true );
		document.documentElement.onclick = (event) => { this.mouseClicEvents(event)};

	}

	insertMarkup() {
		document.body.insertAdjacentHTML('beforeend', this.markup);
	}

	resetCursor() {
		this.cursor.remove();
		document.removeEventListener('mousemove', (event) => { this.cursorAnim(event) }, true );
	}


	cursorAnim(event) {
		this.cursorDatas.mouseX = event.clientX;
		this.cursorDatas.mouseY = event.clientY;

		let posX = this.cursorDatas.mouseX + this.delta;
		let posY = this.cursorDatas.mouseY + this.delta;

		setTimeout( () => {
			this.cursor.style.left = `${posX}px`;
			this.cursor.style.top = `${posY}px`;
		}, this.framerate)

		// check les elements survolés
		this.mouseOverEvents(event)
	}

	mouseOverEvents(event) {
		let liens =
			event.target.closest('button') || event.target.closest('a') || event.target.closest('[data-cursor-hover]');

			// si ceux sont des liens
			if (liens) {
				this.cursor.classList.add('cursor--link');
				
			} else {
				this.cursor.classList.remove('cursor--link');
			}

			//si data-cursor-color proche, on applique la couleur au curseur
			if (event.target.closest('[data-cursor-color]')) {
				const color = event.target.closest('[data-cursor-color]').dataset.cursorColor;
				document.querySelector('.cursor__wrapper *').style.background = color;
			} else {
				document.querySelector('.cursor__wrapper *').style.background = this.colorDefault;
			}

		// cas special des iframes
		// sur une iframe, le curseur se détruit
		event.target.closest('iframe') ? this.cursor.classList.add('cursor--hidden') : this.cursor.classList.remove('cursor--hidden')
	}

	mouseClicEvents() {
		this.cursor.classList.add('cursor--click');
		
		let timer = setTimeout(() => {
			this.cursor.classList.remove('cursor--click');
			clearTimeout(timer);
		}, 300);
	}
}
