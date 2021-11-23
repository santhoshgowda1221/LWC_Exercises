import { LightningElement, wire } from "lwc";
import getCertification from "@salesforce/apex/AwNavigation.getCertification";

export default class AwNavigation extends LightningElement {
	certifications = [];
	error;

	@wire(getCertification) wiredcertifications({ error, data }) {
		this.certifications = [];
		if (data) {
			this.certifications = data.map((cert) => ({
				Id: cert.Id,
				Name: cert.Name,
				compoundKey: `certification|${cert.Id}|${cert.Name}`
			}));
		} else if (error) {
			this.error = error;
		}
	}

	selectHandler(event) {
		const selectedItemName = event.detail.name;
		const evt = new CustomEvent("navitemselected", {
			detail: {
				itemName: selectedItemName
			}
		});

		this.dispatchEvent(evt);
	}
}
