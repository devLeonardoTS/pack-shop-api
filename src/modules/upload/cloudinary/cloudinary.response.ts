import {
  DeleteApiResponse,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
export type CloudinaryDeleteResponse = DeleteApiResponse;
