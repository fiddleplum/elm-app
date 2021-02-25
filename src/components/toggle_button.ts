import { Component } from '../component';
import { AbstractButton } from './abstract_button';

export class ToggleButton extends AbstractButton {
	constructor(params: Component.Params) {
		super(params);

		// Get the user press callback.
		if (params.attributes.has('pressed')) {
			const value = params.attributes.get('pressed');
			if (typeof value !== 'string' && typeof value !== 'boolean') {
				throw new Error('pressed must be "true", "false", or a boolean.');
			}
			if (value === 'true' || value === true) {
				// Add the pressed class.
				this.element('root', HTMLDivElement).classList.add('pressed');
				// Set the state.
				this._pressed = true;
			}
		}
	}

	/** The event callback for when the mousedown or touchstart happens. */
	protected _mouseTouchDown(): void {
		if (!this._pressed) {
			// Add the pressed class.
			this.element('root', HTMLDivElement).classList.add('pressed');
			// Set the callback for when mouseup or touchend happens. It does nothing right now.
			this.setFocusReleaseCallback(() => {
			});
			// Set the state.
			this._pressed = true;
			// Call the user press callback.
			this._onPressCallback();
		}
		else {
			// Remove the pressed class.
			this.element('root', HTMLDivElement).classList.remove('pressed');
			// Set the callback for when mouseup or touchend happens. It does nothing right now.
			this.setFocusReleaseCallback(() => {
			});
			// Set the state.
			this._pressed = false;
			// Call the user release callback.
			this._onReleaseCallback();
		}
	}

	/** The current state of the toggle button. */
	private _pressed: boolean = false;
}

ToggleButton.register();