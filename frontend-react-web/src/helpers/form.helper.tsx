class FormHelper {

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
				if (elem.required) {
					valid = elem.value != undefined && elem.value.trim() != "";
					if (!valid) {
						break;
					}
				}
			}
		}

		return valid;
	}

}

export const formHelper = new FormHelper();