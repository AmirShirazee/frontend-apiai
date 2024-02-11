export interface UploadedFile {
  id: string;
  name: string;
  uploadDate: string;
  fileContent: string;
}

export interface ServerResponse {
  isUploaded: boolean;
  uploads: UploadedFile[];
}

export interface FileUploadState {
  uploadProgress: number;
  isFileViewed: boolean;
  toast: {
    open: boolean;
    type: "warning" | "error" | "success" | "";
    message: string;
  };
  uploadedFiles: UploadedFile[];
}
