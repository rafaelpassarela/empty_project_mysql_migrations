class FormHelper {

	private innerTimer: number = -1;

	public checkRequiredFields(container: HTMLElement | null, qualifiedName: "input" | "textarea") : boolean {
		if (container === null) {
			return true;
		}

		let valid: boolean = true;
		// Find its child `input` elements
		if (container != null) {
			let inputs = container.getElementsByTagName(qualifiedName);
			for (let i = 0; i < inputs.length; ++i) {
				// deal with inputs[i] element.
				let elem = inputs[i];
				if (elem.required && !elem.disabled) {
					valid = elem.value != undefined && elem.value.trim() != "";
					if (!valid) {
						break;
					}
				}
			}
		}

		return valid;
	}

	public focusElementById(idName: string) {
		let elem = document.getElementById( idName );
		if (elem !== null) {
			elem.focus();
		}
	}

	public focusElementByIdDelayed(idName: string) {
 		this.innerTimer = window.setInterval(() => {
			this.focusElementById(idName);
			window.clearInterval(this.innerTimer);
			this.innerTimer = -1;
		}, 500);
	}

}

export const formHelper = new FormHelper();