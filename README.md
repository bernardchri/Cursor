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
- **ignore** : Pour forcer des éléments dont le comportement ajoute un curseur pointer, par défaut le script inclu déjà les balises a et button


## Notes
- **iframes** : Au survol des iFrame, le curseur disparait ( eviter des conflits sur les iframes comme Youtube)
- **optimisation** : un canvas serait sans doute plus performant, mais la gestion des états se fera moins facilement qu'en css
- **animation**: les animations se font actuellement via des changements de class css. Pour des choses plus complexes on pourrait utiliser Lottie ?


## TO DO;
- Ajouter une class ".cusor--slide" : pour les blocs ou le comportement sera un slide.
