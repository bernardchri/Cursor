
class Cursor{
	constructor({minWidth = "1024px"}){
		
		//responsive
		this.minWidth = minWidth;	
		this.mq = window.matchMedia(`screen and (min-width:${this.minWidth})`);

		// mouse event
		this.mouseX = (event) => event.clientX;
		this.mouseY = (event) => event.clientY;
		
	
		
		this.cursorDatas = { 
			mouseX: 0, 
			mouseY: 0,
			pageX: window.pageXOffset ||  window.scrollX,
			pageY: window.pageYOffset ||  window.scrollY
		}
		console.log(this.cursorDatas)
		
		this.markup = `
		<div class="mouse__cursor">
		  <div class="mouse" /></div>
		  <div class="int" /></div>
		  <div class="ext"/></div>
		</div>`;

		this.init()
	}

	init(){
		
		// Responsive deleteCursor on tablet/mobil, create for deskop
		this.mq.matches ? this.createCursor() : null ;

		this.mq.addListener( () => {
			this.mq.matches ? this.createCursor() : this.deleteCusor();
		});

	}

	deleteCusor(){
		console.log('reset cursor');
	}
	
	createCursorMarkup (){
		document.body.insertAdjacentHTML('beforeend', this.markup);
	}

	createCursor() {
		console.log('create cursor')
		window.onload = this.createCursorMarkup();
		this.cursor = document.querySelector('.mouse__cursor');
		// document.querySelector('html, a, button').style.cursor = 'none';

		document.addEventListener('mousemove', (event) => { this.cursorAnim(event)} , true);
		document.addEventListener('scroll', (event) => { this.pageScrollPos(event)}, true);
		// document.addEventListener('mouseover', this.mouseOverEvents, true);
		// document.addEventListener('click', this.mouseClicEvents, true);
	}

	pageScrollPos(event){
		
		const oldMouseXPosition = this.cursorDatas.mouseX;
		const oldMouseYPosition = this.cursorDatas.mouseY;
		const oldPagePositionY = this.cursorDatas.pageY;
		const oldPagePositionX = this.cursorDatas.pageX;

		// 
		this.cursorDatas.pageX = window.pageXOffset ||  window.scrollX;
		this.cursorDatas.pageY = window.pageYOffset ||  window.scrollY;

		this.cursorDatas.mouseY =  oldMouseYPosition  - (oldPagePositionY - this.cursorDatas.pageY);
		this.cursorDatas.mouseX =  oldMouseXPosition  - (oldPagePositionX - this.cursorDatas.pageX);

		this.cursor.style.left = this.cursorDatas.mouseX + 'px';
		this.cursor.style.top = this.cursorDatas.mouseY + 'px';

	}
	
	cursorAnim(event){
		this.cursorDatas.mouseX = event.pageX;
		this.cursorDatas.mouseY = event.pageY;
		
		this.cursor.style.left =this.cursorDatas.mouseX + 'px';
		this.cursor.style.top = this.cursorDatas.mouseY + 'px';
		
		// console.log( this.cursorDatas )


	}
	
	mouseOverEvents(){

	}
	mouseClicEvents(){

	}
	

}


// const cursor = new Cursor({})

const cursor02 = new Cursor({
	actif:false
})





/**
### Gestion du custom cursor
  - Un wrapper général avec la class '.mouse__cursor'
  - Au clic le wrapper prend une class 'click'
  - Au rollOver le wrapper prend une class 'link'
  - **data-cursor-color="#ffffff"** ou n'importe quel couleur hexadécimale
  - **data-cursor-hover** pour forcer l'effet du hover
*/

const te = {
	mouseX: (event) => event.clientX,
	mouseY: (event) => event.clientY,
	colorDefault: '#e5007e',
	eventAlreadyActive: false,

	init(interruptor) {
		if (interruptor) {
			const mq = window.matchMedia('screen and (min-width:1099px)');

			mq.addListener(function() {
				mq.matches ? Cursor.createCursor() : Cursor.resetCusor();
			});

			if (mq.matches) {
				Cursor.createCursor();
			}
		}
	},
	createCursor() {
		window.onload = this.createCursorMarkup();
		this.cursor = document.querySelector('.mouse__cursor');
		document.querySelector('html, a, button').style.cursor = 'none';

		document.addEventListener('mousemove', this.cursorAnim, true);
		document.addEventListener('mouseover', this.mouseOverEvents, true);
		document.addEventListener('click', this.mouseClicEvents, true);
	},
	mouseOverEvents(event) {
		let liens =
			event.target.closest('button') || event.target.closest('a') || event.target.closest('[data-cursor-hover]');

		//si ceux sont des liens
		if (liens) {
			Cursor.cursor.classList.add('link');
		} else {
			Cursor.cursor.classList.remove('link');
		}

		//si data-cursor-color proche, on applique la couleur au curseur
		if (event.target.closest('[data-cursor-color]')) {
			let color = event.target.closest('[data-cursor-color]').dataset.cursorColor;
			document.querySelector('.mouse__cursor .mouse').style.background = color;
		} else {
			document.querySelector('.mouse__cursor .mouse').style.background = this.colorDefault;
		}

		// cas special des iframes
		// sur une iframe, le curseur se détruit
		if (event.target.closest('iframe')) {
			Cursor.resetCusor();
			
			if(Cursor.eventAlreadyActive == false) {
				event.target.closest('iframe').addEventListener('mouseout', function(e){
					e.preventDefault();
					Cursor.createCursor();
					Cursor.eventAlreadyActive = true;
				});
			}
		}
	},
	mouseClicEvents() {
		Cursor.clicEnter();
		let timer = setTimeout(() => {
			Cursor.clicQuit();
			clearTimeout(timer);
		}, 300);
	},
	clicEnter() {
		Cursor.cursor.classList.add('click');
	},
	clicQuit() {
		Cursor.cursor.classList.remove('click');
	},
	cursorAnim(event) {
		let mouse;
		mouse = {
			x: Cursor.mouseX(event) + window.pageXOffset || Cursor.mouseX(event) + window.scrollX,
			y: Cursor.mouseY(event) + window.pageYOffset || Cursor.mouseX(event) + window.scrollY
		};

		// si connecté à l'admin WP (margin-top sur la balise html qui décalle le cursor...)
		// if(Cursor.cursor && document.querySelector('body').classList.contains('admin-bar')) {
		// 	Cursor.cursor.style.top = mouse.y - 72 + 'px';
		// 	Cursor.cursor.style.left = mouse.x - 40 + 'px';
		// }
		// else if (Cursor.cursor) {
			Cursor.cursor.style.top = mouse.y - 40 + 'px';
			Cursor.cursor.style.left = mouse.x - 40 + 'px';
		// }
	},
	/**
	 * ### creation du markup du custom curseur
	 * - .mouse__cursor : wrapper
	 * - .mouse
	 * - .int
	 * - .ext
	 */
	createCursorMarkup: () => {
		let cursorMarkup = `
		<div class="mouse__cursor">
		  <div class="mouse" /></div>
		  <div class="int" /></div>
		  <div class="ext"/></div>
		</div>`;

		document.body.insertAdjacentHTML('beforeend', cursorMarkup);
	},
	/**
	 * ### destroy cursor markup
	 */
	resetCusor() {
		document.querySelector('html, a, button').style.cursor = 'initial';
		document.querySelector('.mouse__cursor').remove();
		document.removeEventListener('mousemove', this.cursorAnim, true);
		document.removeEventListener('mouseover', this.mouseOverEvents, true);
		document.removeEventListener('click', this.mouseClicEvents, true);
	}
};

