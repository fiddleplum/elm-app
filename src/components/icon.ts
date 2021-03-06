import { Component } from '../component';

export class Icon extends Component {
	/** The source. */
	private _src = '';

	constructor(params: Component.Params) {
		super(params);

		// Set the source from the attributes.
		const srcValue = params.attributes.get('src');
		if (srcValue !== undefined) {
			this._src = srcValue;
			this.update();
		}
	}

	get src(): string {
		return this._src;
	}

	set src(src: string) {
		if (this._src !== src) {
			this._src = src;
			this.update();
		}
	}

	private update(): void {
		if (this._src === '') {
			return;
		}
		fetch(this._src).then(response => response.text()).then((text) => {
			// Parse the text into an svg element.
			const template = document.createElement('template');
			template.innerHTML = text.trim();
			if (template.content.children.length !== 1 || !(template.content.firstElementChild instanceof SVGElement)) {
				throw new Error('The source ' + this._src + ' is not a valid .svg file.');
			}
			const svg = template.content.firstElementChild;
			// Remove the old children.
			const svgElement = this.root as SVGElement;
			while (svgElement.lastChild !== null) {
				svgElement.removeChild(svgElement.lastChild);
			}
			// Copy over or clear the viewbox.
			const viewBoxAttribute = svg.getAttribute('viewBox');
			if (viewBoxAttribute !== null) {
				svgElement.setAttribute('viewBox', viewBoxAttribute);
			}
			else {
				svgElement.removeAttribute('viewBox');
			}
			// Copy over the children.
			while (svg.firstChild !== null) {
				svgElement.appendChild(svg.firstChild);
			}
		});
	}
}

Icon.html = `
	<svg></svg>
	`;

Icon.register();
