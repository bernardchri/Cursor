# cursor-custom


## Description
Create custom cursor 

- Un wrapper général avec la class '.cursor__wrapper'
- Au clic le wrapper prend une class '.cursor--click'
- Au rollOver le wrapper prend une class '.cursor--link'
- `<a data-cursor-color="#ffffff">mon lien special </a>`Forcer un changement de couleur du curseur **data-cursor-color="#ffffff"** ou n'importe quel couleur hexadécimale
- `<div data-cursor-hover>mon div à survoler </div>` : **data-cursor-hover** pour forcer l'effet du hover 

## Créer un nouveau curseur : 
	
	const cursor = new Cursor({
		minWidth: '1280px',
		pointer: "hidden",
		framerate: 33
	});
	
- **minWidth :** par défaut  1024px
- **pointer** : defaut "auto" sinon mettre "hidden" pour cacher le curseur par défaut
- **framerate** : par défaut 10 
- **colorDefault** : "#e5007e