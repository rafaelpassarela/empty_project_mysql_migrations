export interface IFileModel {
	name: string;
	size: number;
	type: string;
	data: string | ArrayBuffer | null;
}

class FileUtils {

	private doReadFile(file: File, callback: (fileModel: IFileModel | null) => void, asText: boolean) {
		if (file != undefined) {
			let reader = new FileReader();
			if (asText === true) {
				reader.readAsText(file);
			} else {
				reader.readAsDataURL(file);
			}
			reader.onload = function () {
				callback({
					name: file.name,
					size: file.size,
					type: file.type,
					data: reader.result } as IFileModel
				);
			};
			reader.onerror = function (error) {
				callback({
					name: file.name,
					size: file.size,
					type: file.type,
					data: reader.result } as IFileModel
				);
			};
		}
	}

	public asBase64(file: File, callback: (fileModel: IFileModel | null) => void) {
		this.doReadFile(file, callback, false);
	}

	public asString(file: File, callback: (fileModel: IFileModel | null) => void) {
		this.doReadFile(file, callback, true);
	}

}

export const fileUtils = new FileUtils();