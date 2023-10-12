import { Injectable } from "@nestjs/common";
import { ServicesException } from "@src/modules/common/exceptions/services.exception";
import { v2 as cloudinary } from "cloudinary";
import * as streamifier from "streamifier";
import {
  CloudinaryDeleteResponse,
  CloudinaryResponse,
} from "./cloudinary.response";

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "packshop",
        },
        (error, result) => {
          if (error) {
            console.log("[CloudinaryService:Error]:", error);
            reject(new ServicesException());
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  deleteFileByPublicId(publicId: string): Promise<CloudinaryDeleteResponse> {
    return new Promise<CloudinaryDeleteResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.log("[CloudinaryService:Error]:", {
            publicId,
            result,
            error,
          });
          reject(new ServicesException());
        }
        resolve(result);
      });
    });
  }
}
