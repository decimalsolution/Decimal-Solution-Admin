import uuid from "react-uuid";

const CLOUD_NAME = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET

// Image upload function
export default async function uploadImage(f, setProgress, folderName = "categories") {
  const formData = new FormData();

  formData.append("file", f);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folderName);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress && setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        const error = JSON.parse(xhr.responseText);
        console.error("Cloudinary Upload Error:", error);
        reject(error);
      }
    };

    xhr.onerror = () => reject(new Error("Network error during Cloudinary upload"));

    xhr.send(formData);
  });
}

// Video upload function
export async function uploadVideo(f, setProgress, folderName = "uploads/videos") {
  const formData = new FormData();

  formData.append("file", f);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("resource_type", "video");
  formData.append("folder", folderName);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        if (setProgress) setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          console.error("Cloudinary Video Upload Error:", error);
          reject(error);
        } catch (e) {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error during Cloudinary video upload"));

    xhr.send(formData);
  });
}

// PDF upload function
// Uploaded as resource_type "image" (not "raw") so that:
//   1) page-based thumbnails (pg_N transformation) work, and
//   2) the file can be viewed inline in the browser instead of forced to download.
// This matches what getPDFThumbnailUrl() below expects.
export async function uploadPDF(f, setProgress, folderName = "uploads/documents") {
  const formData = new FormData();

  // Handle both File and Blob objects
  let fileToUpload = f;
  if (f instanceof Blob && !(f instanceof File)) {
    fileToUpload = new File([f], `invoice_${Date.now()}.pdf`, { type: "application/pdf" });
  }

  formData.append("file", fileToUpload);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folderName);
  formData.append("resource_type", "image"); // enables inline viewing + page thumbnails

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        if (setProgress) setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          console.error("Cloudinary PDF Upload Error:", error);
          reject(error);
        } catch (e) {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error during PDF upload"));
    xhr.send(formData);
  });
}

// PDFs are now uploaded as resource_type "image", so the secure_url
// Cloudinary returns already points at the right delivery type — no
// special-casing needed to view it.
export const getPDFViewerUrl = (cloudinaryUrl) => {
  return cloudinaryUrl || "";
};

// Generates a JPG thumbnail of a given page of an uploaded PDF.
// Works because the PDF was uploaded with resource_type "image".
export const getPDFThumbnailUrl = (cloudinaryUrl, page = 1, width = 200) => {
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) return cloudinaryUrl || "";

  try {
    const uploadIndex = cloudinaryUrl.indexOf("/upload/");
    if (uploadIndex === -1) return "";

    const afterUpload = cloudinaryUrl.substring(uploadIndex + 8); // +8 for '/upload/'
    const versionAndPath = afterUpload.split("/");

    // Remove the version segment (e.g. v1234567890) if present
    if (versionAndPath[0].startsWith("v")) {
      versionAndPath.shift();
    }

    const publicId = versionAndPath.join("/").replace(/\.pdf$/i, "");

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/pg_${page},w_${width},c_fill,f_jpg,q_auto/${publicId}.pdf`;
  } catch (error) {
    console.error("Error generating PDF thumbnail URL:", error);
    return "";
  }
};

// Generic file upload for other types (doc, docx, xls, xlsx, txt, etc.)
export async function uploadGenericFile(f, setProgress, folderName = "uploads/documents") {
  const formData = new FormData();

  formData.append("file", f);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("resource_type", "raw");
  formData.append("folder", folderName);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        if (setProgress) setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          console.error("Cloudinary File Upload Error:", error);
          reject(error);
        } catch (e) {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Network error during Cloudinary file upload"));

    xhr.send(formData);
  });
}

// Main upload function that detects file type
export async function uploadFile(file, setProgress, folderName) {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split(".").pop();

  // PDFs — check first before images (some browsers may misidentify PDFs)
  const isPDF = fileType === "application/pdf" || fileExt === "pdf";
  if (isPDF) {
    return uploadPDF(file, setProgress, folderName || "uploads/documents");
  }

  // Images
  if (fileType.startsWith("image/")) {
    return uploadImage(file, setProgress, folderName || "categories");
  }

  // Videos
  if (fileType.startsWith("video/")) {
    return uploadVideo(file, setProgress, folderName || "uploads/videos");
  }

  // Documents (Word, Excel, Text, etc.)
  const documentTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "application/rtf",
  ];

  if (documentTypes.includes(fileType) || ["doc", "docx", "xls", "xlsx", "txt", "rtf"].includes(fileExt)) {
    return uploadGenericFile(file, setProgress, folderName || "uploads/documents");
  }

  throw new Error(`Unsupported file type: ${fileType}. Please upload images, videos, PDFs, or documents.`);
}

// Drop-in replacement for the old firebase.js `uploadSingleFile`.
// Same call signature: uploadSingleFile({ file, folderName, urlSetter, setProgress })
export const uploadSingleFile = ({ file, folderName, urlSetter, setProgress }) => {
  if (!file) return;

  uploadFile(file, setProgress, folderName)
    .then((url) => urlSetter(url))
    .catch((err) => console.error("uploadSingleFile error:", err));
};

// Upload blob (for generated PDFs)
export async function uploadBlob(blob, filename, setProgress, folderName) {
  const file = new File([blob], filename, { type: blob.type });
  return uploadFile(file, setProgress, folderName);
}

// Upload base64 string (for generated invoices or data URLs)
export async function uploadFromBase64(base64String, filename, setProgress, folderName) {
  const response = await fetch(base64String);
  const blob = await response.blob();
  return uploadBlob(blob, filename, setProgress, folderName);
}

// Helper to get URL extension
const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

// Convert URL to File object
export const urlToFile = async (url) => {
  const ext = getUrlExtension(url);
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], `${Date.now()}.${ext}`, { type: blob.type });
  file._id = uuid();
  return file;
};

export const imageToFile = async (imgUrl) => urlToFile(imgUrl);
export const videoToFile = async (videoUrl) => urlToFile(videoUrl);
export const pdfToFile = async (pdfUrl) => urlToFile(pdfUrl);