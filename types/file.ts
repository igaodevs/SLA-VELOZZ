export type FileType = 'main' | 'additional1' | 'additional2';

export interface FileState {
  main: File | null;
  additional1: File | null;
  additional2: File | null;
}

export interface UploadProgressState {
  main: number;
  additional1: number;
  additional2: number;
}

export interface UploadError {
  type: FileType;
  message: string;
}
