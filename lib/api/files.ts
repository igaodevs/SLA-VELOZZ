import { apiClient } from './client';

export interface UploadResponse {
  filename: string;
  file_id: string;
  size: number;
  uploaded_at: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient('/upload/', {
    method: 'POST',
    body: formData,
    headers: {
      // Let the browser set the Content-Type with boundary
    },
  });
};

export const mergeFiles = async (fileIds: string[]): Promise<{ file_id: string }> => {
  return apiClient('/merge/', {
    method: 'POST',
    body: JSON.stringify({ file_ids: fileIds }),
  });
};

export const downloadFile = async (fileId: string): Promise<Blob> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/download/${fileId}`,
    {
      credentials: 'include',
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Failed to download file');
  }

  return response.blob();
};
