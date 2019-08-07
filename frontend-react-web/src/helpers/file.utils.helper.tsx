export interface IFileModel {
	name: string;
	size: number;
	type: string;
	data: string | ArrayBuffer | null;
}

class FileUtils {

	public asBase64(file: File, callback: (fileModel: IFileModel | null) => void) {
		if (file != undefined) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
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

}

export const fileUtils = new FileUtils();